<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faReceipt, faDollar, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

const navigation = [
  { name: "Accounts", href: "/accounts", icon: faReceipt },
  { name: "Sales", href: "/sales", icon: faDollar },
  { name: "Expenses", href: "/expenses", icon: faMoneyBill },
];
</script>

<template>
  <main class="grid-cols-[min-content_1fr] grid min-h-screen">

    <aside class="w-64 border-r border-border bg-sidebar">
      <div class="border-b border-sidebar-border px-6 py-5">
        <h1 class="text-2xl font-bold text-sidebar-foreground">HeyBooks</h1>
      </div>
      <nav class="flex-1 space-y-1 px-3 py-4">
        <ul>
          <li v-for="item in navigation" :key="item.name">
            <RouterLink :to="item.href" :class="[
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
            ]" :exact-active-class="'bg-sidebar-accent text-sidebar-accent-foreground'">
              <FontAwesomeIcon :icon="item.icon" /> {{ item.name }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </aside>
    <div>
      <RouterView />
    </div>
  </main>
</template>
