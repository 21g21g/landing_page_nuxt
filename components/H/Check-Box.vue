<script setup>
import { useField } from "vee-validate";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  labelClass: {
    type: String,
    default: () => "",
    required: false,
  },
  rules: {
    type: String,
    default: "",
    required: false,
  },
  name: {
    type: String,
    default: "Input",
    required: false,
  },
  label: String,
  description: String,
  hideDetail: {
    type: Boolean,
    default: false,
    required: false,
  },
  class: String,
  wrapperClass: String,
  disabled: {
    type: Boolean,
    default: false,
  },
});

const {
  errorMessage,
  value: checkbox,
  meta,
} = useField(props.name, props.rules, {
  initialValue: props.modelValue,
});

// watch(
//   () => props.modelValue,
//   (newVal) => {
//     checkbox.value = newVal || false;
//   }
// );

// const checkBoxChanged = (evt) => {
//   console.log("what is event", evt);
//   // emit("update:modelValue", ev.target.value === "true" ? true : false);
// };
// const toggleCheckbox = () => {
//   if (!props.disabled) {
//     checkbox.value = !checkbox.value;
//     emit("update:modelValue", checkbox.value);
//   }
// };
</script>
<template>
  <div class="text-md">
    <div class="relative flex items-center" :class="props.wrapperClass">
      <div class="">
        <label
          :for="label"
          class="flex gap-x-3 items-center font-medium text-gray-600 dark:text-white cursor-pointer"
          :class="labelClass"
        >
          <input
            v-model="checkbox"
            :id="label"
            :value="checkbox"
            :disabled="disabled"
            :aria-describedby="name"
            :name="name"
            type="checkbox"
            class="text-base rounded-lg text-primary-3 border-primary-3 accent-primary-3 w-4 h-4 cursor-pointer"
          />

          <span>{{ label }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
