<script lang="ts" setup>
import { BadgeAlert } from 'lucide-vue-next';
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <BadgeAlert class="size-10 stroke-red-700 dark:stroke-red-400" />
    <span class="text-lg text-neutral-600 dark:text-neutral-500"><slot /></span>
  </div>
</template>
