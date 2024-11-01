<script setup>
const route = useRoute();
const props = defineProps({
  isNotChild: {
    type: Boolean,
    default: true,
  },

  response: {
    type: Array,
  },
  selectedEvaluationId: {   
    
    type: String,
    default: "", // Default to an empty string if not provided
  },
});

const baseID = ref("");
const tableData = ref([
  {
    title: "Do you offer a certificate for your training?",
    description:
      "As a licensed short-term technical training provider HaHuJobs provides certificates for all its short and medium-duration physical/virtual courses.",
    open: true,
  },
  {
    title: "Do you have prerequisites to enroll for training?",
    description:
      "Yes, based on the level and type of training, HaHuJobs sets basic qualification and prerequisite criteria before your registration for training is approved. Please teach each training detail before registering.",
    open: false,
  },
  {
    title: "Do you offer weekend and after-office hour sessions?",
    description:
      "Yes, HaHuJobs offers night and weekend classes, however, review the schedules provided for each training program.",
    open: false,
  },
  // Add more items as needed
]);
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

const open = ref(false);
const toggleOpen = (index) => {
  // Close all items
  tableData.value.forEach((item, i) => {
    if (i !== index) item.open = false;
  });

  // Open the clicked item
  tableData.value[index].open = !tableData.value[index].open;
};
</script>
<template v-if="tableData">
<div>
     <div
    v-for="(categoryItem, index) in tableData"
    :key="index"
    @click="toggleOpen(index)"
    class="flex-col lg:w-[40rem] border-b md:px-5 py-2 md:py-4 cursor-pointer"
  >
    <div
      class="w-full flex justify-between items-center h-auto capitalize dark:text-white dark:bg-prima"
    >
      <div>
        <p class="text-sm md:text-base capitalize">
          {{ categoryItem.title }}
        </p>
      </div>
      <div class="">
        <Icon
          @click="toggleOpen(index)"
          class="text-base font-medium cursor-pointer duration-300"
          :class="categoryItem.open ? '' : 'rotate-180'"
          name="mingcute:up-fill"
        />
      </div>
    </div>
    <transition
      name="slide-fade"
      mode="out-in"
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div v-show="categoryItem.open" class="overflow-y-auto" ref="content">
        <div class="text-sm md:text-base mt-2 dark:text-white text-gray-500">
          {{ categoryItem.description }}
        </div>
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
