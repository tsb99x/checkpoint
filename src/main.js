import Vue from 'vue'
import App from './App.vue'
import { initialize } from './state'
import 'normalize.css'

Vue.config.productionTip = false

initialize()

new Vue({
    render: h => h(App)
}).$mount('#app')
