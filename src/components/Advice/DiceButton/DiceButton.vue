<script setup lang="ts">
import { useTemplateRef, ref } from "vue";

const props = defineProps<{
  action: () => void;
}>();
// need ref to get button height via offsetHeight to center it
// between the lower line of the container
const button = useTemplateRef("button");

const disabled = ref(false);

function onClick() {
  if (button.value) {
    disabled.value = true;
    // the api says that its going to return cached data if the request is made in a 2s time window
    setTimeout(() => {
      disabled.value = false;
    }, 2000);
  }

  props.action();
}
</script>

<template>
  <button
    class="dice-btn"
    ref="button"
    :disabled="disabled"
    @click="onClick"
    :style="{ bottom: `-${(button?.offsetHeight || 2) / 2}px` }"
  >
    <img src="../../../assets/images/icon-dice.svg" alt="Dice" />
  </button>
</template>

<style scoped>
.dice-btn {
  border: none;
  cursor: pointer;
  background-color: var(--neon-green);
  border-radius: 50%;
  padding: 1rem;
  position: absolute;
  transform: translateX(0, -50%);
  transition: filter 0.3s ease-in-out;
}

.dice-btn:hover:not(:disabled) {
  filter: drop-shadow(0 0 0.75rem var(--neon-green));
}

.dice-btn:disabled {
  background-color: var(--grayish-blue);
  cursor: auto;
}
</style>
