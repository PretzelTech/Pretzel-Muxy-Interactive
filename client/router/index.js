import Vue from 'vue'
import Router from 'vue-router'
import Overlay from '../views/Overlay'
import Panel from '../views/Panel'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Overlay
    },
    {
      path: '/panel',
      component: Panel
    }
  ]
})
