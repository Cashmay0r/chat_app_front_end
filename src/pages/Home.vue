<template>
  <div class="text-xl w-auto h-full flex flex-col">
    <div
      class="flex flex-col w-full justify-center items-center"
      v-if="userStore.currentUser"
    >
      <div class="h-14 flex flex-row justify-between items-center w-full">
        <h1 class="px-5">Messages</h1>
        <div class="w-12">
          <DotMenu></DotMenu>
        </div>
      </div>
      <div
        v-for="user in users"
        :key="user.userId"
        class="w-full flex flex-col justify-center items-center"
      >
        <li
          @click="openMessages(user)"
          class="flex flex-col bg-transparent rounded-xl px-2 my-2 w-[90%] h-16 justify-center items-start text-white hover:bg-[#4a5469] cursor-pointer"
        >
          <div class="flex flex-row justify-start items-start gap-2">
            <div class="w-12 h-12 rounded-full border border-hover-dark">
              <img alt="" v-if="user" :src="user.picture" class="rounded-full w-12" />
            </div>
            <div>
              <h1
                v-text="user.username"
                class="text-sm font-semibold"
                v-if="!user.self"
              ></h1>
              <h1
                v-text="user.username + ' (Yourself)'"
                class="text-sm font-semibold"
                v-if="user.self"
              ></h1>
              <div class="text-xs italic">
                <p v-if="user.messages.length <= 0">No messages</p>
                <p v-else v-text="user.messages[user.messages.length - 1].content"></p>
              </div>
            </div>
          </div>
        </li>
      </div>
    </div>

    <!-- <div class="w-10 h-10 bg-blue-400 fixed bottom-0 right-0 m-5 rounded-full"></div> -->
  </div>
</template>

<script setup>
import { socket, connectToSocket } from "../socket.js";
import { reactive, onUnmounted, ref, onMounted, watch, computed } from "vue";
import { useUserStore } from "../store/users.js";
import { useRouter } from "vue-router";
import DotMenu from "@/components/DotMenu.vue";

const userStore = useUserStore();

const chat = reactive({
  user: null,
  state: false,
});

const router = useRouter();

const users = computed(() => {
  return userStore.activeUsers;
});

onMounted(() => {
  if (userStore.isLoggedIn) {
    connectToSocket();
  }
});

const openMessages = (user) => {
  userStore.setSelectedUser(user);
  router.push({ name: "Chat" });
};

const recipient = computed(() => {
  return userStore.selectedUser;
});

const activeUsers = computed(() => {
  return userStore.activeUsers;
});

socket.on("private message", ({ content, from }) => {
  console.log("Got a private message");
  console.log(content, from);
  for (let i = 0; i < activeUsers.value.length; i++) {
    console.log("In loop", activeUsers.value[i]);
    if (activeUsers.value[i].userId === from) {
      console.log("Pushing Message", content);
      activeUsers.value[i].messages.push({
        content,
        fromSelf: false,
      });
      break;
    }
  }
  /* userStore.activeUsers.forEach((user) => {
    if (user.userId === from) {
      console.log("Pushing Message", content);
      user.messages.push({
        content,
        fromSelf: false,
      });
      if (user !== userStore.selectedUser) {
        user.hasNewMessages = true;
      }
    }
  }); */
});
</script>
