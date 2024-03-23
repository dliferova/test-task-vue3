<script setup lang="ts">
import type { StateFlag } from '@/types/common'

defineProps<{
  heading: string
  flags: StateFlag[]
}>()
</script>

<template>
  <div class="card TTTTTTTTTT flex-col">
    <div class="card__heading">
      <h2 class="font-bold">{{ heading }}:</h2>
    </div>
    <div class="card__body">
      <ul class="list">
        <li
          v-for="(flag, index) in flags"
          :key="index"
          class="card__flag-description"
          :class="{ green: flag.active, red: !flag.active }"
        >
          <span class="icon-wrapper">
            <i
              class="pi"
              :class="{ 'pi-check': flag.active, 'pi-times': !flag.active }"
              style="font-size: 0.7rem"
              :style="{ color: flag.active ? 'green' : 'red' }"
            ></i>
          </span>
          <p>{{ flag.description }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  width: 768px;
}

.list li {
  margin-right: 20px;
}

.icon-wrapper {
  display: block;
}

.card__flag-description {
  display: inline-flex;
  align-items: center;
}

.card__flag-description span {
  margin-right: 5px;
}

.green {
  color: green;
}

.red {
  color: red;
}

.card {
  box-shadow:
    rgba(0, 0, 0, 0.05) 0 6px 24px 0,
    rgba(0, 0, 0, 0.08) 0 0 0 1px;
  background-color: var(--vt-c-white);
  margin: 20px 0 20px;
}

.card__heading h2,
.card__body {
  padding: 0.5rem 1.5rem;
}

.card__heading h2 {
  margin: 0;
  font-size: 1rem;
  border-bottom: 1px solid var(--gray-50);
  background-color: var(--gray-300);
}
</style>
