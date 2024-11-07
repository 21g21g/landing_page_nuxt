<script setup>
import { useRoute ,useRouter} from "vue-router";
import { SmallCorosol } from "../../utils/CorosolData";
import Accordion2 from "../../components/Accordion2.vue";
import { CorosolData1 } from "../../utils/CorosolData";
import { items } from "../../utils/Accordion";
import Courses from "../../graphql/Courses.gql"

// import {classesData} from "../../utils/HomeData"
import { ref, onMounted, computed, watch } from "vue";

const route = useRoute();
const router=useRouter()
console.log(route.params);
const showReadMoreButton = ref(false);
const borderController=ref(null)
const isExpanded = ref(false);
const sidebarHeight = ref(0);
 const initialSIdbar=ref(0)
const htmlContent=ref("<p class=\"ql-align-justify\"><strong>Introduction to back-end web development</strong></p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">HaHuJobs in partnership with its parent company <a href=\"https://www.minabtech.com/\" rel=\"noopener noreferrer\" target=\"_blank\">Minab IT Solutions PLC</a> is offering specialized training in software development as well as career opportunities through <a href=\"https://t.me/hahujobs\" rel=\"noopener noreferrer\" target=\"_blank\">HaHuJobs</a> job matching platforms. Accordingly, software development experts will offer a three-month extended training outlined as per the below-stated lesson plan. The plan offers insights on how the training will be offered, what components it features, and in what specific subject areas it will focus. The training aims to provide trainees with guidelines and insights on software engineering and/or related field-specialized skills. It also offers learning methods and best practices under each training category.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">The training features reading and implementation assessments and exercises submissions from trainees to offer feedback for improvement or qualification. Assignments are given to trainees at the middle and end of each training category. This specialized training will be administered in both lectured and hands-on lesson practice format based on instruction from trainers. Each training class will have two trainers, one who leads the lecture and the other an assistant to help and assist in technical examples. The training will have a total of 24 classes each with a 2-hour duration and classes allocated for each module of the training.&nbsp;</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\"><strong>Trinee Qualification and Prerequisites</strong></p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">To qualify for this training, one needs to pass through the main qualifiers, a working understanding of specific subject matters in software engineering. As a primary qualifier a basic understanding of web programming, web development concepts, and programming fundamentals are essential. Each registrant will be evaluated against such measures before enrolling in a training program.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Trainees should have an understanding of basic software engineering concepts which are expected to be administered through various education materials is necessary. Among others below is a list of courses and subject matter understandings that trainees enrolling for these specialized trainings are expected to have: -</p><ul><li class=\"ql-align-justify\">Introduction to Programming</li><li class=\"ql-align-justify\">Web programming, especially CSS, HTML, and JavaScript</li><li class=\"ql-align-justify\">Mobile programming (recommended not essential)</li><li class=\"ql-align-justify\">Advanced database management</li><li class=\"ql-align-justify\">Basic understanding of GIT</li><li class=\"ql-align-justify\">Basics understanding of Linux OS and environment</li><li class=\"ql-align-justify\">Basic understanding of software architecture&nbsp;</li></ul><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\"><strong>Front-end web development</strong></p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Front-end web development training is aimed at providing the technical skills required to build platform back-end structures using <a href=\"https://graphql.org/\" rel=\"noopener noreferrer\" target=\"_blank\">GraphQL</a>. This training features a recap on database management, in-depth training on the <a href=\"https://hasura.io/\" rel=\"noopener noreferrer\" target=\"_blank\">Hasura GraphQL</a> server, and setting up a back-end dockerize environment and logic implementation using <a href=\"https://go.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">Golang</a>.</p><ul><li class=\"ql-align-justify\"><strong><em>Database management recap</em></strong>: - this module will help trainees revisit database management concepts in query language, relations, and schema definitions which are essential for the modules to follow.</li><li class=\"ql-align-justify\"><strong><em>Back-end design</em></strong>: - this training module will focus on offering trainees skills on how to translate client-approved mockups and wireframes to a backend structure using <a href=\"https://hasura.io/\" rel=\"noopener noreferrer\" target=\"_blank\">Hasura GraphQL</a>. </li><li class=\"ql-align-justify\"><strong><em>GraphQL</em></strong>: - this module will introduce and help acquire technical skills on how to implement <a href=\"https://graphql.org/\" rel=\"noopener noreferrer\" target=\"_blank\">GraphQL</a> and what it is in general.</li><li class=\"ql-align-justify\"><strong><em>Setting up a back-end deployment</em></strong>: - this module is intended to enable trainees to acquire a working knowledge of how to design and set up the back end of a project using Goland and <a href=\"https://www.docker.com/\" rel=\"noopener noreferrer\" target=\"_blank\">Docker</a> for environment configurations.</li><li class=\"ql-align-justify\"><strong><em>Back-end logic model</em></strong>: - this module will introduce trainees to how best to model and implement back-end logic using <a href=\"https://go.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">Golang </a>using the <a href=\"https://expressjs.com/\" rel=\"noopener noreferrer\" target=\"_blank\">Express.Js</a> framework.&nbsp;</li></ul>",
)
const {result:courseResult,loading:courseLoading,error:courseError}=useQuery(Courses)

