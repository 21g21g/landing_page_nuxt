<script setup>
import { RadioGroup, RadioGroupOption } from "@headlessui/vue";
import { useForm } from "vee-validate";
// import file_upload from "@/graphql/mutation/upload.gql";
// import insert_user from "@/graphql/mutation/register_user_with_payment.gql";
// import mutator from "@/composables/mutation/mutator.js";
import muya from "../../assets/HaHuMuya.png"
import peopele from "../../assets/humanLike.svg"
// import useNotify from "@/use/notify";

// const { notify } = useNotify();
const { handleSubmit } = useForm({});
const { executeRecaptcha } = useGoogleRecaptcha();
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
  data: {
    type: Object,
    default: {},
  },
});
const emits = defineEmits(["update:modelValue"]);
const openModal = computed({
  get() {
    return props.modelValue;
  },
  set(newVal) {
    emits("update:modelValue", newVal);
  },
});
const items = ref({});
const selectedSchedule = ref(null);
const course_schedules = ref([]);

onMounted(() => {
  const allSchedules = [
    {
      class_type: "weekdays",
      number_of_classes: 0,
      shift: "morning",
    },
    {
      class_type: "weekdays",
      number_of_classes: 0,
      shift: "afternoon",
    },
    {
      class_type: "weekdays",
      number_of_classes: 0,
      shift: "night",
    },
    {
      class_type: "weekend",
      number_of_classes: 0,
      shift: "morning",
    },
    {
      class_type: "weekend",
      number_of_classes: 0,
      shift: "afternoon",
    },
    {
      class_type: "weekend",
      number_of_classes: 0,
      shift: "night",
    },
  ];
  course_schedules.value = allSchedules.map((i, index) => {
    const found = props.data.course_schedules.some((j) => {
      if (i.class_type == j.class_type && i.shift == j.shift) {
        i = { ...j, is_available: true };
        return true; // Break out of the loop
      }
    });
    if (!found) {
      i = { ...i, is_available: false };
    }
    return i;
  });
});

const steps = [
  { name: "Personal Info", id: 1, icon: "tabler:number-1" },
  { name: "Schedule", id: 2, icon: "tabler:number-2" },
  // { name: "Payment", id: 3, icon: "tabler:number-3" },
  { name: "Done", id: 3, icon: "tabler:number-3" },
];
const step = ref(1);

// ============= Upload File =============
const base64File = ref(null);
const reference_file = ref(null);

const {
  mutate: uploadMutate,
  onError: uploadError,
  onDone: uploadDone,
  loading: uploadLoading,
} = mutator(file_upload, "Anonymous");

function uploadFile(file) {
  uploadMutate({
    Args: {
      files: file.split(",")[1],
      folder: "muya",
    },
  });
}
uploadDone(({ data }) => {
  if (data) {
    reference_file.value = data.file_upload?.extension.secure_urls[0];
  }
});

uploadError(() => {
  notify({
    title: "Error",
    description: "Failed to upload file",
    cardClass: "bg-red-100 dark:bg-gray-800 mt-14",
    icon: "pajamas:error",
    iconClass: "text-red-400",
    borderClass: "border-l-8 border-red-300 rounded-l-lg",
  });
});
const localPath = useLocalePath();

// ================ Submit ================
const openConfirmModal = ref(false);
const mutateObject = ref({});

const submit = handleSubmit(() => {
  if (step.value < 2) {
    step.value++;
  } else if (step.value == 2) {
    if (!selectedSchedule.value) {
      notify({
        title: "Scuedule Required",
        description: "Please select a schedule",
        cardClass: "bg-yellow-100 dark:bg-gray-800 mt-14",
        icon: "pajamas:error",
        iconClass: "text-yellow-400",
        borderClass: "border-l-8 border-yellow-300 rounded-l-lg",
      });
      return;
    }
    mutateObject.value = {
      // profile_picture: "",
      email: items.value.email,
      first_name: items.value.first_name,
      last_name: items.value.last_name,
      max_education_level: items.value.max_education_leveleducation,
      phone_number: `+251${items.value.phone_number}`,
      years_of_experiance: items.value.years_of_experience,
      user_sectors: items.value.sector
        ? {
            data: items.value.sector.map((e) => {
              return { sector_id: e };
            }),
          }
        : undefined,
      user_fields_of_studies: items.value.field_of_study_id
        ? {
            data: items.value.field_of_study_id.map((e) => {
              return { field_of_study_id: e };
            }),
          }
        : undefined,
      user_courses: {
        data: {
          course_id: props.data.id,
          course_schedule_id: selectedSchedule.value.id,
          // payment: {
          //   data: {
          //     course_id: props.data.id,
          //     payment_date: items.value.payment_date,
          //     payment_method: "bank_transfer",
          //     reference_file: reference_file.value,
          //     transaction_id: items.value.transaction_id,
          //     transaction_note: items.value.transaction_note,
          //   },
          // },
        },
      },
    };
    openConfirmModal.value = true;
  } else if (step.value == 3) {
    openModal.value = false;
  }
});

