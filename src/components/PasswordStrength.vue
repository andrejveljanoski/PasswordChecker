<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps<{
    score: number
}>()

const criticalCutOff = 30
const isUnacceptable = computed(() => props.score < criticalCutOff)

const strengthClass = computed(() => {
    if (props.score > 80) return 'bg-success-700'
    if (props.score > 60) return 'bg-success-500'
    if (props.score > criticalCutOff) return 'bg-warning-500'
    return 'bg-danger-500'
})
</script>

<template>
    <div class="w-full h-2 bg-secondary-200 rounded mt-2">
        <div :class="strengthClass" :style="{ width: `${props.score}%` }" class="h-full rounded"></div>
    </div>
    <p v-if="isUnacceptable" class="text-danger-500 text-sm text-left mt-1">Password is too weak</p>
</template>
