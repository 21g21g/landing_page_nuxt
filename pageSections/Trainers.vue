<script setup>
const props=defineProps({
     currenTheme:{
        type:String
    }
})
</script>
<template>
       <TrainersComponent :currenTheme="currenTheme"/>
</template>