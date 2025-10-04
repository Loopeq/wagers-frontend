<script setup>
import notFoundImage from '@/assets/icons/notfound.png'
</script>


<template>
    <div class="not-found">
        <img :src="notFoundImage" alt="notfound">
        <span class="not-found__text">Match Not found</span>
    </div>
</template>

<style lang="scss" scoped>
    .not-found{
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;

        img{
            width: 200px;
            height: auto;
        }

        &__text{
            font-size: 18px;
            text-transform: uppercase;
            text-align: center;
        }
    }
</style>