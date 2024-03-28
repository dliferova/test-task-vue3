<template>
  <main class="main">
    <template v-if="appStore.isPageDataLoading">
      <PageLoader />
    </template>
    <template v-else>
      <template v-if="appStore.data === null">
        <ErrorMessage />
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
import PageLoader from '@/components/ui/PageLoader.vue'
import ErrorMessage from '@/components/ui/ErrorMessage.vue'
import MainContent from '@/components/MainContent.vue'

const appStore = useAppStore()
onMounted(appStore.fetchData)
</script>
