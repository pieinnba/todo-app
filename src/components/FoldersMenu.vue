<script setup>
    import AddFolder from '@/components/AddFolder.vue';

    const props = defineProps({
        massiveOfFolders: Array
    })

    function dragToScroll(direction) {
        let scrollByButton = ''

        if(direction == 'left') scrollByButton = setInterval(() => document.querySelector('.folder-list').scrollLeft += 1, 0)
        if(direction == 'right') scrollByButton = setInterval(() => document.querySelector('.folder-list').scrollLeft -= 1, 0)
        document.addEventListener('mouseup', stopScrolling);

        function stopScrolling() {
            clearInterval(scrollByButton)
            document.removeEventListener('mouseup', stopScrolling);
        }
    }
</script>

<template>
    <div class="folders-block">
        <btn class="scroll-btn" @mousedown="dragToScroll('right')">&lt;</btn>
        <ul class="folder-list">
            <li 
                v-if="massiveOfFolders.length > 0"
                class="folder"
                v-for="folder in massiveOfFolders" 
                :key="folder.id"
                @click="$emit('choose', folder.id)"
            >
                <div :class="{'selected-folder': folder.isSelected === true}">{{ folder.name }}</div>
            </li>
            <li><add-folder/></li>
        </ul>
        <btn class="scroll-btn" @mousedown="dragToScroll('left')">&gt;</btn>
    </div>
</template>

<style scoped>
    .folders-block {
        display: flex;
        margin: 0 auto;
    }
    .folder-list {
        padding: 0 .4rem;
        display: flex;
        width: 35rem;
        border-left: .1rem rgb(180, 180, 180) solid;
        border-right: .1rem rgb(180, 180, 180) solid;
        overflow: hidden;
        flex-wrap: nowrap;
        overflow-x: auto;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    .folder-list::-webkit-scrollbar { 
        display: none;
    }
    .folder {
        margin-right: .8rem;
    }
    .folder > div {
        cursor: pointer; 
        z-index: 10; 
        background-color: rgb(248, 248, 248);
    }
    .selected-folder {
        border-bottom: .1rem black solid;
    }
    .scroll-btn {
        padding: 0 .3rem;
        border-radius: 90%;
    }
    @media only screen and (max-width: 50rem) {
        .scroll-btn {
            display: none;
        }
        .folders-block {
            display: flex;
            margin: 0;
            background-color: rgb(245, 245, 245);
            height: 2rem;
            padding-bottom: .2rem;
            align-items: center;
        }
        .folder-list {
            border: 0;
            width: 100%;
        }
        .folder > div {
            font-size: 1.2rem;
            background-color: rgb(245, 245, 245);
        }
    }
</style>