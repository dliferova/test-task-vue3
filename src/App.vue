<script setup lang="ts">
import HeaderElement from '@/components/HeaderElement.vue'
import DataTable from './components/DataTable.vue'
import { reactive } from 'vue'

const appState = reactive({
  isPanelHidden: true
})
</script>

<template>
  <HeaderElement />
  <main class="main">
    <div
      class="main__layout"
      :class="{ 'main__layout--with-opened-panel': appState.isPanelHidden }"
    >
      <div class="panel bg-white" :class="{ hidden: !appState.isPanelHidden }">
        <p class="text-500 text-sm font-semibold uppercase pt-2 pr-0 pb-2 pl-2 m-0">Applications</p>
        <div class="w-full bg-yellow-500 pt-2 pr-3 pb-2 pl-3">
          <div class="inline-flex align-items-baseline">
            <i class="pi pi-star text-lg mr-3 text-color" />
            <span class="text-sm text-700 font-semibold">Registry</span>
          </div>
        </div>
      </div>
      <DataTable />
    </div>
  </main>
</template>

<style scoped>
.main__layout {
  display: grid;
}

.main__layout--with-opened-panel {
  grid-template-columns: 20% 1fr;
}
</style>
