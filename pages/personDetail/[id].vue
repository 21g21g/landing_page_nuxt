<script setup>
import { useRoute,useRouter } from 'vue-router';
import {CorosolData2} from "../../utils/CorosolData"
import {MacDummy} from "../../utils/CorosolData"
import InstructorById from "../../graphql/GetinstructorById.gql"
import {MacDetail} from "../../utils/CorosolData"
import {ref} from "vue"
const route=useRoute()
const router=useRouter()
const borderController=ref(null)
import addis from "../../assets/addis.jpeg"
console.log(route.params.id);
const comingData = CorosolData2.find(coro => coro.id === parseInt(route.params.id));
console.log(comingData);

const handleMousehover=(id)=>{
    borderController.value=id
}
const handleMouseleave=()=>{
    borderController.value=null
}
const gotoDetailPage=(id)=>{
router.push(`/corosolDetail/${id}`)

}

const {result:instResult,loading:instLoading,error:instError}=useQuery(InstructorById,{id:String(route.params.id)})

</script>
<template>
<div>
    <div v-if="instLoading">Loading</div>
    <div v-else-if="instError">there is an error</div>
         <div v-else class="flex flex-col overflow-x-hidden h-auto  mt-2">
        <div class="flex  bg-[#f9fafb] w-full px-16  gap-10 pt-10">
            <div class="flex flex-col gap-4 w-2/4 px-10  ">
                <div class="flex flex-col rounded-md border bg-white border-slate-300 pr-2 pl-5 pt-5">
                    <div class="rounded-md w-full">
                  <img :src="instResult?.instructors_by_pk.profile_picture" alt="there is no image" class="object-contain filter grayscale brightness-90 w-[30rem]   rounded-md">

                    </div>
                 <div class="flex flex-row justify-between px-2 py-3">
                    <div class="flex flex-col gap-3">
                        <h1 class="font-normal text-2xl">{{instResult?.instructors_by_pk.name}}</h1>
                        <h1 class="text-[#374151]">{{instResult?.instructors_by_pk.position}}</h1>
                    </div>
                    <div class="flex flex-row gap-2">
                        <Icon name="skill-icons:linkedin" size="20"/>
                        <Icon name="logos:telegram" size="20"/>
                        <Icon name="logos:twitter" size="20"/>

                    </div>

                 </div>

                </div>
                <div class="flex flex-col gap-3 rounded-md border bg-white border-slate-300 mt-1 px-5 py-4">
                    <h1 class="text-lg text-[#374151]">About Instructor</h1>
                    <p class="text-sm text-[#374151]">Michale Sahlu is one of the notable industry veterans with over a decade of technical experience as a full-stack software developer and entrepreneur as a co-founder and CTO of Minab IT Solutions PLC. Michael specializes in system architecture and web platform development.</p>


                </div>
                <div class="flex flex-col rounded-md border bg-white border-slate-300 mt-1 px-5 py-4 gap-3">
                    <h1 class="text-lg text-[#374151]">Educational Background</h1>
                    <div class="flex flex-row gap-4 pl-1 mt-3">
                        <img :src="addis" alt="there is no image" class="object-cover w-16 h-16">
                        <div class="flex flex-col gap-2">
                            <h1 class="text-[#374151]">Addis Ababa University</h1>
                            <p class="text-[#374151] text-sm">Bachelor Degree</p>
                            <p class="text-[#374151] text-sm">Sep 2010 up to Aug 2014</p>
                        </div>

                    </div>

                </div>

            </div>

            <div class="flex w-2/3 flex-col items-center bg-white gap-4">
            <div class="flex w-full rounded-2xl border flex-col border-slate-300 pl-5 pr-1 py-4">
                  <h1 class="text text-2xl text-[#374151]">Industry Experience</h1>
                  <div v-for="mac in MacDummy" :key="mac" class="flex flex-col  mt-14 w-full">
                    <div class="flex flex-row  w-full gap-16 ">
                        <div class="flex flex-row gap-6 w-2/3">
                        <div class="w-28 h-28 md:w-14 md:h-14 ring-1 ring-gray-200 self-start bg-gray-100 place-content-center rounded-lg">
                     <img :src="mac.img" alt="there is no image" class="object-contain w-full">

                        </div>
                            <div class="flex flex-col  gap-2">
                             <h1 class="text-base">{{mac.company}}</h1>
                            <p class="text-xs">{{mac.title}}</p>
                            <p class="text-xs">{{instResult?.instructors_by_pk.instructor_experiences[0].total_years_of_experience}} Years of Experience</p>
                            </div>
                            


                        </div>
                        <div class="w-full">
                      <p class="text-base text-[#374151] pr-3">{{mac.desc}}</p>

                        </div>
                    </div>

                  </div>

              
            </div>
            <div class="rounded-md border border-slate-300 flex flex-col gap-6 pb-2 pt-6 pr-8 pl-10">
                <h1 class="text-2xl text-[#374151]">Courses</h1>
                <div v-for="maa in MacDetail" :key="maa"  class="flex flex-col border bg-[#f9fafb] rounded-xl  w-full gap-6 py-2 px-4"
                 @mouseover="handleMousehover(maa.id)" @mouseleave="handleMouseleave" :class="{'border-emerald-600 rounded-xl':borderController===maa.id}">
                     <div  class="flex flex-row gap-10 pt-6  cursor-pointer" @click="gotoDetailPage(maa.id)" >
                        <div class=" pt-12 pl-2 w-[40%] h-[35%]">
                            <img :src="maa.img" alt="this is image class" class="object-contain w-[15rem] h-[10rem]">
                        </div>
                        <div class=" flex flex-col  gap-2 pl-4 w-full">
                            <h1 class="text-xl text-[#374151] tracking-wide ">{{maa.head}}</h1>
                            <h3 class="text-[#374151] " >{{maa.ptag1}}</h3>
                            <h3 class="text-[#374151] ">{{maa.ptag2}}</h3>
                            <p class="text-[#374151] text-sm pr-8">{{maa.ptag3}}</p>
                            <div class="  w-full flex justify-end pr-6 pt-3 pb-4">
                <button @click="gotoDetailPage(maa/id)" class="text-emerald-800 font-semibold text-lg flex underline underline-offset-4 items-center group"> View Course Detail 
                <svg data-v-9c34c54e="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                 aria-hidden="true" role="img" class="icon text-emerald-800 emer text-2xl group-hover:scale-110 group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" 
                 width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="teal" d="M18 7.05a1 1 0 0 0-1-1L9 6a1 1 0 0 0 0 2h5.56l-8.27 8.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0L16 9.42V15a1 1 0 0 0 1 1a1 1 0 0 0 1-1Z">
                </path>
                </svg>
                </button>
                            </div>
                        </div>
                        


                     </div>

                </div>


            </div>
            </div>
            
          
        </div>

               <div class="border border-[[#374151]] -ml-40 -mr-48 mt-8"></div>

    </div>
</div>

</template>
<style scoped>
.colors{
    fill: teal;
}
</style>