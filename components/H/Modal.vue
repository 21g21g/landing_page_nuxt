<script setup>
import {
  Dialog,
  TransitionRoot,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
// import { useCounterStore } from "@/stores/counterStore"; 

// const store = useCounterStore(); // Use your store
const isDarkMode = computed(() => store.isDarkMode);
const emits = defineEmits(["update:modelValue", "confirm"]);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  wrapperClass: {
    type: String,
  },
  title: {
    type: String,
    default: "",
  },
  autoClose: {
    type: Boolean,
    default: false,
  },
  hasCloseIcon: {
    type: Boolean,
    default: false,
  },
  enabledOverflow: {
    type: Boolean,
    default: true,
  },
  mainClass: {
    type: String,
    default:
      "relative px-4 pt-5 pb-4 text-left transition-all transform rounded-lg shadow-xl sm:my-8 sm:w-full sm:p-9",
  },
});

const open = computed({
  get() {
    return props.modelValue;
  },
  set(newVal) {
    emits("update:modelValue", newVal);
  },
});
</script>
<template>
  <TransitionRoot as="template" :show="open">
    <Dialog
      as="div"
      class="relative z-[100] text-gray-900 dark:bg-secondary-dark-2 dark:text-white"
      @close="autoClose ? (open = false) : ''"
    >
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-20"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              :class="[
                enabledOverflow ? 'overflow-visible' : 'overflow-hidden',
                props.wrapperClass ? props.wrapperClass : 'sm:max-w-xl',
                props.mainClass,
              ]"
            >
            <!-- <div class="absolute p-5 ">
                <DialogTitle
                 
                  class="text-lg font-semibold leading-6 text-slate-950 "
                >
                  <slot name="Heading" />
                  
                </DialogTitle>
               
            </div> -->
             <div
                class="absolute -top-6 left-40  justify-between w-full px-5 lg:px-9 lg:pt-9 sm:flex"
              >
                <DialogTitle
                  as="h3"
                  class="flex-1 text-base font-semibold leading-6 text-gray-900"
                  ><slot name="Heading" />
                </DialogTitle>
              </div>
             
             
              <slot name="content" />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
