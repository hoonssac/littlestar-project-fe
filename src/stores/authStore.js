import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, // 유저 객체 전체를 저장
    isLoggedIn: false,
  }),

  actions: {
    login(user) {
      this.user = user;
      this.isLoggedIn = true;
    },
    logout() {
      this.user = null;
      this.isLoggedIn = false;
    },
  },
});
