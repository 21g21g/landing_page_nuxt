<script setup>
// import list from "@/composables/query/query.js";
// import FieldOfStudy from "@/graphql/query/shared/fieldOfStudy.gql";
// import FieldOfStudy from "@/graphql/query/search_fields_of_study.gql";
// import { useUserStore } from "@/stores/user.js";
// const userStore = useUserStore();

const props = defineProps({
  modelValue: {
    type: [Object, Function, String],
  },
  init: {
    type: [Object, String, Array],
  },
  name: String,
  disabled: {
    type: Boolean,
    default: false,
  },
  prefix: String,
  textClass: {
    type: [String, Boolean],
    default: true,
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
  hideDetail: {
    type: Boolean,
    default: true,
  },
  class: {
    type: String,
  },
  disableClass: {
    type: String,
    default: "",
  },
  labelClass: {
    type: String,
    default: "text-secondary mb-3 dark:text-white",
  },
  rules: {
    type: String,
    default: "required",
  },
});

const emits = defineEmits(["update:modelValue", "update:name", "update:data"]);

const items = ref([]);
const helper = ref({});
const search = ref();
const limit = ref(10);
const offset = ref(0);
const order = ref([{ name: "asc" }]);

const filter = computed(() => {
  let defaultFilter = {};
  if (search.value) {
    defaultFilter = { search: search.value };
  }
  return defaultFilter;
});
const client = computed(() => {
  if (userStore.PrimaryToken) {
    return "authClient";
  } else {
    return "Anonymous";
  }
});

const { onResult, loading, onerror } = list(
  FieldOfStudy,
  { filter, clientId: client, limit, offset },
  "user"
);
onResult(({ data }) => {
  if (data) {
    items.value = data.items;
  }
  if (props.modelValue) {
    helper.value.sector_id = props.modelValue;
  }
});

const onSearch = (value) => {
  search.value = value;
};

const getValue = (value) => {
  if (!value) {
    //props.textClass to not update if cleared
    if (!props.textClass) return;
    emits("update:modelValue", undefined);
    emits("update:name", undefined);
  } else {
    emits("update:modelValue", value.id);
    emits("update:name", value.name);
  }
};

const updateSelected = (val) => {
  emits("update:modelValue", val);
};
</script>
<template>
  <div class="w-full">
    <h1 :class="[labelClass]">
      Fields of Study
      <span class="text-red-600" v-if="rules == 'required'">*</span>
    </h1>
    <LazyHMultiSelect
      multiple
      chipsStyle="rounded-full border-[1px] border-gray-600 py-[3px] px-2 hover:border-primary/40 dark:bg-primary dark:text-white"
      :loading="loading"
      :items="items"
      v-model="helper.sector_id"
      @update:selected="updateSelected"
      @update:modelValue="updateSelected"
      @search="onSearch"
      value="id"
      showBy="name"
      listClass="h-40 dark:bg-gray-700 "
      name="fields of study"
      :rules="rules"
      :init="init"
      :showError="hideDetail"
    >
    </LazyHMultiSelect>
  </div>
</template>
