<template>
	<Toaster/>

	<main class="mx-auto max-w-[1220px] px-1">
		<Header/>
		<RouterView class="mt-5"/>
	</main>
</template>

<script setup>
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
import Header from './components/layout/Header.vue';
</script>
