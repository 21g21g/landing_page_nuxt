<script setup>
const props=defineProps({
    aboutData:{
        type:Object
    },
    currentTheme:{
        type:String
    }
})
const text=props.aboutData.head
const text1=text.replace("Muya","").trim()
const text2=text.replace("HaHu","").trim()

 </script>
        <template>
        <div class="flex md:flex-row flex-col md:px-10 px-6 md:mt-0 mt-20   md:justify-center justify-start md:items-center items-start ">
        <img :src="props.aboutData.human" alt="there is no image" class="object-cover w-[35rem] md:order-1 order-2 mt-20">
        <div class="flex flex-col md:pl-10 md:pr-10 md:ml-40 md:mt-8 mt-0 md:order-2 order-1">
        <h1 :class="{'text-[#374151]':currentTheme==='light','text-white':currentTheme==='dark'}" class="text-4xl font-semibold">{{text1}} <span class="text-[#009688] font-semibold">{{text2}}</span></h1>
        <p :class="{'text-[#374151]':currentTheme==='light','text-white':currentTheme==='dark'}" class="text-lg  mt-5 md:mt-0 md:leading-snug leading-7  md:pt-4  md:text-left text-start">{{props.aboutData.para1}}</p>
        <p :class="{'text-[#374151]':currentTheme==='light','text-white':currentTheme==='dark'}" class="text-lg md:leading-normal leading-7 md:pt-4 pt-3 md:text-left text-start"> {{props.aboutData.para2}}</p>

        </div>

    </div>
</template>