<template>
  <div class="dropdown dropdown-end w-full h-auto">
    <div
      tabindex="0"
      class="m-1 flex flex-col justify-evenly items-center p-5 gap-1 cursor-pointer rounded-xl w-10 h-auto hover:scale-105 transform duration-200"
    >
      <span class="h-1 w-1 bg-gray-400 rounded-full"></span>
      <span class="h-1 w-1 bg-gray-400 rounded-full"></span>
      <span class="h-1 w-1 bg-gray-400 rounded-full"></span>
    </div>
    <ul
      tabindex="0"
      class="dropdown-content menu p-2 shadow rounded-box w-52 bg-hover-dark"
    >
      <li @click="logoutUser"><a>Logout</a></li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
const { logout } = useAuth0();
const logoutUser = async () => {
  logout({ returnTo: window.location.origin });
};
</script>
