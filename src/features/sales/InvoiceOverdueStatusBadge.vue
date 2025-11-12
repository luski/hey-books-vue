<script setup lang="ts">
import { useAttrs } from 'vue';
import { twMerge } from 'tailwind-merge';
import { Badge } from '@/components/ui/badge';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
</script>

<template>
  <Badge variant="destructive" :class="twMerge('bg-red-700 dark:bg-red-400', attrs.class as string)"
    >overdue</Badge
  >
</template>
