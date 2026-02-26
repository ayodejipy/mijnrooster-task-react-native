export interface Publication {
  id: string;
  tags: string[];
  title: string;
  description: string;
  author: string;
  authorImage: string | number;
  date: string;
  readTime: string;
  imageBg: string | number;
  fallbackBg?: string;
  imageAccent: string;
}
