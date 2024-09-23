<script setup lang="ts">
import type { Advice } from "@/types/advice";

defineProps<{
  advice: Advice;
}>();
</script>

<template>
  <p class="advice-id">ADVICE #{{ advice.slip.id }}</p>
  <p class="advice-text">“{{ advice.slip.advice }}”</p>
</template>

<style scoped>
.advice-id {
  color: var(--neon-green);
  font-weight: bold;
  font-weight: 800;
  font-size: 0.75rem;
  letter-spacing: 3px;
}

.advice-text {
  font-size: 28px;
  font-weight: 800;
  color: var(--light-cyan);
  text-align: center;
}
</style>
