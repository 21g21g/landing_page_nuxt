<script setup>
import {WhatisData} from "../utils/HomeData"
const props=defineProps({
    currentTheme:{
        type:String
    }
})
</script>
<template>
    <div>
        <WhatisComponent :currentTheme="currentTheme" :whatis="WhatisData"/>
   </div>
</template>