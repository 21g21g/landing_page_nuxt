<script setup>
import {PartnerData} from "../utils/HomeData"
const props=defineProps({
    currentTheme:{
        type:String
    }
})
</script>
<template>
    <div>
        <PartnerComponent :currentTheme="currentTheme" :partnerData="PartnerData"/>
    </div>
</template>