
<script setup>
import stt from "../assets/stt.png"
import {HomeData} from "../../utils/HomeData"
const props=defineProps({
  
    currentTheme:{
      type:String
    }
})


// const onHover=ref('move')
// const stopMotion=()=>{
//   onHover.value='stop'

// }
const colorMode=ref(true)
// const moveMotion=()=>{
//   onHover.value='move'
// }
const marqueeStyle = computed(() =>
  colorMode.value === true
    ? {
        duration: 20,
        delay: 0,
        direction: "normal",
        pauseOnHover: true,
        pauseOnClick: true,
        loops: "infinite",
        gradientColor: [200, 255, 300],
        gradientWidth: "100px",
        minWidth: "100%",
      }
    : {
        duration: 20,
        delay: 0,
        direction: "normal",
        pauseOnHover: true,
        pauseOnClick: true,
        loops: "infinite",
        gradientColor: [300, 300, 300],
        gradientWidth: "100px",
        minWidth: "100%",
      }
);

</script>


<template>
   <div class="flex flex-row justify-between pl-6 md:pl-4 md:mr-16">
      <div class="flex flex-col mt-5 md:mt-16 md:gap-7 gap-3 md:w-[43rem] w-full">
         <h3 class="font-semibold text-lg">ለሀገር ልጅ <span class="text-[#009688]">በሀገር ልጅ !</span></h3>
        <h1 :class="{' text-[#4b5563]':currentTheme==='light','text-white':currentTheme==='dark'}" class="font-roboto text-2xl font-bold dark:text-white text-gray-700 sm:text-4xl xl:text-5xl 3xl:text-6xl lg:max-w-[50rem] xl:leading-snug 3xl:leading-normal 3xl:max-w-[53rem]" data-v-c46932e4=""> Register to acquire trending <span class="underline-image text-[#009688]" data-v-c46932e4="">Marketable</span> skills</h1>

         <p :class="{'text-[#374151]': currentTheme === 'light', 'text-white': currentTheme === 'dark'}" class="mt-6 md:mt-11 leading-6 text-sm">{{ HomeData.paragraph2 }}</p>
         <NuxtLink to="/search">
                  <button class="bg-[#009688] text-white w-[10rem] mt-4 py-2 px-2 font-semibold rounded-md">Explore Courses</button>

         </NuxtLink>
         <p :class="{'text-[#374151]': currentTheme === 'light', 'text-white': currentTheme === 'dark'}" class="mt-3">In partnership with:</p>
         
          <Vue3Marquee
                :clone="true"
                :duration="marqueeStyle.duration"
                :pauseOnHover="marqueeStyle.pauseOnHover"
                :pauseOnClick="marqueeStyle.pauseOnClick"
                :gradient="true"
                :gradientColor="marqueeStyle.gradientColor"
              >
                <div
                  class="py-2 flex pl-8 space-x-8 items-center w-full overflow-x-auto"
                >
                  <a
                    href="https://www.minabtech.com/"
                    target="_blank"
                    class="transition-newtransition group flex flex-col items-center overflow-hidden px-5 duration-200 dark:bg-transparent bg-transparent 2px-10"
                  >
                    <img
                     :src="HomeData.hamber"
                      class="w-20 lg:w-28 3xl:w-36 object-contain dark:group-hover:brightness-100 dark:group-hover:invert-0 dark:brightness-0 dark:invert dark:opacity-60 dark:group-hover:opacity-100 dark:grayscale dark:group-hover:grayscale-0 duration-200"
                      
                    />
                  </a>
                  <a
                    href="https://www.international.gc.ca/global-affairs-affaires-mondiales/home-accueil.aspx?lang=eng"
                    target="_blank"
                    class="transition-newtransition group flex flex-col items-center overflow-hidden rounded-t-[15px] px-5 duration-200 dark:bg-transparent bg-transparent 2px-10"
                  >
                    <img
                    :src="HomeData.minabha" alt="No image"                    
                       class="w-28 lg:w-36 3xl:w-44 object-contain dark:group-hover:brightness-100 dark:group-hover:invert-0 dark:brightness-0 dark:invert dark:opacity-60 dark:group-hover:opacity-100 dark:grayscale dark:group-hover:grayscale-0 duration-200"
                    />
                  </a>
                  <a
                    href="https://www.savethechildren.net/"
                    target="_blank"
                    class="transition-newtransition group flex flex-col items-center overflow-hidden rounded-t-[15px] px-5 duration-200 dark:bg-transparent bg-transparent 2px-10"
                  >
                    <img
                     :src="HomeData.canada" alt="No image"
                      class="w-32 lg:w-40 3xl:w-48 object-contain dark:group-hover:brightness-100 dark:group-hover:invert-0 dark:brightness-0 dark:invert dark:opacity-60 dark:group-hover:opacity-100 dark:grayscale dark:group-hover:grayscale-0 duration-200"
                    />
                  </a>
                  <a
                    href="https://www.humber.ca/"
                    target="_blank"
                    class="transition-newtransition group flex flex-col items-center overflow-hidden px-5 duration-200 dark:bg-transparent bg-transparent"
                  >
                    <img
                     :src="HomeData.childp" alt="No image"
                      class="w-32 lg:w-40 3xl:w-48 object-contain dark:group-hover:brightness-100 dark:group-hover:invert-0 dark:brightness-0 dark:invert dark:opacity-60 dark:group-hover:opacity-100 dark:grayscale dark:group-hover:grayscale-0 duration-200"
                      
                    />
                  </a>
                </div>
          </Vue3Marquee>
          
             
         </div>
          <div class="flex flex-row gap-8 pr-6">
         <div class="lg:flex lg:flex-col hidden gap-8 mt-2">
            <img :src="HomeData.pers1" alt="No image" class="object-cover h-60 w-[14rem] rounded-2xl">
            <img :src="HomeData.pers2" alt="No image" class="object-cover h-60 w-[14rem] rounded-2xl">
         </div>
         <div class="xl:flex xl:flex-col hidden relative gap-8 mt-32">
            <img :src="HomeData.pers3" alt="No image" class="object-cover h-60 w-[14rem] rounded-2xl">
            <img :src="HomeData.pers4" alt="No image" class="object-cover h-60 w-[14rem] rounded-2xl z-50">
            <img :src="stt" alt="star path" class="absolute -bottom-12 -right-8 w-20 z-10">
         </div>
      </div>
      </div>
