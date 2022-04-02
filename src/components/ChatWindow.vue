<template>
  <div class="bg-white w-full h-full"></div>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
import { socket } from "@/socket.js";
import { useUserStore } from "@/store/users.js";
const message = ref("");

const userStore = useUserStore();
</script>
