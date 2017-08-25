// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// import VueRouter from 'vue-router';

// import foods from '@/components/foods/foods';
// import ratings from '@/components/ratings/ratings';
// import seller from '@/components/seller/seller';

// Vue.use(VueRouter);

// Vue.config.productionTip = false;
// const routes = [
//   { path: '/', redirect: '/foods' },
//   { path: '/foods', component: foods },
//   { path: '/ratings', component: ratings },
//   { path: '/seller', component: seller }
// ];

// const router = new VueRouter({
//   routes // （缩写）相当于 routes: routes
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
