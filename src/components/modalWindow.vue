<script setup>
const props = defineProps({
    cleanBtn: Boolean,
    deleteBtn: Boolean
})
</script>

<template>
        <div 
            class="modal-background" 
            @click="$emit('closeModal')"
        >
            <div 
                class="modal-body" 
                :class="{ 'near-delete-btn': props.deleteBtn, 'near-clean-btn': props.cleanBtn }" 
                onclick="event.stopPropagation()"
            >
                <div class="modal-title">a u sure?</div>
                <div class="modal-btn-block">
                    <btn @click="$emit('comfirnAction')">yes</btn>
                    <btn @click="$emit('closeModal')">no</btn>
                </div>
            </div>
        </div>
</template>

<style scoped>
    .modal-background {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 15;
    }
    .modal-body {
        padding: .2rem;
        border: .1rem rgb(140, 140, 140) solid;
        border-radius: 90%;
        background-color: rgb(248, 248, 248);
        width: 8rem;
        display: block;
        z-index: 100;
        position: absolute;
    }
   .modal-body::before, .modal-body::after {
    content: ''; 
    position: absolute;
    left: 3.5rem; 
    bottom: -20px;
    border: 10px solid transparent;
    border-top: 10px solid rgb(140, 140, 140);
   }
   .modal-body::after {
    border-top: 10px solid rgb(248, 248, 248);
    bottom: -19px; 
   }
   .modal-title {
    width: fit-content;
    margin: .1rem auto;
   }
    .modal-btn-block {
    width: fit-content;
    margin: 0 auto;
    margin-bottom: .2rem;
    }
    .near-delete-btn {
        bottom: 3rem;
        right: 2rem;
    }
    .near-clean-btn {
        bottom: 3rem;
        right: 11rem;
    }
    @media only screen and (max-width: 50rem) {
        .near-delete-btn,
        .near-clean-btn {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .modal-body {
            border-radius: 0%;
            height: fit-content;
        }
        .modal-body::before, .modal-body::after {
            display: none;
        }
        .modal-title {
            font-size: 1.2rem;
        }
    }
</style>