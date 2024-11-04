<script setup>
import { onClickOutside } from "@vueuse/core";
import { useField } from "vee-validate";
import { useEventBus } from "@vueuse/core";

const bus = useEventBus("removeSelectedChip");
bus.on(listener);

const props = defineProps({
  modelValue: {
    type: [String, Array, Object],
  },
  name: {
    type: String,
    required: true,
  },
  selectedChips: {
    type: [String, Array, Object],
  },
  items: {
    type: Array,
    default: [],
  },
  returnBy: {
    type: String,
  },
  showBy: {
    type: String,
  },
  chipsStyle: {
    type: String,
    required: false,
  },
  init: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: "Search",
  },
  loading: {
    type: Boolean,
    default: false,
    required: false,
  },
  value: {
    type: String,
    default: "id",
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  trailingIcon: {
    type: String,
    default: "ion:chevron-down-outline",
  },
  rules: {
    type: String,
    default: "",
    required: false,
  },
  chipsTextStyle: {
    type: String,
    default:
      "break-words whitespace-pre-wrap w-full flex flex-wrap overflow-hidden text-sm",
  },
  listClass: {
    type: String,
  },
  deletedItem: {
    type: String,
  },
  showError: {
    type: Boolean,
    default: true,
  },
  inside: {
    type: Boolean,
    default: true,
  },
});

const chips = ref([]);
const show = ref(false);
const search = ref(undefined);
const selected = ref({});
const set = ref(true);
const list_select = ref(null);

const emit = defineEmits([
  "update:modelValue",
  "update:selectedChips",
  "search",
]);

//=================== functions ============================

const {
  errorMessage,
  value: inputValue,
  meta,
} = useField(props.name, props.rules, {
  initialValue: props.modelValue,
});

const select = (val) => {
  selected.value[val[props.value]] = !selected.value[val[props.value]];
  if (!Object.values(selected.value).includes(false)) {
    chips.value.push(val);
    inputValue.value = chips.value.map((chip) => chip.id);
  } else {
    delete selected.value[val.id];
    chips.value = chips.value.filter((e) => e.id != val.id);
    inputValue.value = chips.value.map((chip) => chip.id);
  }
  if (chips.value && chips.value.length) {
    emit(
      "update:modelValue",
      chips.value.map((chip) => chip.id)
    );
    emit("update:selectedChips", chips.value);
  } else {
    emit("update:modelValue", undefined);
    inputValue.value = undefined;
    emit("update:selectedChips", chips.value);
  }
};

const queryList = () => {
  emit("search", search.value);
};

onMounted(() => {
  if (
    typeof props.init == "object"
      ? Object.keys(props.init).length
      : props.init.length
  ) {
    inputValue.value = props.modelValue;
  }
});

if (props.init && props.init[0]) {
  chips.value = [
    ...new Map(props.init.map((item) => [item[props.value], item])).values(),
  ];
  for (const val of chips.value) {
    selected.value[val[props.value]] = !selected.value[val[props.value]];
  }

  if (chips.value && chips.value.length) {
    emit(
      "update:modelValue",
      chips.value.map((chip) => chip.id)
    );
    emit("update:selectedChips", chips.value);
  } else {
    emit("update:modelValue", undefined);
    emit("update:selectedChips", chips.value);
  }
}

const deleteChip = (index) => {
  let id = chips.value[index].id;
  chips.value.splice(index, 1);
  delete selected.value[id];
  if (chips.value?.length < 1) {
    inputValue.value = chips.value;
  }
  if (chips.value && chips.value.length) {
    emit(
      "update:modelValue",
      chips.value.map((chip) => chip.id)
    );
    emit("update:selectedChips", chips.value);
  } else {
    emit("update:modelValue", undefined);
    emit("update:selectedChips", chips.value);
    inputValue.value = undefined;
  }
};

function listener(idx) {
  deleteChip(idx);
}

watch(
  () => props.modelValue,
  (newVal) => {
    if (!newVal) {
      chips.value = [];
    }
  }
);

