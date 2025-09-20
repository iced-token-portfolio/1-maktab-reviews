<template>
    <Card class="gap-1">
        <CardHeader>
            <CardDescription class="text-yellow-500">{{ data.stars }} {{ getStars(data.stars) }}</CardDescription>
            <CardTitle>{{ data.userAlias }}</CardTitle>
            <p class="text-muted-foreground text-sm">{{ data.hashedIp.substring(0,12) }}</p>
        </CardHeader>
        <CardContent>
            <p class="mt-1">{{ data.content }}</p>
        </CardContent>
    </Card>
</template>

<script setup>
import Card from '../ui/card/Card.vue'
import CardContent from '../ui/card/CardContent.vue'
import CardDescription from '../ui/card/CardDescription.vue'
import CardHeader from '../ui/card/CardHeader.vue'
import CardTitle from '../ui/card/CardTitle.vue'

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