import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { worker } from './mocks/browser'

const app = createApp(App)

app.use(router)

worker.start().then(() => {
  app.mount('#app')
})
