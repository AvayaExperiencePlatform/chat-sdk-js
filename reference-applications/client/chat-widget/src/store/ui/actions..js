import {  CLOSE_EXIT_DIALOG, MAXIMIZE_CHAT_POPUP, MINIMIZE_CHAT_POPUP, OPEN_EXIT_DIALOG, SET_CHAT_CONFIG , SET_CHAT_WINDOW_HEIGHT, SET_TRANSLATIONS, SET_LANG } from "./types";

export const maximizeChatPopUp = ()=>({
    type:MAXIMIZE_CHAT_POPUP
})

export const minimizeChatPopUp = ()=>({
    type:MINIMIZE_CHAT_POPUP
})


export const setChatConfig = (config)=>({
    type:SET_CHAT_CONFIG,
    payload:{
        config
    }
})



export const openExitDialog = ()=>({
    type:OPEN_EXIT_DIALOG,
})



export const closeExitDialog = ()=>({
    type:CLOSE_EXIT_DIALOG,
})




export const setTranslation=(translations)=>({
    type:SET_TRANSLATIONS,
    payload:{
        translations
    }
})

export const setLang=(lang="en")=>({
    type:SET_LANG,
    payload:{
        lang
    }
})



export const setChatWindowHeight=(height)=>({
    type:SET_CHAT_WINDOW_HEIGHT,
    payload:{
        height
    }
})

