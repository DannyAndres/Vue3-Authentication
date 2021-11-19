import { createApp } from 'vue';
import App from './App.vue';
// router
import store from '@/store';

// router validation per route

createApp(App)
  .use(store)
  .mount('#app');
