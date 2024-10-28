<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: [],
    required: false,
  },
  collabsable: {
    type: Boolean,
    default: false,
    required: false,
  },

currenTheme:{
    type:String
  }
});

const tableData = ref(props.items || []);
const content = ref(null);

const beforeEnter = (el) => {
  el.style.height = "0";
};

const enter = (el) => {
  el.style.height = `${el.scrollHeight}px`;
};

const beforeLeave = (el) => {
  el.style.height = `${el.scrollHeight}px`;
};

const leave = (el) => {
  el.style.height = "0";
};

const toggleOpen = (index) => {
  // Close all items
  if (props.collabsable) {
    tableData.value.forEach((item, i) => {
      if (i !== index) item.open = false;
    });
  }
  tableData.value[index].open = !tableData.value[index].open;
};

</script>
<template>
  <div class="flex flex-col gap-y-1 md:gap-y-5 w-full ml-14 md:ml-28" v-if="tableData">
    <div
      v-for="(i, index) in tableData"
      :key="index"
      @click="toggleOpen(index)"
      class="flex-col  items-center justify-start md:justify-between py-0 md:py-2 cursor-pointer  rounded-md duration-200"
    >
      <div
        class="flex  items-center flex-row justify-start md:justify-between md:w-[50rem] w-[30rem]  capitalize text-gray-700"
        >
        <p :class="{'text-[#374151]':currenTheme==='light','text-white':currenTheme==='dark'}" class="capitalize ml-14 md:ml-36 text-sm md:text-base md:mr-10">
          {{ i?.title }}
        </p>
        <Icon
           class="text-xl font-medium  cursor-pointer duration-200 ml-16 mr-14 md:mr-3 md:ml-0 shrink-0 "
          :class="i?.open ? '' : 'transform rotate-180'"
           name="mingcute:up-fill"
           :style="{ color: currenTheme === 'dark' ? 'white' : 'gray' }"
        />
      </div>
      <div class="border border-[[#374151]] md:w-[40rem] mt-1 md:ml-36 md:mt-4"></div>
      <transition
        name="slide-fade"
        mode="out-in"
        @before-enter="beforeEnter"
        @enter="enter"
        @before-leave="beforeLeave"
        @leave="leave"
         >
          <div v-show="i.open" class="overflow-y-auto" ref="content">
          <div v-if="$slots.content" class="w-full md:w-[40rem]  text-start md:ml-36  px-20 md:px-1 ">
            <slot name="content" :item="i" />
          </div>
          <div v-else>- - -</div>
        </div>
      </transition>
    </div>

  </div>
</template>
<style scoped>
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
</style>   