<script setup lang="ts">
import { useAttrs } from 'vue';
import { twMerge } from 'tailwind-merge';
import { Badge } from '@/components/ui/badge';
import type { InvoiceStatus } from '@/domain/types';

interface Props {
  status: InvoiceStatus;
}
defineOptions({ inheritAttrs: false });
const { status } = defineProps<Props>();
const attrs = useAttrs();
</script>

<template>
  <Badge
    variant="destructive"
    :class="twMerge('bg-red-700 dark:bg-red-400', attrs.class as string)"
    v-if="status === 'OVERDUE'"
  >
    {{ status }}
  </Badge>
</template>
