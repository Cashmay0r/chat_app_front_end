import {defineStore} from 'pinia';
import {connectToSocket} from '../socket';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    currentUser: null,
    isLoggedIn: false,
    activeUsers: [],
    allUsers: {},
    selectedUser: {},
  }),
  getters: {},
  actions: {
    async login() {
      loginWithRedirect();
      this.currentUser = user;
    },
    async logout() {
      logout({returnTo: window.location.origin});
      localStorage.removeItem('sessionID');
      this.currentUser = {user};
    },
    setCurrentUser(user) {
      const parsedUser = JSON.parse(JSON.stringify(user));
      this.currentUser = parsedUser;
    },
    setActiveUsers(users) {
      this.activeUsers = [users];
    },
    addActiveUser(user) {
      this.activeUsers.push(user);
    },
    setSelectedUser(user) {
      this.selectedUser = user;
    },
    changeLoggedInState(state) {
      this.isLoggedIn = state;
    },
  },
});
