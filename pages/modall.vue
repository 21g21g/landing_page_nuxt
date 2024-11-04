<script setup>
import {
  Dialog,
  TransitionRoot,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
// import { useCounterStore } from "@/stores/counterStore"; 
import {GetCourses} from "../graphql/query"
import {ref,watch} from "vue"
import { useQuery } from '@vue/apollo-composable';
import Sector from "../graphql/Sector.gql"
import Experiance from "../graphql/Experiance.gql"
import FeildofStudy from "../graphql/FeildofStudy.gql"
import Courses from "../graphql/Courses.gql"
import {useCounterStore} from "../stores/counterStore"

const store=useCounterStore()
// import { useQuery } from '@nuxtjs/apollo';
const count = computed(() => store.count)

// Define a method to call the store's action
const increment = () => {
  store.increment()
}
// const store = useCounterStore(); // Use your store
// const isDarkMode = computed(() => store.isDarkMode);
const courses=ref([])
const {result,loading,error}=useQuery(GetCourses)
const {result:sectorResult,loading:sectorLoading,error:sectorError}=useQuery(Sector)
const {result:experianceResult,loading:experianceLoading,error:experianceError}=useQuery(Experiance)
const {result:feildResult,loading:feildLoading,error:feildError}=useQuery(FeildofStudy)
// watch(result,(newResul)=>{
//   if(newResul&&newResul.value.courses){
//     courses.value=newResul.value.courses
//   }

// })
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
    default: true,
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
<div>

  <div v-if="loading">Loading...</div>
  
  <div v-else-if="error">Error: {{ error.message }}</div>

  <div v-else>
    <div v-if="result?.courses">
      <div v-for="course in result.courses" :key="course.title">
        <p> {{ course.title }}</p>
        <p>{{course.price}}</p>
       <p>{{course.summary}}</p>
      </div>
    </div>
    <div v-else>No courses available.</div>
  </div>

  <div v-if="sectorLoading">Loading...</div>
  
  <div v-else-if="sectorError">Error: {{ error.message }}</div>

  <div v-else>
    <div v-if="sectorResult?.basic_sectors">
      <div v-for="sector in sectorResult.basic_sectors" :key="sector">
        <p> {{sector.id}}</p>
        <p>{{sector.name}}</p>
      </div>
    </div>
    <div v-else>No sectors available.</div>
  </div>


  <div v-if="experianceLoading">Loading...</div>
  
  <div v-else-if="experianceError">Error: {{ error.message }}</div>

  <div v-else>
    <div v-if="experianceResult?.basic_education_levels">
      <div v-for="education in experianceResult.basic_education_levels" :key="education">
      
       <p>{{education.name}}</p>
      </div>
    </div>
    <div v-else>No courses available.</div>
  </div>


 <div v-if="feildLoading">Loading...</div>
  
  <div v-else-if="feildError">Error: {{ error.message }}</div>

  <div v-else>
    <div v-if="feildResult?.basic_fields_of_study">
      <div v-for="field in feildResult.basic_fields_of_study" :key="field">
      
       <p>{{field.name}}</p>
      </div>
    </div>
    <div v-else>No courses available.</div>
  </div>

    <div>
    <h1>Count: {{ count }}</h1>
    <button @click="increment">Increment</button>
  </div>

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
              <div
                class="absolute right-0 justify-between w-full px-5 lg:px-9 lg:pt-9 sm:flex"
              >
                <DialogTitle
                  as="h3"
                  class="flex-1 text-base font-semibold leading-6 text-gray-900"
                  >
                  <slot name="Heading" />
                </DialogTitle>
              </div>
              <button
                v-if="hasCloseIcon"
                type="button"
                class="absolute lg:w-10 lg:h-10 text-gray-400 rounded-md right-6 shrink-0 hover:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-100 hover:border"
                @click="open = false"
              >
                <span class="sr-only">Close</span>
                <Icon
                  name="ion:close-outline"
                  class="text-2xl lg:text text-gray-900 dark:text-white"
                />
              </button>
              <slot name="content" />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</div>
 
</template>
