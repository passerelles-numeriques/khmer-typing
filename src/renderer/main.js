import Vue from 'vue'
import App from './App'
import router from './router'
import vmodal from 'vue-js-modal'
import VueI18n from 'vue-i18n'
import { messages } from './i18n-messages.js'

Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(vmodal, { dialog: true })

const i18n = new VueI18n({
  locale: 'km', // set locale
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
