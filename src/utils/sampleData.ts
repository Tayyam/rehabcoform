import { Complaint, ComplaintCategory, ComplaintType } from '../types';

const categories: ComplaintCategory[] = ['administrative', 'health', 'transport', 'accommodation', 'food'];
const priorities = ['low', 'medium', 'high'] as const;
const statuses = ['open', 'in-progress', 'closed'] as const;
const types: ComplaintType[] = ['inquiry', 'complaint'];

const pilgrimNames = [
  'محمد أحمد',
  'عبدالله محمد',
  'خالد إبراهيم',
  'عمر سعيد',
  'سعد عبدالرحمن',
  'فهد سلطان',
  'عبدالعزيز محمد',
  'إبراهيم خالد',
  'يوسف عمر',
  'سلمان فهد'
];

const inquiryTitles = [
  'استفسار عن موعد الرحلة',
  'استفسار عن الخدمات المتوفرة',
  'معلومات عن السكن',
  'استفسار عن المواصلات',
  'معلومات عن الوجبات'
];

const complaintTitles = [
  'مشكلة في الحافلة',
  'تأخر في الخدمات',
  'مشكلة في السكن',
  'شكوى من الطعام',
  'تأخر في المواعيد'
];

const inquiryDescriptions = [
  'أرغب في معرفة تفاصيل مواعيد الرحلات',
  'هل يمكن الحصول على معلومات عن الخدمات المتوفرة',
  'استفسار عن مرافق السكن وموقعه',
  'معلومات عن مواعيد وخطوط النقل',
  'استفسار عن أنواع الوجبات المقدمة'
];

const complaintDescriptions = [
  'نواجه مشكلة في الخدمة المقدمة ونحتاج إلى حل سريع',
  'هناك تأخير مستمر في تقديم الخدمات المطلوبة',
  'نعاني من مشكلة في المرافق تحتاج إلى معالجة عاجلة',
  'الخدمات المقدمة لا تتناسب مع المعايير المطلوبة',
  'نحتاج إلى تحسين في مستوى الخدمة المقدمة'
];

function generatePassportNumber() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letter = letters[Math.floor(Math.random() * letters.length)];
  const numbers = Math.floor(Math.random() * 9000000) + 1000000;
  return `${letter}${numbers}`;
}

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export function generateSampleComplaints(userId: string, count: number = 10): Complaint[] {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(endDate.getMonth() - 6);

  return Array.from({ length: count }, () => {
    const createdAt = randomDate(startDate, endDate);
    const updatedAt = randomDate(createdAt, endDate);
    const type = types[Math.floor(Math.random() * types.length)];

    // Select titles and descriptions based on type
    const titles = type === 'inquiry' ? inquiryTitles : complaintTitles;
    const descriptions = type === 'inquiry' ? inquiryDescriptions : complaintDescriptions;

    return {
      id: crypto.randomUUID(),
      type,
      title: titles[Math.floor(Math.random() * titles.length)],
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      pilgrimName: pilgrimNames[Math.floor(Math.random() * pilgrimNames.length)],
      passportNumber: generatePassportNumber(),
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
      phoneNumber: '+966555006290',
      deliveryMethod: 'email',
      createdBy: userId,
      lastUpdatedBy: userId,
      notes: [],
      attachments: [],
    };
  });
}