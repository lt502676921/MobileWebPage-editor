<script lang="ts" setup>
import type { PropType } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { useUserStore } from "../stores/user";
import type { UserProps } from "../stores/user";
// import useCreateDesign from "../hooks/useCreateDesign";

defineProps({
  user: {
    type: Object as PropType<UserProps>,
    required: true,
  },
  // smMode: {
  //   type: Boolean,
  //   default: false,
  // },
});

const userStore = useUserStore();
const router = useRouter();
// const createDesign = useCreateDesign();

const login = () => {
  userStore.login();
  message.success("登录成功", 2);
};

const logout = () => {
  userStore.logout();
  message.success("退出登录成功，2秒后跳转到首页", 2);
  setTimeout(() => {
    router.push("/");
  }, 2000);
};
</script>

<template>
  <a-button
    type="primary"
    v-if="!user.isLogin"
    class="user-profile-component"
    @click="login"
  >
    <!-- <router-link to="/login"> -->
    登录
    <!-- </router-link> -->
  </a-button>
  <div :class="{ 'user-operation': !smMode }" v-else>
    <!-- <a-button type="primary" @click="createDesign" v-if="!smMode">
      创建设计
    </a-button> -->
    <!-- <a-button type="primary" class="user-profile-component" v-if="!smMode">
      <router-link to="/mywork">我的作品</router-link>
    </a-button> -->
    <a-dropdown-button class="user-profile-component">
      <router-link to="/setting">{{ user.userName }}</router-link>
      <template v-slot:overlay>
        <a-menu class="user-profile-dropdown">
          <!-- <a-menu-item key="2" v-if="smMode">
            <router-link to="/mywork">我的作品</router-link>
          </a-menu-item> -->
          <!-- <a-menu-item key="3">
            <router-link to="/setting">个人设置</router-link>
          </a-menu-item> -->
          <a-menu-item key="0" @click="logout">登出</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown-button>
  </div>
</template>

<style>
.user-profile-dropdown {
  border-radius: 2px !important;
}
.user-operation > * {
  margin-left: 30px !important;
}
</style>
