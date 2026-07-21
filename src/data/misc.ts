import type { Testimonial, Registration, TimelineEvent, SiteSettings } from '../types';

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'أم عبد الله',
    role: {
      ar: 'والدة طالبة في مركز الحفظ',
      en: 'Parent of a Memorization Center student',
      am: 'የማስታወሻ ማዕከል ተማሪ ወላጅ',
      om: 'Haadha barartummaa Wiirtuu Hafzuu',
    },
    quote: {
      ar: 'الحمد لله الذي بنعمته تتم الصالحات. ابنتي أتمت حفظ القرآن الكريم كاملاً في مركز دار القرآن، وأنا أسأل الله أن يجزي القائمين عليه خير الجزاء.',
      en: 'Praise be to Allah, by Whose grace righteous deeds are completed. My daughter completed the full memorization of the Quran at Dar Al-Quran Center. I ask Allah to reward those in charge with the best reward.',
      am: 'ምስጋና ለአላህ። ሴት ልጄ ቁርአንን በሙሉ አስታውሳለች።',
      om: 'Galata Rabbii. Ilmiin koo Quraana guutuu hafuuteera.',
    },
    departmentSlug: 'center-hifz',
  },
  {
    id: 'test-2',
    name: 'أبو محمد',
    role: {
      ar: 'ولي أمر طالب في المدرسة',
      en: 'Parent of a School student',
      am: 'የትምህርት ቤት ተማሪ ወላጅ',
      om: 'Haadha barartummaa barumsa',
    },
    quote: {
      ar: 'مدرسة دار القرآن مدرسة فاضلة، تعلم الأطفال القرآن والأخلاق. ابني تعلم فيها قراءة القرآن بالتجويد وأصبح متميزاً في أخلاقه.',
      en: 'Dar Al-Quran School is an excellent school that teaches children the Quran and morals. My son learned to read the Quran with Tajwid and became outstanding in his character.',
      am: 'ዳር አል-ቁርአን ትምህርት ቤት ግሩም ትምህርት ቤት ነው።',
      om: 'Barumsi Daar Al-Quraan barumsa gaarii dha.',
    },
    departmentSlug: 'school',
  },
  {
    id: 'test-3',
    name: 'الشيخ أحمد',
    role: {
      ar: 'إمام المسجد ومدرس في الحلقة',
      en: 'Mosque Imam and Study Circle teacher',
      am: 'የመስጊድ ኢማም እና በክበቡ መምህር',
      om: 'Imaamii masjidaa fi barsiisa marii',
    },
    quote: {
      ar: 'حلقة دار القرآن منارة علم في المنطقة، يستفيد منها الكثير من طلاب العلم. أسأل الله أن يبارك في هذه الحلقة وأن ينفع بها.',
      en: 'Dar Al-Quran Study Circle is a beacon of knowledge in the region, benefiting many students of knowledge. I ask Allah to bless this circle and make it beneficial.',
      am: 'የዳር አል-ቁርአን ክበብ በክልሉ የእውቀት መብራት ነው።',
      om: 'Marii qorannoo Daar Al-Quraan naannoo kanaa ifa beekumsaati.',
    },
    departmentSlug: 'halqa',
  },
  {
    id: 'test-4',
    name: 'فاطمة',
    role: {
      ar: 'مستفيدة من بيت الرحمة',
      en: 'Beneficiary of Bayt Al-Rahma',
      am: 'ከቤት አል-ራህማ ተጠቃሚ',
      om: 'Fayyadamtuu Bayt Al-Rahmaa',
    },
    quote: {
      ar: 'جزاكم الله خيراً على ما تقدمونه لنا من مساعدات. وجبات الإفطار التي تقدمونها لأطفالي ساهمت في تخفيف معاناتنا كثيراً.',
      en: 'May Allah reward you with goodness for the assistance you provide us. The Iftar meals you offer my children have greatly alleviated our suffering.',
      am: 'አላህ ይሁንልን። ለልጆቼ የሰጠችሁን ምሳ ችግሬን በጣም አቃለለ።',
      om: 'Rabbiin galata isin galchee haa dha\'u. Nyaata ilmuu kooaf kennitan naaf gargaareera.',
    },
    departmentSlug: 'charity',
  },
];

