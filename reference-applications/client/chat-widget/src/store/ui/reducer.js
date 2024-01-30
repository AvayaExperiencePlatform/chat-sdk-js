import { 
    MAXIMIZE_CHAT_POPUP,
    MINIMIZE_CHAT_POPUP,
    SET_CHAT_CONFIG ,
    OPEN_EXIT_DIALOG,
    CLOSE_EXIT_DIALOG,
    SET_CHAT_WINDOW_HEIGHT,
    SET_TRANSLATIONS,
    SET_LANG,
 } from "./types"

let initState = {
    isChatPopUpMinimized:true,
    isExitDialogOpen:false,
    config:{},
    height:0,
    lang:"en",
    translations:{},
}

export const uiReducer = (state,action)=>{

    if(!state) state = initState;

    switch(action.type){
        case MINIMIZE_CHAT_POPUP:{
            return {
                ...state,
                isChatPopUpMinimized:true,
            }
        }
        case MAXIMIZE_CHAT_POPUP:{
            return {
                ...state,
                isChatPopUpMinimized:false,
            }
        }

        case SET_CHAT_CONFIG:{
            return {
                ...state,
                config:action.payload.config
            }
        }
        case OPEN_EXIT_DIALOG:{
            return {
                ...state,
                isExitDialogOpen:true,
            }
        }
        case CLOSE_EXIT_DIALOG:{
            return {
                ...state,
                isExitDialogOpen:false,
            }
        }

        case SET_CHAT_WINDOW_HEIGHT:{
            return {
                ...state,
                height:action.payload.height
            }
        }
        case SET_TRANSLATIONS:{
            return {
                ...state,
                translations:action.payload.translations
            }
        }
        case SET_LANG:{
            return {
                ...state,
                lang:action.payload.lang
            }
        }
        
        default:{
            return state;
        }
    }
}