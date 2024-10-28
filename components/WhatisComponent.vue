<script setup>
import {ref} from "vue"
const props=defineProps({
    whatis:{
        type:Array,
    },
    currentTheme:{
      type:String
    }
})
const borderControl=ref(null)
const handleMoseOver=(id)=>{
    borderControl.value=id
    console.log(borderControl.value)
}
const handlemouseLeave=()=>{
    borderControl.value=null
}
// :class="{'text-[#374151]':currentTheme==='light','text-white':currentTheme==='dark',}"

</script>
<template>
       <div :class="{'bg-[#f0f4f8]':currentTheme==='light','bg-[#1f2937]':currentTheme==='dark',}" class="flex flex-col py-10 md:mt-0 mt-16">
          <div class="flex flex-col mt-2 items-center justify-center">
            <h1 :class="{'text-[#374151]':currentTheme==='light','text-white':currentTheme==='dark',}" class="text-center text-2xl md:text-3xl font-medium">What is in Muya?</h1>
          <p :class="{'text-[#374151]':currentTheme==='light','text-white':currentTheme==='dark',}" class="md:text-center  text-left md:w-[50rem] w-full md:px-10 px-16 tracking-wide md:tracking-normal  leading-9 mt-3">Muya offers a diverse set of technical and soft skills training for students, jobseekers and professionals alike. It offers capacity building programs of different types and levels partnering with a diverse set of development partners.</p>
        </div>
         <div class="flex md:flex-row flex-col md:gap-2 gap-3 md:items-center px-16 md:px-0 items-start mt-16">
        <div
        
          class="flex flex-col rounded-xl items-center 
          gap-3 md:ml-6 ml-0  py-8 mb-4 px-5 md:mr-8 md:h-[27rem]"
          v-for="what in props.whatis" :key="what"
          @mouseleave="handlemouseLeave"
          @mouseover="handleMoseOver(what.id)"
          :class="{'border-2 border-[#009688]':borderControl===what.id,'bg-white':currentTheme==='light','bg-[#1f2937] border border-slate-50':currentTheme==='dark'}"
          >
           
                
          <img :src="what.second" 
          
          alt="there is no image"  
          class=" object-fill shadow-2xl
            p-5 
          rounded-full h-32 w-[8rem] "
          :class="{'border-2 border-[#009688]':borderControl===what.id}"
          >

          
            <h1 :class="{'text-[#374151]':currentTheme==='light','text-white':currentTheme==='dark',}" class="pt-10">{{what.title}}</h1>
            <p :class="{'text-[#374151]':currentTheme==='light','text-white':currentTheme==='dark',}" class="text-sm leading-7 text-center text-clip md:pb-10  mt-4">{{what.ptag}}</p>
            </div>
          

        </div>
       
         
    </div>
</template>