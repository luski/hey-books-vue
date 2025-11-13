<script lang="ts" setup>
import BackdropView from '@/components/BackdropView.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  isLoading?: boolean;
}

const { isLoading } = defineProps<Props>();
</script>

<template>
  <Card
    class="@container/card-viewport relative min-h-80 drop-shadow-md @max-4xl/invoices-viewport:rounded-none @4xl/invoices-viewport:m-6"
  >
    <BackdropView :show="isLoading">
      <LoadingSpinner>Loading invoice details...</LoadingSpinner>
    </BackdropView>
    <CardContent
      ><div class="mt-32 grid place-content-center italic"><slot /></div
    ></CardContent>
  </Card>
</template>
