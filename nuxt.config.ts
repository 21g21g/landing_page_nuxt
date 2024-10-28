// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    'vue3-carousel-nuxt'
  ],
   css:["../hahu_muya/assets/css/tailwind.css"],
  runtimeConfig:{
    public:{mode:import.meta.env.MODE}
  }
})