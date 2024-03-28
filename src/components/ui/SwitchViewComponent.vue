<script setup lang="ts">
import InputSwitch from 'primevue/inputswitch'
import { ref } from 'vue'

interface SwitchElementProps {
  label?: string
}

const props = defineProps<SwitchElementProps>()
const checked = ref<boolean>(false)
</script>

<template>
  <div class="inline-flex align-items-center mb-3">
    <InputSwitch
      inputId="switch-mode"
      v-model="checked"
      @change="$emit('onSwitch')"
    />
    <label
      v-if="props.label"
      class="ml-2"
      for="switch-mode"
      >{{ props.label }}</label
    >
  </div>
</template>
