<script setup>

</script>


<template>
    <div class="flex flex-row w-full pl-4 pr-10 ">
        <div class=" border border-gray-300 w-[23rem] mt-20  rounded-xl">

                 <SearchAccordion/>

        </div>
      <div class="w-2/3 ml-12 mt-10 flex flex-col gap-2">
          <h2 >Searching for</h2>
          <div class="border border-gray-300 mt-4"></div>
          <div class="mt-2">
             <SearchSearchedCourse/>  
          </div>
    </div>
    </div>
   
</template>

<style scoped>

</style>