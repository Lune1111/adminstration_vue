import Vue from 'vue'
import VueRouter from 'vue-router'
import userMessage from "@/views/userMessage";
import userHome from "@/views/userHome";
import userLogin from "@/views/userLogin";
import App from "@/App"

Vue.use(VueRouter)

export default new VueRouter({
  routes:[
    {
      path:'/',
      component:App,
    },
    {
      path:'/user',
      name:'user',
      component:userMessage
    },
    {
      path:'/home',
      name:userHome,
      component:userHome
    },
    {
      path:'/login',
      component:userLogin
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
