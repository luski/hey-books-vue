<script setup lang="ts">
interface Props {
  show: boolean;
}
const { show } = defineProps<Props>();
</script>

<template>
  <transition>
    <div
      v-if="show"
      class="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/80 dark:bg-black/80"
    >
      <slot />
    </div>
  </transition>
</template>
