<script setup lang="ts">
import useRequest from "@/composable/useRequest";
import type { Advice } from "@/types/advice";
import { computed } from "vue";
import LoadingSpinner from "../Common/LoadingSpinner/LoadingSpinner.vue";
import AdviceDivider from "./AdviceDivider/AdviceDivider.vue";
import AdviceContent from "./AdviceContent/AdviceContent.vue";
import DiceButton from "./DiceButton/DiceButton.vue";
import ErrorMessage from "../Common/ErrorMessage/ErrorMessage.vue";

const {
  data: advice,
  error,
  loading,
  refetch,
} = useRequest<Advice>("https://api.adviceslip.com/advice");

const componentToShow = computed(() => {
  if (loading.value) {
    return { component: LoadingSpinner };
  } else if (error.value) {
    return { component: ErrorMessage, props: { msg: error.value } };
  }
  return { component: AdviceContent, props: { advice: advice.value } };
});
</script>

<template>
  <div class="advice-container">
    <component
      :is="componentToShow.component"
      v-bind="componentToShow.props"
    ></component>
    <AdviceDivider />
    <DiceButton :action="refetch" :disabled="loading" />
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
</style>
