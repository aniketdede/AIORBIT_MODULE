export type PricingType = 'Free' | 'Freemium' | 'Paid' | 'Free Trial';

export type CategoryType = 
  | 'All'
  | 'Writing'
  | 'Image Generation'
  | 'Video Generation'
  | 'Audio'
  | 'Chatbots'
  | 'Coding'
  | 'Marketing'
  | 'Productivity'
  | 'Business'
  | 'Education'
  | 'Agents'
  | 'Workflow Automation';

export type QuickTag = 'Trending' | 'Popular' | 'New' | 'Free' | 'Top Rated';

export interface ToolItem {
  id: string;
  name: string;
  slug: string;
  domain: string;
  favicon?: string;
  description: string;
  fullDescription: string;
  category: CategoryType;
  tags: QuickTag[];
  pricing: PricingType;
  task: string;
  hasApi: boolean;
  isOpenSource: boolean;
  releasedDate: string;
  rating: number;
  reviewsCount: number;
  upvotes: number;
  websiteUrl: string;
  features: string[];
  pros: string[];
  cons: string[];
  developer: string;
}

export interface ToolsApiResponse {
  tools: ToolItem[];
  total: number;
  categories: { name: string; count: number }[];
  page: number;
  limit: number;
}
