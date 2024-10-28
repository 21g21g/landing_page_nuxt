<script setup>
import {CorosolData2} from "../utils/CorosolData"
// import CorosolComponent from "./CorosolComponent.vue"
import {ref,computed,onMounted} from "vue"
const windowWidth=ref(null)

const props=defineProps({
currenTheme:{
    type:String
  }
})
const updatewindowWidth=()=>{
    windowWidth.value=window.innerWidth
}

onMounted(()=>{
    updatewindowWidth()
  window.addEventListener("resize", updatewindowWidth);
})
const itemToshow=computed(()=>{
  return windowWidth.value >= 768 ? 4 : 1;
   

})


 
    </script>
     <template>
     <div class="flex flex-col mt-10 ">  
    <div class="flex flex-col items-center w-full">
        <h1 :class="{'text-[#374151]':currenTheme==='light','text-white':currenTheme==='dark',}" class="text-4xl font-semibold">Our Trainers</h1>
         <p :class="{'text-[#374151]':currenTheme==='light','text-white':currenTheme==='dark',}" class="mt-5 px-24  md:px-10 w-[35rem]  text-center">Muya works with industry leading trainers that have vast industry experience in their respective sector.</p>
        </div> 
   <CorosolComponent :currenTheme="currenTheme" :items="CorosolData2" :showPrice="false" :showIcon="false"  :showPersonName="false" :othersValue="false" :itemToshow="itemToshow"/>

    
</div>
</template>