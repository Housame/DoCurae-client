import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/home/Login'
import Documentation from '@/pages/documentation/Documentation'
import Overview from '@/pages/overview/Overview'
import HslMain from '@/pages/documentation/hsl/HslMain'
import StartInfo from '@/pages/documentation/hsl/Generalinfo'
import SolMain from '@/pages/documentation/sol/SolMain'
import CarePlan from '@/pages/documentation/sol/CarePlan'
import SocialLogBook from '@/pages/documentation/sol/SocialLogBook'


Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        forVisitors: true,
      }
    },
    {
      path: '/',
      name: 'Overview',
      component: Overview,
      props: true,
      meta: {
        order:1,
        label: 'overview',
        root: true,
        forVisitors: false,
        forAuth: true,
      }
    },
    {
      path: '/docs',
      name: 'Documentation',
      component: Documentation,
      props: true,
      meta: {
        order:1,
        label: 'docs',
        root: true,
        forVisitors: false,
        forAuth: true,
      }
    },
    {
      path: '/hsl',
      name: 'Hsl',
      component: HslMain,
      props: true,
      meta: {
        parent:'docs',
        order:2,
        label: 'hslMain',
        root: true,
        forVisitors: false,
        forAuth: true,
      }
    },
    {
      path: '/hsl/startInfo',
      name: 'StartInfo',
      component: StartInfo,
      meta: {
        parent: 'hslMain',
        order:3,
        label: 'startInfo',
        forVisitors: false,
        forAuth: true,
      }
    },
    {
      path: '/sol',
      name: 'SolMain',
      component: SolMain,
      props: true,
      meta: {
        parent:'docs',
        order:2,
        label: 'solMain',
        root: true,
        forVisitors: false,
        forAuth: true,
      }
    },
    {
      path: '/sol/carePlan',
      name: 'CarePlan',
      component: CarePlan,
      meta: {
        parent: 'solMain',
        order:3,
        label: 'carePlan',
        forVisitors: false,
        forAuth: true,
      }
    },
    {
      path: '/sol/socialLogBook',
      name: 'SocialLogBook',
      component: SocialLogBook,
      meta: {
        parent: 'solMain',
        order:3,
        label: 'socialLogBook',
        forVisitors: false,
        forAuth: true,
      }
    },
  ]
})
