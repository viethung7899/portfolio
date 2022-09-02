export type ProjectMeta = {
  title: string;
  github?: string;
  demo?: string;
  imageURL?: string;
  important?: boolean;
}

export type PostMeta = {
  title: string;
  date: Date;
  slug: string;
}