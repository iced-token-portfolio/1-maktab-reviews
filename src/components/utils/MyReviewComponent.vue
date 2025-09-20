<template>
    <div :class="cn(
        'border-accent/20 border-1 p-4 rounded-md',
        props.class
    )">
        <div class="flex justify-between items-center mb-1">
            <h1 class="mb-2">Your review</h1>
            <div class="flex gap-1">
                <Button variant="outline" class="h-auto aspect-square" @click="isDialogOpen = true">
                    <PencilIcon class="size-3"/>
                </Button>
                <Button class="bg-transparent hover:bg-red-500/10 text-red-500" @click="isAlertDialogOpen = true">
                    <TrashIcon class="size-3"/>
                </Button>
            </div>
        </div>
        <ReviewComponent :data="data"/>
    </div>

    <Dialog v-model:open="isDialogOpen">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{{ t('edit') }}</DialogTitle>
                <DialogDescription>{{ t('fill-these-fields') }}</DialogDescription>
            </DialogHeader>

            <Input v-model="new_alias" :placeholder="t('alias')"/>
            <Textarea v-model="new_content" :placeholder="t('content')"/>
            <Stars v-model="new_stars"/>

            <DialogFooter>
                <Button variant="ghost" @click="isDialogOpen = false">{{ t('cancel') }}</Button>
                <Button @click="edit">{{ t('submit') }}</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>

    <AlertDialog v-model:open="isAlertDialogOpen">
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{{ t('are-you-sure') }}</AlertDialogTitle>
                <AlertDialogDescription>{{ t('this-action-can-not-be-reverted') }}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel @click="isAlertDialogOpen = false">{{ t('cancel') }}</AlertDialogCancel>
                <AlertDialogAction @click="remove">{{ t('continue') }}</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { ref, watch } from 'vue';
import Button from '../ui/button/Button.vue';
import ReviewComponent from './ReviewComponent.vue';
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { apiFetch, cn, removeWhiteSpace } from '@/lib/utils';
import AlertDialog from '../ui/alert-dialog/AlertDialog.vue';
import AlertDialogHeader from '../ui/alert-dialog/AlertDialogHeader.vue';
import AlertDialogTitle from '../ui/alert-dialog/AlertDialogTitle.vue';
import AlertDialogContent from '../ui/alert-dialog/AlertDialogContent.vue';
import AlertDialogDescription from '../ui/alert-dialog/AlertDialogDescription.vue';
import AlertDialogFooter from '../ui/alert-dialog/AlertDialogFooter.vue';
import AlertDialogCancel from '../ui/alert-dialog/AlertDialogCancel.vue';
import AlertDialogAction from '../ui/alert-dialog/AlertDialogAction.vue';
import Dialog from '../ui/dialog/Dialog.vue';
import DialogHeader from '../ui/dialog/DialogHeader.vue';
import DialogContent from '../ui/dialog/DialogContent.vue';
import Textarea from '../ui/textarea/Textarea.vue';
import DialogTitle from '../ui/dialog/DialogTitle.vue';
import DialogDescription from '../ui/dialog/DialogDescription.vue';
import Input from '../ui/input/Input.vue';
import Stars from './Stars.vue';
import DialogFooter from '../ui/dialog/DialogFooter.vue';
import { toast } from 'vue-sonner';

const props = defineProps(['data', 'teacherId', 'class'])
const emit = defineEmits(['refresh'])

const { t } = useI18n()

const isAlertDialogOpen = ref(false)
const isDialogOpen = ref(false)

const remove = () => {
    apiFetch(`/api/reviews/${props.teacherId}/mine/`, { method: 'DELETE' })
        .then(res => {
            if(res.status >= 200 && res.status < 300)
                toast['success'](t('successfully-deleted'))
            else
                toast['error'](t('something-went-wrong'))
            emit('refresh', undefined)
        })
}

const new_content = ref(props.data.content)
const new_alias = ref(props.data.userAlias)
const new_stars = ref(props.data.stars)
const edit = () => {
    apiFetch(`/api/reviews/${props.teacherId}/mine/`, {
        method: 'PUT',
        body: { 
            content: new_content.value,
            userAlias: new_alias.value,
            stars: new_stars.value
        }
    }).then(res => {
        if(res.status >= 200 && res.status < 300)
            toast['success'](t('success'))
        else
            toast['error'](t('soemthing-went-wrong'))
        emit('refresh', res.body)
        isDialogOpen.value = false
    })
}

watch(isDialogOpen, (val, oldVal) => {
    if(!val && oldVal) {
        new_content.value = props.data.content
        new_alias.value = props.data.userAlias
        new_stars.value = props.data.stars
    }
})
</script>