const comingData = CorosolData1.find(coro => coro.id === 1);

const windowWidth = ref(null);
const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted( () => {
  const paragraphElement = document.querySelector(".paragraph-content");
  sidebarHeight.value=document.querySelector(".sidebar").scrollHeight

  showReadMoreButton.value = paragraphElement.scrollHeight > sidebarHeight.value;

})

const calculateSidebarHeight = () => {
  const sidebarElement = document.querySelector(".sidebar");
  const imageHeight=document.querySelector(".contenimage")
  sidebarHeight.value = sidebarElement.scrollHeight-imageHeight.scrollHeight
};
onMounted(() => {
     updateWindowWidth()
  window.addEventListener("resize", updateWindowWidth);
  calculateSidebarHeight();
  const paragraphElement = document.querySelector(".paragraph-content");
  showReadMoreButton.value = paragraphElement.scrollHeight > sidebarHeight.value;

  // Add event listener to update height on window resize
  window.addEventListener('resize', calculateSidebarHeight);
});
watch(htmlContent, () => {
  calculateSidebarHeight();
  const paragraphElement = document.querySelector(".paragraph-content");
  showReadMoreButton.value = paragraphElement.scrollHeight > sidebarHeight.value;
});

// Clean up event listener on component unmount
onBeforeUnmount(() => {
  window.removeEventListener('resize', calculateSidebarHeight);
});

watch(htmlContent, () => {
 const paragraphElement = document.querySelector(".paragraph-content");
 sidebarHeight.value = document.querySelector(".sidebar").scrollHeight

  showReadMoreButton.value = paragraphElement.scrollHeight > sidebarHeight.value;
  });
const itemToshow = computed(() => {
  return windowWidth.value >= 768 ? 3 : 1;
});
const updateSidebarHeight = (height) => {
  sidebarHeight.value+= height;
};
const decreseSidebar=(height)=>{
  sidebarHeight.value-=height

}
const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
  
};

const handleMousehover=(id)=>{
  borderController.value=id

}

const handleMouselive=()=>{
  borderController.value=null
}
const beforeEnter = (el) => {
  el.style.height = "20px";
};

const enter = (el) => {
  fullHeight.value = `!h-${el.scrollHeight}`;
  el.style.height = `${el.scrollHeight}px`;
};

const beforeLeave = (el) => {
  fullHeight.value = `!h-${el.scrollHeight}`;
  el.style.height = `${el.scrollHeight}px`;
};

const leave = (el) => {
  el.style.height = "20px";
};
</script>

