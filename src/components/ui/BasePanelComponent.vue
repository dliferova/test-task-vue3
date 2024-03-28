<template>
  <div
    class="panel bg-white animation-duration-300 animation-iteration-1"
    :class="{
      fadeinleft: appStore.isPanelOpened,
      hidden: !appStore.isPanelOpened
    }"
  >
    <p class="text-500 text-sm font-semibold uppercase pt-2 pr-0 pb-2 pl-2 m-0">Applications</p>
    <div class="w-full bg-yellow-500 pt-2 pr-3 pb-2 pl-3">
      <div class="inline-flex align-items-baseline">
        <i class="pi pi-star text-lg mr-3 text-color" />
        <span class="text-sm text-700 font-semibold">Registry</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/appStore'

const appStore = useAppStore()
</script>

<style scoped></style>
