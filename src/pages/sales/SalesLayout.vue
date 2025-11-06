<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ref, watchEffect } from 'vue';

type Tab = 'overview' | 'subscriptions' | 'invoices' | 'deposits';

const currentTab = ref<Tab>('overview');

const subpages = ['overview', 'subscriptions', 'invoices', 'deposits'];
const router = useRouter();

watchEffect(() => {
  router.push({ name: `sales-${currentTab.value}` });
});
</script>

<template>
  <div class="border-b border-neutral-300 pt-8 pb-6">
    <Tabs default-value="account" class="w-[400px]" v-model="currentTab">
      <TabsList>
        <TabsTrigger v-for="page in subpages" :key="page" :value="page" class="capitalize">{{
          page
        }}</TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
  <RouterView />
</template>
