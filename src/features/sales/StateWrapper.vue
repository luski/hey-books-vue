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
  <div>
    <slot name="loading" v-if="isLoading">
      <LoadingSpinner />
    </slot>
    <slot v-if="resource" :resource="resource" />
    <ErrorView v-if="error"><slot name="error" /></ErrorView>
    <slot name="placeholder" v-if="!isLoading && !error && !resource" />
  </div>
</template>
