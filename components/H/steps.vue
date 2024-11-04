<script setup>
const porps = defineProps({
  steps: {
    type: Array,
    default: () => [
      { name: "one", id: 1, icon: "mdi:number-1-circle-outline" },
      { name: "two", id: 2, icon: "mdi:number-2-circle-outline" },
      { name: "three", id: 3, icon: "mdi:number-3-circle-outline" },
      { name: "four", id: 4, icon: "mdi:number-4-circle-outline" },
      { name: "five", id: 5, icon: "mdi:number-5-circle-outline" },
    ],
  },
  step: {
    type: Number,
    default: 1,
  },
});
</script>
<template>
  <div class="w-full">
    <div class="bg-grey-light h-1"></div>
    <ul class="relative flex flex-row gap-x-2 px-5">
      <!-- Item -->
      <li class="shrink basis-0 flex-1 last:flex-none group" v-for="s in steps">
        <div
          class="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle"
        >
          <span
            class="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white"
          >
            <!-- {{ step == s.id ? "✔" : s.id }} -->
            <Icon
              name="line-md:confirm-circle-twotone"
              class="text-primary-3 text-3xl lg:text-4xl"
              v-if="s.id < step"
            />
            <Icon
              :name="s.icon"
              class="text-xl lg:text-3xl ring-2 ring-primary-3 rounded-full lg:p-1 bg-primary-3 text-white"
              v-if="s.id == step"
            />
            <Icon
              :name="s.icon"
              class="text-xl lg:text-3xl ring-2 ring-primary-3 rounded-full lg:p-1"
              v-if="s.id > step"
            />
          </span>
          <div
            :class="[
              s.id > step - 1 ? 'bg-gray-200 dark:bg-white' : 'bg-primary-3',
            ]"
            class="ms-2 w-full h-px flex-1 group-last:hidden"
          ></div>
        </div>
        <div class="mt-3">
          <span
            class="block text-xs md:text-sm font-medium text-gray-800 dark:text-white"
          >
            {{ s.name }}
          </span>
        </div>
      </li>
    </ul>
    <div class="flex justify-center w-full gap-x-5 relative" v-if="false">
      <div
        class="bg-gray-200 rounded-full h-1 dark:bg-gray-200 absolute top-[19px] z-0 w-[80%] mx-auto duration-300 transition-all"
      >
        <div
          class="bg-primary-3 h-1 rounded-full duration-300 transition-all"
          :style="`width: ${Math.min((step / steps.length) * 100, 100)}%`"
        ></div>
      </div>
      <div
        class="flex-1 flex flex-col justify-center items-center gap-y-3 z-10"
        v-for="s in steps"
        :key="s"
      >
        <div
          class="mx-auto rounded-full flex items-center justify-center duration-300 transition-all dark:bg-gray-800 bg-white"
          :class="{
            'text-primary-3': s.id <= step,
            'dark:bg-primary-3 dark:text-white bg-primary-4': s.id == step,
            'text-primary-3': step != s.id,
          }"
        >
          <Icon
            name="line-md:confirm-circle-twotone"
            class="text-primary-3 text-xl lg:text-4xl"
            v-if="s.id < step"
          />
          <Icon
            :name="s.icon"
            class="text-xl lg:text-3xl ring-2 ring-primary-3 rounded-full lg:p-1"
            v-if="s.id >= step"
          />
        </div>
        <h1 class="text-primary-3 dark:text-gray-300 text-sm capitalize">
          {{ s.name }}
        </h1>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
