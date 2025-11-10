<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ref, watch } from 'vue';

type Tab = 'overview' | 'subscriptions' | 'invoices' | 'deposits';

const router = useRouter();
const route = useRoute();
const initialTab = router.currentRoute.value.name!.toString().replace('sales-', '') as Tab;
const currentTab = ref<Tab>(initialTab);

const subpages = ['overview', 'subscriptions', 'invoices', 'deposits'];

watch(
  () => currentTab.value,
  (tab) => {
    const target = `sales-${tab}`;
    if (route.name !== target) {
      router.replace({ name: target });
    }
  },
  { immediate: true },
);
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
