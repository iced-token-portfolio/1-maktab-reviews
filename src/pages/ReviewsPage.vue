<template>
    <div>
        <header class="flex flex-col">

            <div class="flex gap-2">
                <h1 v-if="teacher" class="text-lg">{{ teacher.name }}</h1>
                <Skeleton v-else class="w-100 h-7"/>
            </div>

            <p v-if="teacher" class="text-muted-foreground text-md">{{ teacher.subject }}</p>
            <Skeleton v-else class="w-20 h-6 mt-1"/>

        </header>

        <div class="mt-3">
            <MyReviewComponent 
                v-if="my_review" 
                :data="my_review" 
                :teacher-id="route.params.teacherId" 
                class="my-5" 
                @refresh="new_review => my_review = new_review"/>
            <WriteReviewComponent 
                v-else 
                :teacher-id="route.params.teacherId"
                @refresh="new_review => my_review = new_review"/>
        </div>

        <article class="flex flex-col gap-1 mt-3">
            <template v-if="reviews">
                <ReviewComponent 
                    v-for="review in reviews.content" 
                    :data="review" 
                    v-show="review.id !== (my_review?.id ?? -1)"/>
            </template>
            <template v-else>
                <Skeleton v-for="_ in 5" class="w-full h-30"/>
            </template>
        </article>
    </div>
</template>

<script setup>
import MyReviewComponent from '@/components/utils/MyReviewComponent.vue';
import ReviewComponent from '@/components/utils/ReviewComponent.vue';
import Skeleton from '@/components/ui/Skeleton.vue';
import WriteReviewComponent from '@/components/utils/WriteReviewComponent.vue';
import { apiFetch } from '@/lib/utils';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()

const teacher = ref(undefined)
const my_review = ref(undefined)
const reviews = ref(undefined)

const getTeacher = async () =>
    teacher.value = (await apiFetch(`/api/teachers/${route.params.teacherId}/`)).body
const getReviews = async () =>
    reviews.value = (await apiFetch(`/api/reviews/${route.params.teacherId}/`)).body
const getMyReview = async () =>
    my_review.value = (await apiFetch(`/api/reviews/${route.params.teacherId}/mine/`)).body?.review

onMounted(() => {
    getTeacher()
    getReviews()
    getMyReview()
})
</script>