
import { Product, BlogPost } from './types.ts';

export const CATEGORIES = ['الكل', 'أطفال نيون', 'شباب GEN-Z', 'إكسسوارات ملكية', 'أحذية ذكية'];

export const VODAFONE_CASH_NUMBER = "01065217834";
export const WHATSAPP_NUMBER = "01126212452";
export const STORE_EMAIL = "sayedelazameydesign@gmail.com";
export const STORE_NAME = "celia_fashion_design";
export const PROFIT_MARGIN = 0.15; 

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'l1',
    name: 'سترة "إمبراطور النيون" - إصدار محدود',
    originalPrice: 1200,
    category: 'شباب GEN-Z',
    occasion: 'سهرة شبابية',
    description: 'قطعة فنية تجمع بين النسيج الذكي والأحبار الذهبية السائلة. تم إنتاج 50 قطعة فقط عالمياً.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000',
    sizes: ['M', 'L'],
    colors: ['أسود كربوني / ذهبي'],
    tags: ['حصري', 'إصدار محدود', 'يدوي'],
    rarity: 'Legendary',
    isLimitedEdition: true,
    rating: 5,
    stylePoints: 5000,
    silkScreenAvailable: true,
    affiliateCommission: 150,
    status: 'approved'
  },
  {
    id: 'a3',
    name: 'حقيبة الظهر الملكية LED',
    originalPrice: 450,
    category: 'إكسسوارات ملكية',
    occasion: 'مدرسة',
    description: 'شاشة بكسل مدمجة لعرض شعارات مخصصة مع نظام أمان بيومتري.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000',
    sizes: ['One Size'],
    colors: ['ذهبي مطفي'],
    tags: ['تقنية', 'فخامة'],
    rarity: 'Epic',
    rating: 4,
    stylePoints: 1200,
    affiliateCommission: 60,
    status: 'approved'
  },
  {
    id: 'p1',
    name: 'ساعة X-AURA الإصدار الرقمي',
    originalPrice: 890,
    category: 'إكسسوارات ملكية',
    occasion: 'رياضة الكترونية',
    description: 'ساعة ذكية قادمة من المورد العالمي، تنتظر المراجعة النهائية.',
    image: 'https://images.unsplash.com/photo-1544117518-30df578096a4?q=80&w=1000',
    sizes: ['One Size'],
    colors: ['فضي سيبراني'],
    tags: ['ساعات', 'جديد'],
    rarity: 'Rare',
    stylePoints: 2000,
    status: 'pending' // منتج معلق ينتظر موافقة الأدمن
  },
  {
    id: 'p2',
    name: 'حذاء سنيكرز نيون V2',
    originalPrice: 650,
    category: 'أحذية ذكية',
    occasion: 'لعب',
    description: 'حذاء يتفاعل مع الموسيقى والخطوات، مقترح للاستيراد.',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000',
    sizes: ['40', '42'],
    colors: ['أبيض نيون'],
    tags: ['أحذية', 'تفاعلي'],
    rarity: 'Epic',
    stylePoints: 1500,
    status: 'pending' // منتج معلق ينتظر موافقة الأدمن
  }
];

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: 'سيكولوجية الألوان في موضة 2026',
    author: 'ألكسندر فيراوي',
    excerpt: 'كيف ندمج بين الألوان الفسفورية والدرجات الملكية لخلق توازن بصري مذهل...',
    content: 'الموضة هي لغة صامتة، وفي عام 2026، النيون هو صرختها الأكثر رقياً.',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000',
    date: '15 نوفمبر 2024',
    readTime: '6 دقائق'
  }
];
