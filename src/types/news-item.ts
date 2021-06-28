export interface Comment {
  name: string;
  text: string;
}


export interface NewsItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  comments: Comment[];
}