export const registrations: Registration[] = [
  {
    id: 'reg-1',
    fullName: 'عائشة محمد',
    phone: '+251912345678',
    age: 20,
    email: 'aisha@example.com',
    address: 'المنطقة الشرقية',
    notes: 'راغبة في الانضمام لمركز الحفظ',
    departmentSlug: 'center-hifz',
    date: '2025-01-10',
    status: 'pending',
  },
  {
    id: 'reg-2',
    fullName: 'خديجة علي',
    phone: '+251923456789',
    age: 18,
    email: 'khadija@example.com',
    address: 'المنطقة الغربية',
    notes: '',
    departmentSlug: 'center-hifz',
    date: '2025-01-12',
    status: 'reviewed',
  },
  {
    id: 'reg-3',
    fullName: 'محمد عبد الله',
    phone: '+251934567890',
    age: 8,
    email: '',
    address: 'الحي الشمالي',
    notes: 'تسجيل في الصف الأول',
    departmentSlug: 'school',
    date: '2025-02-01',
    status: 'accepted',
  },
  {
    id: 'reg-4',
    fullName: 'عبد الرحمن يوسف',
    phone: '+251945678901',
    age: 10,
    email: 'yusuf@example.com',
    address: 'الحي الجنوبي',
    notes: 'نقل من مدرسة أخرى',
    departmentSlug: 'school',
    date: '2025-02-03',
    status: 'pending',
  },
  {
    id: 'reg-5',
    fullName: 'سعيد إبراهيم',
    phone: '+251956789012',
    age: 25,
    email: 'saeed@example.com',
    address: 'وسط المدينة',
    notes: 'راغب في دراسة الفقه',
    departmentSlug: 'halqa',
    date: '2025-01-22',
    status: 'reviewed',
  },
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'tl-1',
    year: '1438 هـ',
    title: {
      ar: 'تأسيس مدرسة دار القرآن الكريم',
      en: 'Founding of Dar Al-Quran School',
      am: 'የዳር አል-ቁርአን ትምህርት ቤት መመስረት',
      om: 'Barumsa Daar Al-Quraan kan hundeeffame',
    },
    description: {
      ar: 'تأسست المدرسة كأول أقسام المؤسسة، تبدأ بتعليم الأطفال قاعدة نورانية ثم قراءة القرآن ثم الصفوف من 1 إلى 5',
      en: 'The school was founded as the first department, starting with teaching children Qaida Nuraniyyah then Quran reading then Grades 1-5',
      am: 'ትምህርት ቤቱ እንደ መጀመሪያ ክፍል ተመሰረተ',
      om: 'Barumsi kun akka kutaa tokkoffaa kan hundeeffame',
    },
  },
  {
    id: 'tl-2',
    year: '1443 هـ',
    title: {
      ar: 'تأسيس حلقة دار القرآن',
      en: 'Founding of Dar Al-Quran Study Circle',
      am: 'የዳር አል-ቁርአን ክበብ መመስረት',
      om: 'Marii qorannoo Daar Al-Quraan kan hundeeffame',
    },
    description: {
      ar: 'تأسست الحلقة العلمية لدراسة كتب التراث الإسلامي بعد صلاة العصر',
      en: 'The study circle was founded for studying classical Islamic texts after Asr prayer',
      am: 'የጥናት ክበቡ ተመሰረተ',
      om: 'Marii qorannoon kan hundeeffame',
    },
  },
  {
    id: 'tl-3',
    year: '2014 م.أ',
    title: {
      ar: 'تأسيس بيت الرحمة الخيرية',
      en: 'Founding of Bayt Al-Rahma Charity',
      am: 'ቤት አል-ራህማ በጎ አድራጎት መመስረት',
      om: 'Bayt Al-Rahma Gargaarsa kan hundeeffame',
    },
    description: {
      ar: 'تأسس بيت الرحمة كذراع خيري للمؤسسة، يقدم وجبات يومية ومساعدات للمحتاجين',
      en: 'Bayt Al-Rahma was founded as the charitable arm, providing daily meals and aid to the needy',
      am: 'ቤት አል-ራህማ ተመሰረተ',
      om: 'Bayt Al-Rahmaan kan hundeeffame',
    },
  },
  {
    id: 'tl-4',
    year: '1446 هـ',
    title: {
      ar: 'تأسيس مركز حفظ القرآن الكريم',
      en: 'Founding of the Quran Memorization Center',
      am: 'የቁርአን ማስታወሻ ማዕከል መመስረት',
      om: 'Wiirtuu Hafzu Quraanaa kan hundeeffame',
    },
    description: {
      ar: 'تأسس المركز السكني لتخريج الحافظات لكتاب الله كاملاً، قبل 20 طالبة في الدفعة الأولى وتخرج 18 منهن',
      en: 'The residential center was founded for graduating female Hafizat of the complete Quran, accepting 20 students in the first batch, 18 of whom graduated',
      am: 'ማዕከሉ ተመሰረተ',
      om: 'Wiirtuun kan hundeeffame',
    },
  },
];

export const siteSettings: SiteSettings = {
  heroTitle: {
    ar: 'دار القرآن الكريم لخديجة بنت خويلد',
    en: 'Dar Al-Quran Al-Kareem for Khadija bint Khuwaylid',
    am: 'ዳር አል-ቁርአን አል-ካሪም ለኻዲጃ ብንት ኽወይሊድ',
    om: 'Daar Al-Quraan Al-Kariim Khadiija binti Khuwaylid',
  },
  heroSubtitle: {
    ar: 'نصرةً لكتاب الله وتعليماً لأبناء وبنات المسلمين',
    en: 'In support of the Book of Allah and education for the children of Muslims',
    am: 'የአላህን መጽሐፍ ለመደገፍ እና ለሙስሊሞች ልጆች ትምህርት',
    om: 'Kitaaba Rabbii deeggannuu fi ilmaan Muslimootaa barsiisuu',
  },
  contactEmail: 'info@daralquran.org',
  contactLocation: {
    ar: 'إثيوبيا',
    en: 'Ethiopia',
    am: 'ኢትዮጵያ',
    om: 'Itoophiyaa',
  },
  orgTelegram: 'https://t.me/daralquran',
  developedBy: 'Noor Studio',
  social: {
    telegram: 'https://t.me/daralquran',
    whatsapp: 'https://wa.me/251900000000',
    facebook: 'https://facebook.com/daralquran',
    tiktok: 'https://tiktok.com/@daralquran',
  },
};
