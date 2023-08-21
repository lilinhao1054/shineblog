import { request } from '@umijs/max';

export function addCategory(category: Category) {
  return request<Result<Category>>('/category', {
    method: 'POST',
    data: category,
  });
}

export function deleteCategory(id: number) {
  return request<Result<any>>(`/category/${id}`, {
    method: 'DELETE',
  });
}

export function getCategories() {
  return request<Result<Category[]>>('/category', {
    method: 'GET',
  });
}

export function getCategoryPage(
  current: number,
  pageSize: number,
  name?: string,
  startTime?: Date,
  endTime?: Date,
) {
  return request<Result<Page<Category>>>('/category/page', {
    method: 'GET',
    params: {
      current,
      pageSize,
      name,
      startTime,
      endTime,
    },
  });
}
