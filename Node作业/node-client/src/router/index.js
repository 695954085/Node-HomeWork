import Vue from 'vue'
import Router from 'vue-router'
import DirList from '@/components/DirList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DirList',
      component: DirList

    }
  ]
})
