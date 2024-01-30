import React, {  useRef , useContext } from "react";
import { FiX,FiMinimize2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { minimizeChatPopUp, openExitDialog } from "../../store/ui/actions.";
import styled from "styled-components";
import {  useTranslate } from "react-translate";
import User from "../../services/user";
import { ChatContext, ENGAGEMENT_STATUS } from "../../contexts/ChatContextProvider";
import store from "../../store/store";
const AppBarStyled = styled.div`
  height: 50px;
  background-color: var(--chat-client-primary);
  color: var(--chat-client-primary-text);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  display: inline-block;
  margin-right: 6px;
  font-size: 14px;
`;

const Button = styled.button`
  cursor: pointer;
  color: #fff;
  border: none;
  outline: none;
  background: none;
  &:focus {
    outline: 2px dashed var(--chat-client-light-blue);
  }
`;
function  AppBar()  {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const closeBtnRef = useRef();
  const t = useTranslate("app-bar");
  const { doesSDKHasSession , engagementStatus  } = useContext(ChatContext)
  const chatHeaderText = store.getState().ui.config.chatHeaderText;
  return (
    <AppBarStyled>
      <TitleContainer>
        <Title>{chatHeaderText}</Title>
      </TitleContainer>
      <div>
        <label className="sr-only" id="minimize-the-chat-pop-up">{t("minimize-the-chat-pop-up")}</label>
        <Button
         data-testid="AppBar-Min-Button"
          aria-describedby="minimize-the-chat-pop-up"
          title={t("minimize-the-chat-pop-up")}
          onClick={() => {
            dispatch(minimizeChatPopUp());
          }}
        >
          <FiMinimize2 alt={t("minimize-the-chat-pop-up")} size="20" />
        </Button>
        <label  className="sr-only" id="close-the-chat-pop-up"> {t("close-the-chat-pop-up")} </label>
        <Button
          data-testid="AppBar-close-Button"
          aria-describedby="close-the-chat-pop-up"
          title={t("close-the-chat-pop-up")}
          ref={closeBtnRef}
          onClick={() => {  
            try{
              if (doesSDKHasSession.current || engagementStatus.current === ENGAGEMENT_STATUS.ACTIVE) {
                dispatch(openExitDialog());
              } else {
                User.reset();
                dispatch(minimizeChatPopUp()); 
                navigate("");
              } 
            } catch(e){
              dispatch(minimizeChatPopUp());
              navigate("");
            }
        
          }}
        >
          <FiX  alt={t("close-the-chat-pop-up")} size="20" />
        </Button>
      </div>
    </AppBarStyled>
  );
}

export default AppBar;
