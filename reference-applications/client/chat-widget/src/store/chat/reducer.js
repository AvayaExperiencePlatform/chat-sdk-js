import { NOTIFICATIONS } from "../../constants";
import {
  NEW_MESSAGE_RECIEVED,
  SET_ALL_MESSAGES,
  ADD_PARTICIPANT,
  REMOVE_PARTICIPANT,
  INIT_CHAT,
  SET_FAILED_MESSAGES,
  REMOVE_LAST_MESSAGE,
  SET_MESSAGE_FAILED,
  SET_MESSAGE_SENT,
  ADD_MESSAGES_UNREAD,
  RESET_MESSAGES_UNREAD,
  SET_PREV_MESSAGES,
  SET_ENGAGEMENT,
  SET_MESSAGE_SENDING,
  SET_NOTIFICATION,
  HIDE_EVENT_STREAM_NOTIFICATION,
  SET_MESSAGE_DELIVERED
} from "./types";

const intitialState = { 
  messages: [],
  participants: [],
  unreadMessages:0,
  engagement:null,
  notification_state:{
    previous:[],
    current:null, 
  }, // to indicate to notifcation state
  failedMessages:[],
};


const setMessageSending = (state , action)=>{
  let index = state.messages.findIndex(item=>item.messageId == action.payload.messageId)
  return state.messages.map((item,i)=>{
    if(i == index){
      return {
        ...item,
        isSending: true,
        isDelivered: false,
        isFailed: false,
      }
    }
    return item;
  });
}


const setMessageSent = (state , action)=>{
  let index = state.messages.findIndex(item=>item.messageId == action.payload.messageId)
      return  state.messages.map((item,i)=>{
        if(i == index){
          return {
            ...item,
            isSending: false,
            isDelivered: true,
            isFailed: false,
            ...action.payload.message, // destruct old message here
          }
        }
        return item;
      })
}


const setMessageFailed = (state,action)=>{
  let index = state.messages.findIndex(item=>item.messageId == action.payload.messageId)
  return state.messages.map((item,i)=>{
    if(i == index){
      return {
        ...item,
        isSending: false,
        isDelivered: false,
        isFailed: true,
      }
    }
    return item;
  })
}

export const chatReducer = (state, action) => {
  if(!state) state = intitialState;
  switch (action.type) {
    case NEW_MESSAGE_RECIEVED: {
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
      };
    }

    case SET_PREV_MESSAGES:{
      return {
        ...state,
        messages: [...action.payload.messages,...state.messages],
      };
    }
    case SET_MESSAGE_DELIVERED :{
      const i = state.messages.findIndex(m=>m.messageId === action.payload.message.messageId)

      if(i === -1){
        return {
          ...state,
          messages:[...state.messages,{...action.payload.message,
            isDelivered:true,
            isFailed:false,
            isSending:false,
            isNotificationMessage:false,
            }]
        }
      } else {
        return {
          ...state,
        }
      }
    }

    case SET_NOTIFICATION:{
      return {
        ...state,
        notification_state: {
          previous:[...state.notification_state.previous,state.notification_state.current],
          current:action.payload.notification
        },
      };
    }


    case SET_FAILED_MESSAGES: {
      return {
        ...state,
        failedMessages: [...state.failedMessages, action.payload.message],
      };
    }

    
    case SET_MESSAGE_SENDING : {
     

      return {
        ...state,
        messages: [...setMessageSending(state , action)],
      };
    }

    case SET_MESSAGE_SENT: {
    


      return {
        ...state,
        messages: [...setMessageSent(state,action)],
      };
    }

    case SET_MESSAGE_FAILED: {
     

      return {
        ...state,
        messages: [...setMessageFailed(state,action)],
      };
    }

    case SET_ALL_MESSAGES: {
      return {
        ...state,
        messages: action.payload.messages,
      };
    }

    case REMOVE_LAST_MESSAGE: {
      return {
        ...state,
        messages: [...state.messages.slice(0, -1)],
      };
    }

    case ADD_PARTICIPANT: {


      //  check if this particpant already exists with in the array
      let i = state.participants.findIndex((p)=>p.participantId === action.payload.participant.participantId);
      if(i === -1){
          return {
            ...state,
            participants: [...state.participants, action.payload.participant],
          }
      } else {
          return {
            ...state,
          }
      }

    }

    case REMOVE_PARTICIPANT: {
      let participant = action.payload.participant;
      return {
        ...state,
        participants: [
          ...state.participants.filter(
            (p) => p.participantId != participant.participantId
          ),
        ],
      };
    }

   

    case SET_ENGAGEMENT :{
      return {
        ...state,
        engagement:action.payload.engagement
      }
    }

    case HIDE_EVENT_STREAM_NOTIFICATION :{
      // return last notifications before event stream notifications
      const lastNotifications =  state.notification_state.previous.filter(item=>{

        if(item != NOTIFICATIONS.CONNECTED && item != NOTIFICATIONS.CONNECTING && item != NOTIFICATIONS.DISCONNECTED && item != NOTIFICATIONS.IDLE_TIMEOUT_EXPIRED && item != NOTIFICATIONS.ENGAGEMENT_ERROR && item != NOTIFICATIONS.SESSION_EXPIRED){
          return item;
        }
      })

      const current = lastNotifications[lastNotifications.length -1] || null;
      return {
        ...state,
        notification_state:{
          previous:[state.notification_state.previous,state.notification_state.current],
          current
        }
      }
    }




    case INIT_CHAT: {
      return {
        ...intitialState
      };
    }

    case ADD_MESSAGES_UNREAD: {
      return {
        ...state,
        unreadMessages: state.unreadMessages +1
      };
    }
    case RESET_MESSAGES_UNREAD: {
      return {
        ...state,
        unreadMessages: 0
      };
    }

    default: {
      return state;
    }
  }
};
