import Vue from 'vue'
import Router from 'vue-router'
import cart from '@/components/cart'
import pay from '@/components/pay'
import addres from '@/components/addres'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'cart',
      component: cart,     
    },
    {
      path: '/pay',
      name: 'pay',
      component: pay,     
    },
     {
      path: '/addres',
      name: 'addres',
      component: addres,     
    },
  ]
})
