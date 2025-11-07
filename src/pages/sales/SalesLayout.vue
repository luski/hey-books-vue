<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ref, watchEffect } from 'vue';

type Tab = 'overview' | 'subscriptions' | 'invoices' | 'deposits';

const router = useRouter();
const initialTab = router.currentRoute.value.name!.toString().replace('sales-', '') as Tab;
const currentTab = ref<Tab>(initialTab);

const subpages = ['overview', 'subscriptions', 'invoices', 'deposits'];

watchEffect(() => {
  router.push({ name: `sales-${currentTab.value}` });
});
</script>

<template>
  <div class="-mx-6 border-b border-neutral-200 px-6 py-8 dark:border-neutral-800">
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
