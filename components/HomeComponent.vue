<script setup>
const props=defineProps({
    homedata:{
        type:Object
    },
    currentTheme:{
      type:String
    }
})




</script>
<style scoped>
.overflow-hidden-wrapper {
  position: relative;
  padding-left: 2.5rem; 
  padding-right: 7rem;
  overflow: hidden; 
}

.animate-marquee {
  animation: marquee 10s linear infinite;
}

.animate-marquee2 {
  animation: marquee2 10s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes marquee2 {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
}
</style>

<template>
   <div class="flex flex-row  justify-between pl-6 md:pl-6 md:mr-12">
   <div class="flex flex-col mt-5 md:mt-16 md:gap-7 gap-3 md:w-[43rem] w-full">
       <h3 class="font-semibold text-lg">ለሀገር ልጅ <span class="text-[#009688]">በሀገር ልጅ !</span></h3>
       <p  :class="{'text-[#374151]':currentTheme==='light','text-white':currentTheme==='dark'}" class="md:text-5xl text-2xl font-semibold ">Register to acquire trending</p>

        <p class="md:text-5xl text-2xl font-semibold flex leading-3 text-[#009688]">marketable <span :class="{'text-[#374151]':currentTheme==='light','text-white':currentTheme==='dark'}" >skills</span></p>
        <p :class="{'text-[#374151]':currentTheme==='light','text-white':currentTheme==='dark'}" class="mt-6 md:mt-11 leading-6 text-sm ">{{props.homedata.paragraph2}}</p>
      <button class="bg-[#009688] text-white w-[10rem] mt-4 py-2 px-2 font-semibold rounded-md"> Explore Courses</button>
      <p :class="{'text-[#374151]':currentTheme==='light','text-white':currentTheme==='dark'}" class="mt-3">In partnership with:</p>
           <div class="relative flex overflow-x-hidden">

        <div class=" animate-marquee whitespace-nowrap md:gap-12  gap-14 flex flex-row md:mt-3 mt-6 ">

        <img :class="{'filter grayscale brightness-150':currentTheme==='dark'}" :src="props.homedata.hamber" alt="tere is no image" class=" md:h-10 md:w-32 h-10 w-20  object-contain">
         <img :class="{'filter grayscale brightness-150':currentTheme==='dark'}" :src="props.homedata.minabha" alt="tere is no image" class=" md:h-10 md:w-32 h-10 w-20   object-contain">

        <img :class="{'filter grayscale brightness-150':currentTheme==='dark'}" :src="props.homedata.canada" alt="tere is no image" class=" md:h-10 md:w-32 h-10 w-20   object-contain">

        <img :class="{'filter grayscale brightness-150':currentTheme==='dark'}" :src="props.homedata.childp" alt="tere is no image" class=" md:h-10 md:w-32 h-10 w-20   object-contain">

      </div>
       <div class=" animate-marquee2 whitespace-nowrap md:gap-12 gap-14 flex flex-row mt-3 ">

        <img :class="{'filter grayscale brightness-150':currentTheme==='dark'}" :src="props.homedata.hamber" alt="tere is no image" class=" md:h-10 md:w-32 h-10 w-20   object-contain">
         <img :class="{'filter grayscale brightness-150':currentTheme==='dark'}" :src="props.homedata.minabha" alt="tere is no image" class=" md:h-10 md:w-32 h-10 w-20  object-contain">

         <img :class="{'filter grayscale brightness-150':currentTheme==='dark'}" :src="props.homedata.canada" alt="tere is no image" class=" md:h-10 md:w-32 h-10 w-20   object-contain">

        <img :class="{'filter grayscale brightness-150':currentTheme==='dark'}" :src="props.homedata.childp" alt="tere is no image" class=" md:h-10 md:w-32  h-10 w-20   object-contain">

      </div>

     </div>
    
      
    </div>
   <div class="flex flex-row gap-8 pr-6">
    <div class="lg:flex lg:flex-col hidden gap-8 mt-2">
       <img :src="props.homedata.pers1" alt="there is no image" class="object-cover h-60 w-[14rem] rounded-2xl">
       <img :src="props.homedata.pers2" alt="there is no image" class="object-cover h-60 w-[14rem] rounded-2xl">

    </div>
     <div class="xl:flex xl:flex-col hidden gap-8 mt-32">
       <img :src="props.homedata.pers3" alt="there is no image" class="object-cover h-60 w-[14rem]  rounded-2xl">
       <img :src="props.homedata.pers4" alt="there is no image" class="object-cover h-60 w-[14rem] rounded-2xl">
    </div>
    
   </div>
   </div>
</template>