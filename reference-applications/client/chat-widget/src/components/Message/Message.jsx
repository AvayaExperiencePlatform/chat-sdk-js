import React from "react";
import ParticipantMessage from "./ParticipantMessage";
import NotificationMessage from "./NotificationMessage";
import { useSelector } from "react-redux";
import { MessageComponent } from "./Message.style";

const Message = ({ message, messageIndex }) => {
  const isCustomer = message?.senderParticipant?.participantType === "CUSTOMER";
  const isSystem = message?.senderParticipant?.participantType === "SYSTEM";
  const { config } = useSelector((state) => state.ui);

  return (
    <MessageComponent isCustomer={isCustomer}>
      {!message.isNotificationMessage ? (
        <ParticipantMessage
          message={message}
          isCustomer={isCustomer}
          isSystem={isSystem}
          config={config}
          messageIndex={messageIndex}
        />
      ) : (
        <NotificationMessage message={message} config={config} />
      )}
    </MessageComponent>
  );
};

export default Message;
