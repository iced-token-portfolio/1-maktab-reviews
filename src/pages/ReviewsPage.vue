<!-- <template>
    <div>
        <div v-if="teacher">
            <div class="flex items-center gap-2">
                <button @click="router.push('/')" class="p-3 rounded-md hover:bg-accent/40 transition-all">
                    <ArrowLeftIcon class="size-4"/>
                </button>
                <div>
                    <h1 class="text-xl">{{ teacher.name }}</h1>
                    <p class="text-secondary">{{ teacher.subject }}</p>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="flex gap-1 items-center">
                <Skeleton class="aspect-square w-10"/>
                <div class="flex-col gap-1">
                    <Skeleton class="h-6 w-50"/>
                    <Skeleton class="h-5 w-30 mt-2"/>
                </div>
            </div>
        </div>

        <template v-if="my_review !== null">
            <h2 class="mt-4 mb-4">{{ t('you') }}</h2>

            <div class="my-1 px-2 flex gap-1" v-if="my_review">
                <button class="hover:bg-accent/20 p-3 rounded-md transition-all">
                    <PencilIcon class="size-4"/>
                </button>
               <button class="hover:bg-red-500/20 text-red-500 p-3 rounded-md transition-all"
                       @click="delete_dialog_open = true">
                    <TrashIcon class="size-4"/>
                </button>
            </div>
            <div class="my-1 px-2 flex gap-1" v-else>
                <Skeleton class="aspect-square w-10"/>
                <Skeleton class="aspect-square w-10"/>
            </div>

            <ReviewComponent :data="my_review" v-if="my_review"/>
            <Skeleton class="h-30 w-full" v-else/>

            <h2 class="mt-4">{{ t('others') }}</h2>
        </template>
        <template v-else-if="my_review === null">
            <h2 class="mt-4 mb-4">{{ t('you') }}</h2>

            <textarea v-model="review.content" class="w-full resize-none border-1 border-accent/60 rounded-md p-2" rows="4" :placeholder="t('type...')"/>
            <button :class="cn(
                'px-4 py-1 rounded-md flex items-center gap-1',
                send_disabled ? 'bg-accent opacity-50 cursor-not-allowed' : 'bg-primary' 
            )" @click="sendReview">
                <p>{{ t('submit') }}</p> 
                <PaperAirplaneIcon class="size-5"/>
            </button>

            <h2 class="mt-4">{{ t('others') }}</h2>
        </template>

        <div  class="flex flex-col gap-2 mt-4 mb-15">
            <template v-if="reviews !== undefined">
                <ReviewComponent v-for="data in reviews.content" :data="data"/>
            </template>
            <template v-else>
                <Skeleton class="h-30 w-full" v-for="_ in 10"/>
            </template>
        </div>

    </div>
</template>

<script setup>
import { ArrowLeftIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { PaperAirplaneIcon } from '@heroicons/vue/24/solid'
import ReviewComponent from '@/components/ReviewComponent.vue';
import Skeleton from '@/components/ui/Skeleton.vue';
import { apiFetch, cn } from '@/lib/utils';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import router from '@/lib/router';

const route = useRoute()
const { t } = useI18n()

const teacher = ref(undefined)
const reviews = ref(undefined)
const my_review = ref(undefined)

const remove = () => {
    apiFetch(`/api/reviews/${route.params.teacherId}/mine/`, { method: 'DELETE' })
        .then(res => {
            if(res.status >= 200 && res.status < 300)
                openToast(t('successfully-deleted'))
            else
                openToast(t('something-went-wrong'))
            getMyReview()
            delete_dialog_open.value = false
        })
}

let page = 0
const getReviews = async () => {
    const res = await apiFetch(`/api/reviews/${route.params.teacherId}/?page=${page}`)
    page++
    reviews.value = res.body
}

const review =  ref({})
const send_disabled = computed(() => {
    const content = (review.value?.content ?? '')
                        .replace(/[\s\u200B-\u200D\uFEFF\u200E]+/g, "") // remove invisble characters
                        .trim()
    return content.length === 0
})
const sendReview = () => {}

onMounted(() => {
    apiFetch(`/api/teachers/${route.params.teacherId}/`)
        .then(res => {
            teacher.value = res.body
        })
    apiFetch(`/api/reviews/${route.params.teacherId}/mine/`)
        .then(res => {
            if(res.body.exists)
                my_review.value = res.body.review
            else
                my_review.value = null
        })
    getReviews()
})
</script> -->

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
            <MyReviewComponent v-if="my_review" :data="my_review"/>
            <WriteReviewComponent v-else :teacher-id="route.params.teacherId"/>
        </div>

        <article class="flex flex-col gap-1 mt-3">
            <template v-if="reviews">
                <ReviewComponent v-for="review in reviews.content" :data="review"/>
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