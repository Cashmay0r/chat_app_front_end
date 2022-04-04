<template>
  <div class="flex flex-col h-screen">
    <div class="flex flex-row justify-between items-center gap-2 h-14 rounded-md">
      <div
        class="w-10 h-10 justify-center items-center flex text-sm p-2 cursor-pointer"
        @click="router.go(-1)"
      >
        <font-awesome-icon icon="arrow-left" class="w-full h-full" />
      </div>
      <div class="flex flex-row justify-center items-center gap-5">
        <div>
          <h1 class="font-semibold">Account</h1>
        </div>
      </div>

      <div class="flex justify-center items-center">
        <DotMenu></DotMenu>
      </div>
    </div>
    <div class="flex flex-col justify-between items-center mt-10 h-full w-full">
      <div class="flex flex-col justify-center items-center gap-1 h-auto">
        <img :src="currentUser.picture" alt="" class="rounded-full" />
        <h1
          v-text="currentUser.given_name + ' ' + currentUser.family_name"
          class="text-xl font-semibold"
        ></h1>
        <p v-text="currentUser.email" class="text-xs italic"></p>
      </div>
      <div class="flex h-auto mb-20">
        <button @click="logoutUser" class="btn btn-error btn-wide">Logout</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from "@/store/users";
import { computed } from "vue";
import { useRouter } from "vue-router";
import DotMenu from "@/components/DotMenu.vue";
import { useAuth0 } from "@auth0/auth0-vue";
const { logout } = useAuth0();
const userStore = useUserStore();

const router = useRouter();

const currentUser = computed(() => {
  return userStore.currentUser;
});

const logoutUser = async () => {
  logout({ returnTo: window.location.origin });
};
</script>
