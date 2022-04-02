<template>
  <div class="text-black text-xl w-auto h-full flex flex-col">
    <div
      class="flex flex-col w-full justify-center items-center"
      v-if="userStore.currentUser"
    >
      <div
        class="w-full h-12 bg-white flex justify-center items-center border-b border-black"
      >
        Messages
      </div>
      <div v-for="user in users" :key="user.userId" class="w-full">
        <li
          v-if="user.userId != userStore.currentUser.sub"
          @click="openMessages(user)"
          class="flex flex-col bg-transparent rounded-xl px-2 my-2 w-[95%] h-16 justify-center items-start text-white hover:bg-[#4a5469] cursor-pointer"
        >
          <div class="flex flex-row justify-start items-start gap-2">
            <div class="w-14 h-14 bg-black rounded-full">
              <img alt="" v-if="user" :src="user.picture" class="rounded-full" />
            </div>
            <div>
              <h1 v-text="user.username" class="text-xl font-semibold"></h1>
              <div class="text-sm italic">
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
import Chat from "@/pages/Chat.vue";
import { socket } from "../socket.js";
import { reactive, onUnmounted, ref, onMounted, watch, computed } from "vue";
import { useUserStore } from "../store/users.js";
import { useRouter } from "vue-router";

const userStore = useUserStore();

const chat = reactive({
  user: null,
  state: false,
});

const router = useRouter();

const users = computed(() => {
  return userStore.activeUsers;
});

const openMessages = (user) => {
  userStore.setSelectedUser(user);
  localStorage.setItem("recipientID", user.userId);
  router.push({ name: "Chat" });
};
</script>
