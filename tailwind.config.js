/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app.vue',
    './pages/**/*.vue',
    './components/**/*.vue',
    './layouts/**/*.vue'
  ],
  theme: {
    extend: {
      
      screens: {
        "5xs": "320px",
        // => @media (min-width: 320px) { for iphone 5 }
  
        "4xs": "360px",
        // => @media (min-width: 320px) { for Samsung phone }
  
        "3xs": "380px",
        // => @media (min-width: 380px) { ... }
  
        "2xs": "420px",
        // => @media (min-width: 380px) { ... }
  
        xs: "512px",
        // => @media (min-width: 512px) { ... }
  
        sm: "640px",
        // => @media (min-width: 640px) { ... }
  
        md: "768px",
        // => @media (min-width: 768px) { ... }
        mdx: "800px",
        // => @media (min-width: 800px) { ... }
        mdxx: "850px",
        // => @media (min-width: 850px) { ... }
  
        lg: "1024px",
        // => @media (min-width: 1024px) { ... }
  
        xl: "1280px",
        // => @media (min-width: 1280px) { ... }
  
        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
  
        "3xl": "1600px",
        // => @media (min-width: 1600px) { ... }
  
        "4xl": "1920px",
        // => @media (min-width: 1920px) { ... }
  
        "5xl": "2560px",
        // => @media (min-width: 1920px) { ... }
      },
     
  
    },
  },
  plugins: [],
}