<script setup>
import {HomeData} from "../utils/HomeData"
console.log(HomeData)
const props=defineProps({
    currenTheme:{
        type:String,

    }
})
</script>
<template>
    <div>
        <HomeComponent :currentTheme="currenTheme" :homedata="HomeData"/>
    </div>
</template>