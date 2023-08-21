import { request } from '@umijs/max';

export function getSetting() {
  return request<Result<Setting>>('/setting', {
    method: 'GET',
  });
}

export function saveSetting(setting: Setting) {
  return request<Result<any>>('/setting', {
    method: 'PATCH',
    data: setting,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
