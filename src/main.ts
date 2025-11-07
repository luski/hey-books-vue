import { createApp } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import App from './App.vue';
import router from './router';
import { worker } from './mocks/browser';
import './style.css';

const app = createApp(App);

app.use(VueQueryPlugin);
app.use(router);

worker
  .start({
    onUnhandledRequest: 'bypass',
  })
  .then(() => {
    app.mount('#app');
  });
