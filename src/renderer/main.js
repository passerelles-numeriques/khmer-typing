import Vue from 'vue'
import App from './App'
import router from './router'
// Translation of the application
import VueI18n from 'vue-i18n'
import {messages} from './i18n-messages.js'

// Service worker for Progressive Web Application
if (typeof process.env.BASE_URL === 'undefined') process.env.BASE_URL = './'
if (process.env.IS_WEB) import('../registerServiceWorker.js')

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en', // set locale
  messages // set locale messages
})

/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  router,
  i18n,
  template: '<App/>'
}).$mount('#app')
