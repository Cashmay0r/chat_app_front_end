<template>
  <div class="w-full">
    <div class="flex flex-col w-1/2 justify-center items-center m-auto gap-10">
      <!-- <form action="" class="flex flex-col w-full gap-2" @submit.prevent="login">
        <h1 class="text-xl font-bold">Login</h1>
        <div class="flex flex-col">
          <label for="">Email</label>
          <input
            type="text"
            placeholder="email"
            class="input input-bordered"
            v-model="loginDetails.email"
          />
          <label for="">Password</label>
          <input
            type="text"
            placeholder="password"
            class="input input-bordered"
            v-model="loginDetails.password"
          />
        </div>
        <div class="flex flex-col">
          <button class="btn btn-primary" type="submit">Login</button>
        </div>
      </form> -->
      <!-- <form action="" class="flex flex-col w-full gap-2" @submit.prevent="register">
        <h1 class="text-xl font-bold">Register</h1>
        <div class="flex flex-col">
          <label for="">Email</label>
          <input
            type="text"
            placeholder="email"
            class="input input-bordered"
            v-model="registerDetails.email"
          />
          <label for="">Password</label>
          <input
            type="text"
            placeholder="password"
            class="input input-bordered"
            v-model="registerDetails.password"
          />
        </div>
        <div class="flex flex-col">
          <button class="btn btn-primary" type="submit">Register</button>
        </div>
      </form> -->
    </div>
    <div class="w-full flex flex-row justify-center items-center mt-10">
      <button class="btn btn-primary" @click="loginUser">Login</button>

      <button @click="logoutUser" class="btn btn-primary">Logout</button>
    </div>
    <div v-if="isLoading" class="loading">
      <p>Loading User...</p>
    </div>
    <div v-if="isAuthenticated">
      {{ user }}
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted, watch } from "vue";
import { useUserStore } from "@/store/users.js";
import { useRouter } from "vue-router";
import { useAuth0 } from "@auth0/auth0-vue";
const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
const router = useRouter();

const userStore = useUserStore();

const loginUser = async () => {
  loginWithRedirect();
};

const logoutUser = async () => {
  logout({ returnTo: window.location.origin });
};
</script>
