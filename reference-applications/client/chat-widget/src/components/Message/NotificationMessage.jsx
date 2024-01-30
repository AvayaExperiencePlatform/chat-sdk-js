import React from "react";
import { getSenderNameOf } from "../../utils/getSenderNameOf";
import {  useTranslate } from "react-translate";
import { PARTICIPANT_ADDED, PARTICIPANT_REMOVED } from "../../constants";
import { useSelector} from "react-redux";

const NotificationMessage = ({ message, config }) => {
  const { ui } = useSelector((state) => state);
  const { participantIdentityType, brandName } = config;
  const t = useTranslate("notification-message");
   
  const styleDirection =()=>{
    if(ui.config.direction === "rtl"){
      return({direction:"rtl", width:'100%'})
    }else{
      return({});
    }
  }
 
  if( message.participantType === "SYSTEM"){
    return null;
  }

  if (
    message.notificationType == PARTICIPANT_ADDED
  ) {
    return (
      <p style={styleDirection()} data-testid="joined-chat">
        <b>{getSenderNameOf(message, participantIdentityType, brandName)}</b>{" "}
       {t("joined-chat")}
      </p>
    );
  } else if (message.notificationType == PARTICIPANT_REMOVED) {
    return (
      <p style={styleDirection()}>
        <b>{getSenderNameOf(message, participantIdentityType, brandName)} </b>{" "}
        {t("left-chat")}
      </p>
    );
  } else {
    return <></>;
  }
};

export default NotificationMessage;
