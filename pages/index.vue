<script setup>
import { ref } from 'vue'

import {NonPageData} from "../utils/HomeData"

const currentTheme = useState('currentTheme');

</script>
 
<template>
    <div :class="{'bg-[#f9fafb]':currentTheme==='light','bg-[#1b2637]':currentTheme==='dark'}">
        <section id="home" class="min-h-screen ">
            <div :class="{'bg-[#f9fafb]':currentTheme==='light','bg-[#02201d]':currentTheme==='dark'}" class=" px-12">
                <LandingHomeComponent :currentTheme="currentTheme"/>
            </div>
        
        </section>
        <div :class="{'border-y-gray-400':currentTheme==='light','bg-[#1b2637]':currentTheme==='dark', }"  class="flex flex-col md:flex-row  px-12 py-10 bg-[#f1f5f9]" 
           >
            <div class="flex flex-col gap-2 pt-5 md:w-[30rem] items-center md:items-start  justify-center">
                <h1 :class="{'text-[#374151]':currentTheme==='light','text-white':currentTheme==='dark'}" class="font-bold text-2xl">Our</h1>
                <h1 class="font-bold text-2xl text-[#009688]">Programs</h1>
                <p :class="{'text-[#374151]':currentTheme==='light','text-white':currentTheme==='dark'}" class="text-sm">Focus on digital and STEM-related subjects.</p>
            </div>
    <div
      class="md:flex md:flex-row grid grid-cols-2 md:mt-0 mt-14 md:ml-20 md:items-start "
       data-aos="fade-left"
    data-aos-duration="500"
    >
      <div v-for="non in NonPageData" :key="non" class="content">
        <img :src="non.icon" alt="no image" class="h-[5rem] md:ml-0 ml-16 w-14" />
        <h1
          :class="{
            'text-[#374151]': currentTheme === 'light',
            'text-white': currentTheme === 'dark',
          }"
          class="font-normal mt-6 text-center md:text-start"
        >
          {{ non.head }}
        </h1>
        <p
          :class="{
            'text-[#374151]': currentTheme === 'light',
            'text-white': currentTheme === 'dark',
          }"
          class="text-xs md:mt-5 mt-1 text-center md:text-start md:pr-2 md:pl-0 pl-4 pr-4"
        >
          {{ non.ptag }}
        </p>
      </div>
    </div>
  </div>

      
        <section id="trainings" class="min-h-screen  px-12">
            <div>
                <LandingTrainingComponent :currentTheme="currentTheme"/> 
            </div>
            
        </section>
        
       <section id="partners" class=" mt-20  px-12">
        <div class="-mr-24"><LandingPartnerComponent :currentTheme="currentTheme"/></div>
       </section>
        <section id="about" class="min-h-screen mt-0 px-12" >
           <div> <LandingAboutComponent :currentTheme="currentTheme"/></div>
        </section>
        <section id="Whats in Muya" class="min-h-screen px-5" :class="{'bg-[#f0f4f8]':currentTheme==='light','bg-[#1f2937]':currentTheme==='dark',}">
           <div> <LandingWhatisComponent :currentTheme="currentTheme"/></div>
        </section>
        <section id="trainers" :class="{'bg-[#f9fafb]':currentTheme==='light','bg-[#1b2637]':currentTheme==='dark'}" class="min-h-screen px-12">
            <div>
                <LandingTrainersComponent :currentTheme="currentTheme"/> 
            </div>
            
            </section>
        <section :class="{'bg-[#f9fafb]':currentTheme==='light','bg-[#1b2637]':currentTheme==='dark'}" id="FAQ" class=" pl-2 md:pl-[8rem] items-start mt-36  md:pr-40 -ml-12 -mr-12 pr-20">
            <div class=" md:mt-0 mt-1 pr-20 ">
                <LandingFrequentQuestion :currentTheme="currentTheme"/>

            </div>
      <div class="border border-[[#374151]] -ml-40 -mr-48 mt-8"></div>

            </section>
          
        
    </div>
</template>
  <style >
   html {
    scroll-behavior: smooth;
}



</style>