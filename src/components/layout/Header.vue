<template>
    <header class="py-2 flex justify-between items-center">

        <!-- logo -->
        <RouterLink to="/" custom v-slot="{ navigate }">
            <h1 @click="navigate" class="text-xl font-black italic select-none">1-MAKTAB-REVIEWS</h1>
        </RouterLink>

        <!-- language selector -->
        <div class="font-black flex gap-1">
            <button @click="locale = 'ru'" :class="cn(
                'text-accent transition-all rounded-md aspect-square px-2 border-1',
                locale === 'ru' ? 'bg-accent/20 border-accent/15' : 'hover:bg-accent/20 border-transparent'
            )">RU</button>
            <button @click="locale = 'uz'" :class="cn(
                'text-accent transition-all rounded-md aspect-square px-2 border-1',
                locale === 'uz' ? 'bg-accent/20 border-accent/15' : 'hover:bg-accent/20 border-transparent'
            )">UZ</button>
        </div>

    </header>
</template>

<script setup>
import { cn } from '@/lib/utils';
import { useI18n } from 'vue-i18n';

const {t, locale} = useI18n()
</script>