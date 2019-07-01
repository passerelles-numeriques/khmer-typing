import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'landing-page',
    component: require('@/components/LandingPage').default
  },
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/visual-keyboard',
    name: 'visual-keyboard',
    component: require('@/components/VisualKeyboard/VisualKeyboard').default
  },
  {
    path: '/typefast',
    name: 'typefast',
    component: require('@/components/Typefast/Typefast').default
  },
  {
    path: '/about',
    name: 'about',
    component: require('@/components/About').default
  }
  ]
})