</template>
<style scope>


.underline-image[data-v-c46932e4] {
    position: relative
}

.underline-image[data-v-c46932e4]:after {
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='373' height='22' fill='none' viewBox='0 0 373 22'%3E%3Cpath fill='%23058075' fill-rule='evenodd' d='M158.067 2.042c-17.485.7-34.765 1.56-51.615 2.501-23.854 1.331-47.698 2.708-71.399 4.888-7.46.688-15.037 1.124-22.45 1.985-4.654.54-10.825 1.308-11.635 1.468-.424.092-.609.23-.668.276-.42.321-.344.63-.107.872.095.103.336.355 1.004.39 44.677 2.352 90.362-2.237 135.093-2.72 77.572-.825 157.495 2.456 234.451 9.615.671.058 1.325-.23 1.418-.654.112-.413-.373-.814-1.045-.872-77.087-7.17-157.14-10.463-234.861-9.626-41.688.448-84.198 4.475-125.944 3.098l2.758-.333c7.384-.86 14.929-1.285 22.36-1.973 23.65-2.18 47.446-3.557 71.267-4.876 29.559-1.652 60.404-3.075 91.493-3.74 11.122.103 22.206.206 33.29.332 23.979.276 48.07 1.079 71.993 2.157 7.203.333 14.405.677 21.608.975 2.389.104 8.547.402 9.405.379 1.064-.023 1.269-.574 1.288-.665.056-.207.018-.494-.504-.735-.056-.034-.392-.149-1.138-.218C290.631.505 244.185-.172 198.224.803 149.744.38 101.078.195 52.721 0c-.692 0-1.258.344-1.263.769-.004.424.554.769 1.246.78 35.015.138 70.206.275 105.363.493' clip-rule='evenodd'/%3E%3C/svg%3E");
    background-repeat: repeat-x;
    bottom: -10px;
    content: "";
    height: 10px;
    left: 0;
    position: absolute;
    width: 100%
}
.page-enter-active,.page-leave-active {
    transition: all .3s ease
}

.page-enter-from,.page-leave-to {
    opacity: 0;
    scale: 1;
    transform: translate(-7px)
}

.layout-enter-active,.layout-leave-active {
    transition: all .3s ease
}

.layout-enter-from,.layout-leave-to {
    opacity: 0;
    scale: 1;
    transform: translate(-7px)
}

.centerx {
    margin: 0 auto!important
}
@keyframes move {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}

.animate-move {
  animation: move 2s infinite;
}
.dark-mode-image {

  width: 356px; /* Adjust based on actual size */
  display: inline-block; /* Or as per your layout */
}
.hover\:grayscale-saturation:hover {
  --tw-grayscale: grayscale(100%);
  --tw-saturate: saturate(100%); /* Adjust the saturation level as needed */
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast)
    var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate)
    var(--tw-sepia) var(--tw-drop-shadow);
}


</style>