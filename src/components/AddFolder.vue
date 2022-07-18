<script setup>
    import { ref, inject } from 'vue'

    const newFolder = ref({
        id: 0,
        name: '',
        isSelected: false,
        todos: []
    })

    const addNewFolder = inject('currentFolders')
</script>

<template>
    <form class="add-folder" @submit.prevent>
        <inpt
            class="input-folder"
            v-model="newFolder.name"
            placeholder="New Folder"
            maxlength="12"
            @keyup.enter="addNewFolder(newFolder)"
        />
    </form>
</template>

<style scoped>
    .input-folder {
        width: 5rem;
    }
    .input-folder:focus {
        width: 6rem;
    }
    @media only screen and (max-width: 50rem) {
        .input-folder {
            width: 6.1rem;
            font-size: 1.2rem;
        }
        .input-folder:focus {
            width: 7.5rem;
        }
    }
</style>