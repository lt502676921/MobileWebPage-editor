import { defineStore } from "pinia";
import type { GlobalDataProps } from "./index";

export interface UserProps {
  isLogin: boolean;
  userName?: string;
}

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: {
        isLogin: false,
        userName: "",
      },
    };
  },
  actions: {
    login() {
      this.user.isLogin = true;
      this.user.userName = "Gary";
    },
    logout() {
      this.user.isLogin = false;
    },
  },
});
