<script setup>
import {AboutData} from "../../utils/HomeData"
// const props=defineProps({
//     currentTheme:{
//         type:String
//     }
// })

const props=defineProps({
  
    currentTheme:{
        type:String
    }
})
const text=AboutData.head
const text1=text.replace("Muya","").trim()
const text2=text.replace("HaHu","").trim()

 </script>
        <template>
        <div class="flex md:flex-row flex-col md:pl-16 md:pr-7 pl-6 pr-6 md:mt-0 mt-20   md:justify-center justify-start md:items-center items-start ">
        <img :src="AboutData.human" alt="there is no image" class="object-cover w-[33rem] mt-3 md:order-1 order-2">
        <div class="flex flex-col md:pl-20 md:pr-5 md:ml-40 md:mt-10 mt-0 md:order-2 order-1">
        <h1 :class="{'text-[#374151]':currentTheme==='light','text-white':currentTheme==='dark'}" class="text-4xl font-semibold">{{text1}} <span class="text-[#009688] font-semibold">{{text2}}</span></h1>
        <p :class="{'text-[#374151]':currentTheme==='light','text-white':currentTheme==='dark'}" class="text-lg  mt-5 md:mt-2  leading-7  md:pt-4  md:text-justify  text-start">{{AboutData.para1}}</p>
        <p :class="{'text-[#374151]':currentTheme==='light','text-white':currentTheme==='dark'}" class="text-lg selection:bg-orange-700  leading-7 md:pt-4 pt-3 md:text-justify  text-start"> {{AboutData.para2}}</p>
        </div>
        

    </div>
</template>