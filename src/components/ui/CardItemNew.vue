<script setup lang="ts">
import Button from 'primevue/button'

defineProps<{
  heading?: string
}>()
</script>

<template>
  <div v-if="heading">
    <div class="bg-gray-200 pt-2 pr-1 pb-2 pl-3">
      <p class="m-0">{{ heading }}</p>
    </div>
    <div>
      <table>
        <tr>
          <td>AuthInfo:</td>
          <td>
            <Button>Show</Button>
          </td>
        </tr>
        <tr>
          <td>Expires at:</td>
          <td>{{ domainDetails.expires_at }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
