<template>
    <div>

        <h1 class="text-2xl pl-3">{{ t('teacher-reviews') }}</h1>

        <section class="my-3 grid gap-1 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            <template v-if="teachers">
                <TeacherComponent :data="data" v-for="data in teachers.content"/>
            </template>
            <template v-else>
                <Skeleton class="w-full h-20" v-for="_ in 18"/>
            </template>
        </section>

        <button v-if="areThereMore" @click="showMore" class="mx-auto ml-3 border-accent/40 border-1 px-5 py-1 rounded-md hover:bg-accent/20 transition-all cursor-pointer text-secondary-foreground">
            {{ t('see-more') }}
        </button>

    </div>
</template>

<script setup>
import { apiFetch } from '@/lib/utils';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import TeacherComponent from '../utils/TeacherComponent.vue';
import Skeleton from '../ui/Skeleton.vue';

const { t } = useI18n()

const teachers = ref(undefined)

let current_page = 0

const getTeachers = () => {
    return new Promise((resolve, reject) => {
        apiFetch(`/api/teachers/?page=${current_page}`)
            .then(res => {
                if(teachers.value) {
                    let new_teachers = { 
                        content: teachers.value.content.concat(res.body.content),
                        last: res.body.last
                    }
                    teachers.value = new_teachers // make sure the update is seen, because deep changes are not registered
                }
                else
                    teachers.value = res.body
                resolve()
            })
        current_page++
    })
}

const showSeeMoreButton = ref(true)

const areThereMore = computed(() => !(teachers.value?.last ?? true))

const showMore = () => { 
    showSeeMoreButton.value = false; 
    getTeachers()
        .then(() => showSeeMoreButton.value = true) 
}

onMounted(getTeachers)
</script>