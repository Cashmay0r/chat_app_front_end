<template>
  <div class="w-full">
    <div class="w-full flex flex-col justify-center items-center mt-10 gap-3">
      <div>
        <img src="" alt="" />
      </div>
      <button
        class="btn btn-info btn-wide"
        @click="router.push('/home')"
        v-if="!userStore.isLoggedIn"
      >
        Enter
      </button>
      <div v-if="userStore.isLoggedIn" class="flex flex-col gap-2">
        <button class="btn btn-info btn-wide" @click="loginUser">Login</button>
        <button @click="logoutUser" class="btn btn-error btn-wide">Logout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted, watch } from "vue";
import { useUserStore } from "@/store/users.js";
import { useRouter } from "vue-router";
import { useAuth0 } from "@auth0/auth0-vue";
const {
  loginWithRedirect,
  logout,
  user,
  isAuthenticated,
  isLoading,
  loginWithPopup,
} = useAuth0();

const router = useRouter();

const userStore = useUserStore();

const loginUser = async () => {
  //loginWithRedirect();
  loginWithPopup();
};

const logoutUser = async () => {
  logout({ returnTo: window.location.origin });
};
</script>
