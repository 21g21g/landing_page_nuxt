<script setup>
import back from "../assets/back.png"
</script>
<template>
<div class="flex flex-row">
    <aside class="flex flex-row  min-h-screen">
        <div class="flex flex-col max-h-screen bg-white w-20 px-2 py-6 gap-6 items-center">
              <Icon 
          class="text-gray-500 cursor-pointer" 
          size="30"
          name="akar-icons:three-line-horizontal"
        />
        <div class="flex flex-col items-center gap-2">
           <Icon 
          class="text-gray-500 cursor-pointer" 
          size="20"
          name="stash:save-ribbon-light"
        />
        <p class="text-sm">Saved</p>
        </div>
       
         <div class="flex flex-col gap-2">

        </div>
      
         <div class="flex flex-col items-center">
             <Icon 
          class="text-gray-500 cursor-pointer" 
          size="20"
          style="color:black"
          name="mdi:recent"
        />
                <p class="text-sm">Recents</p>

        </div>
         <div class="flex flex-col items-center gap-2">
            <Icon 
          class="text-gray-500 cursor-pointer" 
          size="20"
          name="mdi:fireplace"
        />
        <p class="text-sm text-center ">Addis Ababa</p>

        </div>
       
        </div>
        <div class="border-r border-gray-500 min-h-screen"></div>
        <div class="w-96 flex flex-col ml-0 max-h-screen overflow-y-auto">
            <img decoding="async" :src="back" class="object-cover max-h-96 w-full relative">
            <input type="ss" name="" placeholder="Hahu Jobs" class="bg-white border border-gray-400 absolute top-3 left-32 py-3 px-6 rounded-3xl">
            <div class="flex flex-col mt-3  px-5">
                <h1 class="text-2xl">HaHuJobs</h1>
                <div>
             <button class="hover:underline">Career guidance service</button>

                </div>
                <div class="mt-4 flex flex-row gap-10">
                    <h1>Overview</h1>
                    <h2>About</h2>

                </div>
            </div>

        </div>

    </aside>
    <main class="flex flex-grow min-h-screen">
        <NuxtPage/>
    </main>
</div>
</template>