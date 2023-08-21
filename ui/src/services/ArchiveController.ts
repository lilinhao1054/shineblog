import { request } from '@umijs/max';

export function getArchive(current: number, pageSize: number) {
  return request<Result<Page<Archive>>>('/archive', {
    method: 'GET',
    params: {
      current,
      pageSize,
    },
  });
}
