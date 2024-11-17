<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { passwordValidator, calculatePasswordStrength } from '../utils/password'
import Input from './Input.vue'
import PasswordStrength from './PasswordStrength.vue'

type Props = {
  msg: string
}
defineProps<Props>()

const username = ref('')
const password = ref('')
const errors = ref<string[]>([])

const passwordStrength = computed(() => {
  return calculatePasswordStrength(password.value);
})

watch(password, (newPassword) => {
  const validationResult = passwordValidator(newPassword, { username: username.value })
  errors.value = validationResult.errors
})

const resetForm = () => {
  username.value = ''
  password.value = ''
  errors.value = []
}

const handleSubmit = () => {
  const validationResult = passwordValidator(password.value, { username: username.value })
  if (validationResult.isValid) {
    alert(`Password submitted: ${password.value}`)
    resetForm()
  } else {
    errors.value = validationResult.errors
  }
}
</script>

<template>
  <h1 class="text-2xl font-bold mb-4">{{ msg }}</h1>

  <div class="w-full md:w-[600px] card border rounded shadow-md shadow-black bg-primary-900">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <Input id="username" label="Username" :modelValue="username" @update:modelValue="username = $event" />
      <Input id="password" label="Password" type="password" :modelValue="password" @update:modelValue="password = $event" />
      <PasswordStrength :score="passwordStrength" />
      <div v-if="errors.length" class="text-danger-500 text-sm text-left">
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </div>
      <button type="submit"
        class="w-full py-2 px-4 bg-primary-600 text-white font-semibold rounded-md shadow-md hover:bg-primary-700 focus:outline-none active:bg-primary-900">Submit</button>
    </form>
  </div>
</template>
