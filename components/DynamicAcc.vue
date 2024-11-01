<script setup>
const route = useRoute();
import {dummyData} from "../utils/Accordion"
// const props = defineProps({
//   data: {
//     type: Array,
//   },
// });
const emit = defineEmits();

const baseID = ref("");
const tableData = ref([]);
watchEffect(() => {
  if (dummyData) {
    tableData.value = dummyData.map((item, index) => ({
      ...item,
      open: index === 0, // Set open to true for the first item, false for others
    }));
  }
});
const open = ref(false);
const toggleOpen = (index) => {
  // Close all items
  tableData.value.forEach((item, i) => {
    if (i !== index) item.open = false;
  });

  // Open the clicked item
  tableData.value[index].open = !tableData.value[index].open;
};
// ... rest of the script ...

const content = ref(null);

const beforeEnter = (el) => {
  el.style.height = "0";
};

const enter = (el) => {
  el.style.height = `${el.scrollHeight}px`;
   emit('accordion-height', el.scrollHeight);
};

const beforeLeave = (el) => {
  el.style.height = `${el.scrollHeight}px`;
};

const leave = (el) => {
  el.style.height = "0";
   emit('accordion-decrease', el.scrollHeight);
};
const calculateDurationInDays = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const durationInMilliseconds = end - start;
  return Math.round(durationInMilliseconds / (1000 * 3600 * 24)); // Convert milliseconds to days
};
</script>
<template>
<div>
    <h1 class="text-base text-gray-600 dark:text-white gap-y-4 py-3 -mt-2 pb-3">Curriculum</h1>
  <div
    v-for="(categoryItem, index) in tableData"
    :key="index"
    @click="toggleOpen(index)"
    class="flex-col bg-gray-100 dark:bg-gray-700/40 rounded-lg px-5 py-3 mt-2 cursor-pointer"
  >
    <div
      class="flex items-center justify-between h-fit capitalize dark:text-white"
    >
      <div>
        <p
          class="text-base text-gray-600 dark:text-white font-medium capitalize"
        >
          {{ categoryItem.title }}
        </p>
      </div>
      <div class="py-2">
        <Icon
          @click="toggleOpen(index)"
          class="text-lg font-medium cursor-pointer text-gray-600 dark:text-gray-200 duration-300"
          :class="[categoryItem.open ? '' : 'rotate-180']"
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
      <div v-show="categoryItem.open" class="section-content ml-2">
        <div class="flex items-center pb-2 gap-x-2">
          <Icon
            name="ic:outline-access-time-filled"
            class="text-xl text-gray-400 dark:text-gray-200"
          />
          <span class="text-gray-500 dark:text-gray-200"
            >{{ categoryItem.number_of_classes || 0 }} Classes</span
          >
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-200">
          {{ categoryItem.description }}
        </p>
        <ul class="lectures-list" v-if="false">
          <li
            v-for="(lecture, lectureIndex) in categoryItem.lectures"
            :key="lectureIndex"
            class="lecture-item"
          >
            <div class="lecture-title underline underline-offset-4">
              {{ lecture.title }}
            </div>
            <div class="lecture-times flex items-center">
              <Icon
                class="dark:text-white text-gray-800 mr-2"
                name="clarity:calendar-line"
              />
              <span class="mr-2">
                {{
                  new Date(lecture.start_time).toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                }}</span
              >
              <span>
                -
                {{
                  new Date(lecture.end_time).toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                }}</span
              >
            </div>
            <div class="flex items-center">
              <Icon class="dark:text-white text-gray-800 mr-2" name="bx:time" />
              Duration:
              {{
                calculateDurationInDays(lecture?.start_time, lecture?.end_time)
              }}
              day
            </div>
            <div class="section-description">{{ lecture.description }}</div>
          </li>
        </ul>
        <div class="section-duration"></div>
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
.section-container {
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
}
</style>
