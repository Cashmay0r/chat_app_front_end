<script setup>
import { socket, connectToSocket } from "./socket";
import { useUserStore } from "@/store/users.js";
import { ref, onUnmounted, onMounted, computed, watch } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
const { user, isAuthenticated } = useAuth0();

const userStore = useUserStore();

socket.on("session", ({ sessionID, userId }) => {
  // Gets sessionID
  socket.auth.sessionID = sessionID;
  // Sets localStorage sesisonID item to received sessionID
  localStorage.setItem("sessionID", sessionID);
  //Sets current socket ID to receieved userId from saved session
  socket.userId = userId;
});

socket.on("connect error", (err) => {
  if (err.message === "invalid username") {
    console.log("Invalid username");
  }
});

onUnmounted(() => {
  socket.off("connect_error");
  socket.off("user disconnected");
  socket.off("user connected");
  socket.off("disconnect");
  socket.off("connect");
  socket.off("session");
});

// Deals with currentUser state
const currentUser = computed(() => {
  if (user.value === undefined) {
    return null;
  }
  userStore.setCurrentUser(user.value);
  return user.value;
});

watch(currentUser, async (newVal) => {
  userStore.setCurrentUser(newVal);
});

// Deals with isAuthenticated state
const userState = computed(() => {
  return isAuthenticated.value;
});

watch(userState, async (newVal) => {
  userStore.changeLoggedInState(newVal);
});

onMounted(() => {
  userStore.setCurrentUser(user.value);
  userStore.changeLoggedInState(isAuthenticated.value);
});

// On user connect
socket.on("connect", () => {
  userStore.activeUsers.forEach((user) => {
    if (user.self) {
      user.connected = true;
    }
  });
});

// On user disconnect
socket.on("disconnect", () => {
  userStore.activeUsers.forEach((user) => {
    if (user.self) {
      user.connected = false;
    }
  });
});

socket.on("user connected", (user) => {
  console.log(`${user.userId} has connected`);
  let exists = false;
  for (let i = 0; i < userStore.activeUsers.length; i++) {
    if (user.userId == userStore.activeUsers[i].userId) {
      userStore.activeUsers[i].connected = true;
      exists = true;
      break;
    }
  }

  if (!exists) {
    initReactiveProperties(user);
  }
});

socket.on("user disconnected", (id) => {
  console.log(`${id} has disconnected`);
  for (let i = 0; i < userStore.activeUsers.length; i++) {
    const user = userStore.activeUsers[i];
    if (user.userId === id) {
      user.connected = false;
      break;
    }
  }
});
</script>

<template>
  <router-view></router-view>
</template>

<style></style>
