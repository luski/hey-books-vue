<script lang="ts" setup>
import { Spinner } from '@/components/ui/spinner';
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <Spinner class="size-10 stroke-neutral-600 dark:stroke-neutral-500" />
    <span class="text-lg text-neutral-600 dark:text-neutral-500">Please wait...</span>
  </div>
</template>
