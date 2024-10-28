<script setup>
import brand from "../assets/brandImage.svg"
import { ref } from "vue"

const props = defineProps({
  id1: { type: String },
  id2: { type: String },
  id3: { type: String },
  id4: { type: String },
  id5: { type: String },
  id6: { type: String },
  id7: { type: String },
})
const emit = defineEmits(["update:lightValue"])
const dropDown=ref(false)
const light=ref('light')
// Toggle controller for the navigation menu
const toggleController = ref(false)
const handleToggle = () => {
  toggleController.value = !toggleController.value
}
const hadleT=()=>{
    toggleController.value=false
}
const handleClickDrop=()=>{
  dropDown.value=!dropDown.value

}
const handleLight=()=>{
  light.value='light'
    emit("update:lightValue", light.value)
    dropDown.value=false

 
}
const handleDark=()=>{
 light.value='dark'
   emit("update:lightValue", light.value)
   dropDown.value=false

  
}

</script>

<template>
  <div>
    <header class="flex flex-row justify-between h-[80px] items-center relative z-10">
      <!-- Logo Section -->
      <div class="flex flex-row gap-3 items-center">
        <img 
          :src="brand" 
          alt="Brand logo" 
          class="lg:h-[3rem] lg:w-[4rem] h-[2rem] w-[2rem] object-cover"
        />
        <h1 :class="{'text-[#111827] ':light==='light','text-white':light==='dark' }" class="gap-2 lg:text-3xl text-xl font-bold flex lg:flex-col xl:flex-row">
          HaHu <span class="text-[#009688]">Muya</span>
        </h1>
      </div>

     
        <nav 
        class="lg:static absolute flex md:flex-row xs:z-50 transition-all gap-10 duration-300"
        :class="{
          'w-full h-screen top-0 left-0 flex flex-col items-start justify-start px-4 py-5 gap-8':
            toggleController,
            'bg-slate-50': light === 'light', 'bg-slate-900': light === 'dark',
            'md:bg-white': light === 'light', 'md:bg-[#02201d]': light === 'dark',
          'top-[-100vh]': !toggleController
        }"
      >
         <input v-if="toggleController" type="text" placeholder="Search" :class="{'bg-slate-800 border border-gray-100':light==='dark','bg-slate-300 border border-gray-100':light==='light'}" class=" py-5 w-full  rounded-md px-3"/>
        <a @click="hadleT" :class="{'text-[#111827]': light === 'light', 'text-white': light === 'dark'}" class="font-medium text-lg" :href="`#${props.id1}`">Home</a>
        <a @click="hadleT" :class="{'text-[#111827]': light === 'light', 'text-white': light === 'dark'}" class="font-medium text-lg" :href="`#${props.id2}`">Trainings</a>
        <a @click="hadleT" :class="{'text-[#111827]': light === 'light', 'text-white': light === 'dark'}" class="font-medium text-lg" :href="`#${props.id3}`">Partners</a>
        <a @click="hadleT" :class="{'text-[#111827]': light === 'light', 'text-white': light === 'dark'}" class="font-medium text-lg" :href="`#${props.id4}`">About</a>
        <a @click="hadleT" :class="{'text-[#111827]': light === 'light', 'text-white': light === 'dark'}" class="font-medium text-lg" :href="`#${props.id5}`">What's In Muya</a>
        <a @click="hadleT" :class="{'text-[#111827]': light === 'light', 'text-white': light === 'dark'}" class="font-medium text-lg" :href="`#${props.id6}`">Trainers</a>
        <a @click="hadleT" :class="{'text-[#111827]': light === 'light', 'text-white': light === 'dark'}" class="font-medium text-lg" :href="`#${props.id7}`">FAQ</a>
        
        <Icon 
          v-if="light === 'light'" 
          name="mynaui:sun" 
          class="cursor-pointer order-first md:order-last" 
          @click="handleClickDrop"
          size="30"
        />
        <Icon 
          v-else 
          name="lets-icons:moon-light" 
          class="cursor-pointer order-first md:order-last" 
          @click="handleClickDrop" 
          style="color:white"
          size="30"
        />

        <div v-if="dropDown" class="absolute w-32 bg-white border border-zinc-400 md:right-0 md:top-14  top-9 rounded-lg">
          <div class="flex flex-row gap-1 px-2 mt-3 cursor-pointer" @click="handleLight">
            <Icon name="mynaui:sun" />
            <h3>Light</h3>
          </div>
          <div class="flex flex-row gap-1 px-2 py-3 cursor-pointer" @click="handleDark">
            <Icon name="lets-icons:moon-light" />
            <h3>Dark</h3>
          </div>
          <div class="flex flex-row gap-1 px-2 pb-4 cursor-pointer" @click="handleLight">
            <Icon name="fluent:system-24-regular" />
            <h3>System</h3>
          </div>
        </div>
      </nav>
        
       
      <div class="lg:hidden" @click="handleToggle">
        <Icon 
          v-if="!toggleController" 
          class="text-gray-500 cursor-pointer" 
          style="width: 40px; height: 50px;" 
          name="akar-icons:three-line-horizontal"
        />
        <Icon 
          v-else 
          class="text-gray-500 cursor-pointer" 
          style="width: 40px; height: 50px;" 
          name="iconoir:cancel"
          :style="{ color: light === 'dark' ? 'white' : 'black' }"
        />
      </div>
    </header>
  </div>
</template>

<style>
nav {
  left: 0;
  right: 0;
}
</style>
