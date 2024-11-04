<script setup>
import { is } from "date-fns/locale";
const props = defineProps({
  isSearch: {
    type: Boolean,
    default: true,
  },
  class: {
    type: String,
    default: "",
  },
});
const search = ref("");
const emit = defineEmits(["update", "selectedFilter"]);
watchEffect(() => {
  emit("update", search.value);
  // console.log(search.value);
});
const selectedFilter = (data) => {
  // console.log(data);
  emit("selectedFilter", data);
};
</script>

<template>
  <div
    class=" mx-5 rounded-lg border p-5 text-black dark:text-white dark:!bg-secondary-dark-2 dark:border-secondary-dark-2"
    :class="[props.class ? props.class : '']"
  >
    <HTextField
      v-if="isSearch"
      rules=""
      class="w-full my-2 dark:bg-gray-700 dark:placeholder-white"
      name="center_name"
      v-model="search"
      iconLeadingClass="pl-12 py-4"
      placeholder="Search"
    >
      <template #leading>
        <Icon
          name="material-symbols:search"
          class="absolute z-10 w-7 text-gray-500 h-7 -translate-y-2.5 left-2 top-[46%] dark:text-gray-200"
        />
      </template>
    </HTextField>
    <!-- <searchAccourdion @selectedOptions="selectedFilter" /> -->
    <SearchAccordion @selectedOptions="selectedFilter"/>
  </div>
</template>

<style></style>
