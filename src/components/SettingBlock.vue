<script setup>
import { ref, watch } from 'vue';
import ModalWindow from '@/components/modalWindow.vue';

const props = defineProps({
    currentFolder: Object
})

const emit = defineEmits(['cleaningTodos', 'delFolder', 'sortThisFolderTodos', 'comfirnAction'])

const show = ref(false)
const clickedDeleteBtn = ref(false)
const clickedCleanBtn = ref(false)

function closeModal() {
    show.value = false
    clickedCleanBtn.value = false
    clickedDeleteBtn.value = false
}

let selectFunction = ''

function openModal(option) {
    selectFunction = option
    if(selectFunction === 'clean') clickedCleanBtn.value = true
    if(selectFunction === 'delete') clickedDeleteBtn.value = true
    show.value = true
}

function confirmAction() {
    if(selectFunction === 'clean') emit('cleaningTodos')
    if(selectFunction === 'delete') emit('delFolder')
    closeModal()
}

app.onclick = function (event) {
  if (event.target.classList.contains('modal-background')) {
    closeModal
  }
}

const openButton = ref('open')

function openSetting() {
    let settingBlock = document.querySelector('.setting-block')
    if(openButton.value === 'open') {
        settingBlock.style.bottom = 0
        openButton.value = 'hide'
    } else {
        settingBlock.style.bottom = '-5.8rem'
        openButton.value = 'open'
    }
}

function autoCloseSettingBlock(event) {
    if(event.target.classList[0] !== 'setting-btn' && event.target !== document.querySelector('.modal-background')) {
        openSetting()
    }
}

watch(openButton, (item) => {
    if(item === 'hide') {
        document.addEventListener('click', autoCloseSettingBlock)
    }
    if(item === 'open') {
        document.removeEventListener('click', autoCloseSettingBlock)
    }
})
</script>

<template>
        <div class="setting-block">
            <btn 
                class="setting-btn mobile-setting-btn" 
                :class="{'opened-setting': openButton == 'hide'}"
                @click="openSetting"
            >{{ openButton }} setting</btn>
            <btn class="setting-btn" @click="$emit('sortThisFolderTodos')">sort</btn>
            <btn class="setting-btn open-modal-btn" @click="openModal('clean')">clear todo list</btn>
            <btn class="setting-btn open-modal-btn" @click="openModal('delete')">delete folder</btn>
        </div>

    <Transition name="modal-animation">
        <ModalWindow 
            v-if="show" 
            @comfirnAction="confirmAction"
            @closeModal="closeModal"
            :cleanBtn="clickedCleanBtn"
            :deleteBtn="clickedDeleteBtn"
        />
    </Transition>
</template>

<style scoped>
    .setting-block {
        margin: .5rem;
        position: absolute;
        right: 0;
        bottom: 0;
        display: flex;
        transition: all .5s ease-in-out;
    }
    .setting-btn {
        position: relative;
        z-index: 5;
    }
    .mobile-setting-btn {
        display: none;
    }
    .modal-animation-enter-active,
    .modal-animation-leave-active {
        transition: all 0.3s ease-out;
    }
    .modal-animation-enter-from,
    .modal-animation-leave-to {
    transform: translateY(-20px);
    opacity: 0;
    }
    .opened-setting {
        border-bottom: .1rem rgb(220, 220, 220) solid;
    }
    @media only screen and (max-width: 50rem) {
        .setting-block {
            flex-direction: column;
            bottom: -5.8rem;
        }
        .mobile-setting-btn {
            display: block;
        }
        .setting-btn {
            font-size: 1.2rem;
        }
    }
</style>