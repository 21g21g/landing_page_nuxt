<script setup>
import {ref} from "vue"
// whatIs
const props=defineProps({
    currentTheme:{
        type:String
    }
})
const activeLink=ref(null) 
import hahuLogo from "../assets/hahu_log.png"
import ha from "../assets/ha_lo.png"
const links=['home','training','partners','about','Whats in Muya','trainers','FAQ']
const setactiveLink=(link)=>{
    activeLink.value=link
    console.log("active link is clicked")
}
const setactiveLinkLeave=()=>{
    activeLink.value=null
}
</script>
<template>
    <footer :class="{'bg-white':currentTheme==='light','bg-[#1b2637]':currentTheme==='dark'}" class="  px-24 pt-16 overflow-x-hidden  flex flex-col">
       <div class="flex md:flex-row flex-col">
        <div class="flex flex-col gap-4 ml-24 mr-24 md:ml-0 md:mr-0">
            <p :class="{'text-[#374151]':currenTheme==='light','text-white':currentTheme==='dark'}">Powered by</p>
            <img :src="hahuLogo" alt="there is no  logo" class=" ">
            <img :src="ha" alt="there is no hahu" class="w-48 md:w-auto ">
        </div>
        <div class="flex md:flex-row flex-col md:ml-40 mt-20 md:gap-20 gap-4 text-center" >
            <!-- <a v-for="link in links" :key="link" :href="`#${link}`"   @mouseenter="setactiveLink(link)" @mouseleave="setactiveLinkLeave" :class="{'text-black rotate-12':activeLink===link,'text-[#374151]':currentTheme==='light','text-white':currentTheme==='dark'}">
          {{ link.charAt(0).toUpperCase() + link.slice(1) }} 


            </a> -->
            <NuxtLink 
            v-for="link in links" :key="link" 
             @mouseenter="setactiveLink(link)" @mouseleave="setactiveLinkLeave" :class="{'text-black rotate-12':activeLink===link,'text-[#374151]':currentTheme==='light','text-white':currentTheme==='dark'}"
                :to="{ path: '/', hash: `#${link}` }"
                   >
          {{ link.charAt(0).toUpperCase() + link.slice(1) }} 
              </NuxtLink>
          
        </div>
       </div>
       <div v-if="currentTheme==='dark'" class="border border-gray-200 "></div>
       <div class="flex md:flex-row flex-col gap-10 md:gap-0 justify-between mt-10 pb-5">
        <p :class="{'text-[#374151]':currentTheme==='light','text-gray-300':currentTheme==='dark'}"  class="text-[#374151] ">© 2024 HaHuJobs. All rights reserved.</p>
        <div class="flex flex-row gap-8  md:pr-40">
            <Icon name="uim:facebook" size="30px" :style="{ color: currentTheme === 'dark' ? 'white' : 'black' }"/>
            <Icon name="proicons:cancel" size="30px" :style="{ color: currentTheme === 'dark' ? 'white' : 'black' }"/>
            <Icon name="prime:linkedin" size="30px" :style="{ color: currentTheme === 'dark' ? 'white' : 'black' }"/>
            <Icon name="prime:tiktok" size="30px"   :style="{ color: currentTheme === 'dark' ? 'white' : 'black' }" 
 />

        </div>
       </div>
    </footer>
</template>