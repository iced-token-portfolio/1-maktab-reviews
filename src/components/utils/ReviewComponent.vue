<template>
    <div class="border-1 border-accent/40 rounded-md p-4">
        <p class="text-xs"><span class="text-secondary">{{ data.stars }}</span> {{ getStars(data.stars) }}</p>
        <h1 class="text-md">{{ data.userAlias }}</h1>
        <p class="text-secondary text-sm">{{ data.hashedIp.substring(0,12) }}</p>
        <p class="mt-1">{{ data.content }}</p>
    </div>
</template>

<script setup>
const props = defineProps(['data'])

const getStars = stars => {
    let res = ''
    let stars_left = 5-stars

    if(stars > 0)
        while(stars--)
            res += '★'

    if(stars_left > 0)
        while(stars_left--)
            res += '☆'

    return res
}
</script>