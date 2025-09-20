<template>
    <Textarea :class="cn(
        props.class,
    )" :placeholder="t('type...')" v-model="content"/>

    <Button class="ml-auto mt-1 flex" :disabled="!is_content_filled" @click="isDialogOpen=true">
        <PaperAirplaneIcon class="size-4"/>
        {{ t('submit') }}
    </Button>

    <Dialog :open="isDialogOpen">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{{ t('info') }}</DialogTitle>
                <DialogDescription>{{ t('fill_these_fields') }}</DialogDescription>
            </DialogHeader>

            <Input v-model="alias" :placeholder="t('alias')"/>
            <Stars v-model="stars" />

            <DialogFooter class="gap-1 flex">
                <Button variant="ghost" @click="isDialogOpen=false">{{ t('cancel') }}</Button>
                <Button :disabled="!is_allowed_to_send" @click="send">{{ t('continue') }}</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup>
import { apiFetch, cn, removeWhiteSpace } from '@/lib/utils';
import { useI18n } from 'vue-i18n';
import { PaperAirplaneIcon } from '@heroicons/vue/24/outline'
import Textarea from '../ui/textarea/Textarea.vue';
import Button from '../ui/button/Button.vue';
import Dialog from '../ui/dialog/Dialog.vue';
import DialogHeader from '../ui/dialog/DialogHeader.vue';
import DialogTitle from '../ui/dialog/DialogTitle.vue';
import DialogDescription from '../ui/dialog/DialogDescription.vue';
import DialogTrigger from '../ui/dialog/DialogTrigger.vue';
import DialogContent from '../ui/dialog/DialogContent.vue';
import { ref, computed } from 'vue'
import Input from '../ui/input/Input.vue';
import Stars from './Stars.vue';
import DialogFooter from '../ui/dialog/DialogFooter.vue';

const { t } = useI18n()

const props = defineProps(['data', 'class', 'teacherId'])

const isDialogOpen = ref(false)

const content = ref('')
const alias = ref('')
const stars = ref(0)

const is_content_filled = computed(() => {
    const clean_content = removeWhiteSpace(content.value)
    return clean_content.length > 0 
})
const is_allowed_to_send = computed(() => {
    const clean_content = removeWhiteSpace(content.value)
    const clean_alias = removeWhiteSpace(alias.value)
    return clean_content.length > 0 
            && clean_alias.length > 0
            && stars.value > 0
            && stars.value <= 5
})

const send = async () => {
    isDialogOpen.value = false
    const res = await apiFetch(`/api/reviews/`, 
        { method: 'POST', body: { content: content.value, 
                                  userAlias: alias.value, 
                                  stars: stars.value,
                                  teacherId: props.teacherId } })
    console.log(res)
}

</script>