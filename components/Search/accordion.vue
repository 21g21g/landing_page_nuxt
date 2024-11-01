<script setup>
const route = useRoute();
const props = defineProps({});
const emit = defineEmits(["selectedOptions"]);

const data = ref([
  {
    title: "level",
    isOpen: true,
    options: ["beginner", "intermediate", "advanced"],
    selectedOptions: [],
  },
  {
    title: "duration",
    isOpen: true,
    options: ["< 1 month", "1 month-3 month", "> 6 month"],
    selectedOptions: [],
  },
  {
    title: "Schedule",
    isOpen: true,
    options: ["morning", "afternoon", "night"],
    selectedOptions: [],
  },
]);

const openAccordion = (item) => {
  item.isOpen = true;
};

const closeAccordion = (item) => {
  item.isOpen = false;
};
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
// const handleCheckboxChange = (item, option) => {
//   item.selectedOptions = [option];
// };

const allSelectedOptions = ref([]);
const handleCheckboxChange = (item, option) => {
  // Find the index of the selected option in the item's selectedOptions array
  const index = item.selectedOptions.indexOf(option);

  if (index === -1) {
    // If the option is not already selected, add it to the selectedOptions array
    item.selectedOptions.push(option);
  } else {
    // If the option is already selected, remove it from the selectedOptions array
    item.selectedOptions.splice(index, 1);
  }

  // Emit the selected options organized by category title
  const selectedData = {};
  data.value.forEach((category) => {
    selectedData[category.title] = category.selectedOptions;
  });
  emit("selectedOptions", selectedData);
};
</script>
<template>
<div>
    <div
    v-for="(item, index) in data"
    :key="index"
    class="flex-col w-full border-b last:border-b-0 px-5 py-2 cursor-pointer"
  >
    <div
      @click="item.isOpen ? closeAccordion(item) : openAccordion(item)"
      class="flex justify-between w-full h-10 capitalize"
    >
      <div>
        <p class="text capitalize">{{item.title}}</p>
      </div>
      <div class="py-2">
        <Icon
          @click.stop="item.isOpen ? closeAccordion(item) : openAccordion(item)"
          v-if="item.isOpen"
          class="text-base font-medium cursor-pointer"
          name="mingcute:up-fill"
        />
        <Icon
          @click.stop="item.isOpen ? closeAccordion(item) : openAccordion(item)"
          v-else
          class="text-base font-medium cursor-pointer"
          name="mingcute:down-fill"
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
      <div v-if="item.isOpen">
        <div
          v-for="(option, index) in item.options"
          :key="index"
          class="py-2 flex items-center"
        >
          <HCheck-box
            :label="option"
            :checked="item.selectedOptions[0] === option"
            @change="handleCheckboxChange(item, option)"
            labelClass="text-md capitalize"
          />
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
