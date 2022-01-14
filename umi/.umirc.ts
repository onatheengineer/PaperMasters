import { defineConfig } from 'umi';
import { SettingDrawer } from '@ant-design/pro-layout';

export default defineConfig({
  layout: {},
routes: [
  { path: '/', component: '@/pages/index' },
],
});

// export default defineConfig({
//   nodeModulesTransform: {
//     type: 'none',
//   },
//   routes: [
//     { path: '/', component: '@/pages/index' },
//   ],
//   fastRefresh: {},
// });
