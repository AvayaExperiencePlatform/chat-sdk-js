import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PreExistingDialog from "./Dialog";
import DialogsWrapper from "./Dialogs.style";
import Button from "../../components/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "../../components/Alert/Alert";
import CustomScrollbars from "../../components/Scrollbars/CustomScrollbars";
import {  useTranslate } from "react-translate";
import styled from 'styled-components'
import ChatCompInfo from "../../components/ChatCompInfo/ChatCompInfo";
import { BeatLoader } from "react-spinners";
import { NOTIFICATIONS } from "../../constants";
import { ChatContext } from "../../contexts/ChatContextProvider";
import User from "../../services/user";
import ChatConnectivity, { ErrorSvg } from "../../components/ChatConnectivity/ChatConnectivity";
const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`
const Dialogs = () => {
  const t = useTranslate("dialogs");
  const { state:{ engagements } } = useLocation();
  const navigate = useNavigate();
  const { notification_state } = useSelector((state) => state.chat );
  const [isCreatingNewSession,setIsCreatingNewSession] = useState(false);
  const [isErrCreatingNewSession,setIsErrCreatingNewSession] = useState(false);
  const {resetTimer} = useContext(ChatContext)

 
  useEffect(()=>{
    if(notification_state.current === NOTIFICATIONS.SESSION_EXPIRED){
      User.reset()
      navigate('/');
    }
  },[notification_state])
  const handleStartNewChat = async () => {
    resetTimer();
    try {
      setIsErrCreatingNewSession(false);
      setIsCreatingNewSession(true);
      const engagement = await AvayaCCaaSChatSDK.createEngagement();
      navigate("/chat",{state :{ engagement }});
    } catch (e) {
      setIsErrCreatingNewSession(true);
    } finally {
      setIsCreatingNewSession(false); 
    }
  };


  const onDialogError = ()=>{
    setIsErrCreatingNewSession(true);
  }

  return (
    <Container>
        <ChatCompInfo shown={true} showParticipants={false} />
        {notification_state.current === NOTIFICATIONS.IDLE_TIMEOUT_EXPIRED &&
          <ChatConnectivity />
        }

     {isErrCreatingNewSession && <div style={{padding: 16}}>
        <Alert
          visible={true}
          type={'danger'}
          content={t("something-went-wrong")}
          icon={<ErrorSvg />}
        />
      </div>}
 


      <CustomScrollbars
        width={"100%"}
        height={'100%'}
        renderThumbHorizontal={() => <span></span>}
      >
         <DialogsWrapper>
          {engagements?.map((engagement) => (
            <PreExistingDialog  data-testid="PreExistingDialog" key={engagement?.dialogId} engagement={engagement} onError={onDialogError} />
          ))}
        </DialogsWrapper>
      </CustomScrollbars>
      <div style={{height:60,padding: 16}}>
      <Button
          disabled={isCreatingNewSession}
          aria-label={t("start-new-chat")}
          onClick={handleStartNewChat}
        >
          {
            isCreatingNewSession?<BeatLoader  color="#fff"/>:t("start-new-chat")
          }
        </Button>
      </div>

    </Container>
  )
  
};

export default Dialogs;
