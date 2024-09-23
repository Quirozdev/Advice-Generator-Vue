<script setup lang="ts">
import useRequest from "@/composable/useRequest";
import type { Advice } from "@/types/advice";
import { computed, ref, useTemplateRef } from "vue";
import LoadingSpinner from "../Common/LoadingSpinner/LoadingSpinner.vue";
import AdviceContent from "./AdviceContent/AdviceContent.vue";

const {
  data: advice,
  error,
  loading,
  refetch,
} = useRequest<Advice>("https://api.adviceslip.com/advice");

// need ref to get button height via offsetHeight to center it
// between the lower line of the container
const button = useTemplateRef("button");

const disabled = ref(false);

const componentToShow = computed(() => {
  if (loading.value) {
    return LoadingSpinner;
  } else if (advice.value) {
    return AdviceContent;
  }
  return "";
});

function onClick() {
  if (button.value) {
    disabled.value = true;
    setTimeout(() => {
      disabled.value = false;
    }, 2000);
  }

  refetch();
}
</script>

<template>
  <div class="advice-container">
    <component :is="componentToShow" v-bind="{ advice }"></component>
    <picture class="divider">
      <source
        media="(min-width: 500px)"
        srcset="../../assets/images/pattern-divider-desktop.svg"
      />
      <img src="../../assets/images/pattern-divider-mobile.svg" alt="Divider" />
    </picture>
    <button
      class="dice-btn"
      ref="button"
      :disabled="disabled"
      @click="onClick"
      :style="{ bottom: `-${(button?.offsetHeight || 2) / 2}px` }"
    >
      <img src="../../assets/images/icon-dice.svg" alt="Dice" />
    </button>
  </div>
</template>

<style scoped>
.advice-container {
  background-color: var(--dark-grayish-blue);
  padding: 2rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  position: relative;
}

.divider {
  margin-bottom: 1rem;
}

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
