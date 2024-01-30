import React, { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import {
  getNameForAvatar,
  getAvatarBgIcon,
} from "../../utils/getNameForAvatar";
import styled, { css } from "styled-components";
import { useTranslate } from "react-translate";
import { ChatContext } from "../../contexts/ChatContextProvider";
import { CUSTOMER } from "../../constants";

export const getParticipantType = (participantType, translate)=>{
  switch (participantType) {
    case CUSTOMER: {
      return translate.userTranslation
    }
    case  'AGENT': {
      return translate.agentTranslation
    }
    case 'BOT': {
      return translate.botTranslation
    }
    case 'SYSTEM': {
      return translate.systemTranslation
    }
    case 'SUPERVISOR': {
      return translate.superTranslation
    }
    default: {
      return 'AGENT'
    }
  }
}

export const getSenderNameOf = (
  message,
  _participantIdentityType,
  _brandName,
  translate
) => {
  switch (_participantIdentityType) {
    case "brand-name": {
      return {
        name:
          message.participantType == CUSTOMER
            ? message?.displayName?.toUpperCase()
            : _brandName?.toUpperCase(),
        type: getParticipantType(message.participantType, translate)
    
      };
    }

    case "participant-name": {
      return {
        name: message?.displayName?.toUpperCase(),
        type: getParticipantType(message.participantType, translate)

      };
    }

    case "participant-type": {
      return { name: message?.participantType?.toUpperCase(), type: "" };
    }
    default: {
      return {
        name: message?.displayName,
        type: getParticipantType(message.participantType, translate)
      };
    }
  }
};

const ShowParticipants = () => {
  const { config } = useSelector((state) => state.ui);
  const { participants } = useContext(ChatContext);
  const { participantIdentityType, brandName, participantsAvatar } = config;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const t = useTranslate("show-participants");

  useEffect(() => {
    document.addEventListener(
      "click",
      () => {
        setIsDialogOpen(false);
      },
      true
    );
    return () => {
      document.removeEventListener("click", () => {
        setIsDialogOpen(false);
      });
    };
  });

  const srLocal = () =>
    isDialogOpen ? t("list-is-open") : t("list-is-closed");

    ///// translation object to pass in getSenderNameOf as aparameter
  const typeTranslationObj = {
    userTranslation: t("you"),
    agentTranslation: t("agent"),
    botTranslation: t("bot"),
    systemTranslation: t("system"),
    superTranslation: t("supervisor"),
  };
  return (
    <ShowParticipantsStyled>
      <p className="sr-only" role={"alert"}>
        {srLocal()}
      </p>
      <label className="sr-only" id="show-participants-only">
        {t("show-list")}
      </label>
      <IconContainer
        tabIndex={0}
        aria-describedby="show-participants-only"
        open={isDialogOpen}
        role={"button"}
        onClick={() => setIsDialogOpen(!isDialogOpen)}
        data-testid="show-participants"
      >
        <img src="assets/icons/user-conference.svg" alt="" />
      </IconContainer>
      {isDialogOpen && participants.length ? (
        <ParticipantsDialog direction={config.direction}>
          {participants.map((participant) => (
            <Particpant
              key={participant.participantId}
              avatarbg={getAvatarBgIcon(
                participant,
                participantsAvatar,
                participants
              )}
            >
              <div className="avatar">
                {getNameForAvatar(
                  participant,
                  participantIdentityType,
                  brandName
                )}
              </div>
              <div className="identitiy">
                <div className="identitiy-name">
                  {
                    getSenderNameOf(
                      participant,
                      participantIdentityType,
                      brandName,
                      typeTranslationObj
                    )?.name
                  }
                </div>
                <div className="identitiy-as">
                  {
                    getSenderNameOf(
                      participant,
                      participantIdentityType,
                      brandName,
                      typeTranslationObj
                    )?.type
                  }
                </div>
              </div>
            </Particpant>
          ))}
        </ParticipantsDialog>
      ) : null}
    </ShowParticipantsStyled>
  );
};

const IconContainerIsDialogOpen = (props) =>
  props.isDialogOpen
    ? css`
        background: #f1f1f1;
      `
    : "";
const IconContainer = styled.div`
  padding: 4px;
  cursor: pointer;
  ${IconContainerIsDialogOpen}
  border-radius: 2px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    50deg,
    #f1f1f1 0%,
    #f1f1f1 50%,
    #fff 50%,
    #fff 100%
  );
  color: var(--button-color-primary);
  background-position: 100% 0;
  background-repeat: no-repeat;
  background-size: 300%;
  transition: background-position 0.4s;
  &:hover {
    background-position: 0 100%;
  }
  &:focus,
  &:active {
    background-position: 0 100%;
  }
`;

const ShowParticipantsStyled = styled.div`
  position: relative;
`;

const participantsDialogDirection = (props) =>
  props.direction == "ltr"
    ? css`
        right: 0;
      `
    : css`
        left: 0;
      `;
const ParticipantsDialog = styled.div`
  position: absolute;
  background-color: #fff;
  z-index: 9999;
  ${participantsDialogDirection}
  width: 250px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 4px; ;
`;

const avatarBg = (props) => props.avatarbg;
const Particpant = styled.div`
  user-select: none;
  padding: 12px 16px;
  display: flex;
  align-items: center;

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    text-align: center;
    line-height: 36px;
    background-color: ${avatarBg};
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 5px;
  }

  .identitiy {
    padding: 0 16px;
    &-name {
      font-size: 14px;
      line-height: 20px;
    }

    &-as {
      font-size: 12px;
      line-height: 16px;
      text-transform: capitalize;
      color: #323232;
    }
  }
`;
export default ShowParticipants;
