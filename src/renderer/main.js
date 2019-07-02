import Vue from 'vue'
import App from './App'
import router from './router'
<<<<<<< HEAD
// Translation of the application
=======
>>>>>>> 12c00afb931b83960827779cbe29cead80f2d8b3
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
