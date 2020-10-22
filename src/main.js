import Vue from 'vue'
import App from './App.vue'
import { initialize } from './state'

Vue.config.productionTip = false

initialize()

new Vue({
    render: h => h(App)
}).$mount('#app')
