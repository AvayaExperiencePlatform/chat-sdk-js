import { newMessageFailed, setAllMessages } from "../store/chat/actions"
import store from "../store/store"

const sendCustomerTextMsgFailed = (msg)=>{
        const draftMessages = [...store.getState().chat.messages];
        draftMessages[draftMessages?.length - 1] = {
          ...draftMessages[draftMessages?.length - 1],
          isFailed: true,
          isSending: false,
          isDelivered: false,
        };
        store.dispatch(setAllMessages(draftMessages));
        store.dispatch(newMessageFailed(msg));
}

export default sendCustomerTextMsgFailed;