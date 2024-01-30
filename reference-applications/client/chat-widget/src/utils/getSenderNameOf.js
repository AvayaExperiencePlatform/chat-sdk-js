export const getSenderNameOf = (
  participant,
  participantIdentityType,
  brandName
) => {

  if (participantIdentityType === "brand-name") {
    return brandName;
  } else if (participantIdentityType === "participant-name") {
    return participant?.displayName;
  } else if (participantIdentityType === "participant-type") {
    return participant?.participantType?.toLowerCase();
  } else {
    // default value participant-name
    return participant?.displayName;
  }
};
