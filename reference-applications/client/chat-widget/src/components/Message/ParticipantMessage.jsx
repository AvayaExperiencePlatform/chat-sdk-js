import React, { useState, useEffect , useContext } from "react";
import { useSelector } from "react-redux";
import Linkify from "react-linkify";
import {
  TimeWrapper,
  Time,
  MessageBody,
  MessageBodyContainer,
  MessageAvatar,
  MessageStatus,
} from "./Message.style";
import {  useTranslate } from "react-translate";
import { format } from 'date-fns'

import Tooltip from "../Tooltip/Tooltip";
import { getAvatarBgIcon } from "../../utils/getNameForAvatar";
import { getSenderNameOf } from "../../utils/getSenderNameOf";
import MoonLoader from "react-spinners/MoonLoader";
import { ChatContext } from "../../contexts/ChatContextProvider";
import {returnLang} from "../../pages/Dialogs/Dialog"

export const MessageInfo = ({shown , message  , direction})=>{
  const { resendMessage } = useContext(ChatContext);

  const t = useTranslate("participant-message");
  if(!shown){
    return null;
  }


  
  const handleSendFailedMessage = async () => {
    resendMessage(message);
  };

  
  if( message.isSending){
    return (
      <MessageStatus>
      <p className="sr-only" role="alert">{t("sending-message")}</p>
      <MoonLoader color={"#000"} size={8} />
    </MessageStatus>
    )
  } else if(message.isDelivered){
    return ( <MessageStatus>
      <p className="sr-only" role="alert">{t("message-delivered")}</p>
  <img alt={t("delivered")} title={t("delivered")} src="assets/icons/delivered.svg" />
</MessageStatus>)
  }
  else if(message.isFailed){
    return (
    <MessageStatus onClick={handleSendFailedMessage}>
      <p className="sr-only" role="alert">{t("message-failed")}</p>
   <Tooltip
     text={t("message-send-failed")}
     position={direction =="ltr"?"left":"right"}
     background="323232;"
   >
     <FailedSvg/>
   </Tooltip>
 </MessageStatus>
 )
  } else {
    return (
      <MessageStatus>
        <p className="sr-only" role="alert">{t("message-delivered")}</p>
        <img alt="" src="assets/icons/delivered.svg" />
      </MessageStatus>
    ) 
  }
}


  
export const MessageTime = ({shown , message})=>{
  const { lang } = useSelector((s) => s.ui);
  const t = useTranslate("participant-message");
  const stringFormat = t("time-format") != "participant-message.time-format" ? t("time-format") : 'hh:mm a'

  if(!shown){
    return null;
  }
  return ( <Time>
    {format(new Date(message.receivedAt), stringFormat, { locale: returnLang(lang)})}

  </Time>)
}



export const getAvatarIcon  = (ai)=>{
  if(ai) return ai;
  return  "assets/icons/account.png"
}

export const FailedSvg = () => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 14C3.15 14 0 10.85 0 7C0 3.15 3.15 0 7 0C10.85 0 14 3.15 14 7C14 10.85 10.85 14 7 14ZM7 0.75C3.55 0.75 0.75 3.55 0.75 7C0.75 10.45 3.55 13.25 7 13.25C10.45 13.25 13.25 10.45 13.25 7C13.25 3.55 10.45 0.75 7 0.75Z"
        fill="#D93D32"
      />
      <path
        d="M7 3.65C7.35 3.65 7.65 3.95 7.65 4.3C7.65 4.65 7.35 4.95 7 4.95"
        fill="#D93D32"
      />
      <path
        d="M7 4.95C6.65 4.95 6.35 4.65 6.35 4.3C6.35 3.95 6.65 3.65 7 3.65"
        fill="#D93D32"
      />
      <path
        d="M7 10.7C6.8 10.7 6.6 10.55 6.6 10.3V6.4C6.6 6.2 6.75 6 7 6C7.25 6 7.4 6.15 7.4 6.4V10.3C7.4 10.55 7.2 10.7 7 10.7Z"
        fill="#D93D32"
      />
    </svg>
  );
};

const ParticipantMessage = ({ message, isCustomer, config, isSystem }) => {
  const {  participants  } = useContext(ChatContext);
  const { direction } = useSelector(state=>state.ui.config);

  const [avatarBackground, setAvatarBackground] = useState();
  const [avatarIcon, setAvatarIcon] = useState("");
   const {
    participantsAvatar,
    participantAvatarIcon,
    systemAvatarIcon,
    participantIdentityType,
    brandName
  } = config;



  useEffect(() => {
    const participant = message.senderParticipant
    if (
      participant.participantType === "SYSTEM" ||
      participant.participantType === "BOT"
    ) {
      setAvatarIcon(systemAvatarIcon);
    } else if (participant.participantType === "AGENT") {
      setAvatarIcon(participantAvatarIcon);
    } else if (participant.participantType === "SUPERVISOR") {
      setAvatarIcon(participantAvatarIcon);
    } else {
      setAvatarIcon(participantAvatarIcon);
    }
  }, [message]);



  useEffect(() => {
    const participantAvatarColor = getAvatarBgIcon(
      { ...message.senderParticipant, participantId: message.senderParticipant.senderParticipantId },
      participantsAvatar,
      participants
    );
    setAvatarBackground(participantAvatarColor);
  }, [message,participantsAvatar,participants]);


 
  const handleLink = (e) => {
    let target = e.target;
    e.preventDefault();
    if (target.tagName?.toLowerCase() === "a") {
      window.open(target.href, "_blank");
    }
  };

  const messageProps = {
    onClick: handleLink,
    "aria-label": `${message?.senderType} ${
         message?.body?.elementText?.text}`,
    isCustomer: isCustomer,
    direction:direction
  };







  const Avatar = ({shown})=>{

    const _avatarIcon = getAvatarIcon(avatarIcon);
    if(!shown){
      return null;
    }

    return (
      <MessageAvatar
      data-testid="Message-Avatar"
        className={`message-avatar`}
        avatarBg={avatarBackground}
      >
        <div >
          <img
            data-testid="message-avatar"
            alt="Avaya"
            src={_avatarIcon}
          />
        </div>
      </MessageAvatar>
    )
  } 

 
  return (
    <div style={{display:'flex'}}>
      <Avatar shown={!isCustomer}  />
      <MessageBody
        isCustomer={isCustomer}
      >
        <span className="sr-only">
          {isCustomer
            ? ""
            : " message from  " + " " + message?.senderType + " "}
        </span>

        {!isCustomer ? (
          <span data-testid="message-sender-name" className="message-sender-name">
            {getSenderNameOf(message.senderParticipant, participantIdentityType, brandName)}
          </span>
        ) : null}

        {(message?.body?.elementText?.textFormat === "PLAINTEXT") 
        ? (
          <MessageBodyContainer  {...messageProps}>
            <div className="message-content" data-testid="messag-body-text">
              <Linkify >
                {message.body.elementText.text}
              </Linkify>
            </div>
            <TimeWrapper>
              <Time>
                    <MessageInfo message={message} direction={direction} shown={isCustomer} />
              </Time>
              <MessageTime shown={true} message={message} />
            </TimeWrapper>
          </MessageBodyContainer>
        ) : (
          <MessageBodyContainer  {...messageProps}>
            <div
              dangerouslySetInnerHTML={{
                __html:  message?.body?.elementText?.text,
              }}
            ></div>
          </MessageBodyContainer>
        )}
      </MessageBody>
    </div>
  );
};

export default React.memo(ParticipantMessage);
