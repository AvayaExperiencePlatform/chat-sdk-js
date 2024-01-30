import React, { useContext } from "react";
import { GrFormClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { hideCurrentEventStreamNotification } from "../../store/chat/actions";
import {  useTranslate } from "react-translate";

import { NOTIFICATIONS } from "../../constants";
import { ChatContext } from "../../contexts/ChatContextProvider";


export const FailedSvg = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 0C6.3 0 9.53674e-07 6.3 9.53674e-07 14C9.53674e-07 21.7 6.3 28 14 28C21.7 28 28 21.7 28 14C28 6.3 21.7 0 14 0ZM14 26.5C7.1 26.5 1.5 20.9 1.5 14C1.5 7.1 7.1 1.5 14 1.5C20.9 1.5 26.5 7.1 26.5 14C26.5 20.9 20.9 26.5 14 26.5Z"
        fill="#A63B11"
      />
      <path
        d="M14 20.7C14.718 20.7 15.3 20.118 15.3 19.4C15.3 18.682 14.718 18.1 14 18.1C13.282 18.1 12.7 18.682 12.7 19.4C12.7 20.118 13.282 20.7 14 20.7Z"
        fill="#A63B11"
      />
      <path
        d="M14 15.8C14.4 15.8 14.8 15.5 14.8 15V7.3C14.8 6.9 14.5 6.5 14 6.5C13.5 6.5 13.2 6.8 13.2 7.3V15.1C13.2 15.5 13.6 15.8 14 15.8Z"
        fill="#A63B11"
      />
    </svg>
  );
};

export const RefreshSvg = () => {
  return (
    <svg width="14" height="14" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M27.5417 11.163C25.0688 5.13902 18.2633 2.07101 11.9634 4.17097L11.959 4.17244L11.959 4.17243C7.31185 5.68987 4.17646 9.77058 3.6065 14.3302C3.55473 14.7444 3.177 15.0382 2.76281 14.9865C2.34863 14.9347 2.05483 14.5569 2.10661 14.1428C2.74581 9.0291 6.26043 4.44405 11.4876 2.73625C18.2549 0.481686 25.5826 3.56188 28.6036 9.8334V5.06631C28.6036 4.64891 28.942 4.31053 29.3594 4.31053C29.7768 4.31053 30.1152 4.64891 30.1152 5.06631V11.9188C30.1152 12.3362 29.7768 12.6745 29.3594 12.6745H22.507C22.0896 12.6745 21.7512 12.3362 21.7512 11.9188C21.7512 11.5014 22.0896 11.163 22.507 11.163H27.5417ZM29.3524 16.9128C29.7666 16.9646 30.0604 17.3423 30.0086 17.7565C29.369 22.873 25.8538 27.4507 20.6385 29.2601L20.6298 29.2631L20.6298 29.263C13.8619 31.519 6.5329 28.4388 3.51157 22.1666V26.9337C3.51157 27.3511 3.17319 27.6895 2.75578 27.6895C2.33838 27.6895 2 27.3511 2 26.9337V20.0812C2 19.6638 2.33838 19.3255 2.75578 19.3255H9.60823C10.0256 19.3255 10.364 19.6638 10.364 20.0812C10.364 20.4986 10.0256 20.837 9.60823 20.837H4.57351C7.04582 26.8596 13.8487 29.9276 20.1474 27.8305C24.8053 26.2126 27.9392 22.1251 28.5087 17.569C28.5605 17.1548 28.9382 16.861 29.3524 16.9128Z" fill="black"/>
    </svg>
  );
};



export const SuccessSvg = ()=>{
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.025 20.4041C8.825 20.4041 8.625 20.3041 8.525 20.2041L0.225001 11.9041C-0.074999 11.6041 -0.074999 11.1041 0.225001 10.8041C0.525001 10.5041 1.025 10.5041 1.325 10.8041L9.025 18.5041L22.625 0.304052C22.825 0.00405184 23.325 -0.0959482 23.625 0.104052C23.925 0.304052 24.025 0.804052 23.825 1.10405L9.625 20.1041C9.525 20.3041 9.325 20.4041 9.025 20.4041Z" fill="#2B6B2B"/>
    </svg>
  )
}

