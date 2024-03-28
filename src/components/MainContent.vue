<template>
  <div
    class="display-grid h-full"
    :class="{ 'two-columns-layout': appStore.isPanelOpened }"
  >
    <SidePanel />
    <div class="pt-3 pr-4 pb-2 pl-4">
      <h1 class="text-xl font-bold m-0 mb-3">{{ appStore.data!.fqdn }}</h1>
      <ViewSwitch
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
import ViewSwitch from '@/components/ui/ViewSwitch.vue'
import SidePanel from '@/components/ui/SidePanel.vue'
import DataTable from '@/components/DataTable.vue'
import { useAppStore } from '@/store/appStore'

const appStore = useAppStore()
</script>

<style scoped>
.two-columns-layout {
  grid-template-columns: 240px 1fr;
}
</style>
