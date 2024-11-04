<script setup>
import list from "@/composables/query/query.js";
import FieldOfStudy from "@/graphql/query/shared/fieldOfStudy.gql";
import { useUserStore } from "@/stores/user.js";
const userStore = useUserStore();
const client = computed(() => {
  if (userStore.PrimaryToken) {
    return "authClient";
  } else {
    return "Anonymous";
  }
});
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
});
const emits = defineEmits(["update:modelValue", "update:name"]);
const searchTerm = ref("");
const items = ref([]);
const id = ref("");
const selected = ref("");
const helper = ref({});
const search = ref();
const limit = ref(100);
// helper.value.field_id = "HBrPIE6Hk_lzRweejNKxb";
const filter = computed(() => {
  let default_filter = {};

  if (search.value) {
    default_filter.name = { _ilike: `%${search.value}%` };
  }
  // } else {
  //   search.value = "";
  //   default_filter.name = { _ilike: "" };
  // }
  return default_filter;
});

const { onResult, loading, onerror } = list(
  FieldOfStudy,
  { filter, clientId: client },
  "user"
);
onResult((result) => {
  if (result.data) {
    items.value = result.data.basic_fields_of_study;
  }
  if (props.modelValue) {
    helper.value.field_id = props.modelValue;
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
    v-model:selected="helper.field_id"
    @search="onSearch"
    :items="items"
    @onSelectionFound="getValue"
    :name="name || 'Region'"
    :placeHolder="placeHolder || 'Select'"
    :trailingIcon="!helper.field_id ? 'tabler:chevron-down' : undefined"
    :class="[
      'placeholder-gray-500 font-body text-base py-1 dark:bg-gray-700 dark:text-gray-300',
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
        <span>Field of Study </span>
      </div></template
    >
  </HListSearchSelect>
</template>