onClickOutside(list_select, (e) => (show.value = false));
</script>

<template>
  <div class="w-full relative">
    <div
      :class="[
        errorMessage
          ? 'focus:ring-red-500 focus:border-red-500 hover:border-red-500 border-red-500'
          : 'focus:ring-primary  focus:border-primary hover:border-primary border-gray-300 border-1 ',
        'flex h-10 flex-wrap items-center bg-white dark:bg-gray-700 relative pr-7 rounded-md py-1 px-2 gap-1 border shadow-sm cursor-text',
      ]"
      @click="show = true"
    >
      <h1 class="text-sm text-gray-400 dark:text-white">
        {{ placeholder }}
      </h1>
      <div
        v-if="trailingIcon"
        class="absolute inset-y-0 right-0 pr-1 flex items-center pointer-events-none ml-2"
        @click="show = true"
      >
        <Icon :name="trailingIcon" class="h-5 w-5 text-gray-400 ml-2" />
      </div>
    </div>
    <ul
      ref="list_select"
      v-show="show"
      class="absolute z-10 w-full bg-white dark:bg-gray-500 border border-primary shadow min-h-[15rem] max-h-[22rem] rounded-b-md text-base overflow-auto"
      :class="[listClass || '']"
    >
      <li class="h-1">
        <h-progress
          v-if="loading"
          class="rounded-xl w-full"
          color1="bg-primary-lite"
          color2="bg-primary"
          color3="bg-primary-dark"
          height="h-1"
        ></h-progress>
      </li>
      <li class="px-2 border-b pb-2">
        <input
          class="flex-1 focus:ring-0 focus:ring-primary focus:outline-none flex min-w-20 rounded-md focus:border-primary focus:border-2 border-gray-400 border w-full p-1 dark:bg-gray-700 dark:text-white dark:placeholder:text-white"
          name="select"
          @click="show = true"
          v-model="search"
          @input="queryList"
          @blur="outside"
          :placeholder="placeholder"
          :disabled="false"
        />
      </li>
      <li
        v-for="item in items"
        @click="select(item)"
        :class="[
          multiple && selected[item[value]]
            ? 'bg-primary/20 dark:bg-gray-400'
            : '',
        ]"
        class="border-b select-none relative py-3 px-3 hover:bg-primary/30 hover:dark:bg-gray-400 text-gray-600 cursor-pointer"
      >
        <div class="flex items-center justify-between">
          <span class="text-gray-600 font-light block dark:text-white">
            {{ item[showBy] }}
          </span>
          <Icon
            name="ic:round-check"
            v-if="multiple && selected[item[value]]"
            class="text-2xl text-gray-600 dark:text-white shrink-0"
          />
        </div>
      </li>
    </ul>
    <ul class="flex flex-wrap py-3 gap-x-5 gap-y-2" v-if="chips.length">
      <div
        class="flex justify-center items-center self-center whtespace-nowrap"
        :class="[
          'px-3 py-1 ring-1 ring-gray-200 bg-primary-5 text-primary-3 rounded-full dark:text-white dark:bg-gray-800',
          inside ? '' : 'hidden',
        ]"
        v-for="(chip, i) of chips"
        :key="chip.label"
      >
        <p :class="chipsTextStyle" v-if="inside" class="whitespace-nowrap">
          {{ chip.name }}
        </p>
        <Icon
          v-if="inside"
          name="ion:close-outline"
          class="ml-1 hover:cursor-pointer text-xl duration-200 dark:hover:text-white shrink-0"
          @click="deleteChip(i)"
          >clear</Icon
        >
      </div>
    </ul>
    <p
      :visible="errorMessage"
      class="mt-2 text-sm text-red-600"
      :class="errorMessage ? 'h-5' : 'h-0'"
      v-if="showError"
      id="email-error"
    >
      {{ errorMessage }} &nbsp;
    </p>
  </div>
</template>
<style scoped>
/* width */
::-webkit-scrollbar {
  width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px white;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #002f6c;
  border-radius: 3px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #002f6c;
}
</style>
