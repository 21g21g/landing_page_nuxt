<script setup>
import {CorosolData1} from "../../utils/CorosolData"
import {ref} from "vue"
const currentTheme = useState('currentTheme');

const borderController=ref(null)
import { useRouter } from 'vue-router';

const router = useRouter()
const showDropdown = ref(null);
// const props=defineProps({
//     currentTheme:{
//     type:String
//   }  
// })
const handleMoseOver=(id)=>{
    borderController.value=id

}

const handlemouseLeave=()=>{
    borderController.value=null
}
const showDropdownmove=(id)=>{
  showDropdown.value=id

}
const showDropdownout=()=>{
  showDropdown.value=null

}

const detailPage=(id)=>{
  
     router.push(`/corosolDetail/${id}`)

  }
 
</script>
<template>
    <div class="grid md:grid-cols-3 grid-cols-2  
    
    text-start md:gap-3 cursor-pointer rounded-xl 
     md:pb-0 pb-6   mt-3  border  w-[65rem] md:px-0 gap-4" 
    
  >
  <div :class="{' border-teal-600 rounded-xl':borderController===slide.id,
              'bg-white':currentTheme==='light','bg-[#1b2637]':currentTheme==='dark',
                }"  @mousemove="handleMoseOver(slide.id)"
                 @mouseout="handlemouseLeave"
                 @click="detailPage(slide.id)" v-for="slide in CorosolData1" :key="slide" class="border" >  
                   
         <img :src="slide.img" alt="there is no image" class=" object-cover mt-0   pb-2 rounded-xl">
                  
          <h1 :class="{' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}" class="md:pl-5 pl-3 md:pr-0 pr-3"  >{{slide.price}}</h1>
          <h1 :class="{' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}"  class="md:pl-5 pl-2 md:pr-0 pr-3 line-clamp-1 font-semibold text-xl mt-4">{{slide.title}}</h1>
          <h1 class="md:pl-5 pl-3 text-lg md:text-sm mt-4">{{slide.perTitle}}</h1>
          <p :class="{'text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}" class="md:pl-5 pl-3  md:pr-3 pr-1 line-clamp-3 ">{{slide.description}}</p>
          <div class="flex flex-row justify-between text-start px-3 mt-6 ">
            <div  class="flex flex-row gap-2">
                  <Icon :name="slide.icon1" :style="{ color: currentTheme === 'dark' ? 'white' : 'black' }"/> 
                  <h1 :class="{' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}">Venue</h1>
                  <VMenu placement="bottom" offset="-10">
                  <Icon :name="slide.alarm" :style="{ color: currentTheme === 'dark' ? 'white' : 'black' }"/> 


                 <template #popper>
                <div class="w-32 h-20  bg-white border border-slate-200 px-4 py-2 gap-3 items-center ">
                 <h1>Hahu <span class="text-teal-500">Muya</span></h1>
                <NuxtLink to="https://www.google.com/maps/@8.9849856,38.7853608,3158m/data=!3m1!1e3!5m1!1e1?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D"  target="_blank" class="text-teal-500 underline mt-3">View Map </NuxtLink>
                <Icon name="fluent:square-arrow-forward-16-regular"   style="color:green" />
                  </div>    
               </template>
               </VMenu>
            </div>
                <VMenu placement="bottom" offset="-10">
                <div  class="flex flex-row gap-2 text-start items-center px-2">
                  <Icon :name="slide.icon2" :style="{ color: currentTheme === 'dark' ? 'white' : 'black' }"/> 
                  <button :class="{' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}"
                  > Schedule
                  </button>
                          
                  <Icon :name="slide.alarm" :style="{ color: currentTheme === 'dark' ? 'white' : 'black' }"/> 
            </div>

                 <template #popper>
                <div class=" h-56 bg-white border border-slate-200 px-4 py-2 ">
                 <NuxtLink class="underline" :to="`/corosolDetail/${slide.id}`">Course Schedule</NuxtLink>
                 <div class="flex flex-col gap-2 mt-2">
                  <NuxtLink :to="`/corosolDetail/${slide.id}`">Class:- WeekDays</NuxtLink>
                  <NuxtLink :to="`/${slide.id}`">Shift:- Morning</NuxtLink>
                  <NuxtLink :to="`/${slide.id}`">Class:-WeekDay</NuxtLink>
                  <NuxtLink :to="`/${slide.id}`">Shift:- Evening</NuxtLink>
                  <NuxtLink :to="`/${slide.id}`">Class:-WeekDay</NuxtLink>
                  <NuxtLink :to="`/${slide.id}`">Shift:- Afternoon</NuxtLink>
                  <NuxtLink :to="`/${slide.id}`">Class:-WeekDay</NuxtLink>
                    <NuxtLink :to="`/${slide.id}`">Shift:- Afternoon</NuxtLink>
                    <NuxtLink :to="`/${slide.id}`">Class:-WeekDay</NuxtLink>
                     <NuxtLink>Shift:- Afternoon</NuxtLink>


</div>
      </div>
    </template>
       </VMenu>
            
          </div>
          <p :class="{' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}" class=" mt-5 px-3 ">HaHuJobs Employement Center </p>
          <div  class="border border-gray-300 mt-4 mx-3"></div>
          <div class="flex flex-row gap-6 items-center text-start mt-4 px-3">
            <div class="flex flex-row gap-1  md:px-0 px-1 items-center">
            <Icon :name="slide.alarm" :style="{ color: currentTheme === 'dark' ? 'white' : 'black' }"/> 
            <h1 :class="{' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}">Duration</h1>
            </div>
            <div class="flex flex-row gap-1 md:px-0 px-3 items-center">
            <Icon  :name="slide.alarm" :style="{ color: currentTheme === 'dark' ? 'white' : 'black' }"/> 
            <h1 :class="{' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}">Class</h1>
            </div>
            <div class="flex flex-row gap-1 pr-4">
            <Icon :name="slide.alarm" :style="{ color: currentTheme === 'dark' ? 'white' : 'black' }"/> 
            <h1 :class="{' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}">Level</h1>
            </div>
          </div>
            <div  class="flex flex-row  gap-2   text-start  items-center px-3 mt-4">
           
            <h1 :class="{' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}" class="md:text-sm text-xs">3 Months Month</h1>
          
            
            <h1 :class="{' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}">24-30 Classes</h1>
            <h1 :class="{' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}">Beginner</h1>
            </div>
             <div  class="border border-gray-300 mx-3 mt-2"></div>
             <div  class="flex md:flex-row flex-col justify-between px-4 w-full mt-5">
                <div  class="flex flex-row gap-1 pb-4">
                    <img :src="slide.per1" alt="there is no image" class="rounded-full h-[3rem]  w-[3rem] md:h-[3rem] md:w-[3rem] object-contain">
                      <div class="flex flex-col gap-1">
                        <h1 class="line-clamp-1" :class="{'text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}">{{slide.perName}}</h1>
                        <h1 class="line-clamp-1" :class="{'text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}">{{slide.perTitele}}</h1>

                    </div>

                </div>
                <button :class="{' bg-white text-[#058075]':currentTheme==='light','text-white bg-[#058075]':currentTheme==='dark'}"  class="  rounded-lg border w-[10rem] h-11 border-[#058075] ">Register Now</button>

             </div>

         
       </div>

        </div>
</template>

<style scoped>

</style>