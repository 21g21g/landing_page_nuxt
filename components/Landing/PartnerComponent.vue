<script setup>
import {PartnerData} from "../../utils/HomeData"

const props=defineProps({
   
    currentTheme:{
        type:String
    }

})
// 'bg-white':currenTheme==='light','bg-[#1b2637]':currenTheme==='dark',
// console.log(props.partnerData)
</script>
<template>
    <div :class="{'bg-[#f1f5f9]':currentTheme==='light','bg-[#1b2637]':currentTheme==='dark',}" class="flex md:flex-row flex-col mt-14 md:mt-0 py-14 -mx-12  px-12  md:items-center w-full">
        <div class="flex flex-col md:w-[16rem] w-full items-center md:items-start ">
            <h1 :class="{'text-[#374151]':currentTheme==='light','text-white':currentTheme==='dark',}" class="text-2xl font-bold">{{PartnerData.para1}}</h1>
            <h1 class="text-[#009688] font-bold text-2xl">{{PartnerData.para2}}</h1>
            <p :class="{'text-[#374151]':currentTheme==='light','text-white':currentTheme==='dark',}" class="mt-3 text-sm text-center md:text-left">{{PartnerData.para3}}</p>

        </div>
        <div class="md:flex md:flex-row  md:items-start items-center md:gap-0 gap-5   grid grid-cols-2 mt-8 md:mt-0 md:px-0 px-6 ">
             <div v-for="imd in PartnerData.arrayImage" :key="imd" class="md:flex md:flex-row  ml-0   gap-8 md:ml-28">
            <img :src="imd.imgg" alt="there is no image" :class="{'filter grayscale brightness-150':currentTheme==='dark'}" class="md:h-20 h-10 md:w-44 w-24  object-contain">

        </div>
        </div>
       
       
    </div>
</template>