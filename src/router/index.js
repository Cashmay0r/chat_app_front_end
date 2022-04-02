import {createRouter, createWebHistory} from 'vue-router';
import Home from '@/pages/Home.vue';
import Index from '@/pages/Index.vue';
import Chat from '@/pages/Chat.vue';
import {useUserStore} from '@/store/users';

const routes = [
  {
    path: '/',
    component: Index,
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/chat',
    component: Chat,
    name: 'Chat',
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();

  //userStore.setCurrentUser(user);
});

export default router;
