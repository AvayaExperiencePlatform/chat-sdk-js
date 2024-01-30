import React, {  useMemo, useState } from "react";
import SignIn from "./pages/SignIn/SignIn";
import AppBar from "./components/AppBar/AppBar";
import { IoChatbubblesOutline } from "react-icons/io5";
import {  Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat/Chat";
import Dialogs from "./pages/Dialogs/Dialogs";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { maximizeChatPopUp, setChatWindowHeight } from "./store/ui/actions.";
import styled, { css } from "styled-components";
import ExitDialog from "./components/ExitDialog/ExitDialog";
import store from "./store/store";
import { useTranslate } from "react-translate";
import {resetMessageUnread} from "./store/chat/actions";
 
const WINDOW_HEIGHT = window.innerHeight;
const CHAT_HEIGHT = WINDOW_HEIGHT - WINDOW_HEIGHT * 0.3;

const ensureHeightDontOverflowWindow = (h)=>{
  const wH = window.innerHeight;
  if(wH < h){
    return  wH -(wH * 0.05);
  } 
  return h;
} 
store.dispatch(setChatWindowHeight(CHAT_HEIGHT))
const appContainerSize = ({size})=>{
  if(size == "lg"){
    return css`width:400px;height:${ensureHeightDontOverflowWindow(784)}px;`;
  }
  if(size == "md"){
    return css`width:350px;height:${ensureHeightDontOverflowWindow(686)}px;`;
  }
  if(size == "sm"){
    return css`width:350px;height:${ensureHeightDontOverflowWindow(588)}px;`;
  }
}
const appContainerDir = props=>props.direction == "rtl"?css`left: 15px;`:css`right: 15px;`
const appContainerIsMinimized = (props) =>
props.isChatPopUpMinimized
  ? css`
      width: 0 !important;
      height: 0 !important;
    `
  : css`
      width: 100% !important;
      height: 100% !important;
    `
const AppContainer = styled.div`
  z-index: 99999999;
  border-radius: 5px;
  overflow: hidden;
  /* width: 380px; */
  ${appContainerSize}
  /* height: ${CHAT_HEIGHT}px; */
  position: fixed;
  bottom: 8px;
  ${appContainerDir}
  background-color: #fff;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
  /* position: relative; */

  @media (max-width: 767px) {
    ${appContainerIsMinimized}
    right: 0;
    left: 0;
    bottom: 0;
    max-height: 100%;
    border-radius: 0px;
  }
`;

const chatBubbleDirection = props=>props.direction == "rtl"?css`left: 15px;`:css`right: 15px;`
const ChatBubble = styled.div`
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
  position: fixed;
  bottom: 25px;
  ${chatBubbleDirection}
  background-color: var(--chat-client-primary);
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  border: 0;
  &:focus {
    outline: 2px dashed var(--chat-client-light-blue);
  }
`;



const NotficationNum = styled.span`
position: absolute;
width: 50px;
height: 50px;
z-index: 2;
display: flex;
justify-content: center;
align-items: center;
width: 25px;
height: 25px;
border-radius: 50%;
top: -5px;
right: -5px;
background: #fff ;
color:  var(--chat-client-primary);
border: 1px solid var(--chat-client-primary);
`;




function App() {
  const dispatch = useDispatch();
  const t = useTranslate("bubble")
  const [isVisble, setIsVisible] = useState(false);
  const { isChatPopUpMinimized, config, isExitDialogOpen } = useSelector(
    (state) => state.ui
  );
  const {unreadMessages} = useSelector((state) => state.chat);
 
  const hideTextWhileAnimate = () => {
    if (isChatPopUpMinimized) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };


  const bubbleIconSize = useMemo(()=>{
    switch(config.size){
      case "sm":
        return 35;
      case "lg":
        return 45;
      default:
        return 40;
    }

  },[config.size])

  
  const windowSize = useMemo(()=>{
    switch(config.size){
      case "lg":
        return {width:400,height:ensureHeightDontOverflowWindow(784)};
      case "md":
        return {width:350,height:ensureHeightDontOverflowWindow(686) };
      case "sm":
        return {width:300,height:ensureHeightDontOverflowWindow(588)};
    }

  },[config.size])



  return (
    <div>
      {/* <PseudoLocalization /> */}
      <AppContainer
        size={config.size}
        role={"alert"}
        direction={config.direction}
        isChatPopUpMinimized={isChatPopUpMinimized}
        as={motion.div}
        onAnimationComplete={hideTextWhileAnimate}
        onAnimationStart={hideTextWhileAnimate}
        transition={{ duration: 0.3 }}
        initial={{ width: 0, height: 0, y: -8 }}
        animate={
          isChatPopUpMinimized
            ? { width: 0, height: 0, opacity: 0, y: -8 }
            : { width: windowSize.width, height: windowSize.height, opacity: 1, y: 0 }
        }
      >
          {isExitDialogOpen ? <ExitDialog width={windowSize.width} height={windowSize.height} /> : null}
          <AppBar />
          <div
            style={{
              position: "relative",
              height: "calc(100% - 50px)",
              visibility: isVisble ? "visible" : "hidden",
            }}
          >
          <Routes>
              <Route path="/" element={<SignIn />}></Route>
              <Route path="chat" element={<Chat />}></Route>
              <Route path="dialogs" element={<Dialogs />}></Route>
            </Routes>
          
          </div>
      </AppContainer>

      {isChatPopUpMinimized ? (<>
        <ChatBubble
          size={config.size}
          direction={config.direction}
          aria-label={t("open-chat-window-call-to-action")}
          as={motion.button}
          onClick={() => {
            dispatch(maximizeChatPopUp());
            dispatch(resetMessageUnread());
          }}
          whileHover={{ scale: 1.1 }}
          initial={{ y: 20 }}
          animate={{ y: -25 }}
          transition={{ duration: 0.4 }}
        >
          <IoChatbubblesOutline alt={t("open-chat-window")} size={bubbleIconSize} />
          {unreadMessages > 0 && (
            <NotficationNum> {unreadMessages}  </NotficationNum>
          )}
        </ChatBubble>
        </>
      ) : null}
    </div>
  );
}

export default App;
