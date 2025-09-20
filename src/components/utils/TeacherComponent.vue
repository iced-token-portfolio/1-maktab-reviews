<template>
    <RouterLink :to="'/reviews/' + data.id" custom v-slot="{ navigate }">
        <div @click="navigate" class="w-full rounded-md p-4 border-1 border-accent/30 cursor-pointer bg-accent/10 hover:bg-accent/15 transition-all animate-in slide-in-from-bottom-2">
            <h1 class="text-xl">{{ data.name }}</h1>
            <p class="text-secondary text-md">{{ data.subject }}</p>
        </div>
    </RouterLink>
</template>

<script setup>
const props = defineProps(['data'])
</script>