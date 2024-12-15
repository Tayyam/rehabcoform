export const ar = {
  general: {
    appName: 'نظام بلاغات شركة رحاب',
    dashboard: 'لوحة التحكم',
    reports: 'التقارير',
    team: 'الفريق',
    settings: 'الإعدادات',
    unknown: 'غير معروف',
  },

  auth: {
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    name: 'الاسم',
    gender: {
      label: 'الجنس',
      male: 'ذكر',
      female: 'أنثى',
    },
    roles: {
      admin: 'مدير نظام',
      operator: 'مدخل بيانات',
    },
  },

  complaints: {
    title: 'العنوان',
    category: 'التصنيف',
    status: 'الحالة',
    created: 'تاريخ الإنشاء',
    actions: 'الإجراءات',
    priority: 'الأولوية',
    description: 'الوصف',
    addNew: 'إضافة بلاغ جديد',
    referenceNumber: 'رقم المتابعة',
    viewDetails: 'تفاصيل البلاغ',
    lastUpdatedBy: 'آخر تحديث بواسطة',
    deleteConfirmation: 'هل أنت متأكد من حذف هذا البلاغ؟',
    createdAt: 'تاريخ الإنشاء',
    createdBy: 'تم الإنشاء بواسطة',
    notes: {
      title: 'التعليقات والملاحظات',
      placeholder: 'اكتب تعليقاً...',
      send: 'إرسال',
    },
    updates: {
      title: 'سجل التحديثات',
      created: 'تم إنشاء البلاغ',
      updated: 'تم تحديث الحالة',
      by: 'بواسطة',
      startProcessing: 'تم بدء معالجة البلاغ',
      closed: 'تم إغلاق البلاغ',
      reopened: 'تم إعادة فتح البلاغ',
    },
  },

  complaintType: {
    label: 'نوع البلاغ',
    inquiry: 'استفسار',
    complaint: 'بلاغ',
    inquiryDesc: 'للاستفسارات العامة والأسئلة',
    complaintDesc: 'للشكاوى والمشاكل التي تحتاج حل',
  },

  categories: {
    administrative: 'إداري',
    health: 'صحي',
    transport: 'نقل',
    accommodation: 'سكن',
    food: 'تغذية',
  },

  status: {
    open: 'مفتوح',
    'in-progress': 'قيد المعالجة',
    rejected: 'مرفوض',
    closed: 'مغلق',
  },

  priority: {
    low: 'منخفضة',
    medium: 'متوسطة',
    high: 'عالية',
  },

  deliveryMethod: {
    email: 'بريد إلكتروني',
    phone: 'اتصال هاتفي',
    website: 'الموقع الإلكتروني',
  },

  reports: {
    title: 'التقارير',
    filterByDate: 'تصفية حسب التاريخ',
    export: 'تصدير التقرير',
    monthlyComplaints: 'البلاغات الشهرية',
    categoryDistribution: 'توزيع البلاغات حسب التصنيف',
    performanceMetrics: {
      resolutionRate: 'معدل الحل',
      avgResolutionTime: 'متوسط وقت الحل',
      openComplaints: 'البلاغات المفتوحة',
    },
  },

  team: {
    title: 'إدارة الفريق',
    addMember: 'إضافة عضو جديد',
    role: 'الدور',
    department: 'القسم',
    deleteConfirmation: 'هل أنت متأكد من حذف هذا العضو؟',
    performance: {
      title: 'أداء الفريق',
      metrics: {
        completedTasks: 'المهام المنجزة',
        pendingTasks: 'المهام المعلقة',
        avgResponseTime: 'متوسط وقت الاستجابة',
        successRate: 'نسبة النجاح',
      },
    },
  },

  settings: {
    title: 'الإعدادات',
    general: 'الإعدادات العامة',
    notifications: 'إعدادات الإشعارات',
    security: 'الإعدادات الأمنية',
    systemName: 'اسم النظام',
    timezone: 'المنطقة الزمنية',
    emailNotifications: 'إشعارات البريد الإلكتروني',
    emailNotificationsDesc: 'استلام إشعارات عبر البريد الإلكتروني',
    smsNotifications: 'إشعارات الرسائل النصية',
    smsNotificationsDesc: 'استلام إشعارات عبر الرسائل النصية',
    currentPassword: 'كلمة المرور الحالية',
    newPassword: 'كلمة المرور الجديدة',
    confirmPassword: 'تأكيد كلمة المرور',
    changePassword: 'تغيير كلمة المرور',
  },

  stats: {
    totalComplaints: 'إجمالي البلاغات',
    open: 'مفتوحة',
    inProgress: 'قيد المعالجة',
    closed: 'مغلقة',
    trend: 'مقارنة بالشهر السابق',
  },

  actions: {
    submit: 'إرسال',
    save: 'حفظ',
    update: 'تحديث',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    view: 'عرض',
    close: 'إغلاق',
    startProcessing: 'بدء المعالجة',
    closeComplaint: 'إغلاق البلاغ',
    reopenComplaint: 'إعادة فتح البلاغ',
    backToHome: 'العودة للرئيسية',
    export: 'تصدير',
    import: 'استيراد',
    refresh: 'تحديث',
    filter: 'تصفية',
    search: 'بحث',
    upload: 'رفع',
    download: 'تحميل',
  },

  validation: {
    required: 'هذا الحقل مطلوب',
    invalidEmail: 'البريد الإلكتروني غير صالح',
    invalidPhone: 'رقم الهاتف غير صالح',
    passwordLength: 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل',
    passwordMismatch: 'كلمة المرور غير متطابقة',
  },

  errors: {
    general: 'حدث خطأ غير متوقع',
    notFound: 'الصفحة غير موجودة',
    unauthorized: 'غير مصرح لك بالوصول',
    forbidden: 'ليس لديك صلاحية للقيام بهذا الإجراء',
    networkError: 'خطأ في الاتصال بالخادم',
  },

  success: {
    saved: 'تم الحفظ بنجاح',
    updated: 'تم التحديث بنجاح',
    deleted: 'تم الحذف بنجاح',
    uploaded: 'تم الرفع بنجاح',
    passwordChanged: 'تم تغيير كلمة المرور بنجاح',
  },
};