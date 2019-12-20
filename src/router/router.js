import Vue from 'vue'
import Router from 'vue-router'
import {
  routerMode
} from '../config/env'
Vue.use(Router)
const Home = r => require.ensure([], () => r(require('@/pages/home/home')))
const Overview = r => require.ensure([], () => r(require('@/pages/overview/overview')))
const Business = r => require.ensure([], () => r(require('@/pages/business/business')))
const Logistics = r => require.ensure([], () => r(require('@/pages/logistics/logistics')))
const End = r => require.ensure([], () => r(require('@/pages/end/end')))
const People = r => require.ensure([], () => r(require('@/pages/people/people')))
const Environmental = r => require.ensure([], () => r(require('@/pages/environmental/environmental')))
const EHS = r => require.ensure([], () => r(require('@/pages/EHS/EHS')))
const Technology = r => require.ensure([], () => r(require('@/pages/technology/technology')))

export default new Router({
  mode: routerMode,
  routes: [{
      path: '/',
      redirect: '/home'
    },
    { // 首页
      path: '/home',
      name: 'Home',
      component: Home
    },
    { // 厂区一览
      path: '/overview',
      name: 'Overview',
      component: Overview
    },
    { // 业务管理
      path: '/business',
      name: 'Business',
      component: Business
    },
    { // 物流管理
      path: '/logistics',
      name: 'Logistics',
      component: Logistics
    },
    { // 处置工艺
      path: '/technology',
      name: 'Technology',
      component: Technology
    },
    { // EHS
      path: '/EHS',
      name: 'EHS',
      component: EHS
    },
    { // 人员管理
      path: '/people',
      name: 'People',
      component: People
    },
    { // 环保数据
      path: '/environmental',
      name: 'Environmental',
      component: Environmental
    },
    { // 尾页
      path: '/end',
      name: 'End',
      component: End
    }
  ]
})