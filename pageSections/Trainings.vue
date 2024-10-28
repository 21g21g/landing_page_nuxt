<script setup>
const props=defineProps({
    currenTheme:{
        type:String
    }
})
</script>
<template>
    <TrainingComponent :currenTheme="currenTheme"/>
</template>