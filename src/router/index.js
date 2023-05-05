import Vue from 'vue'
import VueRouter from 'vue-router'
import userMessage from "@/views/userMessage";

Vue.use(VueRouter)

export default new VueRouter({
  routes:[
    {
      path:'/user',
      name:'user',
      component:userMessage
    }
  ]
})
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
