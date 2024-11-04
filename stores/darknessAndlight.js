import {defineStore} from "pinia"

export const useLightStore=defineStore('light',{

    state:()=>({
         light:"light"
    }),

    actions:{
        changeLightColor:()=>{
            this.light="dark"

        }
    }
})