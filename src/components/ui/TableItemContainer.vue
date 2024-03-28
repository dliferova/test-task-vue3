<script setup lang="ts">
interface TableItemProps {
  heading?: string
  cardSize: 'small' | 'large'
}

const props = defineProps<TableItemProps>()
</script>

<template>
  <div>
    <div
      class="card flex flex-column bg-white shadow-4 mb-4 text-sm"
      :class="{
        'card--small': cardSize === 'small',
        'card--large': cardSize === 'large'
      }"
    >
      <div v-if="props.heading" class="bg-gray-200 border-bottom-1 border-400 pt-2 pr-1 pb-2 pl-3">
        <p class="m-0 font-bold">{{ props.heading }}:</p>
      </div>
      <div class="pt-2 pr-3 pb-2 pl-3">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
