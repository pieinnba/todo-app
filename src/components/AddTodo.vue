<script setup>
    import { ref, inject } from 'vue'

    const newTodo = ref({id: 0, text: '', done: false})

    const addNewTodo = inject('currentTodos')
</script>

<template>
    <li>
        <inpt 
            class="input-todo"
            maxlength="45"
            placeholder="New Task"
            v-model="newTodo.text"
            @keyup.enter="addNewTodo(newTodo)"
        />
    </li>
</template>

<style scoped>
    .input-todo {
        width: 4rem;
    }
    .input-todo:focus {
        width: 22rem;
    }
    @media only screen and (max-width: 50rem) {
        .input-todo {
            width: 5.1rem;
            font-size: 1.2rem;
        }
        .input-todo:focus {
            width: 27.5rem;
        }
    }
</style>