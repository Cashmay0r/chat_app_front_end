import {createRouter, createWebHistory} from 'vue-router';
import Home from '@/pages/Home.vue';
import Index from '@/pages/Index.vue';
import Chat from '@/pages/Chat.vue';
import {authGuard} from '@auth0/auth0-vue';

const routes = [
  {
    path: '/',
    component: Index,
  },
  {
    path: '/home',
    component: Home,
    beforeEnter: authGuard,
  },
  {
    path: '/chat',
    component: Chat,
    name: 'Chat',
    props: true,
    beforeEnter: authGuard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
