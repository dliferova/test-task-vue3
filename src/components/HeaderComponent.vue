<template>
  <header class="header bg-primary shadow-4 pt-3 pb-3 pl-3 pr-3">
    <nav>
      <ul class="flex flex-row justify-content-between align-items-center">
        <li class="flex flex-row align-items-center">
          <div class="mr-2">
            <Button
              icon="pi pi-bars"
              @click="appStore.togglePanel()"
              aria-label="Toggle left panel"
            />
          </div>
          <p class="m-0 text-white text-lg font-bold">Ferda</p>
        </li>
        <li>
          <Button
            class="font-bold uppercase"
            label="Jan Musílek"
            icon="pi pi-user"
            @click="isDetailedUserInfoModalVisible = true"
          />
        </li>
      </ul>
    </nav>
  </header>
  <!-- Modal for detailed user info -->
  <Dialog
    v-model:visible="isDetailedUserInfoModalVisible"
    header="User"
    :style="{ width: '25rem' }"
    position="topright"
  >
    <div class="flex flex-row align-items-center border-bottom-1 border-bluegray-100 pb-2">
      <Button
        icon="pi pi-user"
        severity="info"
        rounded
        outlined
        aria-label="Jan Musílek"
        disabled
      />
      <div class="flex flex-column ml-3">
        <span class="text-color">Jan Musilek</span>
        <span class="text-500">admin</span>
      </div>
    </div>
    <div class="pt-4 pb-2">
      <Button disabled label="Logout" icon="pi pi-sign-out" />
    </div>
  </Dialog>
  <!-- Modal for detailed user info -->
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/appStore'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { ref } from 'vue'

const appStore = useAppStore()
const isDetailedUserInfoModalVisible = ref(false)
</script>

<style scoped></style>
