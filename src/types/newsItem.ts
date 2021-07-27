import { IconButtonProps } from "@material-ui/core";

export interface Comment {
  userEmail: string;
  value: string;
  articleId: string;
  _id: string;
  userImage: IconButtonProps;
}


export interface NewsItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  comments: Comment[];
}
