<script setup>
    import FoldersMenu from '@/components/FoldersMenu.vue';
    import TodosList from '@/components/TodosList.vue';
    import SettingBlock from '@/components/SettingBlock.vue';
    import { ref, provide, onMounted } from 'vue'

    onMounted(() => {
        if(localStorage.foldersAndTodos && localStorage.folderId && localStorage.todoId) {
            folderList.value = JSON.parse(localStorage.foldersAndTodos)._rawValue
            folderId = +localStorage.folderId
            todoId = +localStorage.todoId
        }

        if(folderList.value.length !== 0) {
            selectFolder(folderList.value[0].id)
        }
    })

    provide('currentTodos', addNewTodo)
    provide('currentFolders', addNewFolder)

    const folderList = ref([{id: 1, name: 'tutorial', isSelected: true, todos: [{id: 1, text: 'double click to complete task', done: false}, {id: 2, text: 'swipe right to delete task', done: false}, {id: 3, text: 'to add new folder or task press enter', done: false}, {id: 4, text: 'in botton right corner you can find some setting buttons', done: false}]}])
    const currentFolder = ref({})
    let folderId = 1
    let todoId = 4
    
    function updateLocalStorage() {
        localStorage.foldersAndTodos = JSON.stringify(folderList)
        localStorage.folderId = folderId
        localStorage.todoId = todoId
    }

    function selectFolder(id) {
        folderList.value.forEach((item) => {
            item.isSelected = false
            if(item.id === id) {
                item.isSelected = true
                currentFolder.value = item
            }
        })
    }

    function deleteFolder() {
        folderList.value = folderList.value.filter(folder => folder.id !== currentFolder.value.id)
        if (currentFolder.value.isSelected) selectFolder(folderList.value[0].id)
        updateLocalStorage()
    }

    function addNewFolder(folder) {
        if(folder.name !== '') {
            folder.id = ++folderId
            folderList.value.push({...folder})
            selectFolder(folder.id)
            updateLocalStorage()
        }
        folder.name = ''
        folder.isSelected = false
        folder.todos = []
    }

    function addNewTodo(newTodo) {
        if(newTodo.text !== '') {
            newTodo.id = ++todoId
            folderList.value.forEach(folder => {
                if(folder.isSelected) {
                    folder.todos.push({...newTodo})
                    updateLocalStorage()
                    newTodo.id = 0
                    newTodo.text = ''
                    newTodo.done = false
                }
            })
        }
    }

    function delTodo(id) {
        folderList.value.forEach(folder => {
            if(folder.id === currentFolder.value.id) {
                folder.todos = folder.todos.filter(currentTodos => currentTodos.id != id)
                updateLocalStorage()
            }
        })
    }

    function doneTodo(id) {
        folderList.value.forEach(folder => {
            if(folder.id === currentFolder.value.id) {
                folder.todos.forEach(todo => todo.id == id ? todo.done = !todo.done : todo.done = todo.done)
                updateLocalStorage()
            }
        })
    }

    function sortTodoList() {
        folderList.value.forEach(folder => {
            if(folder.id === currentFolder.value.id) {
                folder.todos.sort((todo1, todo2) => todo1.done > todo2.done ? -1 : 1)
                updateLocalStorage()
            }
        })
    }
    
    function cleanTodoList() {
        folderList.value.forEach(folder => {
            if(folder.id === currentFolder.value.id) {
                folder.todos = []
            }
        })
    }
</script>

<template>
    <folders-menu
        :massiveOfFolders="folderList"
        @choose="selectFolder"
    />

    <todos-list
        v-if="folderList.length > 0"
        class="todos-list"
        :currentTodos="currentFolder.todos"
        @addTodo="addNewTodo"
        @deleteSelectedTodo="delTodo"
        @doneCurrentTodo="doneTodo"
        style="flex: 1 1 auto;"
    />

    <SettingBlock
        v-if="folderList.length > 0"
        :currentFolder="currentFolder"
        @sortThisFolderTodos="sortTodoList"
        @delFolder="deleteFolder"
        @cleaningTodos="cleanTodoList"
    />
</template>

<style scoped>
</style>