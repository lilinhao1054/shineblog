import { request } from '@umijs/max';

export function login(user: User) {
  return request<{ access_token: string }>('/auth/login', {
    method: 'POST',
    data: user,
  });
}
