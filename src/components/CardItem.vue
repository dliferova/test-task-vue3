<script setup lang="ts">
import type { AdministrativeContactInterface } from '@/types/common'

defineProps<{
  heading: string
  administrativeContacts: AdministrativeContactInterface
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
          <td class="font-bold">Handle:</td>
          <td>{{ administrativeContacts.handle }}</td>
        </tr>
        <tr>
          <td class="font-bold">
            <i
              class="pi"
              :class="{
                'pi-eye': administrativeContacts.publish.organization,
                'pi-eye-slash': !administrativeContacts.publish.organization
              }"
              style="color: green; font-size: 0.7rem"
            ></i>
            Organization:
          </td>
          <td>{{ administrativeContacts.organization }}</td>
        </tr>
        <tr>
          <td class="font-bold">
            <i
              class="pi"
              :class="{
                'pi-eye': administrativeContacts.publish.organization,
                'pi-eye-slash': !administrativeContacts.publish.organization
              }"
              style="color: green; font-size: 0.7rem"
            ></i>
            Name:
          </td>
          <td>{{ administrativeContacts.name }}</td>
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
  margin: 0 0 20px;
}

.card__heading h2,
.card__body {
  padding: 0.5rem 1.5rem;
}

.card__heading h2 {
  margin: 0;
  font-size: 1rem;
  border-bottom: 1px solid var(--vt-c-divider-light-2);
  background-color: var(--vt-c-white-mute);
}
</style>
