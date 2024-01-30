import {
  NEW_MESSAGE_RECIEVED,
  SET_ALL_MESSAGES,
  ADD_PARTICIPANT,
  REMOVE_PARTICIPANT,
  INIT_CHAT,
  SET_FAILED_MESSAGES,
  REMOVE_LAST_MESSAGE,
  SET_MESSAGE_SENT,
  SET_MESSAGE_SENDING,
  SET_MESSAGE_FAILED,
  ADD_MESSAGES_UNREAD,
  RESET_MESSAGES_UNREAD,
  SET_PREV_MESSAGES,
  SET_ENGAGEMENT,
  SET_NOTIFICATION,
  HIDE_EVENT_STREAM_NOTIFICATION,
  SET_MESSAGE_DELIVERED
} from "./types";

export const initChat = () => {
  return {
    type: INIT_CHAT,
  };
};

export const setNotification = (notification) => {
  return {
    type: SET_NOTIFICATION,
    payload:{
      notification
    }
  };
};



export const hideCurrentEventStreamNotification = () => {
  return {
    type: HIDE_EVENT_STREAM_NOTIFICATION,
  };
};


export const newMessageRecieved = (message, isNotificationMessage = false) => {
  return {
    type: NEW_MESSAGE_RECIEVED,
    payload: {
      message: {
        ...message,
        isNotificationMessage,
      }, 
    },
  };
};


export const setPrevMessages = (messages) => {
  return {
    type: SET_PREV_MESSAGES,
    payload: {
      messages
    },
  };
};





export const setMessageSent = (messageId,message) => {
  return {
    type: SET_MESSAGE_SENT,
    payload: {
      messageId,
      message
    },
  };
};



export const newMessageDelivered = (message) => {
  return {
    type: SET_MESSAGE_DELIVERED,
    payload: {
      message
    },
  };
};




export const setMessageSending = (messageId) => {
  return {
    type: SET_MESSAGE_SENDING,
    payload: {
      messageId,
    },
  };
};


export const setMessageFailed = (messageId) => {
  return {
    type: SET_MESSAGE_FAILED,
    payload: {
      messageId
    },
  };
};

export const newMessageFailed = (message, isNotificationMessage = false) => {
  return {
    type: SET_FAILED_MESSAGES,
    payload: {
      message: {
        ...message,
        isNotificationMessage,
        isFailed: true,
      },
    },
  };
};

export const setAllMessages = (messages) => {
  return {
    type: SET_ALL_MESSAGES,
    payload: {
      messages: messages,
    },
  };
};

export const removeLastMessage = () => {
  return {
    type: REMOVE_LAST_MESSAGE,
  };
};

export const addParticipant = (participant) => {
  return {
    type: ADD_PARTICIPANT,
    payload: {
      participant,
    },
  };
};

export const removeParticipant = (participant) => {
  return {
    type: REMOVE_PARTICIPANT,
    payload: {
      participant,
    },
  };
};

export const countMessageUnread=()=>({
  type:ADD_MESSAGES_UNREAD,
});
export const resetMessageUnread=()=>({
  type:RESET_MESSAGES_UNREAD,
});

export const setEngagement=(engagement)=>({
  type:SET_ENGAGEMENT,
  payload:{
    engagement
  }
});
