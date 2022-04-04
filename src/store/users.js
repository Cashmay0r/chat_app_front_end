import {defineStore} from 'pinia';
import {connectToSocket} from '../socket';
import {reactive, ref, watch} from 'vue';

export const useUserStore = defineStore('userStore', () => {
  const isLoggedIn = ref(false);
  const currentUser = ref(null);
  const activeUsers = ref([]);
  const selectedUser = ref({});

  const login = async () => {
    loginWithRedirect();
  };
  const logout = async () => {
    logout({returnTo: window.location.origin});
  };
  const setCurrentUser = (user) => {
    const parsedUser = user;
    currentUser.value = parsedUser;
  };
  const setActiveUsers = (users) => {
    activeUsers = [users];
  };
  const addActiveUser = (user) => {
    activeUsers.value.push(user);
  };
  const setSelectedUser = (user) => {
    selectedUser.value = user;
  };
  const changeLoggedInState = (state) => {
    console.log(state, isLoggedIn);
    isLoggedIn.value = state;
  };
  return {
    isLoggedIn,
    currentUser,
    activeUsers,
    selectedUser,
    login,
    logout,
    setCurrentUser,
    setActiveUsers,
    addActiveUser,
    setSelectedUser,
    changeLoggedInState,
  };
});
