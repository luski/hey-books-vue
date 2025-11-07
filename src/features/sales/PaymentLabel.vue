<template>
  <div class="flex items-center gap-4" data-testid="overdue-payments">
    <slot name="icon" />
    <span class="flex flex-row-reverse items-baseline gap-2 @min-lg:flex-col-reverse @min-lg:gap-0">
      <span class="text-xs"><slot name="label" /></span>
      <span class="mr-2 text-xl"><slot name="value" /></span>
    </span>
  </div>
</template>
