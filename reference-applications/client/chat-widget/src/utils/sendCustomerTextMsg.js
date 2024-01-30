import {  newMessageRecieved } from "../store/chat/actions"
import store from "../store/store"

const sendCustomerTextMsg = (msg)=>{
      store.dispatch(newMessageRecieved(msg))
      return msg;
}

export default sendCustomerTextMsg;