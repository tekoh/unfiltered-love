export type Post = {
  id: string;
  to: string;
  text: string;
  colour: string;
  createdAt: number;
  views?: number;
};

type APIPostError = {
  ok: false;
};

type APIPostSuccess = {
  ok: true;
  post: Post;
};

export type APIPost = APIPostSuccess | APIPostError;