export const WarningSvg = ({color})=>{
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2C8.3 2 2 8.3 2 16C2 23.7 8.3 30 16 30C23.7 30 30 23.7 30 16C30 8.3 23.7 2 16 2ZM16 28.5C9.1 28.5 3.5 22.9 3.5 16C3.5 9.1 9.1 3.5 16 3.5C22.9 3.5 28.5 9.1 28.5 16C28.5 22.9 22.9 28.5 16 28.5Z" fill={color}/>
      <path d="M16 22.7C16.718 22.7 17.3 22.118 17.3 21.4C17.3 20.682 16.718 20.1 16 20.1C15.282 20.1 14.7 20.682 14.7 21.4C14.7 22.118 15.282 22.7 16 22.7Z" fill={color}/>
      <path d="M16 17.8C16.4 17.8 16.8 17.5 16.8 17V9.3C16.8 8.9 16.5 8.5 16 8.5C15.5 8.5 15.2 8.8 15.2 9.3V17.1C15.2 17.5 15.6 17.8 16 17.8Z" fill={color}/>
    </svg>
  )
}


export const ErrorSvg = ()=>(
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.9799 24.0846C16.7013 24.0846 17.2862 23.4998 17.2862 22.7783C17.2862 22.0569 16.7013 21.472 15.9799 21.472C15.2584 21.472 14.6736 22.0569 14.6736 22.7783C14.6736 23.4998 15.2584 24.0846 15.9799 24.0846Z" fill="#B84C4C"/>
<path d="M15.9799 19.2085C16.0785 19.2098 16.1763 19.1914 16.2677 19.1543C16.359 19.1171 16.442 19.0621 16.5117 18.9924C16.5814 18.9227 16.6365 18.8397 16.6736 18.7484C16.7107 18.657 16.7291 18.5592 16.7278 18.4606V10.7225C16.7278 10.5241 16.649 10.3339 16.5087 10.1937C16.3685 10.0534 16.1782 9.97462 15.9799 9.97462C15.7815 9.97462 15.5913 10.0534 15.4511 10.1937C15.3108 10.3339 15.232 10.5241 15.232 10.7225V18.4606C15.232 18.6589 15.3108 18.8491 15.4511 18.9894C15.5913 19.1297 15.7815 19.2085 15.9799 19.2085Z" fill="#B84C4C"/>
<path d="M29.5415 23.9151L18.5726 4.5799C18.3171 4.10252 17.9368 3.70343 17.4723 3.42519C17.0078 3.14695 16.4765 3 15.935 3C15.3936 3 14.8623 3.14695 14.3978 3.42519C13.9333 3.70343 13.553 4.10252 13.2975 4.5799L2.41833 23.9151C2.14816 24.3708 2.00383 24.89 2.00008 25.4197C1.99632 25.9494 2.13329 26.4706 2.39698 26.93C2.66066 27.3894 3.04161 27.7706 3.50088 28.0345C3.96015 28.2985 4.48128 28.4358 5.01098 28.4323H26.9488C27.4819 28.4429 28.0081 28.3109 28.473 28.0499C28.9379 27.7889 29.3246 27.4083 29.5931 26.9477C29.8616 26.487 30.002 25.963 30 25.4298C29.9979 24.8966 29.8534 24.3737 29.5814 23.9151H29.5415ZM28.2352 26.1787C28.1095 26.4127 27.9245 26.6096 27.6987 26.7496C27.4729 26.8896 27.2143 26.9679 26.9488 26.9764H5.01098C4.74262 26.9788 4.47843 26.9099 4.24541 26.7768C4.0124 26.6436 3.81892 26.451 3.68474 26.2186C3.55276 25.986 3.48337 25.7232 3.48337 25.4557C3.48337 25.1883 3.55276 24.9255 3.68474 24.6929L14.6537 5.3577C14.7876 5.12127 14.9818 4.92461 15.2166 4.78778C15.4513 4.65095 15.7182 4.57885 15.9899 4.57885C16.2616 4.57885 16.5284 4.65095 16.7632 4.78778C16.9979 4.92461 17.1922 5.12127 17.3261 5.3577L28.295 24.6929C28.4135 24.9248 28.4703 25.1834 28.4598 25.4436C28.4493 25.7039 28.372 25.9571 28.2352 26.1787Z" fill="#B84C4C"/>
</svg>

)

