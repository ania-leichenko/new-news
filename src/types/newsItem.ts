export interface Comment {
  userEmail: string;
  value: string;
  articleId: string;
  _id: string;
  userImage: string;
}


export interface NewsItem {
  private _id: any;
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  comments: Comment[];
}
