<script setup lang="ts" generic="T">
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorView from '@/components/ErrorView.vue';

interface Props {
  isLoading: boolean;
  error: Error | null;
  resource: T | null;
}

const { isLoading, error, resource } = defineProps<Props>();
</script>

<template>
  <div class="p-6">
    <slot name="loading" v-if="isLoading">
      <LoadingSpinner />
    </slot>
    <slot v-if="resource" :resource="resource" />
    <ErrorView v-if="error"><slot name="error" /></ErrorView>
  </div>
</template>
