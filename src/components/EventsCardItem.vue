<script setup lang="ts">
import type { EventsInterface } from '@/types/common'

defineProps<{
  heading: string
  events: EventsInterface | null
}>()
</script>

<template>
  <div class="card">
    <div class="card__heading">
      <h2 class="font-bold">{{ heading }}:</h2>
    </div>
    <div class="card__body">
      <table>
        <tr>
          <td>Create date:</td>
          <td>Jan 15, 2021 12:00:00 AM</td>
          <td>Registrar:</td>
          <td>REG-CZNIC</td>
        </tr>
        <tr>
          <td>Update date:</td>
          <td>Jan 15, 2021 12:00:00 AM</td>
          <td>Registrar:</td>
          <td>REG-CZNIC</td>
        </tr>
        <tr>
          <td>Transfer date:</td>
          <td>Jan 15, 2021 12:00:00 AM</td>
          <td>Registrar:</td>
          <td>REG-CZNIC</td>
        </tr>
        <tr>
          <td>Delete date:</td>
          <td>Jan 15, 2021 12:00:00 AM</td>
          <td>Registrar:</td>
          <td>REG-CZNIC</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
.card {
  box-shadow:
    rgba(0, 0, 0, 0.05) 0 6px 24px 0,
    rgba(0, 0, 0, 0.08) 0 0 0 1px;
  background-color: var(--gray-0);
  margin: 20px 0 20px;
}

.card__heading h2,
.card__body {
  padding: 0.5rem 1.5rem;
}

.card__heading h2 {
  margin: 0;
  font-size: 1rem;
  border-bottom: 1px solid var();
  background-color: var(--vt-c-white-mute);
}
</style>
