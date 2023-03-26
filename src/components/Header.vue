<script setup lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
</script>

<template>
  <div>
    <div class="container py-5">
      <nav class="flex flex-row gap-3">
        <RouterLink
          to="/"
          class="rounded-full bg-blue-500 px-3 py-1 font-bold text-white shadow hover:bg-blue-700"
          >ホーム</RouterLink
        >
        <RouterLink
          to="/about"
          class="rounded-full bg-blue-500 px-3 py-1 font-bold text-white shadow hover:bg-blue-700"
          >内訳表</RouterLink
        >
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Header',
});
</script>
