import { request } from '@umijs/max';

export function getDashboardData() {
  return request<Result<Dashboard>>('/dashboard', {
    method: 'GET',
  });
}
