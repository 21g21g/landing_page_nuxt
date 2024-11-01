<script setup>
import {ref} from "vue"

const currentTheme = useState('currentTheme', () => 'light');


const handleThemeUpdate = (newTheme) => {
  currentTheme.value = newTheme
}
</script>
<template>
    <div class="flex flex-col w-full px-1  overflow-x-hidden" :class="{'bg-white':currentTheme==='light','bg-[#02201d]':currentTheme==='dark'}">
   <NavBar id1="home" id2="trainings" id3="partners" id4="about" id5="Whats in Muya" id6="trainers" id7="FAQ" @update:route="handleRoute"  @update:lightValue="handleThemeUpdate"/>
   <main class="flex-grow">
    <NuxtPage/>
   </main>
 <FooterComponent :currentTheme="currentTheme"/>

    </div>
</template>