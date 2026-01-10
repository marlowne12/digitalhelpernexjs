export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: Date;
}

export enum SendingStatus {
  IDLE = 'IDLE',
  SENDING = 'SENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
}

export type ViewState = 'HOME' | 'SEO' | 'WEBDESIGN' | 'AI_AGENCY' | 'CASE_STUDIES' | 'PRICING' | 'FEATURES';

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  imageUrl?: string;
  isAiGenerated?: boolean;
}

export interface BusinessAuditResult {
  analysis: string;
  mapLink?: string;
  mapTitle?: string;
  heroImage?: string;
}
