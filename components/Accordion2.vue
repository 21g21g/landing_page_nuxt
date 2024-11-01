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

});
const emit = defineEmits();

const tableData = ref(props.items || []);
const content = ref(null);
console.log(tableData.value);

const beforeEnter = (el) => {
  el.style.height = "0";
  //  emit('accordion-height', el.scrollHeight);
};

const enter = (el) => {
  el.style.height = `${el.scrollHeight}px`;
  emit('accordion-height', el.scrollHeight);
};

const beforeLeave = (el) => {
  el.style.height = `${el.scrollHeight}px`;
  //  emit('accordion-height', el.scrollHeight);
};

const leave = (el) => {
  el.style.height = "0";
    emit('accordion-decrease', el.scrollHeight);

  //  emit('accordion-height', 0);
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
  <div class="flex flex-col gap-y-4 w-full " v-if="tableData">
    <div
      v-for="(i, index) in tableData"
      :key="index"
      @click="toggleOpen(index)"
      class="flex-col  py-0 md:py-2 cursor-pointer  bg-gray-100 rounded-md duration-200"
    >
      <div
        class="flex  flex-row mt-5  justify-between capitalize  py-2 px-2 rounded-lg text-gray-700"
        >
        <p  class="capitalize  text-sm md:text-base ">
          {{ i?.title }}
        </p>
        <Icon
           class="text-xl font-medium  cursor-pointer duration-200  shrink-0 "
          :class="i?.open ? '' : 'transform rotate-180'"
           name="mingcute:up-fill"
        />
      </div>
      <transition
        name="slide-fade"
        mode="out-in"
        @before-enter="beforeEnter"
        @enter="enter"
        @before-leave="beforeLeave"
        @leave="leave"
         >
          <div v-show="i.open" class="overflow-y-auto" ref="content">
          <div v-if="$slots.content" class="w-full m text-start  bg-gray-100  px-20 md:px-1 ">
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