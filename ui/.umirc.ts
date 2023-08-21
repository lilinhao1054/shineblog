import { defineConfig } from '@umijs/max';

export default defineConfig({
  define: {
    'process.env.FILE_SERVER': 'http://localhost:9090/shineblog/',
  },
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  npmClient: 'yarn',
  tailwindcss: {},
});
