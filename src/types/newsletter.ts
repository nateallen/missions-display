import { Missionary } from './missionary';

export interface Newsletter {
  id: string;
  missionaryId: string;
  title: string;
  description?: string;
  publishDate: Date;
  pdfUrl: string;
  thumbnailUrl?: string;
  fileSize: number;
  pageCount?: number;
  tags: string[];
  featured?: boolean;
}

export interface NewsletterWithMissionary extends Newsletter {
  missionary: Pick<Missionary, 'id' | 'fullName' | 'profilePhoto'>;
}
