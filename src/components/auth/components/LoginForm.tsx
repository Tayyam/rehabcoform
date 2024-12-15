import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, LockKeyhole } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { validateEmail, validatePassword } from '../../../utils/validation';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    
    const emailError = validateEmail(email);
    if (emailError) {
      newErrors.email = emailError;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      } else {
        setErrors({
          general: 'عذراً، البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى التحقق والمحاولة مرة أخرى.'
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        general: 'عذراً، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقاً.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-8">تسجيل الدخول للموظفين</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {errors.general && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm text-center animate-shake">
              {errors.general}
            </div>
          )}
          
          <Input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors(prev => ({ ...prev, email: undefined, general: undefined }));
            }}
            placeholder="البريد الإلكتروني"
            icon={<Mail className="w-5 h-5 text-gray-400" />}
            error={errors.email}
            required
            className="text-lg"
          />

          <Input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors(prev => ({ ...prev, password: undefined, general: undefined }));
            }}
            placeholder="كلمة المرور"
            icon={<LockKeyhole className="w-5 h-5 text-gray-400" />}
            error={errors.password}
            required
            className="text-lg"
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 text-lg relative overflow-hidden transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner /> : 'تسجيل الدخول'}
          </Button>
        </form>
      </Card>
    </div>
  );
};