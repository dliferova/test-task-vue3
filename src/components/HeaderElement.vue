<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <header class="header bg-primary shadow-4 pt-4 pb-4 pl-3 pr-3">
    <nav>
      <ul class="flex flex-row justify-content-between align-items-center">
        <li class="flex flex-row align-items-center">
          <button class="burger-btn mr-3" @click="count++">
            <i class="pi pi-list" style="color: white; font-size: 1.2rem"></i>
            <span class="visually-hidden">Control panel controller</span>
          </button>
          <p class="m-0 text-white text-lg font-bold">Ferda {{ count }}</p>
        </li>
        <li>
          <div class="user-info">
            <div class="flex flex-row align-items-center">
              <i class="pi pi-user text-base mr-3" />
              <p class="font-bold text-s text-white uppercase m-0">Jan Musílek</p>
            </div>
          </div>
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
