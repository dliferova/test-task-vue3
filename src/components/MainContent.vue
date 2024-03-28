<template>
  <div
    class="display-grid h-full"
    :class="{ 'two-columns-layout': appStore.isPanelOpened }"
  >
    <BasePanelComponent />
    <div class="pt-3 pr-4 pb-2 pl-4">
      <h1 class="text-xl font-bold m-0 mb-3">{{ appStore.data!.fqdn }}</h1>
      <SwitchViewElement
        label="Verbose view"
        @on-switch="appStore.updateSwitchValue"
      />
      <DataTable
        :data="appStore.data"
        :is-verbose-view="appStore.isVerboseView"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SwitchViewElement from '@/components/ui/SwitchViewComponent.vue'
import BasePanelComponent from '@/components/ui/BasePanelComponent.vue'
import DataTable from '@/components/DataTable.vue'
import { useAppStore } from '@/store/appStore'

const appStore = useAppStore()
</script>

<style scoped>
.two-columns-layout {
  grid-template-columns: 240px 1fr;
}
</style>
