<script setup lang="ts">
import { ref } from 'vue';
import PageLayout from './PageLayout.vue';
import { BookOpen, DollarSign, Receipt, X, Moon, Sun } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { useColorMode } from '@vueuse/core';

const navigation = [
  { name: 'Accounts', href: '/accounts', icon: BookOpen },
  { name: 'Sales', href: '/sales', icon: DollarSign },
  { name: 'Expenses', href: '/expenses', icon: Receipt },
];

const sidebarOpen = ref(false);
const handleCloseSidebar = () => {
  sidebarOpen.value = false;
};
const colorMode = useColorMode();
</script>

<template>
  <div class="grid min-h-screen md:grid-cols-[min-content_1fr]">
    <aside
      class="border-border bg-sidebar fixed top-0 left-0 z-10 min-h-screen w-80 border-r transition-transform md:static md:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="border-sidebar-border flex items-center border-b py-5 pr-2.5 pl-6">
        <h1 class="text-sidebar-foreground mr-auto text-2xl font-bold">HeyBooks</h1>
        <Button variant="ghost" @click="colorMode = colorMode === 'light' ? 'dark' : 'light'">
          <component :is="colorMode === 'light' ? Moon : Sun" class="size-5" />
        </Button>
        <Button variant="ghost" @click="handleCloseSidebar" class="md:hidden">
          <X class="size-5" />
        </Button>
      </div>
      <nav class="flex-1 space-y-1 px-3 py-4">
        <ul>
          <li v-for="item in navigation" :key="item.name">
            <RouterLink
              @click="handleCloseSidebar"
              :to="item.href"
              :class="[
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
              ]"
              :active-class="'bg-sidebar-accent text-sidebar-accent-foreground'"
            >
              <component :is="item.icon" :size="20" /> {{ item.name }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </aside>
    <PageLayout @toggle-sidebar="sidebarOpen = !sidebarOpen">
      <RouterView />
    </PageLayout>
  </div>
</template>
