<script setup>
import {AboutData} from "../utils/HomeData"
const props=defineProps({
    currentTheme:{
        type:String
    }
})
</script>
<template>
    <div>
       <AboutComponent :currentTheme="currentTheme" :aboutData="AboutData"/>
    </div>
</template>