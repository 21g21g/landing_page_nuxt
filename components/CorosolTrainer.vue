<script setup>
import {ref} from "vue"
const borderController=ref(null)
import { useRouter } from 'vue-router';
import Courses from "../graphql/Courses.gql"
const router = useRouter()
const showDropdown = ref(null);

const props=defineProps({
    items:{
        type:Array,
        required:true,
    },
    showPrice:{
        type:Boolean,
        default:false,
    },
    showIcon:{
        type:Boolean,
        default:false,
    },
    showPersonName: {
    type: Boolean,
    default: false,
  },

  othersValue:{
    type:Boolean,
    default:false,
  },
  itemToshow:{
    type:Number,
    default:1,
  },
currentTheme:{
    type:String
  }    
})
const openRegisterModal = ref(false);

console.log(props.itemToshow)
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
  if(props.othersValue){
     router.push(`/corosolDetail/${id}`)

  }
  else{
  router.push(`/personDetail/${id}`)
  }
  console.log(id)
 

}
const openModal=()=>{
  openRegisterModal.value=true
}
//  <p v-html="slide.description" :class="{'mt-1 leading-7 text-base md:line-clamp-3 line-clamp-none':!othersValue,' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}" class="md:pl-5 pl-3  md:pr-3 pr-1  line-clamp-3 "></p>

</script>


<template>
   <div>
   <ModalRegisterModal
      v-model="openRegisterModal" 
      v-if="openRegisterModal"
      :data="Courses"
      wrapperClass="bg-white w-full md:max-w-[35rem] h-full text-black flex flex-col justify-center dark:bg-secondary-dark-2"
    />
    <Carousel   :items-to-show="props.itemToshow"  class="mt-10  md:px-0   md:mx-0 mx-5 " 
           :class="{
            'md:w-[90rem]':!othersValue,
            'mx-1':props.items.length===1
          
            
            }">
          <Slide v-for="slide in props.items" :key="slide"
           >
            <div :class="{' border-[rgb(24,160,149)] rounded-xl':borderController===slide.id,
              'bg-[#f3f4f6]':currentTheme==='light','bg-[#1b2637]':currentTheme==='dark',
              'h-auto w-[60rem]  md:mr-5 border rounded-2xl':!othersValue,'mr-1':props.itemToshow===1
           
       
       
        }"  @mousemove="handleMoseOver(slide.id)" @mouseout="handlemouseLeave" class="flex flex-col text-start md:gap-3 cursor-pointer rounded-xl"  @click="detailPage(slide.id)">  
             <div class="rounded-md w-full">
                  <!-- <img :src="instResult?.instructors_by_pk.profile_picture" alt="there is no image" class="object-contain filter grayscale brightness-90 w-[30rem]   rounded-md"> -->
                            <img :src="slide?.profile_picture" alt="there is no image" class="object-cover  w-[60rem]" :class="{'filter grayscale brightness-90 object-cover rounded-xl':!othersValue}">


                    </div> 
          <h1 class="md:pl-5 pl-3 text-lg md:text-sm" >{{slide.position}}</h1>
          <h1 :class="{' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}"  class="md:pl-5 pl-3 md:font-semibold font-normal  md:text-xl text-lg">{{slide.name}}</h1>
          <p :class="{'mt-1 leading-7 text-base md:line-clamp-3 line-clamp-none':!othersValue,' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}" class="md:pl-5 pl-3  md:pr-3 pr-1  line-clamp-3 ">{{slide.bio}}</p>
        
          <p :class="{' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}" v-if="props.othersValue" class="md:pl-5 pl-2 ">HaHuJobs Employement Center </p>
          <div v-if="props.othersValue" class="border border-gray-300 mx-5"></div>
          <div v-if="props.othersValue" class="flex flex-row md:gap-28  gap-12 items-center text-start  md:px-0 md:pl-5">
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
            <div v-if="props.othersValue" class="flex flex-row md:gap-20 gap-9 px-1 md:px-0 text-start  items-center  md:pl-5">
           
            <h1 :class="{' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}" class="md:text-sm text-xs">3 Months Month</h1>
          
            
            <h1 :class="{' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}">24-30 Classes</h1>
            <h1 :class="{' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}">Beginner</h1>
            </div>
             <div v-if="othersValue" class="border border-gray-300 mx-5"></div>
             <div  v-if="othersValue" class="flex md:flex-row flex-col justify-between px-4 w-full mt-5">
                <div  class="flex flex-row gap-1 pb-4">
                    <img :src="slide.per1" alt="there is no image" class="rounded-full h-[3rem]  w-[3rem] md:h-[3rem] md:w-[3rem] object-contain">
                    <div class="flex flex-col gap-1">
                        <h1 :class="{'text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}">{{slide.perName}}</h1>
                        <h1 :class="{'text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}">{{slide.perTitele}}</h1>

                    </div>

                </div>
             <button   @click="openModal()"
               :class="{' bg-white text-[#058075]':currentTheme==='light','text-white bg-[#058075]'
               :currentTheme==='dark'}" v-if="othersValue" 
               class="  rounded-lg border border-[#058075] px-4 py-2 md:py-0  h-[3rem]">Register Now</button>

             </div>

         
       </div>

        </Slide>

    <template #addons>
        <div :class="{'hidden':props.items.length===1}">
           <Navigation v-if="itemToshow===3||4"/>
        </div>
  
      

      <Pagination  class="pt-5"/>

     
    </template>
  </Carousel>
    
   </div>
   
</template>


     <style>
:root {
  /* Color */
  --vc-clr-primary: #00dcac00;
  /* --vc-clr-secondary: #009688; */
  --vc-clr-secondary: rgba(0, 150, 136, 0.4);
  --vc-clr-white: #ffffff;
  --vc-clr-hsecondary: #e5e5e5;
  --vc-clr-pagprimary: #009688;

  /* Icon */
  --vc-icn-width: 1.2em;

  /* Navigation */
  --vc-nav-width: 70px;
  --vc-nav-height: 70px;
  --vc-pgn-height: 7px;
  /* --vc-nav-color: #009688; */
  --vc-nav-color: rgba(0, 150, 136, 0.4);
  --vc-pgn-border-radius: 19px !important;
  --vc-nav-background-color: var(--vc-clr-primary);
  --vc-pgn-background-color: var(--vc-clr-hsecondary);
  --vc-pgn-active-color: var(--vc-clr-pagprimary);
  --vc-pgn-margin: 0px;
}
.carousel__prev,
.carousel__next {
  color: #058075;
  padding: 10px; 
  width: 70px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease, border-color 0.3s ease; /* Smooth transitions */
}


.carousel__icon {
  width: 120px;
  height: 100px;
  fill: #046654; 
}

.carousel-slide {
    margin: 0;
    padding: 0;
}
.carousel__prev {

  left: -30px; 
  top: 300px;
}

.carousel__next {
  right: -45px; 
  top: 300px;
}
.carousel__pagination-button {
  background-color: var(--vc-pgn-background-color);
  height: 7px;
  border-radius: 30%;
}

.carousel__pagination-button--active {
  background-color: var(--vc-pgn-active-color);
  gap: 10px;
  height: var(--vc-pgn-height);
  border-radius: 30%;
  /* height: var(--vc-nav-height);
  width: var(--vc-nav-width);
  border-radius: 30%; */
}
@media (max-width: 768px) {


  .carousel__next {
    right: -50px;
    top: 300px; 
  }
  .carousel__prev {

  left: -50px; 
  top: 300px;
}
} 

.carousel__pagination {
  display: flex;
  justify-content: center;
  pad: 0px;
  gap: 10px;
}

     </style>
