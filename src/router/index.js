import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LoginPage from '../components/LoginPage'
import RegisterPage from '../components/RegisterPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/loginPage',
      name: 'LoginPage',
      component: LoginPage
    }, {
      path: '/registerPage',
      name: 'RegisterPage',
      component: RegisterPage
    }
  ]
})
