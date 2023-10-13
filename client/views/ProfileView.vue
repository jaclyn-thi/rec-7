<script setup lang="ts">
import PostListOwn from "@/components/Post/PostListOwn.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
// import PostListOwn from "../components/Post/PostListOwn.vue";

const { currentUsername } = storeToRefs(useUserStore());
const { updateSession } = useUserStore();

void updateSession();
</script>

<template>
  <main>
    <h1>{{ currentUsername }}</h1>
    <PostListOwn />
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
