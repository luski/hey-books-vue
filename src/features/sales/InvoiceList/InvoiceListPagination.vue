<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-vue-next';

interface Props {
  page: number;
  totalPages: number;
}
const { page, totalPages } = defineProps<Props>();

const emit = defineEmits<{
  nextPage: [];
  previousPage: [];
}>();
</script>

<template>
  <nav
    class="flex items-center gap-2 border-y border-neutral-200 px-6 py-4 dark:border-neutral-800"
  >
    <div class="mr-auto text-sm text-neutral-500">Page {{ page }} of {{ totalPages }}</div>
    <Button
      data-testid="button-previous"
      variant="outline"
      @click="emit('previousPage')"
      :disabled="page <= 1"
      ><ChevronLeft
    /></Button>
    <Button
      data-testid="button-next"
      variant="outline"
      @click="emit('nextPage')"
      :disabled="page >= totalPages"
      ><ChevronRight
    /></Button>
  </nav>
</template>
