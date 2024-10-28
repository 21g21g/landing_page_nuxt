<script setup>
import {ref} from "vue"
const borderController=ref(null)
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
//   class:{
//     type:String,
//   },
  othersValue:{
    type:Boolean,
    default:false,
  },
  itemToshow:{
    type:Number,
    default:1,
  },
currenTheme:{
    type:String
  }    
})
console.log(props.itemToshow)
const handleMoseOver=(id)=>{
    borderController.value=id

}
const handlemouseLeave=()=>{
    borderController.value=null
}

</script>

<style>

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
  width: 100px;
  height: 90px;
  fill: #046654; 
}
.carousel-slide {
    margin: 0;
    padding: 0;
}
.carousel__prev {

  left: -50px; 
  top: 380px;
}

.carousel__next {
  right: -50px; 
  top: 380px;
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
     </style>
       <template>
   
         <Carousel  :items-to-show="props.itemToshow"  class="mt-10  md:px-0   md:mx-0 mx-5 " 
        :class="{
            'md:w-[90rem]':!othersValue,
          
            
            }">
          <Slide v-for="slide in props.items" :key="slide" 
           >
            <div :class="{'border-2 border-[#18a095]':borderController===slide.id,
              'bg-white':currenTheme==='light','bg-[#1b2637]':currenTheme==='dark',
          'flex flex-col shadow-2xl rounded-md  md:w-[100rem] gap-1 h-[39rem] md:h-[50rem] md:pb-0 pb-6  md:mr-5  w-full md:px-0':othersValue ,
           'h-[35rem] gap-1 md:mr-3 shadow-2xl':!othersValue
           
       
       
        }"  @mousemove="handleMoseOver(slide.id)" @mouseout="handlemouseLeave" class="flex flex-col text-start md:gap-5 ">   
          <img :src="slide.img" alt="there is no image" class="h-50  object-cover " :class="{'object-cover mt-0 md:h-56 h-40 pb-2 rounded-md':othersValue,'filter grayscale brightness-90':!othersValue}">
          <h1 :class="{' text-[#4b5563]':currenTheme==='light','text-white':currenTheme==='dark'}" class="md:pl-5 pl-3 md:pr-0 pr-3"  v-if="props.showPrice">{{slide.price}}</h1>
          <h1 :class="{' text-[#4b5563]':currenTheme==='light','text-white':currenTheme==='dark'}"  v-if="props.othersValue" class="md:pl-5 pl-2 md:pr-0 pr-3 font-semibold text-xl">{{slide.title}}</h1>
          <h1 class="md:pl-5 pl-3 text-lg md:text-xl" v-else>{{slide.perTitle}}</h1>
          <h1 :class="{' text-[#4b5563]':currenTheme==='light','text-white':currenTheme==='dark'}" v-if="!props.othersValue" class="md:pl-5 pl-3 md:font-semibold font-normal  md:text-xl text-lg">{{slide.perName}}</h1>
          <p :class="{'mt-4 leading-7  ':!othersValue,' text-[#4b5563]':currenTheme==='light','text-white':currenTheme==='dark'}" class="md:pl-5 pl-3  md:pr-0 pr-1 md:line-clamp-none line-clamp-3 ">{{slide.description}}</p>
          <div class="flex flex-row justify-between text-start pl-3 md:pr-0 pr-3 md:pl-5">
            <div v-if="showIcon" class="flex flex-row gap-2 px-2 items-center">
                  <Icon :name="slide.icon1" :style="{ color: currenTheme === 'dark' ? 'white' : 'black' }"/> 
                  <h1 :class="{' text-[#4b5563]':currenTheme==='light','text-white':currenTheme==='dark'}">Venue</h1>
                  <Icon :name="slide.alarm" :style="{ color: currenTheme === 'dark' ? 'white' : 'black' }"/> 
            </div>
             <div v-if="showIcon" class="flex flex-row gap-2 text-start items-center px-2 md:px-5">
                  <Icon :name="slide.icon2" :style="{ color: currenTheme === 'dark' ? 'white' : 'black' }"/> 
                  <h1 :class="{' text-[#4b5563]':currenTheme==='light','text-white':currenTheme==='dark'}">Schedule</h1>
                  <Icon :name="slide.alarm" :style="{ color: currenTheme === 'dark' ? 'white' : 'black' }"/> 
            </div>
          </div>
          <p :class="{' text-[#4b5563]':currenTheme==='light','text-white':currenTheme==='dark'}" v-if="props.othersValue" class="md:pl-5 pl-2 ">HaHuJobs Employement Center </p>
          <div v-if="props.othersValue" class="border border-gray-400 px-5"></div>
          <div v-if="props.othersValue" class="flex flex-row md:gap-20  gap-12 items-center text-start  md:px-0 md:pl-5">
            <div class="flex flex-row gap-1  md:px-0 px-1 items-center">
            <Icon :name="slide.alarm" :style="{ color: currenTheme === 'dark' ? 'white' : 'black' }"/> 
            <h1 :class="{' text-[#4b5563]':currenTheme==='light','text-white':currenTheme==='dark'}">Duration</h1>
            </div>
            <div class="flex flex-row gap-1 md:px-0 px-3 items-center">
            <Icon  :name="slide.alarm" :style="{ color: currenTheme === 'dark' ? 'white' : 'black' }"/> 
            <h1 :class="{' text-[#4b5563]':currenTheme==='light','text-white':currenTheme==='dark'}">Class</h1>
            </div>
            <div class="flex flex-row gap-1 pr-4">
            <Icon :name="slide.alarm" :style="{ color: currenTheme === 'dark' ? 'white' : 'black' }"/> 
            <h1 :class="{' text-[#4b5563]':currenTheme==='light','text-white':currenTheme==='dark'}">Level</h1>
            </div>
          </div>
            <div v-if="props.othersValue" class="flex flex-row md:gap-14 gap-9 px-1 md:px-0 text-start mb-2 items-center  md:pl-5">
           
            <h1 :class="{' text-[#4b5563]':currenTheme==='light','text-white':currenTheme==='dark'}" class="md:text-sm text-xs">3 Months Month</h1>
          
            
            <h1 :class="{' text-[#4b5563]':currenTheme==='light','text-white':currenTheme==='dark'}">24-30 Classes</h1>
            <h1 :class="{' text-[#4b5563]':currenTheme==='light','text-white':currenTheme==='dark'}">Beginner</h1>
            </div>
             <div v-if="othersValue" class="border border-gray-400 px-5"></div>
             <div  v-if="othersValue" class="flex md:flex-row flex-col justify-between px-2 w-full mt-5">
                <div  class="flex flex-row gap-1 pb-4">
                    <img :src="slide.per1" alt="there is no image" class="rounded-full h-[3rem]  w-[3rem] md:h-[4rem] md:w-[4rem] object-contain">
                    <div class="flex flex-col gap-1">
                        <h1 :class="{'text-[#4b5563]':currenTheme==='light','text-white':currenTheme==='dark'}">{{slide.perName}}</h1>
                        <h1 :class="{'text-[#4b5563]':currenTheme==='light','text-white':currenTheme==='dark'}">{{slide.perTitele}}</h1>

                    </div>

                </div>
                <button :class="{' bg-white text-[#058075]':currenTheme==='light','text-white bg-[#058075]':currenTheme==='dark'}" v-if="othersValue" class="  rounded-lg border-2 border-[#058075] px-4 py-2 md:py-0  h-[3rem]">Register Now</button>

             </div>

         
       </div>

        </Slide>

    <template #addons>
      <Navigation />

     
    </template>
  </Carousel>
    
</template>


     
