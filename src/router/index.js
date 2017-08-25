import Vue from 'vue';
import Router from 'vue-router';
// import Hello from '@/components/Hello'

Vue.use(Router);
import foods from '@/components/foods/foods';
import ratings from '@/components/ratings/ratings';
import seller from '@/components/seller/seller';

// Vue.use(VueRouter);

Vue.config.productionTip = false;
const routes = [
  { path: '/', redirect: '/foods' },
  { path: '/foods', component: foods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
];

export default new Router({
  routes
});
