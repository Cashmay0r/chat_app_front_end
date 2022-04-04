<template>
  <div class="w-full flex flex-col h-screen">
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
    <div class="overflow-auto px-5 py-2 flex grow flex-col mb-14">
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
          class="rounded-xl bg-blue-500 px-2 py-1 text-white w-fit ml-auto"
        ></p>
        <p
          v-else
          v-text="message.content"
          class="rounded-xl bg-gray-500 px-2 py-1 text-white w-fit mr-auto"
        ></p>
      </div>
    </div>

    <form
      class="h-14 bottom-0 w-full flex justify-center items-center px-3 gap-1 py-1 fixed bg-base-100"
      @submit.prevent="onMessage"
    >
      <input
        type="text"
        class="input input-bordered w-auto h-5/6 input-sm rounded-full grow"
        placeholder="Send message"
        v-model="message"
        required
      />
      <button
        class="text-white rounded-full flex justify-center items-center w-10 h-10 bg-info"
        type="submit"
      >
        <font-awesome-icon icon="arrow-right" class="text-xl" />
      </button>
    </form>
  </div>
</template>

<script setup>
import { useUserStore } from "../store/users";
import { useRouter } from "vue-router";
import { socket } from "../socket";
import { ref, onMounted, computed, watch } from "vue";
import DotMenu from "../components/DotMenu.vue";

const recipient = computed(() => {
  return userStore.selectedUser;
});

const activeUsers = computed(() => {
  return userStore.activeUsers;
});
const userStore = useUserStore();

const router = useRouter();

const message = ref("");

const onMessage = () => {
  if (recipient.value) {
    const content = message.value;
    socket.emit("private message", {
      from: userStore.currentUser.sub,
      content,
      to: recipient.value.userId,
    });
    recipient.value.messages.push({
      content,
      from: userStore.currentUser.sub,
      to: recipient.value.userId,
    });
    message.value = "";
  }
};
</script>
