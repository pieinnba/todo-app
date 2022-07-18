<script setup>

</script>

<template>
    <button><slot></slot></button>
</template>

<style scoped>
    button {
        background-color: rgb(248, 248, 248);
        color:rgb(220, 220, 220);
        margin: 0 .5rem;
        padding: .3rem;
    }
    button:hover {
        background-color: rgb(245, 245, 245);
        color:rgb(180, 180, 180);
    }
    button:active {
        background-color: rgb(230, 230, 230);
        color:rgb(140, 140, 140);
    }

    @media only screen and (max-width: 50rem) {
        button {
            background-color: rgb(248, 248, 248);
            color:rgb(220, 220, 220);
            margin: 0 .5rem;
            padding: .3rem;
            font-size: 1.2rem;
        }
        button:hover {
            background-color: rgb(248, 248, 248);
            color:rgb(220, 220, 220);
        }
        button:active {
            background-color: rgb(230, 230, 230);
            color:rgb(140, 140, 140);
        }
    }
</style>