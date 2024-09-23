<script setup lang="ts">
defineProps<{
  msg: string;
}>();
</script>

<template>
  <p class="error-msg">{{ msg }}</p>
</template>

<style scoped>
.error-msg {
  font-size: 28px;
  font-weight: 800;
  color: red;
  text-align: center;
}
</style>
