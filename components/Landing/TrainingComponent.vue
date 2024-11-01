<script setup>
import {ref,computed} from "vue"
import {CorosolData1} from "../../utils/CorosolData"
const arrowController=ref(false)
console.log(CorosolData1)
const windowWidth = ref(null);
const props=defineProps({
  currentTheme:{
    type:String
  }
})
// when onhover make arrow margin left
const handleMouseover = () => {
  arrowController.value = true
}

const handleMouseout = () => {
  arrowController.value = false
}
const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};


onMounted(() => {
    updateWindowWidth()
  window.addEventListener("resize", updateWindowWidth);
});
const itemToshow = computed(() => {
  return windowWidth.value >= 768 ? 3 : 1;
});
</script>
<template>
    <div class="mt-14">
        <div class="flex flex-row justify-between">
            <div class="flex flex-col md:pl-0 pl-2 mt-10">
                <h2 class="text-[#009688] font-medium">START LEARNING NEW SKILLS!</h2>
               <h1 :class="{' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}" class="text-dark-700 text-xl md:text-3xl xl:text-start dark:text-white mt-5" data-v-c46932e4=""> Acquire new skills for <span class="underline-image" data-v-c46932e4="">better opportunities</span></h1>
                <p :class="{' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}" class="mt-5 ">Choose the training you want to enroll for and register it is as simple as that!</p>
            </div>
            <div class="3xs:hidden md:flex">
           <button
          @mouseover="handleMouseover"
          @mouseout="handleMouseout"  
          class="bg-[#009688] text-xl font-semibold rounded-lg text-white px-2  h-[2rem]  w-[10rem] mt-24">Browse All 
          
          <Icon name="maki:arrow"            
           :style="{ 'margin-left': arrowController.value ? '15px' : '0px' }"
            style="width:20px;height:20px;color: white;"/></button>

            </div>
        </div>
          <CorosolComponent :currentTheme="currentTheme" :items="CorosolData1" :showPrice="true" :showIcon="true"  :showPersonName="true" :othersValue="true" :itemToshow="itemToshow"/>
        
    </div>
</template>
