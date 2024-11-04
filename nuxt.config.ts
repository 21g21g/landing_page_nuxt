
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app:{
    head:{
      title:"muya"
    },
  },
 
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    "@pinia/nuxt",
    'vue3-carousel-nuxt',
    '@vee-validate/nuxt',
    "@nuxtjs/apollo",

   
   
  ],
  apollo: {
    autoImports: true,
    clients: {
      default: {
        httpEndpoint: 'https://graph.muya.hahujobs.io/v1/graphql', 
      },
    },
  },

  ssr:false,
   css:["../hahu_muya/assets/css/tailwind.css"],
  runtimeConfig:{
    public:{mode:import.meta.env.MODE}
  }
})
//for me apollo module version 5 is worked.