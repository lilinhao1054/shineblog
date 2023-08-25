import { defineConfig } from '@umijs/max';

export default defineConfig({
  define: {
    'process.env.FILE_SERVER': 'http://localhost:9090/shineblog/',
    'process.env.API_SERVER': 'http://localhost:3000',
  },
});
