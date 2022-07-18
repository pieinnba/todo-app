<script setup>
    defineProps(['modelValue'])
    defineEmits(['update:modelValue'])
</script>

<template>
    <input 
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>

<style scoped>
    input {
        background-color: rgb(248, 248, 248);
    }
    ::placeholder {
        color: rgb(180, 180, 180);
    }
</style>