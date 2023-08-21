interface Article {
  id?: number;
  title: string;
  content: string;
  cover: File;
  category: Category;
  tags: Tag[];
  abstract?: string;
  pubTime?: string;
  pageView: number;
}

interface ArticleSaveDto {
  id?: number;
  title: string;
  content: string;
  cover: File;
  categoryId: number;
  tagIds: number[];
  abstract?: string;
}

interface RoughArticle {
  id: number;
  title: string;
}

interface AdjacentArticle {
  prev: RoughArticle;
  next: RoughArticle;
}
