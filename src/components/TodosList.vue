<script setup>
    import AddTodo from '@/components/AddTodo.vue';

    const props = defineProps({
        currentTodos: Array
    })

    const emit = defineEmits(['deleteSelectedTodo', 'doneCurrentTodo'])

    function selectTodoToMove(event, id, type) {
        let selectedTodoItem = event.target
        let selectedTodoBlock = selectedTodoItem.parentNode
        let deleteZone = selectedTodoItem.previousSibling
        let todoInput = document.querySelector('.todo-input')
        let newLeft = 0
        let shiftX = 0

        if(type === 'mouse') {
            shiftX = event.clientX - selectedTodoBlock.parentNode.getBoundingClientRect().left;
            document.addEventListener('mousemove', movingTodo);
            document.addEventListener('mouseup', unfocusTodo);

        }
        if(type === 'touch') {
            shiftX = event.targetTouches[0].clientX - selectedTodoBlock.parentNode.getBoundingClientRect().left;
            document.addEventListener('touchmove', movingTodo);
            document.addEventListener('touchend', unfocusTodo);
        }

        function movingTodo(event) {
            if(type === 'mouse') {
                newLeft = event.clientX - shiftX - selectedTodoBlock.parentNode.getBoundingClientRect().left;
            }
            if(type === 'touch') {
                newLeft = event.targetTouches[0].clientX - shiftX - selectedTodoBlock.parentNode.getBoundingClientRect().left;
            }

            if (newLeft < 0) {
            newLeft = 0;
            }

            let rightEdge = 100
            if (newLeft > rightEdge) {
            newLeft = rightEdge;
            }

            deleteZone.style.width = newLeft + 'px'
        }   

        function unfocusTodo() {
            if(type === 'mouse') {
                document.removeEventListener('mouseup', unfocusTodo);
                document.removeEventListener('mousemove', movingTodo);
            }
            if(type === 'touch') {
                document.removeEventListener('touchend', unfocusTodo);
                document.removeEventListener('touchmove', movingTodo);
            }

            if(newLeft > 50) {
                todoInput.style.opacity = 0
                setTimeout(() => todoInput.style.opacity = 1, 700)
                selectedTodoBlock.style.transform = 'translateX(-50rem)'
                setTimeout(() => emit('deleteSelectedTodo', id), 400)
            } else {
                deleteZone.style.width = 0 + 'px'
            }
        }
    }
    
</script>

<template>
    <ul class="todos-list">
        <li
            class="todo"
            v-for="todoItem in currentTodos" 
            :key="todoItem.id"
        >
            <div class="delete-zone">delete</div>
            <div
                @dblclick="$emit('doneCurrentTodo', todoItem.id)"
                @mousedown="selectTodoToMove($event, todoItem.id, 'mouse')"
                @touchstart="selectTodoToMove($event, todoItem.id, 'touch')"
                class="todo-content"
                :class="{'todo-done': todoItem.done === true}"
            >{{ todoItem.text }}</div>
        </li>
        <add-todo class="todo todo-input"/>
    </ul>
</template>

<style scoped>
    .todos-list {
        padding: .5rem 0;
    }
    .todo-done {
        text-decoration: line-through;
        color: rgb(140, 140, 140);
    }
    .todo {
        display: flex;
        width: fit-content;
        margin: .5rem 0;
        overflow: hidden;
        transition: all 0.3s ease;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;    
    }
    .todo-content {
        cursor: pointer; 
        position: relative; 
        padding-left: .1rem;
    }
    .todo-input {
        padding-left: .1rem;
    }
    .delete-zone {
        border-radius: 5%;
        overflow: hidden;
        width: 0px;
        background-color: rgb(196, 0, 0);
        color: rgb(217, 217, 217);
        text-align: center;
    }
    @media only screen and (max-width: 50rem) {
        .todo {
            font-size: 1.2rem;
            margin: 1rem 0;
        }
        .delete-zone {
            font-size: 1.2rem;
        }
    }
</style>