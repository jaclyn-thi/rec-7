<script setup lang="ts">
import { useSettingsStore } from "@/stores/settings";
import { ref } from "vue";

let blockee = ref("");
let unblockee = ref("");

const { blockUser, unblockUser } = useSettingsStore();

async function addBlock() {
  await blockUser(blockee.value);
  blockee.value = "";
}

async function removeBlock() {
  await unblockUser(unblockee.value);
  unblockee.value = "";
}
</script>

<template>
  <h2>Block/unblock users</h2>
  <form @submit.prevent="addBlock" class="pure-form">
    <fieldset>
      <legend>Block a user</legend>
      <input type="text" placeholder="Username of user to block" v-model="blockee" required />
      <button type="submit" class="pure-button pure-button-primary">Block user</button>
    </fieldset>
  </form>

  <form @submit.prevent="removeBlock" class="pure-form">
    <fieldset>
      <legend>Unblock a user</legend>
      <input type="text" placeholder="Username of user to unblock" v-model="unblockee" required />
      <button type="submit" class="pure-button pure-button-primary">Unblock user</button>
    </fieldset>
  </form>
</template>
