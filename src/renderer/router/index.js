import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'landingPage',
    component: require('@/components/LandingPage').default
  },
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/visualKeyboard',
    name: 'visualKeyboard',
    component: require('@/components/VisualKeyboard/VisualKeyboard').default
  },
  {
    path: '/typefast',
    name: 'typefast',
    component: require('@/components/Typefast').default
  },
  {
    path: '/about',
    name: 'about',
    component: require('@/components/About').default
  },
  {
    path: '/highScores',
    name: 'highScores',
    component: require('@/components/HighScores').default
  }
  ]
})
