<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  id: string,
  label: string,
  modelValue: string,
  type?: string
}>()

const emit = defineEmits(['update:modelValue'])

const inputType = ref(props.type || 'text')

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div>
    <label :for="id" class="flex justify-start text-sm font-medium">{{ label }}</label>
    <input :type="inputType" :id="id" :value="modelValue" @input="updateValue"
      class="mt-1 block w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
  </div>
</template>
