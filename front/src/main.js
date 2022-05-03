import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import routes from '../src/routes'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({mode:'history',routes})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
