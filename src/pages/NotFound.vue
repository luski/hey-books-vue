<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Squirrel } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';
</script>
<template>
  <div class="mx-auto grid max-w-md place-items-center gap-4 py-20 text-center">
    <Squirrel class="text-muted-foreground size-40" />
    <h1 class="mb-5 text-3xl font-bold">Not Found</h1>
    <p class="text-muted-foreground text-lg text-balance">
      The page you are looking for does not exist.
    </p>
    <Button variant="link"><RouterLink to="/">Go back to Home</RouterLink></Button>
  </div>
</template>
