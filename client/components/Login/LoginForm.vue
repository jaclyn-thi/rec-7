<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import router from "../../router";

const username = ref("");
const password = ref("");
const { loginUser, updateSession } = useUserStore();

async function login() {
  await loginUser(username.value, password.value);
  await updateSession();
  // TODO 3: Once we log in, how can we update the currently logged in user and navigate to their profile?
  // Hint 1: Look at this file in the original starter code to see how we currently do this for 'Home'
  // Hint 2: Use "await" and NOT "void" when grabbing the logged in user to avoid a thread safety bug.
  // ---------------
  await updateSession();
  void router.push({ name: "Profile" });
  // ---------------
}
</script>

<template>
  <form class="pure-form pure-form-aligned" @submit.prevent="login">
    <h3>Login</h3>
    <fieldset>
      <div class="pure-control-group">
        <label for="aligned-name">Username</label>
        <input v-model.trim="username" type="text" id="aligned-name" placeholder="Username" required />
      </div>
      <div class="pure-control-group">
        <label for="aligned-password">Password</label>
        <input type="password" v-model.trim="password" id="aligned-password" placeholder="Password" required />
      </div>
      <div class="pure-controls">
        <button type="submit" class="pure-button pure-button-primary">Submit</button>
      </div>
    </fieldset>
  </form>
</template>

<style scoped>
h3 {
  display: flex;
  justify-content: center;
}
</style>
