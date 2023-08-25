import { defineConfig } from '@umijs/max';

export default defineConfig({
  define: {
    'process.env.FILE_SERVER': 'http://123.57.39.98:9090/shineblog/',
    'process.env.API_SERVER': 'http://123.57.39.98:3000',
  },
});
