
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
}

export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';
export type ProductStatus = 'pending' | 'approved' | 'rejected';

export interface Product {
  id: string;
  name: string;
  originalPrice: number;
  category: string;
  description: string;
  image: string;
  sizes: string[];
  colors: string[];
  tags: string[];
  occasion: string;
  sourceUrl?: string;
  sourceName?: string;
  stockCount?: number;
  affiliateCommission?: number;
  rarity?: Rarity;
  stylePoints?: number;
  isLimitedEdition?: boolean;
  rating?: number;
  silkScreenAvailable?: boolean;
  status: ProductStatus; // الحالة الجديدة
  seo?: SEOMetadata;
}

export type View = 'store' | 'admin' | 'ai-stylist' | 'magazine' | 'silk-screen' | 'checkout' | 'account' | 'affiliate';

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  finalPrice: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
}
