import { request } from '@umijs/max';

export function saveArticle(articleSaveDtoFormData: FormData) {
  return request<Result<any>>('/article', {
    method: 'POST',
    data: articleSaveDtoFormData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function deleteArticle(id: number) {
  return request<Result<any>>(`/article/${id}`, {
    method: 'DELETE',
  });
}

export function getArticles() {
  return request<Result<Article>>('/article', {
    method: 'GET',
  });
}

export function getArticlePageAdmin(
  current: number,
  pageSize: number,
  title?: string,
  startTime?: Date,
  endTime?: Date,
) {
  return request<Result<Page<Article>>>('/article/page', {
    method: 'GET',
    params: {
      current,
      pageSize,
      title,
      startTime,
      endTime,
    },
  });
}

export function getArticlePageWeb(
  current: number,
  pageSize: number,
  categoryId?: number,
  tagId?: number,
) {
  return request<Result<Page<Article>>>('/article/page', {
    method: 'GET',
    params: {
      current,
      pageSize,
      categoryId,
      tagId,
    },
  });
}

export function getArticleById(id: number) {
  return request<Result<Article>>(`/article/${id}`, {
    method: 'GET',
  });
}

export function getAdjacentArticleById(id: number) {
  return request<Result<AdjacentArticle>>(`/article/adjacent/${id}`, {
    method: 'GET',
  });
}
