<script setup>
import { socket, connectToSocket } from "./socket";
import { useUserStore } from "@/store/users.js";
import { ref, onUnmounted, onMounted, computed, watch } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
const { user, isAuthenticated } = useAuth0();

const userStore = useUserStore();

socket.on("session", ({ sessionID, userId }) => {
  console.log("Checking session");
  socket.auth.sessionID = sessionID;

  localStorage.setItem("sessionID", sessionID);

  socket.userId = userId;
});

socket.on("connect error", (err) => {
  if (err.message === "invalid username") {
    console.log("Invalid username");
  }
});

onUnmounted(() => {
  socket.off("connect_error");
});

console.log(useAuth0());
const currentUser = computed(() => {
  if (user.value === undefined) {
    return null;
  }
  userStore.setCurrentUser(user.value);
  return user.value;
});

const userState = computed(() => {
  return isAuthenticated.value;
});

watch(currentUser, async (newVal) => {
  console.log("Value changed", newVal);
  userStore.setCurrentUser(newVal);
});

watch(userState, async (newVal) => {
  console.log("Value changed", newVal);
  userStore.changeLoggedInState(newVal);
});

onMounted(async () => {
  userStore.setCurrentUser(user.value);
  userStore.changeLoggedInState(isAuthenticated.value);
});

socket.on("connect", () => {
  userStore.activeUsers.forEach((user) => {
    if (user.self) {
      user.connected = true;
    }
  });
});

socket.on("disconnect", () => {
  userStore.activeUsers.forEach((user) => {
    if (user.self) {
      user.connected = false;
    }
  });
});

socket.on("user connected", (user) => {
  let exists = false;
  for (let i = 0; i < userStore.activeUsers.length; i++) {
    if (user.userId == userStore.activeUsers[i].userId) {
      userStore.activeUsers[i].connected = true;
      console.log("User already exists");
      exists = true;
      break;
    }
  }

  if (!exists) {
    initReactiveProperties(user);
  }
});
</script>

<template>
  <router-view></router-view>
</template>

<style></style>
