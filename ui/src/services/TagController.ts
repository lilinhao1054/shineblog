import { request } from '@umijs/max';

export function addTags(tags: Tag[]) {
  return request<Result<Tag>>('/tag', {
    method: 'POST',
    data: tags,
  });
}

export function deleteTag(id: number) {
  return request<Result<any>>(`/tag/${id}`, {
    method: 'DELETE',
  });
}

export function getTags() {
  return request<Result<Tag[]>>('/tag', {
    method: 'GET',
  });
}

export function getTagPage(
  current: number,
  pageSize: number,
  name?: string,
  startTime?: Date,
  endTime?: Date,
) {
  return request<Result<Page<Tag>>>('/tag/page', {
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
