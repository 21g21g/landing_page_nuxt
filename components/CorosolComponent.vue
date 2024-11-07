<script setup>
import { ref, toRefs,onMounted,computed,watch } from 'vue';
const borderController=ref(null)
import { useRouter } from 'vue-router';
import Courses from "../graphql/Courses.gql"
import hahu from "../assets/HaHuMuya.png"
import human from "../assets/humanLike.svg"
import education from "../graphql/education.gql"
import FeildofStudy from "../graphql/FeildofStudy.gql"
import Sector from "../graphql/Sector.gql"
import SearchSector from "../graphql/SearchSector.gql"
import SearchFieldStudy from "../graphql/SearchFieldStudy.gql"
import { useQuery } from '@vue/apollo-composable';
const router = useRouter()
const showDropdown = ref(null);
const selectedCountry = ref('');

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
const listEducation=ref([])
const fieldStudy=ref([])
const search = ref("");
const serchfiel=ref("")
const sector=ref([])
const {result:educationResult,loading:educationLoading,error:educationError,refetch: educationrefetch }=useQuery(education)
const {result:fielddResult,loading:fieldloading,error:fielderror,refetch:fieldrefetch}=useQuery(FeildofStudy)
const {result:sectorResult,loading:sectorLoading,error:sectorError,refetch:sectorrefetch}=useQuery(Sector)
const { result: searchResult, loading: searchLoading, error: searchError,refetch:searchrefetch } = useQuery(SearchSector,{
    search: "%", 
    limit: 10,
    offset: 0,
});
const { result: searchField, loading: searchfieldLoading, error: searchfiledError,refetch:searchfieldrefetch } = useQuery(SearchFieldStudy,{
   search: "%", 
    limit: 10,
    offset: 0,
});


const openModal=ref(false)
const steps = [
  { name: "Personal Info", id: 1, icon: "tabler:number-1" },
  { name: "Schedule", id: 2, icon: "tabler:number-2" },
  // { name: "Payment", id: 3, icon: "tabler:number-3" },
  { name: "Done", id: 3, icon: "tabler:number-3" },
];
const openRegisterModal = ref(false);
const first_name=ref("")
const last_name=ref("")
const phone_number=ref("")
const email=ref("")
const experience=ref("")
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
 
  console.log(id)
 

}

watch(search, (newSearchTerm) => {
  searchrefetch({ search: `%${newSearchTerm}%`, limit: 10, offset: 0 });
});

watch(serchfiel, (newFieldSearch) => {
  searchfieldrefetch({ search: `%${newFieldSearch}%`, limit: 10, offset: 0 });
});
watch(educationResult, (newResult) => {
  if (newResult && newResult.basic_education_levels) {
    listEducation.value = newResult.basic_education_levels;
  }
})

watch(fielddResult,(newField)=>{
  if(newField && newField.basic_fields_of_study){
    fieldStudy.value=newField.basic_fields_of_study

  }
})

watch(sectorResult,(newSector)=>{
  if(newSector && newSector.basic_sectors){
    sector.value=newSector.basic_sectors
  }

})

 const onSearch = async (searchTerm) => {
  console.log(searchTerm);
  search.value = searchTerm;

    if (searchTerm) {
    try {
      const { data } = await searchrefetch({ search: `%${search.value}%`, limit: 10, offset: 0 });
      sector.value = data.search_sectors;
    } catch (error) {
      sectorError.value = 'Error occurred while fetching sectors';
    }
  } else {
    try {
      await sectorrefetch();
      sector.value = []; 
    } catch (error) {
      sectorError.value = 'Error occurred while fetching all sectors';
    }
  }

  sectorLoading.value = false;
    };

    const onSearchField=async(searchField)=>{
  serchfiel.value = searchField;
      if (searchField) {
    try {
      const { data } = await searchfieldrefetch({ search: `%${serchfiel.value}%`, limit: 10, offset: 0 });
      fieldStudy.value = data.search_fields_of_study;
    } catch (error) {
      fielderror.value = 'Error occurred while fetching fields of study';
    }
  } else {
    try {
      await fieldrefetch();
      // fieldStudy.value = []; 
    } catch (error) {
      fielderror.value = 'Error occurred while fetching all fields of study';
    }
  }

  fieldloading.value = false;

    }



