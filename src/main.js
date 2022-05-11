import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import './index.css'
import srpc from './srpc.js'
srpc('https://matrix.yzzx.org/srpc')

import testSrpc from './utils/test-srpc.js'
window.srpc = testSrpc

createApp(App).use(router).mount('#app')
