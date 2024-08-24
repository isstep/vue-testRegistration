import { createRouter, createWebHistory } from 'vue-router';
import Cookies from 'js-cookie';
import UserProfile from '@/components/UserProfile.vue';

const routes = [
  {
    path: '/profile',
    component: UserProfile,
    beforeEnter: (to, from, next) => {
      const user = Cookies.get('user');
      if (user) {
        next();
      } else {
        next('/login');
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
