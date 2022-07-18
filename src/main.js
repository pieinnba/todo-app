import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import inpt from '@/components/ui/inpt.vue'
import btn from '@/components/ui/btn.vue'

const app = createApp(App)

app
  .component('inpt', inpt)
  .component('btn', btn)
app.use(router)
app.mount('#app')
