import uuid from "./uuid";

const buildMsg = (text)=>{

  let id = uuid()
    return {
        "senderParticipant": {
          "participantType": "CUSTOMER",
        },
        "receivedAt": new Date(),
        "messageId":id ,
          "body": {
            "elementType": "text",
            "elementText": {
              "text": text,
              "textFormat": "PLAINTEXT"
            }
          },
        isSending: true,
        isDelivered: false,
        isFailed: false,
      };
}

export default buildMsg;