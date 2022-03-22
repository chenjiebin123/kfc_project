import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const DETAIL1 = ()=>import('../views/Detail.vue');
 
const routes = [
    //默认跳转页面
    {
      path:"/",
      redirect:"/home"
    },
    //登录页面
    {
      path:"/login",
      name:"Login",
      component: () => import ("../views/Login.vue")
    },
    //主界面
    {
      path:"/main",
      name:"Main",
      component: () => import ("../views/Main.vue"),
      children:[
        {
          path:"/home",
          name:"Home",
          component:()=>import('../views/Home.vue')
        },
        {
          path:"/shopbag",
          name:"Shopbag",
          component:()=>import('../views/Shopbag.vue')
        },
        {
          path:"/order",
          name:"Order",
          component:()=>import('../views/Order.vue')
        },
        {
          path:"/my",
          name:"My",
          component:()=>import('../views/My.vue')
        },
       
        
      ]
    },
    //详情页
    {
      path:"/detail",
      name:"Detail",
      component:DETAIL1
    },
    {
      path:"/addressedit",
      name:"AddressEdit",
      component:()=>import('../views/AddressEdit.vue')
    },
    {
      path:"/addresslist",
      name:"AddressList",
      component:()=>import('../views/AddressList.vue')
    },
    {
      path:"/submit",
      name:"Submit",
      component:()=>import('../views/Submit.vue')
    },
    {
      path:"/search",
      name:"Search",
      component:()=>import('../views/Search.vue')
    },
]

const router = new VueRouter({
  routes
})

export default router
