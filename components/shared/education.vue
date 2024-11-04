<script setup>
// import list from "@/composables/query/query.js";
// import education from "@/graphql/query/shared/education.gql";
// import education from "@/graphql/query/search_edu_level.gql";
// import { useUserStore } from "@/stores/user.js";
// const userStore = useUserStore();
// const client = computed(() => {
//   if (userStore.PrimaryToken) {
//     return "authClient";
//   } else {
//     return "Anonymous";
//   }
// });
import Experiance from "../../graphql/Experiance.gql"
const props = defineProps({
  modelValue: {
    type: [Object, Function, String],
  },
  name: String,
  placeHolder: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  prefix: String,
  textClass: String,
  rules: String,
  showLabel: {
    type: Boolean,
    default: true,
  },
  hideDetail: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    default: "text-gray-800",
  },
  labelClass: {
    type: String,
  },
  disableClass: {
    type: String,
    default: "",
  },
  label: String,
});
const emits = defineEmits(["update:modelValue", "update:name"]);
const searchTerm = ref("");
const items = ref([]);
const id = ref("");
const selected = ref("");
const helper = ref({});
const search = ref();
const limit = ref(100);

const filter = computed(() => {
  let defaultFilter = {};
  if (search.value) {
    defaultFilter = { search: search.value };
  }
  return defaultFilter;
});

const { onResult, loading, onerror } = list(
  education,
  { filter, clientId: client },
  "user"
);
onResult(({ data }) => {
  if (data) {
    items.value = data.items;
  }
  if (props.modelValue) {
    helper.value.education_id = props.modelValue;
  }
});

const onSearch = (term) => {
  search.value = term;
};

const getValue = (value) => {
  if (!value) {
    //props.textClass to  used only  for report pages
    if (!props.textClass) return;
    emits("update:modelValue", undefined);
    emits("update:name", undefined);
  } else {
    emits("update:modelValue", value.id);
    emits("update:name", value.name);
  }
};
</script>

<template>
  <HListSearchSelect
    v-model="helper.region"
    v-model:selected="helper.education_id"
    @search="onSearch"
    :items="items"
    @onSelectionFound="getValue"
    :name="name || 'Region'"
    :placeHolder="placeHolder || 'Select'"
    :trailingIcon="!helper.education_id ? 'tabler:chevron-down' : undefined"
    :class="[
      'placeholder-gray-500 text-base py-1  dark:bg-gray-700 dark:text-gray-300',
      props.class,
    ]"
    :loading="loading"
    supporter="h-52"
    :hideDetail="hideDetail"
    :disabled="disabled"
    :disableClass="disableClass"
    :rules="rules"
    class="focus:ring-primary text-black"
  >
    <template #label>
      <div :class="labelClass">
        <span>{{ label }}</span>
      </div></template
    >
  </HListSearchSelect>
</template>