const ChatConnectivity = () => {


  const { notification_state  } = useSelector((state) => state.chat);
  const { config  } = useSelector((state) => state.ui);


  const dispatch = useDispatch();

  const handleCloseReconneted = () => {
    dispatch(hideCurrentEventStreamNotification());
  };
  const t = useTranslate("chat-connectivity"); 
  const  {reconnect  } = useContext(ChatContext)


  return <div className="chat-connectivity">
    {
      notification_state.current === NOTIFICATIONS.WAITING_FOR_AGENT && (
      <div className={"chat-connectivity-container"}>
        <img className="spinner" src="assets/icons/icon.svg" alt="loader" />
          <p role="alert">{t("waiting-for-agent")}</p>
      </div>
      )
    }

    { 
      notification_state.current === NOTIFICATIONS.CONNECTING && (
          <div className={"responder-disconnected"}>
            <div className={"chat-connectivity-reconnecting"}>
            <img className="spinner" src="assets/icons/icon-grey.svg" alt="loader" />
              <p data-testid="reconnecting-text" role="alert">{t("reconnecting")}</p>
            </div>
        </div>
      )
    }



    {
      notification_state.current === NOTIFICATIONS.CONNECTED && (
        <div className={`chat-connectivity-resumed`}>
          <div>
            <SuccessSvg />
            <p role="alert">{t("chat-session-resumed")}</p>
          </div>
            <button rtl={config.direction=== 'rtl'} onClick={handleCloseReconneted}>
              <GrFormClose />
            </button>
        </div>)
    }

    {
    (notification_state.current === NOTIFICATIONS.DISCONNECTED   ||  notification_state.current === NOTIFICATIONS.DISCONNECTED2 )&&
          <div className={`chat-connectivity-error`}>
            <FailedSvg />
            <p role="alert">{notification_state.current === NOTIFICATIONS.DISCONNECTED2 ?t("reconnection-failed"):t("connection-failed")}</p>
            <button data-testid="reconnect-btn" className={`${ config.direction=== 'rtl'?'rtl':null} reconnect`}onClick={reconnect}>
              <RefreshSvg />
            </button>
          </div>
   } 



    {
      (notification_state.current === NOTIFICATIONS.SESSION_EXPIRED) &&
        <div className={"chat-connectivity-container chat-connectivity-container-session-ended"}>
           <WarningSvg color="#5E5E5E"/>
          <p role="alert">{t("session-ended")}</p>
        </div>
    }

{
      (notification_state.current === NOTIFICATIONS.ENGAGEMENT_TERMINATED) &&
        <div className={"chat-connectivity-container chat-connectivity-container-session-ended"}>
           <WarningSvg color="#5E5E5E"/>
          <p role="alert">{t("engagement-terminated")}</p>
        </div>
    }




{ 
(notification_state.current === NOTIFICATIONS.ENGAGEMENT_ERROR) &&
        <div className={"chat-connectivity-error"}>
             <ErrorSvg color="#B84C4C"/>
          <p role="alert">{t("something-went-wrong")}</p>
        </div>
    }





 

  {notification_state.current === NOTIFICATIONS.IDLE_TIMEOUT_EXPIRED &&
      <div className={`chat-connectivity-error--timeout`}>
        <WarningSvg color="#B84C4C"/>
        <p role="alert">
         {t("close-due-to-inactivity")}
        </p>
    </div>
    }



  </div>
};

export default ChatConnectivity;
