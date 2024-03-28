<template>
  <main class="main">
    <template v-if="appStore.isPageDataLoading">
      <LoaderComponent />
    </template>
    <template v-else>
      <template v-if="appStore.data === null">
        <ErrorMessageComponent />
      </template>
      <template v-else>
        <MainContent />
      </template>
    </template>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAppStore } from '@/store/appStore'
import LoaderComponent from '@/components/ui/LoaderComponent.vue'
import ErrorMessageComponent from '@/components/ui/ErrorMessageComponent.vue'
import MainContent from '@/components/MainContent.vue'

const appStore = useAppStore()
onMounted(appStore.fetchData)
</script>