// ============= Confirm =============

const { mutate, onError, onDone, loading } = mutator(insert_user, "Anonymous");
async function confirm() {
  openConfirmModal.value = false;
  const { token } = await executeRecaptcha("submit");
  await useFetch("/api/reCaptcha", {
    method: "post",
    body: {
      token,
    },
  })
    .then(({ data }) => {
      if (data.value?.success) {
        mutate({ object: mutateObject.value });
      } else {
        notify({
          title: "reCaptcha Failed!",
          description: "reCAPTCHA verification failed. Please try again.",
          cardClass: "bg-yellow-100 dark:bg-gray-800 mt-14",
          icon: "logos:recaptcha",
          iconClass: "text-yellow-400",
          borderClass: "border-l-8 border-yellow-300 rounded-l-lg",
        });
      }
    })
    .catch((err) => {
      console.log("err", err);
    });
}

onDone(({ data }) => {
  if (data) {
    step.value++;
    notify({
      title: "Success",
      description: "You have successfully registered for the course",
      cardClass: "bg-green-100 dark:bg-gray-800 mt-14",
      icon: "line-md:confirm-circle",
      iconClass: "text-green-400",
      borderClass: "border-l-8 border-green-300 rounded-l-lg",
    });
  }
});

onError(() => {
  notify({
    title: "Similar Phone Number",
    description:
      "Another account using this phone number is already enrolled in this course",
    cardClass: "bg-yellow-100 dark:bg-gray-800 mt-14",
    icon: "pajamas:error",
    iconClass: "text-yellow-400",
    borderClass: "border-l-8 border-yellow-300 rounded-l-lg",
  });
});
</script>
<template>
  <HModal
     v-model="openModal"
    :autoClose="false"
    :enabledOverflow="true"
    mainClass="relative min-h-[90vh] text-left transition-all my-5 transform rounded-lg shadow-xl sm:w-full"
    wrapperClass="bg-white w-full max-w-5xl lg:max-w-6xl 3xl:max-w-7xl h-auto text-gray-700 flex flex-col justify-center dark:bg-secondary-dark-2"
  >
    <template #content>
      <HConfirmModalNew
        v-if="openConfirmModal"
        v-model="openConfirmModal"
        @confirm="confirm"
        icon="iconoir:check"
        icon-class="text-primary"
        title="Enroll Course"
        description="Are you sure you want to enroll to this course?"
        confirmButton="Enroll"
        :loading="loading"
      />
      <div class="flex h-full relative">
        <button
          @click="openModal = false"
          class="absolute top-2 right-2 z-[1000]"
        >
          <Icon
            name="mingcute:close-line"
            class="text-2xl text-primary-6 dark:text-gray-300"
          />
        </button>
        <div
          class="hidden lg:w-[30%] min-h-[90vh] bg-primary-3 h-auto lg:flex flex-col items-center px-5 py-20 justify-between rounded-l-lg"
        >
          <div class="flex flex-col items-center gap-y-5">
            <div class="w-40">
              <img :src="muya" />
            </div>
            <div class="w-[80%]">
              <img :src="peopele" />
            </div>
          </div>
          <div class="flex flex-col gap-y-5 px-2 mt-5">
            <h1
              class="text-white font-bold uppercase text-xl 3xl:text-xl text-center"
            >
              {{ data.title }}
            </h1>
            <p class="text-sm text-white text-justify">
              {{ data.summary }}
            </p>
            <div class="p-1 rounded-lg space-y-2 w-full">
              <h1 class="underline text-white font-semibold mb-2">
                {{ $t("instructors") }}
              </h1>
              <NuxtLink
                class="flex md:space-x-4 items-center mb-2 bg-gray-100/10 p-2 rounded-lg ring-1 ring-transparent hover:ring-primary-3 duration-300"
                v-for="i in data.course_instructors"
                :key="i"
                :to="
                  localPath({
                    name: 'app-teacher-id',
                    params: { id: i.instructor.id },
                  })
                "
              >
                <div class="flex rounded-full border-Primary-300 shrink">
                  <img
                    :src="i?.instructor?.profile_picture"
                    alt="Program Image"
                    class="object-cover w-[60px] h-[60px] rounded-full border-Primary-500 shrink-0"
                    width="60"
                    height="60"
                  />
                </div>
                <div class="flex flex-col space-y-1 ml-1 md:ml-4">
                  <h1 class="text shrink-0 text-white font-semibold">
                    {{ i?.instructor?.name }}
                  </h1>
                  <h1 class="text text-white">
                    {{ i?.instructor?.position }}
                  </h1>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col justify-between flex-1 h-auto rounded-tr-lg relative"
        >
          <h1 class="text-2xl text-primary-3 py-5 text-center font-semibold">
            Registration
          </h1>
          <div
            class="py-10 lg:py-5 bg-gray-100 dark:bg-gray-700 rounded-tr-lg overflow-clip px-7 lg:px-20 relative"
          >
            <HSteps :steps="steps" :step="step"></HSteps>
            <div
              class="flex lg:px-2 w-full justify-between relative -bottom-8 md:top-5 -mt-4"
              :class="step == 1 ? 'hidden' : 'justify-between'"
            >
              <button @click="step > 1 ? step-- : ''" class="self-start">
                <Icon
                  name="circum:circle-chev-right"
                  class="text-2xl md:text-3xl text-gray-300 rotate-180"
                />
              </button>
              <button
                type="submit"
                @click="step < 4 ? submit() : ''"
                class="self-end"
              >
                <Icon
                  name="circum:circle-chev-right"
                  class="text-2xl md:text-3xl text-gray-300"
                />
              </button>
            </div>
          </div>
          <div
            class="px-5 lg:px-10 pb-10 flex-1 flex flex-col gap-y-10 justify-between"
          >
            <form
              @submit.prevent="submit"
              v-show="step == 1"
              class="grid lg:grid-cols-2 gap-x-14 gap-y-3 lg:gap-y-4 3xl:gap-y-8 pt-5 lg:pt-10"
            >
              <HTextField
                v-model="items.first_name"
                label="first name"
                placeholder=""
                type="text"
                class="w-full"
                rules="required"
                name="first_name"
              >
                <template #label>
                  <p class="mb-2 dark:text-gray-300 font-light text-sm">
                    Name <span class="text-red-600">*</span>
                  </p>
                </template>
              </HTextField>
              <HTextField
                v-model="items.last_name"
                label="last name"
                placeholder=""
                type="text"
                class="w-full"
                rules="required"
                name="last_name"
              >
                <template #label>
                  <p class="mb-2 dark:text-gray-300 font-light text-sm">
                    Father Name <span class="text-red-600">*</span>
                  </p>
                </template>
              </HTextField>
              <HTextField
                v-model="items.phone_number"
                label="phone number"
                placeholder=""
                type="text"
                class="block w-full rounded-md text-gray-900 shadow-sm sm:text-base sm:leading-none h-10"
                placeholderStyle="text-gray-400 pl-14"
                rules="required|ethio_phone"
                name="phone_number"
              >
                <template #label>
                  <p class="mb-2 dark:text-gray-300 font-light text-sm">
                    Phone Number <span class="text-red-600">*</span>
                  </p>
                </template>
                <template v-slot:leading>
                  <div
                    class="absolute flex justify-center h-full rounded-l-md overflow-clip items-center w-14 text-gray-600 dark:text-gray-200"
                  >
                    +251
                  </div>
                </template>
              </HTextField>
              <HTextField
                v-model="items.email"
                label="email"
                placeholder=""
                type="text"
                class="w-full"
                rules="email"
                name="email"
              >
                <template #label>
                  <p class="mb-2 dark:text-gray-300 font-light text-sm">
                    Email
                  </p>
                </template>
              </HTextField>

              <HTextField
                v-model="items.years_of_experience"
                label="years of experience"
                placeholder=""
                type="number"
                class="w-full"
                rules="required"
                name="years_of_experience"
              >
                <template #label>
                  <p class="mb-2 dark:text-gray-300 font-light text-sm">
                    Years of Experience <span class="text-red-600">*</span>
                  </p>
                </template>
              </HTextField>

              <SharedEducation
                v-model="items.max_education_leveleducation"
                label="Maximum Level of Education"
                placeholder=""
                type="text"
                class="w-full"
                rules="required"
                name="level_of_education"
                labelClass="mb-2 dark:text-gray-300 font-light text-sm"
              />

              <SharedFosMulti
                v-model="items.field_of_study_id"
                label="Field of Study"
                placeholder=""
                type="text"
                class="w-full"
                rules=""
                name="field_of_study"
                labelClass="mb-2 dark:text-gray-300 font-light text-sm"
              />

              <SharedSectorMulti
                v-model="items.sector"
                label="sector"
                placeholder=""
                type="text"
                class="w-full"
                rules=""
                name="sector_id"
                labelClass="mb-2 dark:text-gray-300 font-light text-sm"
              >
                <template #label>
                  <p class="mb-2 dark:text-gray-300 font-light text-sm">
                    Sector testing
                  </p>
                </template>
              </SharedSectorMulti>
            </form>

            <div v-show="step == 2" class="flex flex-col">
              <div
                class="flex flex-col lg:flex-row gap-x-10 gap-y-3 pt-7 md:pt-5"
              >
                <div class="w-full lg:w-[40%]">
                  <img
                    :src="data?.courses_media[0]?.url || 'peopele'"
                    alt="Thumbnail"
                  />
                </div>
                <div class="w-full lg:w-[60%]">
                  <p
                    class="text-gray-600 dark:text-gray-300 text-sm 3xl:text-base font-bold"
                  >
                    ETB {{ data?.price?.toLocaleString("en-US") }}
                  </p>
                  <h1
                    class="font-medium text-lg text-gray-700 dark:text-gray-100"
                  >
                    {{ data.title || "- - -" }}
                  </h1>
                  <p
                    class="font-light text-xs 3xl:text-sm text-gray-600 dark:text-gray-300 mt-3 line-clamp-2"
                  >
                    {{ data.summary || "- - -" }}
                  </p>

                  <div class="flex justify-between pb-2 pt-3">
                    <div class="space-y-3">
                      <div class="flex space-x-2 items-center">
                        <Icon
                          class="text-gray-600 text-base lg:text-sm 3xl:text-base dark:text-white"
                          name="bx:time"
                        />
                        <p
                          class="text-gray-600 text-base lg:text-sm dark:text-white"
                        >
                          {{ $t("duration") }}
                        </p>
                      </div>
                      <h1
                        class="text-gray-700 text-base lg:text-sm 3xltext-base dark:text-white"
                      >
                        {{ data.duration }} {{ $t("months") }}
                      </h1>
                    </div>
                    <div class="space-y-3">
                      <div class="flex space-x-2 items-center">
                        <Icon
                          class="text-gray-600 text-base lg:text-sm 2xl:text-base dark:text-white"
                          name="uil:books"
                        />
                        <p
                          class="text-gray-600 text-base lg:text-sm 3xl:text-base dark:text-white"
                        >
                          {{ $t("class") }}
                        </p>
                      </div>
                      <h1
                        class="text-gray-700 text-base lg:text-sm 3xl:text-base dark:text-white"
                      >
                        {{ data.totalClasses }}
                        {{ $t("classes") }}
                      </h1>
                    </div>
                    <div class="space-y-3">
                      <div
                        class="flex space-x-2 text-sm sm:text-base items-center"
                      >
                        <Icon
                          class="text-gray-600 text-base lg:text-sm 3xl:text-base dark:text-white"
                          name="uil:circle-layer"
                        />
                        <p
                          class="text-gray-600 text-base lg:text-sm 3xl:text-base dark:text-white"
                        >
                          {{ $t("level") }}
                        </p>
                      </div>
                      <h1
                        class="text-gray-700 text-base lg:text-sm 3xl:text-base dark:text-white capitalize"
                      >
                        {{ data?.course_level?.level }}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="flex flex-col gap-y-3"
                v-if="data?.course_instructors.length"
              >
                <h1
                  class="text-sm 3xl:text-base text-gray-500 dark:text-gray-200 -mb-2"
                >
                  Instructors
                </h1>
                <hr />
                <ul class="flex overflow-x-scroll gap-x-5 pb-2 divide-x-2">
                  <li
                    class="flex-1 flex items-center gap-x-3 w-full pl-3"
                    v-for="i in data?.course_instructors"
                  >
                    <div
                      class="w-9 h-9 rounded-full ring-1 ring-primary/50"
                      :style="{
                        'background-image': `url(${
                          i?.instructor?.profile_picture || '/images/avatar.png'
                        })`,
                        'background-size': 'cover',
                        'background-position': 'center',
                      }"
                    ></div>
                    <div
                      class="flex flex-col text-xs 3xl:text-sm text-gray-600 dark:text-white"
                    >
                      <p class="font-semibold whitespace-nowrap">
                        {{ i?.instructor?.name || "- - -" }}
                      </p>
                      <p class="font-light whitespace-nowrap">
                        {{ i?.instructor?.position || "- - -" }}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <hr />
              <fieldset class="">
                <legend
                  class="text-lg 3xl:text-xl font-semibold leading-6 text-gray-600 dark:text-gray-200 w-full pt-5 px-2 text-center"
                >
                  Select Schedule
                </legend>
                <RadioGroup
                  v-model="selectedSchedule"
                  class="mt-6 gap-y-6 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 lg:divide-x-2 lg:divide-gray-200"
                >
                  <div class="flex flex-col">
                    <div class="flex flex-col flex-1 pb-5 gap-y-1 3xl:gap-y-2">
                      <h1
                        class="text-gray-600 dark:text-gray-200 text-base 3xl:text-lg"
                      >
                        Weekday
                      </h1>
                      <h3
                        class="text-xs 3xl:text-sm text-gray-500 dark:text-gray-200"
                      >
                        Monday & Friday
                      </h3>
                    </div>
                    <RadioGroupOption
                      as="template"
                      v-for="schedule in course_schedules.filter(
                        (e) => e.class_type == 'weekdays'
                      )"
                      :key="schedule.id"
                      :value="schedule"
                      :aria-label="schedule.class_type"
                      v-slot="{ active, checked }"
                    >
                      <div
                        :disabled="!schedule.is_available"
                        :class="
                          !schedule.is_available
                            ? 'cursor-not-allowed'
                            : 'cursor-pointer'
                        "
                        class="relative flex border-b bg-white dark:bg-transparent py-2 duration-100 outline-none focus:outline-none hover:bg-primary-5/30"
                        :title="
                          !schedule.is_available
                            ? 'Currently Not Available'
                            : ''
                        "
                      >
                        <span
                          class="flex items-center gap-x-5 flex-1 duration-200"
                          :class="
                            checked
                              ? 'text-primary-3'
                              : 'text-gray-600 dark:text-white'
                          "
                        >
                          <Icon
                            :name="
                              schedule.shift == 'morning'
                                ? 'ep:sunrise'
                                : schedule.shift == 'afternoon'
                                ? 'ph:sun-fill'
                                : 'uil:moonset'
                            "
                            class="text-2xl"
                            :class="[
                              !schedule.is_available
                                ? 'line-through opacity-20'
                                : '',
                            ]"
                          />
                          <span class="flex flex-col gap-y-1">
                            <span
                              class="text-sm 3xl:text-base capitalize font-medium"
                              :class="[
                                !schedule.is_available
                                  ? 'line-through opacity-20'
                                  : '',
                              ]"
                              >{{ schedule.shift }}</span
                            >
                            <span
                              class="text-xs 3xl:text-sm font-light"
                              :class="[
                                !schedule.is_available
                                  ? 'line-through opacity-20'
                                  : '',
                              ]"
                              >{{
                                schedule.shift == "morning"
                                  ? "8:00 AM - 12:00 AM"
                                  : schedule.shift == "afternoon"
                                  ? "2:00 PM - 5:00 PM"
                                  : "6:00 PM - 8:00 AM"
                              }}</span
                            >
                          </span>
                        </span>
                        <Icon
                          name="line-md:circle-to-confirm-circle-transition"
                          v-if="checked"
                          class="h-8 w-8 text-primary-3"
                          aria-hidden="true"
                        />
                        <Icon
                          name="mdi:circle-outline"
                          v-if="!checked"
                          class="h-8 w-8 text-gray-200"
                          aria-hidden="true"
                        />
                      </div>
                    </RadioGroupOption>
                  </div>
                  <div class="flex flex-col lg:pl-10">
                    <div class="flex flex-col flex-1 pb-5 gap-y-1 3xl:gap-y-2">
                      <h1
                        class="text-gray-600 dark:text-gray-200 text-base 3xl:text-lg"
                      >
                        Weekend
                      </h1>
                      <h3
                        class="text-xs 3xl:text-sm text-gray-500 dark:text-gray-200"
                      >
                        Saturday & Sunday
                      </h3>
                    </div>
                    <RadioGroupOption
                      as="template"
                      v-for="schedule in course_schedules?.filter(
                        (e) => e.class_type == 'weekend'
                      )"
                      :key="schedule.id"
                      :value="schedule"
                      :aria-label="schedule.class_type"
                      v-slot="{ active, checked }"
                    >
                      <div
                        :disabled="!schedule.is_available"
                        :class="
                          !schedule.is_available
                            ? 'cursor-not-allowed'
                            : 'cursor-pointer'
                        "
                        class="relative flex border-b bg-white dark:bg-transparent py-2 duration-100 outline-none focus:outline-none hover:bg-primary-5/30"
                        :title="
                          !schedule.is_available
                            ? 'Currently Not Available'
                            : ''
                        "
                      >
                        <span
                          class="flex items-center gap-x-5 flex-1 duration-200"
                          :class="
                            checked
                              ? 'text-primary-3'
                              : 'text-gray-600 dark:text-white'
                          "
                        >
                          <Icon
                            :name="
                              schedule.shift == 'morning'
                                ? 'ep:sunrise'
                                : schedule.shift == 'afternoon'
                                ? 'ph:sun-fill'
                                : 'uil:moonset'
                            "
                            class="text-2xl"
                            :class="[
                              !schedule.is_available
                                ? 'line-through opacity-20'
                                : '',
                            ]"
                          />
                          <span class="flex flex-col gap-y-1">
                            <span
                              class="text-sm 3xl:text-base capitalize font-medium"
                              :class="[
                                !schedule.is_available
                                  ? 'line-through opacity-20'
                                  : '',
                              ]"
                              >{{ schedule.shift }}</span
                            >
                            <span
                              class="text-xs 3xl:text-sm font-light"
                              :class="[
                                !schedule.is_available
                                  ? 'line-through opacity-20'
                                  : '',
                              ]"
                              >{{
                                schedule.shift == "morning"
                                  ? "8:00 AM - 12:00 AM"
                                  : schedule.shift == "afternoon"
                                  ? "2:00 PM - 5:00 PM"
                                  : "6:00 PM - 8:00 AM"
                              }}</span
                            >
                          </span>
                        </span>
                        <Icon
                          name="line-md:circle-to-confirm-circle-transition"
                          v-if="checked"
                          class="h-8 w-8 text-primary-3"
                          aria-hidden="true"
                        />
                        <Icon
                          name="mdi:circle-outline"
                          v-if="!checked"
                          class="h-8 w-8 text-gray-200"
                          aria-hidden="true"
                        />
                      </div>
                    </RadioGroupOption>
                  </div>
                </RadioGroup>
              </fieldset>
            </div>

            <div v-if="step == 3" class="flex flex-col gap-y-16">
              <div class="flex justify-center">
                <Icon
                  name="line-md:confirm-circle-twotone"
                  class="text-[15rem] text-primary-3"
                />
              </div>
              <div class="flex flex-col gap-y-5">
                <h1 class="text-center text-primary-3 text-3xl font-bold">
                  Registration Successfull
                </h1>
                <p
                  class="text-center text-gray-500 dark:text-white max-w-[35rem] mx-auto"
                >
                  You have successfully registered for the course. Within 24
                  hours, one of our service officers will contact you regarding
                  the status of your application using the phone number or email
                  address you provided during registration.
                </p>
              </div>
            </div>
            <div
              class="w-full justify-center gap-x-14 flex gap-y-5 flex-col items-center"
            >
              <button
                type="submit"
                @click="submit"
                class="bg-primary-3 font-bold text-lg text-white py-2 rounded-md w-full md:w-1/2 mx-auto self-center"
              >
                {{ step == 1 ? "Register" : step == 3 ? "Done" : "Submit" }}
              </button>
              <div class="text-secondary-2 text-sm dark:text-white text-center">
                This site is protected by
                <span class="font-bold text-primary-3 dark:text-primary-3"
                  >reCAPTCHA</span
                >
                and the Google
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  class="text-primary-3 font-bold"
                  >Privacy Policy</a
                >
                and
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  class="text-primary"
                  >Terms of Service</a
                >
                apply.
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </HModal>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 0px;
  height: 1px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #f1f1f1;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #596474;
  border-radius: 3px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #596474;
}
</style>
