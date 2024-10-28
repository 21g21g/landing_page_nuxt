<script setup>
// import {Accordion} from "../utils/Accordion"
const props=defineProps({
    currenTheme:{
        type:String
    }
})
 const  items =ref([
    {
       id:1,
      title: "Do You Offer A Certificate For Your Training?",
      open: false,
      content: "As a licensed short-term technical training provider HaHuJobs provides certificates for all its short and medium-duration physical/virtual courses.",
    },
    {
        id:2,

      title: "Do You Have Prerequisites To Enroll For Training?",
      open: false,
      content: "Yes, based on the level and type of training, HaHuJobs sets basic qualification and prerequisite criteria before your registration for training is approved. Please teach each training detail before registering.",
    },
    {
       id:3,

      title: "Do You Offer Weekend And After-Office Hour Sessions?",
      open: false,
      content: "Yes, HaHuJobs offers night and weekend classes, however, review the schedules provided for each training program.",
    },
   
  ]);
  //  
</script>
<template>
    <div :class="{'bg-[#1b2637]':currenTheme==='dark'}" class="flex w-full  md:ml-20 ml-12 md:flex-row flex-col items-center md:mt-[10rem] mt-24">
      <div class="">
        <h1 :class="{'text-[#374151]':currenTheme==='light','text-white':currenTheme==='dark'}" class="md:text-2xl text-xl font-bold ">Frequently Asked Questions</h1>
        <p :class="{'text-[#374151]':currenTheme==='light','text-white':currenTheme==='dark'}" class="text-sm text-left">
          You didn’t find the answers you were looking for? Reach out
          
          to our <span class="text-[#009688]">customer support</span> team through our Contact Us page.
        </p>
      </div>
      <div class="md:mt-0 mt-10 items-center">
        <Accordion :currenTheme="currenTheme" :items="items" :collabsable="true" >
          <template #content="{ item }" >
            <p :class="{'text-[#374151]':currenTheme==='light','text-white':currenTheme==='dark'}" class="md:text-lg text-sm">
              {{ item.content }}
            </p>
          </template>
        </Accordion>
      </div>
    </div>

 
</template>