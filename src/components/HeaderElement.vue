<script setup lang="ts">
import { useAppStore } from '@/store/appStore'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { ref } from 'vue'

const appStore = useAppStore()
const togglePanel = () => {
  appStore.togglePanel()
}
const visible = ref(false)
</script>

<template>
  <header class="header bg-primary shadow-4 pt-3 pb-3 pl-3 pr-3">
    <nav>
      <ul class="flex flex-row justify-content-between align-items-center">
        <li class="flex flex-row align-items-center">
          <button class="burger-btn mr-3" @click="togglePanel">
            <i class="pi pi-list" style="color: white; font-size: 1.2rem"></i>
            <span class="visually-hidden">Control panel controller</span>
          </button>
          <p class="m-0 text-white text-lg font-bold">Ferda</p>
        </li>
        <li>
          <div class="user-info">
            <Button label="Jan Musilek" icon="pi pi-user" @click="visible = true" />
          </div>

          <Dialog
            v-model:visible="visible"
            header="User"
            :style="{ width: '25rem' }"
            position="topright"
          >
            <div class="flex flex-row align-items-center border-bottom-1 border-bluegray-100 pb-2">
              <i class="pi pi-user text-lg mr-4" />
              <div class="flex flex-column">
                <span class="mb-1">Jan Musilek</span>
                <span class="text-500">admin</span>
              </div>
            </div>
            <div class="pt-4 pb-2">
              <Button disabled label="Logout" icon="pi pi-sign-out" />
            </div>
          </Dialog>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.burger-btn {
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  cursor: pointer;
  border: none;
}
</style>
