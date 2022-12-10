<template>
    <nav class="nav_list">
        <img @click="goHome" src="../static/image/home.svg" alt="">
        <img @click="goBack" src="../static/image/back.svg" alt="">
    </nav>
    <div class="wrapper">
        <HelloWorld msg="ChenSiyi's blog" />
        <div class="box">there is nothing ...</div>
        <!-- <Music></Music> -->
        <nav>
            <router-view></router-view>
            <!-- <RouterLink to="/about">About</RouterLink> -->
        </nav>
    </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import Music from '../components/Music.vue';
import { useRouter } from "vue-router";
const router = useRouter()

function goHome(){
    router.replace('/music')
}

function goBack(){
    router.back()
}
</script>

<style lang="scss" scoped>
.box {
    color: white;
    display: flex;
    justify-content: center;
    /* color: rgb(132, 132, 132); */
}

.nav_list {

    img {
        padding: 6px 6px 0;
        width: 3.5vh;
        height: 3.5vh;
    }
}
</style>