const submit=(event)=>{
  // event.preventDefault()
  console.log("object");
  console.log("submit");
  console.log(event);
}


console.log(props.items.length);




const selected = "1"; // for single-select
const selectedMultiple = ["1", "3"];
const getValue = (value) => {
  if (!value) {
    //props.textClass to  used only  for report pages
    
    emits("update:modelValue", undefined);
    emits("update:name", undefined);
  } else {
    emits("update:modelValue", value.id);
    emits("update:name", value.name);
  }
};

</script>


<template>
   <div>
   <HModal
    v-model="openModal"
    :autoClose="false"
    :enabledOverflow="true"
     :hasCloseIcon="true"
      title="Modal Title"
      mainClass="relative min-h-[90vh] text-left transition-all my-5 transform rounded-lg shadow-xl sm:w-full"
       wrapperClass="bg-white w-full max-w-5xl lg:max-w-6xl 3xl:max-w-7xl h-auto text-gray-700 flex flex-col justify-center dark:bg-secondary-dark-2"
  >
  <template #Heading>
   <h1  class="text-2xl text-teal-600 py-5 text-center font-semibold">
            Registration
          </h1>
  </template>
      
     <template #content>
     <div class="flex h-full relative">
        
         <div
          class="hidden bg-[#009688] lg:w-[30%] min-h-[90vh] bg-primary-3 h-auto lg:flex flex-col items-center px-5 py-20 justify-between rounded-l-lg"
        >
          <div class="flex flex-col items-center gap-y-5">
            <div class="w-40">
              <img :src="hahu" />
            </div>
            <div class="w-[80%]">
              <img :src="human" />
            </div>
          </div>
             <!-- <h1
              class="text-white font-bold uppercase text-xl 3xl:text-xl text-center"
            >
              {{ data.title }}
            </h1> -->
            <h1 class="text-white font-bold uppercase text-xl 3xl:text-xl text-center">title</h1>
            <!-- <p class="text-sm text-white text-justify">
              {{ data.summary }}
            </p> -->
            <p class="text-sm text-white text-justify">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus ipsam magni commodi iusto, odio nam! Accusantium, quidem? Nihil quaerat consectetur assumenda, tempore quis sed corrupti error, nam laborum, quibusdam voluptas.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore labore accusantium blanditiis aliquid rerum eius quam iure maiores, quibusdam consequatur omnis eveniet, nemo sapiente officia dignissimos suscipit numquam ea odio!</p>
            <div class="p-1 rounded-lg space-y-2 w-full">
              <h1 class="underline text-white font-semibold mb-2">
              instructors
              </h1>
              <NuxtLink
                class="flex md:space-x-4 items-center mb-2 bg-gray-100/10 p-2 rounded-lg ring-1 ring-transparent hover:ring-primary-3 duration-300"
                to="/"
                
              >
                <div class="flex rounded-full border-Primary-300 shrink">
                  <img
                    :src="human"
                    alt="Program Image"
                    class="object-cover w-[60px] h-[60px] rounded-full border-Primary-500 shrink-0"
                    width="60"
                    height="60"
                  />
                </div>
                <div class="flex flex-col space-y-1 ml-1 md:ml-4">
                 
                  <h1 class="text shrink-0 text-white font-semibold">kebede chane</h1>
                 
                  <h1 class="text text-white">this is description</h1>
                </div>
              </NuxtLink>
            </div>
          </div>
                
    
            <div
          class="flex flex-col justify-between flex-1 h-auto rounded-tr-lg relative"
        >
          <div
            class="py-10 lg:py-5 bg-gray-100 dark:bg-gray-700 rounded-tr-lg overflow-clip px-7 lg:px-20 relative top-24"
          >
            <HSteps :steps="steps" :step="step"></HSteps>
            <div
              class="flex lg:px-2 w-full justify-between relative -bottom-8 md:top-5 -mt-4"
              :class="step == 1 ? 'hidden' : 'justify-between'"
            >
              <button @click="step > 1 ? step-- : ''" class="self-start">
                <Icon
                  name="circum:circle-chev-right"
                  class="text-2xl md:text-3xl text-gray-300 rotate-180"
                />
              </button>
              <button
                type="submit"
                @click="step < 4 ? submit() : ''"
                class="self-end"
              >
                <Icon
                  name="circum:circle-chev-right"
                  class="text-2xl md:text-3xl text-gray-300"
                />
              </button>
            </div>
          </div>
          <div
            class="px-5 lg:px-10 pb-10 flex-1 mt-10 flex flex-col gap-y-10 justify-between"
          >
            <form
              @submit="submit"
             
              class="grid lg:grid-cols-2  gap-x-14 gap-y-3 lg:gap-y-4 3xl:gap-y-8 pt-5 lg:pt-10"
            >
              <HTextField
                v-model="first_name"
                label="first name"
                placeholder=""
                type="text"
                class="w-full"
                rules="required"
                name="first_name"
              >
                <template #label>
                  <p class="mb-2 dark:text-gray-300 font-light text-sm">
                    Name <span class="text-red-600">*</span>
                  </p>
                </template>
              </HTextField>
              <HTextField
                v-model="last_name"
                label="last name"
                placeholder=""
                type="text"
                class="w-full"
                rules="required"
                name="last_name"
              >
                <template #label>
                  <p class="mb-2 dark:text-gray-300 font-light text-sm">
                    Father Name <span class="text-red-600">*</span>
                  </p>
                </template>
              </HTextField>
              <HTextField
                v-model="phone_number"
                label="phone number"
                placeholder=""
                type="text"
                class="block w-full rounded-md text-gray-900 shadow-sm sm:text-base sm:leading-none h-10"
                placeholderStyle="text-gray-400 pl-14"
                rules="required|ethio_phone"
                name="phone_number"
              >
                <template #label>
                  <p class="mb-2 dark:text-gray-300 font-light text-sm">
                    Phone Number <span class="text-red-600">*</span>
                  </p>
                </template>
                <template v-slot:leading>
                  <div
                    class="absolute flex justify-center h-full rounded-l-md overflow-clip items-center w-14 text-gray-600 dark:text-gray-200"
                  >
                    +251
                  </div>
                </template>
              </HTextField>
              <HTextField
                v-model="email"
                label="email"
                placeholder=""
                type="text"
                class="w-full"
                 rules="email"
                name="email"
              >
                <template #label>
                  <p class="mb-2 dark:text-gray-300 font-light text-sm">
                    Email
                  </p>
                </template>
              </HTextField>

              <HTextField
                v-model="experience"
                label="years of experience"
                placeholder=""
                type="number"
                class="w-full"
                rules="required"
                name="years_of_experience"
              >
                <template #label>
                  <p class="mb-2 dark:text-gray-300 font-light text-sm">
                    Years of Experience <span class="text-red-600">*</span>
                  </p>
                </template>
              </HTextField>
                 
                    <p v-if="educationLoading">Loading..</p>
                    <p v-else-if="educationError">Error</p>
                    <div v-else>
                      <HListSelect 
                  
                       :options="listEducation"
                       name="level_of_education"
                     :classProp="classProp"
                      :rules="'required'"
                      selectId="country"
                    :modalValue="selectedCountry"
                      class="w-full">
                  <template #label>
                  <p class="mb-2 dark:text-gray-300 font-light text-sm">
                    Maximum Level of Education <span class="text-red-600">*</span>
                  </p>
                  </template>
                  </HListSelect>
                    </div>
                     <p v-if="fieldloading">Loading..</p>
                    <p class="text-red-700" v-else-if="fielderror">{{fielderror}}</p>
                    <div v-else>
                      <HListSearchSelect
                     id="my-select"
                       name="fields of study"
                      label="Select an Option"
                      :items="fieldStudy"
                     :selected="selected"
                     :multiple="true"  
                      :loading="false"
                      :disabled="disabled"
                       @onSelectionFound="getValue"

                     searchPlaceholder="Search"
                      value="id"
                      showBy="name"
                        listClass="h-40 dark:bg-gray-700 "
                         placeholderStyle="Select an option"
                      :clearable="true"
                      @search="onSearchField"
                      trailingIcon="tabler:chevron-down"
                        errorMessages="This field is required."
                        supporter="h-52"
                    >
                       <template #label>
                  <p class="mb-2 dark:text-gray-300 font-light text-sm">
                   Fields of Study
                  </p>
                   </template>
                      </HListSearchSelect> 
                    
                    </div>

               <p v-if="sectorLoading">Loading..</p>
                    <p class="text-red-700" v-else-if="sectorError">{{sectorError}}</p>
                    <div v-else>
                       <HListSearchSelect
                       id="my-select"
                        name="sector"
                         label="Select an Option"
                        :items="sector"
                         :selected="selected"
                         :disabled="disabled"
                          :multiple="true" 
                         :loading="false"
                         @search="onSearch"
                          placeholder="search"
                          searchPlaceholder="Search"
                           placeholderStyle="Select an option"
                             :clearable="true"
                            trailingIcon="tabler:chevron-down"
                             errorMessages="This field is required."
                           supporter="h-52"
                      >

                        
                       <template #label>
                      <p class="mb-2 dark:text-gray-300 font-light text-sm">
                        Sector
                         </p>
                          </template>
                      </HListSearchSelect> 
                    </div>
              <button @click="submit" class="bg-[#009688] ml-32 mt-10 w-full font-bold py-2 rounded-xl  text-white">Register</button>

                  
                    
                    
             

            
            </form>
            
        <div class="text-secondary-2 text-sm dark:text-white text-center">
                This site is protected by
                <span      class="text-[#009688] font-bold"

                  >reCAPTCHA</span
                >
                and the Google
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  class="text-[#009688] font-bold"
                  >Privacy Policy</a
                >
                and
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  class="text-primary"
                  >Terms of Service</a
                >
                apply.
              </div>          </div>
            </div>
            
        </div>
         <button
          @click="openModal = false"
          class="absolute top-2 right-2 z-[1000]"
        >
          <Icon
            name="mingcute:close-line"
            class="text-2xl text-primary-6 dark:text-gray-300"
          />
        </button>
        

  </template>

  </HModal>
    <Carousel   :items-to-show="props.itemToshow"  class="mt-10  md:px-0   md:mx-0 mx-5 " 
           >
          <Slide v-for="slide in props.items" :key="slide" :class="{' md:mr-10 ':othersValue}"
           >
            <div :class="{' border-[rgb(24,160,149)] rounded-xl':borderController===slide.id,
            'md:-ml-[54rem]':props.items?.length===1,
              'bg-[#f3f4f6]':currentTheme==='light','bg-[#1b2637]':currentTheme==='dark',
          'flex flex-col  gap-1 h-[39rem] rounded-xl md:h-[43rem] md:pb-0 pb-6    border  w-full md:px-0':othersValue 
           
       
       
        }"  @mousemove="handleMoseOver(slide.id)" @mouseout="handlemouseLeave" class="flex flex-col text-start md:gap-3 cursor-pointer rounded-xl"  @click="detailPage(slide.id)">   
          <img :src="slide.courses_media[0]?.url || ''" alt="there is no image" class="h-50  object-cover " :class="{'object-cover mt-0 md:h-56 h-40 pb-2 rounded-xl':othersValue,'filter grayscale brightness-90 object-cover rounded-xl':!othersValue}">
          <h1 :class="{' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}" class="md:pl-5 pl-3 md:pr-0 pr-3"  v-if="props.showPrice">{{slide.price}}</h1>
          <h1 :class="{' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}"  v-if="props.othersValue" class="md:pl-5 pl-2 md:pr-0 pr-3 font-semibold text-xl">{{slide.title}}</h1>
          <h1 class="md:pl-5 pl-3 text-lg md:text-sm" v-else>{{slide.perTitle}}</h1>
          <h1 :class="{' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}" v-if="!props.othersValue" class="md:pl-5 pl-3 md:font-semibold font-normal  md:text-xl text-lg">{{slide.perName}}</h1>
          <p :class="{'mt-1 leading-7 text-base md:line-clamp-3 line-clamp-none':!othersValue,' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}" class="md:pl-5 pl-3  md:pr-3 pr-1  line-clamp-3 " v-html="slide.description"></p>
          <div class="flex flex-row justify-between text-start pl-3 md:pr-0 pr-3 md:pl-5">
            <div  class="flex flex-row gap-2 px-2 items-center">
                <VMenu placement="bottom" offset="-10">
                    <div  class="flex flex-row gap-2 px-2 items-center">

                                        <Icon name="game-icons:chess-king" :style="{ color: currentTheme === 'dark' ? 'white' : 'black' }"/> 
                  <h1 :class="{' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}">Venue</h1>
                  <Icon name="material-symbols:alarm-outline" :style="{ color: currentTheme === 'dark' ? 'white' : 'black' }"/> 

                    </div>


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
                <div  class="flex flex-row gap-2 text-start items-center px-2 md:px-5">
                  <Icon name="uil:schedule" :style="{ color: currentTheme === 'dark' ? 'white' : 'black' }"/> 
                  <button :class="{' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}"
                  > Schedule</button>
                          
                  <Icon name="material-symbols:alarm-outline" :style="{ color: currentTheme === 'dark' ? 'white' : 'black' }"/> 
            </div>

                 <template #popper>
                <div v-for="sched in slide.course_schedules" :key="sched" class=" h-auto bg-white border border-slate-200 px-4 py-2 ">
                 <NuxtLink class="underline" :to="`/corosolDetail/${slide.id}`">Course Schedule</NuxtLink>
                 <div class="flex flex-col gap-2 mt-2">
                  <NuxtLink :to="`/corosolDetail/${slide.id}`">Class:- {{sched.class_type}}</NuxtLink>
                  <NuxtLink :to="`/${slide.id}`">Shift:- {{sched.shift}}</NuxtLink>
                  <!-- <NuxtLink :to="`/${slide.id}`">Class:-WeekDay</NuxtLink>
                  <NuxtLink :to="`/${slide.id}`">Shift:- Evening</NuxtLink>
                  <NuxtLink :to="`/${slide.id}`">Class:-WeekDay</NuxtLink>
                  <NuxtLink :to="`/${slide.id}`">Shift:- Afternoon</NuxtLink>
                  <NuxtLink :to="`/${slide.id}`">Class:-WeekDay</NuxtLink>
                    <NuxtLink :to="`/${slide.id}`">Shift:- Afternoon</NuxtLink>
                    <NuxtLink :to="`/${slide.id}`">Class:-WeekDay</NuxtLink>
                     <NuxtLink>Shift:- Afternoon</NuxtLink> -->




                 </div>
              </div>
           </template>
             </VMenu>
            
          </div>
          <p :class="{' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}" v-if="props.othersValue" class="md:pl-5 pl-2 ">HaHuJobs Employement Center </p>
          <div v-if="props.othersValue" class="border border-gray-300 mx-5"></div>
          <div v-if="props.othersValue" class="flex flex-row md:gap-28  gap-12 items-center text-start  md:px-0 md:pl-5">
            <div class="flex flex-row gap-1  md:px-0 px-1 items-center">
            <Icon name="material-symbols:alarm-outline" :style="{ color: currentTheme === 'dark' ? 'white' : 'black' }"/> 
            <h1 :class="{' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}">Duration</h1>
            </div>
            <div class="flex flex-row gap-1 md:px-0 px-3 items-center">
            <Icon  name="uil:schedule" :style="{ color: currentTheme === 'dark' ? 'white' : 'black' }"/> 
            <h1 :class="{' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}">Class</h1>
            </div>
            <div class="flex flex-row gap-1 pr-4">
            <Icon name="game-icons:chess-king" :style="{ color: currentTheme === 'dark' ? 'white' : 'black' }"/> 
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
                <div v-for="instruct in slide.course_instructors" :key="instruct"  class="flex flex-row gap-1 pb-4">
                    <img :src="instruct.instructor.profile_picture" alt="there is no image" class="rounded-full h-[3rem]  w-[3rem] md:h-[3rem] md:w-[3rem] object-contain">
                    <div class="flex flex-col gap-1">
                        <h1 :class="{'text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}">{{instruct.instructor.name}}</h1>
                        <h1 :class="{'text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}">{{instruct.instructor.position}}</h1>

                    </div>

                </div>
             <button   @click.stop="openModal = true"
               :class="{' bg-white text-[#058075]':currentTheme==='light','text-white bg-[#058075]'
               :currentTheme==='dark'}" v-if="othersValue" 
               class="  rounded-lg border border-[#058075] px-4 py-2 md:py-0  h-[3rem]">Register Now</button>

             </div>

         
       </div>

        </Slide>
    <template v-if=" props.items?.length>2"  #addons>

      <Navigation  v-if="itemToshow===3||4"/>
      <Pagination  class="pt-5"/>

     
    </template>
  </Carousel>
    
   </div>
   
</template>


     <style>
::-webkit-scrollbar {
  width: 0px;
  height: 1px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #f1f1f1;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #596474;
  border-radius: 3px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #596474;
}

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
