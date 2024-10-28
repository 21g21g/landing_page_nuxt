<script setup>
import { ref } from 'vue';

import Home from "../pageSections/Home.vue"
import About from "../pageSections/About.vue"
import Trainers from "../pageSections/Trainers.vue"
import Partners from "../pageSections/Partners.vue"
import Trainings from "../pageSections/Trainings.vue"
import WhatIs from "../pageSections/WhatIs.vue"
import FrequentQuestion from "../pageSections/FrequentQuestion"
import {NonPageData} from "../utils/HomeData"
const currentTheme = ref("light")

const handleThemeUpdate = (newTheme) => {
  currentTheme.value = newTheme
}
</script>
   <style >
/* this is used to  make my page scroll smothly */
   html {
    scroll-behavior: smooth;
}
@keyframes slideInFromRight {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
<template>
    <div :class="{'bg-white':currentTheme==='light','bg-[#02201d]':currentTheme==='dark'}" class="flex flex-col w-full px-1 md:px-12 overflow-x-hidden" >
        <NavBar id1="home" id2="trainings" id3="partners" id4="about" id5="Whats in Muya" id6="trainers" id7="FAQ"  @update:lightValue="handleThemeUpdate"/>
        <section id="home" class="min-h-screen ">
            <div :class="{'bg-white':currentTheme==='light','bg-[#02201d]':currentTheme==='dark'}" class="-mx-12 px-12">
                <Home :currenTheme="currentTheme"/>
            </div>
        
        </section>
        <div :class="{'border-y-gray-400':currentTheme==='light','bg-[#1b2637]':currentTheme==='dark', }"  class="flex flex-col md:flex-row  -mx-12 px-12 py-10" 
>
            <div class="flex flex-col gap-2 pt-5 md:w-[30rem] items-center md:items-start  justify-center">
                <h1 :class="{'text-[#374151]':currentTheme==='light','text-white':currentTheme==='dark'}" class="font-bold text-2xl">Our</h1>
                <h1 class="font-bold text-2xl text-[#009688]">Programs</h1>
                <p :class="{'text-[#374151]':currentTheme==='light','text-white':currentTheme==='dark'}" class="text-sm">Focus on digital and STEM-related subjects.</p>
            </div>
            <div class="md:flex md:flex-row grid grid-cols-2 md:mt-0 mt-14 md:ml-20  md:items-start "   style="animation: slideInFromRight 1s ease-out;">
                <div v-for="non in NonPageData" :key="non" class="">
                    <img :src="non.icon" alt="there is no image" class="h-[5rem]  md:ml-0 ml-16 w-14">
                    <h1 :class="{'text-[#374151]':currentTheme==='light','text-white':currentTheme==='dark'}" class="font-normal mt-6 text-center md:text-start">{{non.head}}</h1>
                    <p :class="{'text-[#374151]':currentTheme==='light','text-white':currentTheme==='dark'}" class="text-xs md:mt-5 mt-1 text-center md:text-start md:pr-2 md:pl-0 pl-4 pr-4 ">{{non.ptag}}</p>

                </div>
            </div>
        </div>
        <section id="trainings" class="min-h-screen">
            <div>
                <Trainings :currenTheme="currentTheme"/> 
            </div>
            
        </section>
        
       <section id="partners" class=" mt-20 ">
        <div class="-mr-24"><Partners :currentTheme="currentTheme"/></div>
       </section>
        <section id="about" class="min-h-screen mt-0" >
           <div> <About :currentTheme="currentTheme"/></div>
        </section>
        <section id="Whats in Muya" class="min-h-screen -mx-10 ">
           <div> <WhatIs :currentTheme="currentTheme"/></div>
        </section>
        <section id="trainers" class="min-h-screen">
            <div>
                <Trainers :currenTheme="currentTheme"/> 
            </div>
            
            </section>
        <section :class="{'bg-slate-50':currentTheme==='light','bg-[#1b2637]':currentTheme==='dark'}" id="FAQ" class="min-h-screen pl-2 md:pl-[5rem] items-start mt-14  md:pr-[5rem] -ml-12 -mr-12 pr-20">
            <div class=" md:mt-[10rem] mt-1 pr-20">
                <FrequentQuestion :currenTheme="currentTheme"/>

            </div>
      <div class="border border-[[#374151]] -ml-40 -mr-48 mt-8"></div>

            <FooterComponent :currenTheme="currentTheme"/>
            </section>
          
        
    </div>
</template>