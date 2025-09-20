<template>
    <div class="flex gap-2 items-center">
        <p class="tabular-nums">{{ value }}</p>
        <div class="select-none flex gap-0">
            <p v-for="_ in value" @click="value = _">★</p>
            <p v-for="_ in 5-value" @click="value += _">☆</p>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
    get: () => props.modelValue,
    set: val => emit('update:modelValue', val)
})
</script>