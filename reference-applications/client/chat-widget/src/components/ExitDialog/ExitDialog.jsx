import React , { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled ,  { css } from "styled-components";
import { closeExitDialog, minimizeChatPopUp } from "../../store/ui/actions.";
import { initChat } from "../../store/chat/actions";
import {  useTranslate } from "react-translate";
import User from "../../services/user";
import  { ChatContext } from "../../contexts/ChatContextProvider";
const overlayWidth = props=>props.width?css`width: ${props.width}px;`:css``
const overlayHeight =props=>props.height?css`height: ${props.height}px;`:css``

const Overlay = styled.div`
position: fixed;
${overlayWidth}
${overlayHeight}
background-color: rgba(0,0,0,0.5);
z-index:2;
display: flex;
align-items: center;
justify-content: center;
@media (max-width: 767px) {
  width: 100% !important;
    height: 100% !important;
  }
`;

const confirmDialogContainerRtl = props=>props.direction =="ltr"?css`margin-left: 8px;`:css`margin-right: 8px;`
const ConfirmDialogContainer =  styled.div`
  width:90%;
  background-color: #fff;
  padding: 24px;
  border-radius:4px;
  .dialog-title{
    text-align:center;
    font-weight: 400;
    font-size:19px;
    margin: 0;
  }
  .dialog-description{
    margin: 12px 0;
    font-size: 14px;
    font-weight: 400;
  }

  .dialog-buttons-container{
    display: flex;
    justify-content: flex-end;
    
    button{
      padding: 8px 16px;
      font-size: 14px;
      box-sizing:border-box;
      outline: 0;
      border-radius: 2px;
      cursor: pointer;
    }
    .cancel{
      background: #FFFFFF;
      border: 1px solid #1473E6;
      color:#1473E6;
    }
    .end-chat{
      color: white;
      background: #D93D32;
      border: 1px solid #D93D32;
      ${confirmDialogContainerRtl}
    }
  }

`
const ConfirmDialog = ()=>{

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { doesSDKHasSession  } = useContext(ChatContext)
  const engagement = useSelector((state) => state.chat.engagement);
  const { config } = useSelector((state) => state.ui);
  const t = useTranslate("exit-dialog");
  const endChat = async()=>{
    try{

        dispatch(closeExitDialog());
        dispatch(minimizeChatPopUp());
        navigate("");
        dispatch(initChat());
        User.reset();
        if (engagement?.engagementStatus === 'ACTIVE' || engagement?.engagementStatus === 'PENDING') {
              await engagement.disconnect("USER_CLOSED")
        }
        if(doesSDKHasSession.current){
          await AvayaCCaaSChatSDK.shutdown("USER_CLOSED");
        }
    } catch(e){
      if(doesSDKHasSession.current){
        await AvayaCCaaSChatSDK.shutdown("USER_CLOSED");
      }
    }

}
  
 return <ConfirmDialogContainer direction={config.direction}>
      <p data-testid="dialog-title" className="dialog-title">{t("end-chat")}</p>
      <p data-testid="dialog-description" className="dialog-description">{t("end-the-conversation")}</p>
      <div className="dialog-buttons-container">
        <button className="cancel" onClick={()=>{
          dispatch(closeExitDialog())
        }}>{t("cancel")}</button>
        <button  data-testid="end-chat"  className="end-chat" onClick={endChat}>{t("end-chat")}</button>
      </div>
  </ConfirmDialogContainer>
}


const ExitDialog = ({height , width})=>{
    return (
            <Overlay height={height} width={width}>
                <ConfirmDialog />
            </Overlay>
    )
}



export default ExitDialog;