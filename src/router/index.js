import Vue from 'vue'
import Router from 'vue-router'

import AppIndex from "../components/home/AppIndex";
import Login from "../components/Login";
import Home from "../components/Home";
import BookIndex from "../components/common/book/BookIndex";
import Register from "../components/Register";
import ArticleEditor from "../components/common/blog/ArticleEditor";
import BlogIndex from "../components/common/blog/BlogIndex";
import ArticleDetails from "../components/common/blog/ArticleDetails";

Vue.use(Router)


export default new Router({
  mode:'history',
  routes:[
    {
      path:'/',
      name:'Default',
      redirect :'/login',
      component:Login,
      meta:{
        requireAuth:true
      }
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/register',
      name:'Register',
      component:Register
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children:[
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex,
          //在需要拦截的路由中添加一条元数据
          meta:{
            requireAuth:true
          }
        },
        {
          path: '/book',
          name: 'Book',
          component: BookIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/blog',
          name: 'BlogIndex',
          component: BlogIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/blog/article',
          name: 'ArticleEditor',
          component: ArticleEditor,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/blog/articleDetails',
          name: 'ArticleDetails',
          component: ArticleDetails,
          meta: {
            requireAuth: true
          }
        }
      ]
    }
  ]
})

