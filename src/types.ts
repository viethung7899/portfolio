export type ProjectFrontMatter = {
  title: string;
  github?: string;
  demo?: string;
  imageURL?: string;
  important?: boolean;
}

export type PostFrontMatter = {
  title: string;
  date: Date;
  slug: string;
}