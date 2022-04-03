<template>
  <div>
    <div class="flex flex-row justify-between items-center gap-2 h-14 rounded-md">
      <div
        class="w-10 h-10 justify-center items-center flex text-sm p-2 cursor-pointer"
        @click="router.go(-1)"
      >
        <font-awesome-icon icon="arrow-left" class="w-full h-full" />
      </div>
      <div class="flex flex-row justify-center items-center gap-5">
        <div class="w-10 h-10 rounded-full">
          <img alt="" v-if="recipient" :src="recipient.picture" class="rounded-full" />
        </div>
        <div>
          <h1 v-text="recipient.username" v-if="recipient" class="font-semibold"></h1>
        </div>
      </div>

      <div class="flex justify-center items-center">
        <DotMenu></DotMenu>
      </div>
    </div>
    <div
      id="messageContainer"
      v-for="(message, index) in recipient.messages"
      :key="index"
      class="flex flex-col my-1"
      v-if="recipient"
    >
      <p
        v-if="message.from === userStore.currentUser.sub"
        v-text="message.content"
        class="rounded-xl bg-blue-500 px-2 text-white w-fit ml-auto"
      ></p>
      <p
        v-else
        v-text="message.content"
        class="rounded-xl bg-gray-500 px-2 text-white w-fit mr-auto"
      ></p>
    </div>
    <form
      class="h-14 absolute bottom-0 w-full flex justify-center items-center px-3 gap-1"
      @submit.prevent="onMessage"
    >
      <input
        type="text"
        class="input input-bordered w-auto h-5/6 input-sm rounded-full grow"
        placeholder="Send message"
        v-model="message"
      />
      <div
        class="bg-info text-white rounded-full flex justify-center items-center w-10 h-10"
        type="submit"
      >
        <font-awesome-icon icon="arrow-right" class="text-xl" />
      </div>
    </form>
  </div>
</template>

<script setup>
import { useUserStore } from "../store/users";
import { useRouter } from "vue-router";
import { socket } from "../socket";
import { ref, onMounted, computed, watch } from "vue";
import DotMenu from "../components/DotMenu.vue";

const recipient = ref(null);

onMounted(() => {
  if (activeUsers.value.length > 0) {
    getUser();
  }
});
const userStore = useUserStore();

const router = useRouter();

const message = ref("");

const activeUsers = computed(() => {
  return userStore.activeUsers;
});

watch(activeUsers, (newVal) => {
  getUser();
});

const getUser = () => {
  const userId = localStorage.getItem("recipientID");

  if (userId) {
    userStore.activeUsers.forEach((user) => {
      if (user.userId === userId) {
        console.log("Found User", user.username);
        recipient.value = user;
        userStore.selectedUser = user;
      }
    });
  }
};

const onMessage = () => {
  if (userStore.selectedUser) {
    const content = message.value;
    socket.emit("private message", {
      from: userStore.currentUser.sub,
      content,
      to: userStore.selectedUser.userId,
    });
    userStore.selectedUser.messages.push({
      content,
      from: userStore.currentUser.sub,
      to: userStore.selectedUser.userId,
    });
    message.value = "";
  }
};

socket.on("private message", ({ content, from }) => {
  userStore.activeUsers.forEach((user) => {
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
  });
});
</script>
