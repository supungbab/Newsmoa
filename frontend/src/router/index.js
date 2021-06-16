import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Detail from '../views/NewsDetail.vue'
import MyPage from '../views/MyPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true
  },
  {
    path: '/',
    name: 'Category1',
    component: Home,
    props: true
  },
  {
    path: '/',
    name: 'Category2',
    component: Home,
    props: true
  },
  {
    path: '/',
    name: 'Category3',
    component: Home,
    props: true
  },
  {
    path: '/',
    name: 'Category4',
    component: Home,
    props: true
  },
  {
    path: '/',
    name: 'Category5',
    component: Home,
    props: true
  },
  {
    path: '/',
    name: 'Category6',
    component: Home,
    props: true
  },
  {
    path: '/detail/:index',
    name: 'Detail',
    component: Detail
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/myPage',
    name: 'MyPage',
    component: MyPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
