<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-vue-next';

defineEmits<{
  (e: 'toggle-sidebar'): void;
}>();

const route = useRoute();
</script>

<template>
  <main class="px-6 py-4">
    <header class="flex items-center gap-2">
      <Button variant="ghost" class="md:hidden" @click="$emit('toggle-sidebar')">
        <Menu class="size-5" />
      </Button>
      <h1 class="text-foreground text-2xl font-bold md:text-4xl">
        {{ route.meta.title }}
      </h1>
    </header>
    <slot />
  </main>
</template>