<template>
  <div class="flex flex-col h-auto mt-5  overflow-x-hidden">
    <div class="bg-white w-full flex flex-row gap-4 px-12 py-4 overflow-x-hidden">
      <div class="w-2/3 pr-4 overflow-x-hidden "> 
     
        <img :src="comingData.img" alt="Course Image" class="contenimage px-4 max-w-full rounded-3xl object-cover">
        <!-- <h1 class="text-2xl text-gray-600 mt-7">About the course</h1> -->
             
             <p 
             id="job_description"
             :class="['transition-all duration-1000 text-gray-600 overflow-x-hidden  paragraph-content']"
            :style="isExpanded ? { maxHeight: '1200px' } : { maxHeight: `${sidebarHeight}px`, overflow: 'hidden' }"
            


              v-html="htmlContent">
              </p>
               <!-- <div
       class="bg-gradient-to-t from-white to-slate-400 dark:bg-gradient-to-t dark:from-secondary-dark-3 dark:to-secondary-dark-3/0 h-60 absolute bottom-12 w-full"
      v-if="!isExpanded"
       ></div> -->

                
        <div v-if="showReadMoreButton" class="border-2 py-2 transition-all duration-1000  border-emerald-400 bg-white  flex items-center mt-2  px-2 rounded-lg w-36">
          <Icon name="hugeicons:arrow-down-03"  style="color:green"/>
      
      <button class="text-green-600  transition-all duration-1000 px-1" v-if="showReadMoreButton" @click="toggleExpanded">{{ isExpanded ? "Show Less" : "Read More" }}</button>
        </div>
        
        
      </div>
        <div class="sidebar w-1/3 flex flex-col">
        <button class="bg-[#009688] w-full text-white font-bold rounded-md py-4">Register Now</button>
        
        <div class="border p-5 mt-5 rounded-lg space-y-4 w-full dark:bg-secondary-dark-2 dark:border-secondary-dark-2">
          <div class="flex justify-between items-center"><div class="flex items-center space-x-4">
            <svg data-v-9c34c54e="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="icon text-gray-600 text dark:text-white" width="1em" height="1em" viewBox="0 0 15 15">
            <path fill="none" stroke="currentColor" d="m7.5 4.5l4 2v8h-8v-8zm0 0V0M0 14.5h15m-13.5 0v-6h2m10 6v-6h-2m-5 6v-3h2v3m-1-14h3v2h-3m0 7a1 1 0 1 1 0-2a1 1 0 0 1 0 2Z">

            </path>
            </svg>
            <p class="text-gray-600 text dark:text-white">Venue</p></div>
            </div><h1 class="text-gray-700 dark:text-white flex items-center justify-between">HaHuJobs Employment Center <a href="https://maps.app.goo.gl/k3Jz5oSTBKzrMrmx5" target="_blank">
        <svg data-v-9c34c54e="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="icon text-2xl shrink-0 text-gray dark:text-white" width="1em" height="1em" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 3.515L3.515 12L12 20.485L20.485 12zm.707-2.122l9.9 9.9a1 1 0 0 1 0 1.414l-9.9 9.9a1 1 0 0 1-1.414 0l-9.9-9.9a1 1 0 0 1 0-1.414l9.9-9.9a1 1 0 0 1 1.414 0M13 10V7.5l3.5 3.5l-3.5 3.5V12h-3v3H8v-4a1 1 0 0 1 1-1z">
          </path>
          </svg></a>
          </h1>
          </div>
        <div class="w-full border flex flex-col border-slate-200 mt-6 py-5 px-5">
         
            <div class="flex justify-between space-x-2 items-center">
              <div class="flex items-center space-x-4"><svg data-v-9c34c54e="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="icon text-gray-600 text dark:text-white" width="1em" height="1em" viewBox="0 0 36 36">
            <path fill="currentColor" d="M32.25 6H29v2h3v22H4V8h3V6H3.75A1.78 1.78 0 0 0 2 7.81v22.38A1.78 1.78 0 0 0 3.75 32h28.5A1.78 1.78 0 0 0 34 30.19V7.81A1.78 1.78 0 0 0 32.25 6" class="clr-i-outline clr-i-outline-path-1">
              </path>
              <path fill="currentColor" d="M8 14h2v2H8z" class="clr-i-outline clr-i-outline-path-2">

              </path>
              <path fill="currentColor" d="M14 14h2v2h-2z" class="clr-i-outline clr-i-outline-path-3">
                </path>
                <path fill="currentColor" d="M20 14h2v2h-2z" class="clr-i-outline clr-i-outline-path-4"></path>
                <path fill="currentColor" d="M26 14h2v2h-2z" class="clr-i-outline clr-i-outline-path-5"></path>
                <path fill="currentColor" d="M8 19h2v2H8z" class="clr-i-outline clr-i-outline-path-6"></path>
                <path fill="currentColor" d="M14 19h2v2h-2z" class="clr-i-outline clr-i-outline-path-7"></path>
                <path fill="currentColor" d="M20 19h2v2h-2z" class="clr-i-outline clr-i-outline-path-8"></path>
                <path fill="currentColor" d="M26 19h2v2h-2z" class="clr-i-outline clr-i-outline-path-9"></path>
                <path fill="currentColor" d="M8 24h2v2H8z" class="clr-i-outline clr-i-outline-path-10"></path>
                <path fill="currentColor" d="M14 24h2v2h-2z" class="clr-i-outline clr-i-outline-path-11"></path>
                <path fill="currentColor" d="M20 24h2v2h-2z" class="clr-i-outline clr-i-outline-path-12"></path>
                <path fill="currentColor" d="M26 24h2v2h-2z" class="clr-i-outline clr-i-outline-path-13"></path>
                <path fill="currentColor" d="M10 10a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1" class="clr-i-outline clr-i-outline-path-14"></path><path fill="currentColor" d="M26 10a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1" class="clr-i-outline clr-i-outline-path-15"></path><path fill="currentColor" d="M13 6h10v2H13z" class="clr-i-outline clr-i-outline-path-16"></path><path fill="none" d="M0 0h36v36H0z"></path></svg><p class="text-gray-600 text dark:text-white">Schedule</p></div><svg data-v-9c34c54e="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="icon text dark:text-white" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m0 26a12 12 0 1 1 12-12a12 12 0 0 1-12 12"></path><path fill="currentColor" d="M15 8h2v11h-2zm1 14a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 16 22"></path></svg></div>
         
                <div class="flex flex-row mt-3 gap-7 py-5">
                <div class="flex flex-col">
                <h1 class="text-gray-600 dark:text-gray-200 text-base" role="none"> Weekday </h1>               
                <div class="flex flex-row gap-6 mt-5 items-center">
                        
                  <div class="relative flex bg-white dark:bg-transparent py-2 outline-none focus:outline-none" title="" id="headlessui-radiogroup-option-6" role="radio" aria-checked="true" tabindex="0" data-headlessui-state="checked" aria-label="weekdays">
                    <span class="flex flex-col items-center gap-x-5 flex-1 duration-200 text-gray-600 dark:text-white">
                      <svg data-v-9c34c54e="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="icon text-2xl" width="1em" height="1em" viewBox="0 0 1024 1024">
                  <path fill="currentColor" d="M32 768h960a32 32 0 1 1 0 64H32a32 32 0 1 1 0-64m129.408-96a352 352 0 0 1 701.184 0h-64.32a288 288 0 0 0-572.544 0zM512 128a32 32 0 0 1 32 32v96a32 32 0 0 1-64 0v-96a32 32 0 0 1 32-32m407.296 168.704a32 32 0 0 1 0 45.248l-67.84 67.84a32 32 0 1 1-45.248-45.248l67.84-67.84a32 32 0 0 1 45.248 0m-814.592 0a32 32 0 0 1 45.248 0l67.84 67.84a32 32 0 1 1-45.248 45.248l-67.84-67.84a32 32 0 0 1 0-45.248"></path>
                  </svg><span class="flex flex-col gap-y-1">
                    <span class="text-xs capitalize font-medium">morning</span>
                  </span>
                  </span>
                  </div>
                <div class="relative flex bg-white dark:bg-transparent py-2 outline-none focus:outline-none" title="" id="headlessui-radiogroup-option-67" role="radio" aria-checked="false" tabindex="-1" data-headlessui-state="" aria-label="weekdays">
                  <span class="flex flex-col items-center gap-x-5 flex-1 duration-200 text-gray-600 dark:text-white">
                    <svg data-v-9c34c54e="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="icon text-2xl" width="1em" height="1em" viewBox="0 0 256 256">
                  <path fill="currentColor" d="M120 40V16a8 8 0 0 1 16 0v24a8 8 0 0 1-16 0m8 24a64 64 0 1 0 64 64a64.07 64.07 0 0 0-64-64m-69.66 5.66a8 8 0 0 0 11.32-11.32l-16-16a8 8 0 0 0-11.32 11.32Zm0 116.68l-16 16a8 8 0 0 0 11.32 11.32l16-16a8 8 0 0 0-11.32-11.32M192 72a8 8 0 0 0 5.66-2.34l16-16a8 8 0 0 0-11.32-11.32l-16 16A8 8 0 0 0 192 72m5.66 114.34a8 8 0 0 0-11.32 11.32l16 16a8 8 0 0 0 11.32-11.32ZM48 128a8 8 0 0 0-8-8H16a8 8 0 0 0 0 16h24a8 8 0 0 0 8-8m80 80a8 8 0 0 0-8 8v24a8 8 0 0 0 16 0v-24a8 8 0 0 0-8-8m112-88h-24a8 8 0 0 0 0 16h24a8 8 0 0 0 0-16">

                  </path>
                  </svg>
                  <span class="flex flex-col gap-y-1">
                    <span class="text-xs capitalize font-medium">afternoon</span>
                    </span>
                    </span>
                    </div>

                     
                  <div class="relative flex bg-white dark:bg-transparent  py-2 outline-none focus:outline-none" title="" id="headlessui-radiogroup-option-8" role="radio" aria-checked="false" tabindex="-1" data-headlessui-state="" aria-label="weekdays">
                    <span class="flex flex-col items-center gap-x-5 flex-1 duration-200 text-gray-600 dark:text-white">
                      <svg data-v-9c34c54e="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="icon text-2xl" width="1em" height="1em" viewBox="0 0 24 24">
                     <path fill="currentColor" d="M11 19H8a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2m9-4h-1.16A8.2 8.2 0 0 0 20 12.05a1 1 0 0 0-.34-.93a1 1 0 0 0-1-.19a6 6 0 0 1-1.92.32a6.06 6.06 0 0 1-6.06-6a7 7 0 0 1 .1-1a1 1 0 0 0-.35-.92a1 1 0 0 0-1-.18A8.06 8.06 0 0 0 4 10.68A8 8 0 0 0 5.27 15H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2m-3.72 0H7.83a6 6 0 0 1 .88-9.36a8.06 8.06 0 0 0 8.05 7.61a7 7 0 0 0 .79 0A6.1 6.1 0 0 1 16.28 15M16 19h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2">
                      </path>
                      </svg>
                      <span class="flex flex-col gap-y-1">
                        <span class="text-xs capitalize font-medium">night</span>
                       </span>
                      </span>
                      </div>
                        

                    </div>
                    

                </div>
                
                <div class="border-r border-slate-200"></div>
                <div class="flex flex-col">
                <h1 class="text-gray-600 dark:text-gray-200 text-base" role="none"> Weekend </h1>               

                     <div class="flex flex-row gap-9 mt-5 items-center">
                        
                        <div class="relative flex bg-white dark:bg-transparent py-2 outline-none focus:outline-none" title="" id="headlessui-radiogroup-option-9" role="radio" aria-checked="false" tabindex="-1" data-headlessui-state="" aria-label="weekend">
                          <span class="flex flex-col items-center gap-x-5 flex-1 duration-200 text-gray-600 dark:text-white">
                          <svg data-v-9c34c54e="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="icon text-2xl" width="1em" height="1em" viewBox="0 0 1024 1024">
                          <path fill="currentColor" d="M32 768h960a32 32 0 1 1 0 64H32a32 32 0 1 1 0-64m129.408-96a352 352 0 0 1 701.184 0h-64.32a288 288 0 0 0-572.544 0zM512 128a32 32 0 0 1 32 32v96a32 32 0 0 1-64 0v-96a32 32 0 0 1 32-32m407.296 168.704a32 32 0 0 1 0 45.248l-67.84 67.84a32 32 0 1 1-45.248-45.248l67.84-67.84a32 32 0 0 1 45.248 0m-814.592 0a32 32 0 0 1 45.248 0l67.84 67.84a32 32 0 1 1-45.248 45.248l-67.84-67.84a32 32 0 0 1 0-45.248">
                            </path>
                            </svg>
                            <span class="flex flex-col gap-y-1">
                              <span class="text-xs capitalize font-medium">morning</span>
                              </span>
                              </span>
                              </div>
                        <div class="relative flex bg-white dark:bg-transparent py-2 outline-none focus:outline-none" title="" id="headlessui-radiogroup-option-67" role="radio" aria-checked="false" tabindex="-1" data-headlessui-state="" aria-label="weekdays">
                          <span class="flex flex-col items-center gap-x-5 flex-1 duration-200 text-gray-600 dark:text-white">
                            <svg data-v-9c34c54e="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="icon text-2xl" width="1em" height="1em" viewBox="0 0 256 256">
                            <path fill="currentColor" d="M120 40V16a8 8 0 0 1 16 0v24a8 8 0 0 1-16 0m8 24a64 64 0 1 0 64 64a64.07 64.07 0 0 0-64-64m-69.66 5.66a8 8 0 0 0 11.32-11.32l-16-16a8 8 0 0 0-11.32 11.32Zm0 116.68l-16 16a8 8 0 0 0 11.32 11.32l16-16a8 8 0 0 0-11.32-11.32M192 72a8 8 0 0 0 5.66-2.34l16-16a8 8 0 0 0-11.32-11.32l-16 16A8 8 0 0 0 192 72m5.66 114.34a8 8 0 0 0-11.32 11.32l16 16a8 8 0 0 0 11.32-11.32ZM48 128a8 8 0 0 0-8-8H16a8 8 0 0 0 0 16h24a8 8 0 0 0 8-8m80 80a8 8 0 0 0-8 8v24a8 8 0 0 0 16 0v-24a8 8 0 0 0-8-8m112-88h-24a8 8 0 0 0 0 16h24a8 8 0 0 0 0-16"></path></svg><span class="flex flex-col gap-y-1"><span class="text-xs capitalize font-medium">afternoon</span></span></span></div>
                     </div>



                </div>

            </div>


        </div>



        
            <div class="border p-5 mt-6 rounded-lg w-full dark:bg-secondary-dark-2 dark:border-secondary-dark-2 flex justify-between items-center divide-x-[0.5px] lg:divide-x-2 dark:divide-gray-400">
              <div class="flex flex-col gap-y-2">
              <div class="flex space-x-2 items-center text-emerald-500 dark:text-white">
                <svg data-v-9c34c54e="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="icon text-sm lg:text-xl" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2m3.3 14.71L11 12.41V7h2v4.59l3.71 3.71z">
                  </path>
                  </svg>
                <p class="text-sm lg:text-base text-emerald-600">Duration</p>
                </div>
                <h1 class="text-sm md:text-base 2xl:text-lg text-gray-700 dark:text-white">3 Months</h1></div><div class="flex flex-col gap-y-2 pl-2 lg:pl-6">
                  <div class="flex space-x-2 items-center text-emerald-500 dark:text-white">
                  <svg data-v-9c34c54e="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="icon text-lg lg:text-xl" width="1em" height="1em" viewBox="0 0 26 26">
                  <path fill="currentColor" d="M9.875 0a1 1 0 0 0-.406.156S8.204.952 6.844 1.813c-1.36.86-2.873 1.808-3.219 2l-.063.03C2.306 4.618 2.045 5.884 2 6.594c-.003.033 0 .06 0 .095c-.011.266 0 .437 0 .437v13.063C2 22.087 4.213 23 6.313 23c.7 0 1.4-.113 2-.313c.4-.2.687-.6.687-1v-10.5c0-2.3.5-3.38 2-4.28c.4-.2 4.594-3.095 4.594-3.095c.2-.2.406-.606.406-.906v-.094c0-.4-.2-.706-.5-.906s-.7-.2-1 0c-.1.1-6.2 4.207-7.5 4.907c-1.3.8-2.513.993-2.813.593c-.093-.093-.174-.378-.187-.656v-.063c.001-.272.071-.784.625-1.125c.562-.313 1.957-1.204 3.313-2.062c.573-.363.644-.402 1.093-.688A1 1 0 0 0 11 2.5V1a1 1 0 0 0-1.125-1m8 3.5a1 1 0 0 0-.438.188s-5.034 3.387-5.906 3.968l-.031.032c-.724.543-1.153 1.189-1.344 1.78A3.3 3.3 0 0 0 10 10.5v.313a1 1 0 0 0 0 .093V23c0 1.9 2.188 3 4.188 3c.9 0 1.712-.194 2.312-.594c1.2-.7 7-5.218 7-5.218c.3-.2.5-.482.5-.782v-13c0-.5-.194-.8-.594-1c-.3-.2-.793-.106-1.093.094c-1.6 1.2-5.907 4.588-6.907 5.188c-1.4.8-2.719 1-3.219.5c-.2-.2-.187-.388-.187-.688q.008-.26.063-.438c.056-.174.17-.388.593-.718c.02-.016.01-.015.031-.031c.723-.483 2.934-1.99 4.376-2.97A1 1 0 0 0 19 6V4.5a1 1 0 0 0-1.125-1M22 10.813v2l-5 3.874v-2z">
                    </path>
                    </svg>
                    <p class="text-sm lg:text-base text-emerald-600">Class</p>
                    </div>
                  <h1 class="text-sm md:text-base 2xl:text-lg text-gray-700 dark:text-white text-left">24 - 30</h1>
                  </div>
                  <div class="flex flex-col gap-y-2 pl-2 lg:pl-6">
                    <div class="flex space-x-2 items-center text-emerald-500 dark:text-white">
                    <svg data-v-9c34c54e="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="icon text-lg lg:text-xl" width="1em" height="1em" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M15 3h6v18H3v-6h4v-4h4V7h4z"></path>
                  </svg>
                  <p class="text-sm lg:text-base text-emerald-600">Level</p>
                  </div>
                  <h1 class="text-sm md:text-base 2xl:text-lg  dark:text-white text-left capitalize">beginner</h1></div></div>
           
     
        <div class="bg-white border mt-5 px-5 py-2 rounded-lg space-y-2 w-full dark:bg-secondary-dark-2 dark:border-secondary-dark-2">
          <h1 class="text text-gray-700 mb-5 dark:text-white">Instructors</h1>
       
        <div  v-for="small in SmallCorosol" :key="small"  >
           <NuxtLink :to="`/personDetail/${small.id}`" @mouseover="handleMousehover(small.id)" @mouseleave="handleMouselive"  :class="{'border-emerald-600':borderController===small.id}"   class="flex md:space-x-4 items-center mb-2 bg-gray-100  p-2 rounded-lg border"
           >
           <div class="flex rounded-full  shrink">
          <img :src="small.img" alt="Program Image" class="object-cover w-[60px] h-[60px] rounded-full  shrink-0" width="60" height="60">
          </div>
          <div class="flex flex-col space-y-1 ml-1 md:ml-4">
            <h1 class="text text-gray-700 shrink-0 dark:text-white">{{small.name}} </h1>
          <h1 class="text text-gray-700 dark:text-white">{{small.title}}</h1>
          </div>
          </NuxtLink>

        </div>
       
          <!-- </ul> -->
          </div>

        <div class="border border-slate-200 w-full py-2 mt-6 px-4">
          
         <DynamicAcc  @accordion-height="updateSidebarHeight" @accordion-decrease="decreseSidebar"/>
        </div>
        </div>
       
        
    </div>
    <div class="flex flex-col mt-6 px-5">
        <h1 class="text-2xl">Similar courses</h1>
     <!-- <CorosolComponent  :items="CorosolData1" :showPrice="true" :showIcon="true"  :showPersonName="true" :othersValue="true" :itemToshow="itemToshow"/> -->
      <p v-if="courseLoading">Loading...</p>
          <p class="text-red-500" v-else-if="courseError">There is something error</p>
           <CorosolComponent v-else  :currentTheme="currentTheme" :items="courseResult?.courses" :showPrice="true" :showIcon="true"  :showPersonName="true" :othersValue="true" :itemToshow="itemToshow"/>


    </div>
   <!-- <div class="border border-[[#374151]] -ml-28 -mr-48 mt-8"></div> -->

     
</div>

</template>
<style scoped>
.currentColor{
  color: rgb(20, 204, 204);
}

#job_description h3 strong {
  @apply text-sm md:text-lg font-semibold mt-6 mb-3 md:mt-9;
}

#job_description h3 {
  @apply mt-3;
}

#job_description p {
  @apply mt-3 text-sm md:text-base;
}

#job_description p strong {
  @apply font-medium text-sm md:text-base capitalize;
}

#job_description ul {
  @apply list-item list-disc ml-7;
}
#job_description p a {
  @apply text-blue-500 cursor-pointer;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: height 0.5s ease-in-out, opacity 0.5s ease-in-out;
  overflow: hidden;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave {
  opacity: 1;
}

.text-gray-600 {
    --tw-text-opacity: 1;
    color: rgb(75 85 99 / var(--tw-text-opacity));
}

</style>