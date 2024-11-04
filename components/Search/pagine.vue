<script setup>
import list from "@/composables/query/query.js";
import query from "@/graphql/query/courses.gql";
import { useUserStore } from "@/stores/user.js";
import queryAnony from "@/graphql/query/coursesAnony.gql";

const userStore = useUserStore();

const client = computed(() => {
  if (userStore.PrimaryToken) {
    return "authClient";
  } else {
    return "Anonymous";
  }
});
const isUser = computed(() => {
  if (userStore.PrimaryToken) {
    return true;
  } else {
    return false;
  }
});
const length = ref(1);
const isAnony = computed(() => {
  if (userStore.PrimaryToken) {
    return false;
  } else {
    return true;
  }
});
const search = ref("");
watchEffect(() => {
  // emit('update', search.value);
  // console.log(search.value);
});
const updateFunction = (value) => {
  search.value = value;
};
const selectedFilterData = ref({});
let filter = computed(() => {
  let filterObject = {
    title: {
      _ilike: `%${search.value}%`,
    },
  };
  for (let key in selectedFilterData.value) {
    if (
      selectedFilterData.value[key] &&
      selectedFilterData.value[key].length > 0
    ) {
      if (key === "duration") {
        let duration = selectedFilterData.value[key][0];
        if (duration === "< 1 month") {
          filterObject[key] = { _lte: 1 };
        } else if (duration === "1 month-3 month") {
          filterObject[key] = { _gte: 1, _lte: 3 };
        } else if (duration === "> 6 month") {
          filterObject[key] = { _gte: 6 };
        }
      } else if (key === "Schedule") {
        filterObject["course_schedules"] = {
          shift: { _in: selectedFilterData.value[key] },
        };
      } else {
        filterObject[key] = { _in: selectedFilterData.value[key] };
      }
    }
  }
  return filterObject;
});
const courses = ref([]);

const { onResult, loading, onerror } = list(query, {
  filter,
  clientId: client,
  enabled: isUser,
});
onResult((result) => {
  if (result.data) {
    // console.log("courses", result.data);
    courses.value = result.data.courses;
    length.value = result.data.courses_aggregate.aggregate.count;
  }
});
const {
  onResult: onResultAnony,
  loading: loadingAnony,
  onerror: onerrorAnony,
} = list(queryAnony, {
  filter,
  clientId: client,
  enabled: isAnony,
});
onResultAnony((result) => {
  if (result.data) {
    // console.log("courses", result.data);
    courses.value = result.data.courses;
    length.value = result.data.courses_aggregate.aggregate.count;
  }
});
const selectedFilter = (data) => {
  selectedFilterData.value = data;
  // console.log("hey search ", data);
};
watchEffect(() => {
  // console.log("boo", filter.value);
});
</script>

<template>
  <div class="lg:flex justify-between bg-50 text-white lg:pr-20 h-full">
    <div
      class="lg:block hidden py-16 w-[20rem] text-black sm:w-[25rem] lg:w-[25rem] sm:mx-auto h-full"
    >
      <SearchFilter @update="updateFunction" @selectedFilter="selectedFilter" />
    </div>
    <div
      class="py-10 w-full lg:w-[75%] space-y-10 sm:mx-auto h-full text-primary-dark"
    >
      <SearchResult
        :courses="courses"
        :search="search"
        :length="length"
        :loading="loading || loadingAnony"
        @selectedOption="selectedFilter"
      />
    </div>
  </div>
</template>

<style></style>
