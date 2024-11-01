<script setup>
// import {Accordion} from "../utils/Accordion"
const props=defineProps({
    currentTheme:{
        type:String
    }
})

  //  
</script>
<template>
    <div :class="{'bg-[#f9fafb]]':currentTheme==='dark'}" class="flex w-full   ml-28 md:flex-row flex-col md:mt-20 ">
      <div class="mt-10">
        <h1 :class="{'text-[#374151]':currentTheme==='light','text-white':currentTheme==='dark'}" class="md:text-2xl text-xl font-semibold ">Frequently Asked Questions</h1>
        <p :class="{'text-[#374151]':currentTheme==='light','text-white':currentTheme==='dark'}" class="text-base text-left pr-36">
          You didn’t find the answers you were looking for? Reach out
          
          to our <span class="text-[#009688]">customer support</span> team through our Contact Us page.
        </p>
      </div>
      
      <div class="flex-1">
        <LandingAccourdion/>

      </div>
    </div>

 
</template>