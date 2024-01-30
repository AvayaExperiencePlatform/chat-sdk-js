import { SUPERVISOR, AGENT, BOT, CUSTOMER, SYSTEM } from "./config";

export const getNameForAvatar = (name, participantIdentityType, brandName) => {
  if (participantIdentityType === "brand-name") {
    let [a, b] = brandName?.split(" ");
    return `${a[0]?.toUpperCase()}${b ? b[0]?.toUpperCase() : ""}`;
  }  else if (participantIdentityType === "participant-type") {
    let [a, b] = name?.participantType?.split(" ");
    return `${a[0]?.toUpperCase()}${b ? b[0]?.toUpperCase() : ""}`;
    // set Default to participant-name
  } else { // or "participant-name"
    let [a, b] = name?.displayName?.split(" ");
    return `${a[0]?.toUpperCase()}${b ? b[0]?.toUpperCase() : ""}`;
  }
};

const checkIfParticipantTypeExist = (participant, participants) => {
  const existedParticipantIndex = participants.findIndex(
    (currentParticipant) =>
      currentParticipant.participantType === participant.participantType,
    participants.findIndex(
      (currentParticipant) =>
        currentParticipant.participantType === participant.participantType
    ) + 1
  );
  return existedParticipantIndex > -1;
};

const getNextAvatarBgIndex = (
  participant,
  participants,
  currentAvatarIndex
) => {
  let newAvatarIndex = 0;
  const currentParticipantIndex = participants.findIndex(
    (currentParticipant) =>
      currentParticipant.participantId === participant.participantId
  );


  if (currentParticipantIndex > -1) {
    newAvatarIndex = currentParticipantIndex % 4;
    return newAvatarIndex;
  }

  return currentAvatarIndex;
};

export const getAvatarBgIcon = (message, participantsAvatar, participants) => {
  let avatarsBgDraft = [];
  if (participantsAvatar?.length > 0) {
    avatarsBgDraft = [...participantsAvatar?.split(",")];
  } else {
    // default if customer doesn't provide any participantsAvatar values
    avatarsBgDraft = ["#D93D32", "#0B3363", "#000000", "#A63B11"]; // SYSTEM, AGENT1, AGENT2, SUPERVISOR
  }
  switch (message?.participantType) {
    case CUSTOMER:
      return "#0B3363";
    case SYSTEM:
    case BOT:
      return avatarsBgDraft[0] || "#D93D32"; // default
    case AGENT:
      if (checkIfParticipantTypeExist(message, participants)) {
        const nextAvatarIndex = getNextAvatarBgIndex(message, participants, 1);
        return avatarsBgDraft[nextAvatarIndex] || "#0B3363";
      }
      return avatarsBgDraft[1] || "#0B3363";
    case SUPERVISOR:
      if (checkIfParticipantTypeExist(message, participants)) {
        const nextAvatarIndex = getNextAvatarBgIndex(message, participants, 3);
        return avatarsBgDraft[nextAvatarIndex] || "#A63B11";
      }
      return avatarsBgDraft[3] || "#A63B11";
    default:
      return avatarsBgDraft[1] || "#0B3363";
  }
};
