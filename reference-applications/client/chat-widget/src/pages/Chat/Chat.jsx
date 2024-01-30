import React, { useEffect, useRef, useState  , useContext , useMemo } from "react";
import { FiSend } from "react-icons/fi";
import {  useTranslate } from "react-translate"; 
import { BsEmojiSmile } from "react-icons/bs";
import "./Chat.scss";
import { useDispatch  , useSelector} from "react-redux";
import Message from "../../components/Message/Message";
import styled, { css } from "styled-components";
import {
  minimizeChatPopUp,
  openExitDialog,
} from "../../store/ui/actions.";
import { useLocation, useNavigate } from "react-router-dom";
import {  initChat, newMessageRecieved, setEngagement, setPrevMessages } from "../../store/chat/actions";
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data'
import autosize from "autosize";
import Button, { SeconderyButton } from "../../components/Button/Button";
import ChatConnectivity from "../../components/ChatConnectivity/ChatConnectivity";
import CustomScrollbars from "../../components/Scrollbars/CustomScrollbars";
import moment from "moment";
import ChatCompInfo from "../../components/ChatCompInfo/ChatCompInfo";
import { ChatContext } from "../../contexts/ChatContextProvider";
import { NOTIFICATIONS } from "../../constants";
import User from "../../services/user";
import store from "../../store/store";
import en from '../../../public/locales/emoj-mart/en.json';
import de from '../../../public/locales/emoj-mart/de.json';
import fr from '../../../public/locales/emoj-mart/fr.json';
import it from '../../../public/locales/emoj-mart/it.json';
import ru from '../../../public/locales/emoj-mart//ru.json';
import zh from '../../../public/locales/emoj-mart/zh.json';
import es from '../../../public/locales/emoj-mart/es.json';
import ja from '../../../public/locales/emoj-mart/ja.json';
import pt from '../../../public/locales/emoj-mart/pt_BR.json';
import he from '../../../public/locales/emoj-mart/he.json';
import ko from '../../../public/locales/emoj-mart/ko.json';
import hu from '../../../public/locales/emoj-mart/hu.json';
import zhtw from '../../../public/locales/emoj-mart/zh-tw.json';

const TEXTAREA_MAX_CHARS = 2500;

const emojiControlDisabledStyles =  ({emojiControlDisabled,dir})=>{
  if(emojiControlDisabled && dir ==='ltr'){
    return css`
    flex-direction: row-reverse;
    button{
      margin-right:auto;
    }
    `
  }

  if(emojiControlDisabled && dir ==='rtl'){
    return css`
    flex-direction: row-reverse;
    button{
      margin-left:auto
    }
    `
  }
}
const ActionsContainer = styled.div`
  padding-bottom: 12px; 
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  ${emojiControlDisabledStyles}
  button {
    color: #1473e6;
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    margin: 5px;
    padding: 0;
    &:focus {
      outline: 2px dashed var(--chat-client-light-blue);
    }
   
  }
`;

const StartNewSession = styled.div`
  margin-bottom: 12px;
  width: 100%;
`;

const isTextAreaInvalid = (props) =>props.textareaInvalid && css`border-color: #d93d32;`
const textAreaInvalidOnFocus = (props) =>
props.textareaInvalid
  ? css`
      border-color: #d93d32;
    `
  : css`
      border-color: #1473e6;
    `
const ChatBoxContainer = styled.div`
  padding: 0 16px;
  padding-top: 12px;
  textarea {
    max-height: 96px;
    height: 36px;
    display: block;
    width: 100%;
    padding: 8px 12px;
    font-size: 14px;
    border: none;
    outline: none;
    resize: none;
    flex-grow: 1;
    padding: 6px;
    border-radius: 2px;
    border: 1px solid #939393;
    ${isTextAreaInvalid}
    &:focus {
      ${textAreaInvalidOnFocus}
      outline: 0;
    }
    &::placeholder{
      font-weight:400;
      font-style:italic;
      font-size:14px;
      color:#757474;
    }
  }
`;

const SendMessageActionContainer = styled.div`
  display: flex;
  align-items: center;
  span.chars-count {
    background: #fceceb;
    border: 1px solid #e56960;
    box-sizing: border-box;
    border-radius: 4px;
    font-size: 12px;
    padding: 4px 8px;
    display: block;
    height: 24px;
    line-height: 12px;
  }

  .send-msg:disabled {
    opacity: 0.5;
  }
`;

export const ReloadHistory = ()=><svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
<path d="M8.5 1C5.85 1 3.45 2.5 2.25 4.85V2.7C2.25 2.5 2.1 2.3 1.85 2.3C1.6 2.3 1.5 2.5 1.5 2.7V5.6C1.5 5.8 1.65 6 1.9 6H4.8C5 6 5.2 5.85 5.2 5.6C5.2 5.35 4.95 5.2 4.75 5.2H2.9C3.95 3.1 6.15 1.75 8.5 1.75C11.95 1.75 14.75 4.55 14.75 8C14.75 11.45 11.95 14.25 8.5 14.25C5.55 14.25 2.95 12.15 2.4 9.25C2.35 9.05 2.15 8.9 1.95 8.95C1.75 9 1.6 9.2 1.65 9.4C2.3 12.65 5.2 15 8.5 15C12.35 15 15.5 11.85 15.5 8C15.5 4.15 12.35 1 8.5 1Z" fill="#1473E6"/>
<path d="M8.5 3.55C8.3 3.55 8.1 3.7 8.1 3.95V8C8.1 8.1 8.15 8.2 8.2 8.25L11.1 11.15C11.15 11.2 11.25 11.25 11.35 11.25C11.45 11.25 11.55 11.2 11.6 11.15C11.75 11 11.75 10.75 11.6 10.6L8.85 7.85V3.9C8.9 3.7 8.7 3.55 8.5 3.55Z" fill="#1473E6"/>
</svg>;

export const RefreshSVG = ()=><svg width="14" height="14" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M27.5417 11.163C25.0688 5.13902 18.2633 2.07101 11.9634 4.17097L11.959 4.17244L11.959 4.17243C7.31185 5.68987 4.17646 9.77058 3.6065 14.3302C3.55473 14.7444 3.177 15.0382 2.76281 14.9865C2.34863 14.9347 2.05483 14.5569 2.10661 14.1428C2.74581 9.0291 6.26043 4.44405 11.4876 2.73625C18.2549 0.481686 25.5826 3.56188 28.6036 9.8334V5.06631C28.6036 4.64891 28.942 4.31053 29.3594 4.31053C29.7768 4.31053 30.1152 4.64891 30.1152 5.06631V11.9188C30.1152 12.3362 29.7768 12.6745 29.3594 12.6745H22.507C22.0896 12.6745 21.7512 12.3362 21.7512 11.9188C21.7512 11.5014 22.0896 11.163 22.507 11.163H27.5417ZM29.3524 16.9128C29.7666 16.9646 30.0604 17.3423 30.0086 17.7565C29.369 22.873 25.8538 27.4507 20.6385 29.2601L20.6298 29.2631L20.6298 29.263C13.8619 31.519 6.5329 28.4388 3.51157 22.1666V26.9337C3.51157 27.3511 3.17319 27.6895 2.75578 27.6895C2.33838 27.6895 2 27.3511 2 26.9337V20.0812C2 19.6638 2.33838 19.3255 2.75578 19.3255H9.60823C10.0256 19.3255 10.364 19.6638 10.364 20.0812C10.364 20.4986 10.0256 20.837 9.60823 20.837H4.57351C7.04582 26.8596 13.8487 29.9276 20.1474 27.8305C24.8053 26.2126 27.9392 22.1251 28.5087 17.569C28.5605 17.1548 28.9382 16.861 29.3524 16.9128Z" fill="#1473E6"/>
</svg>;
const LoadMore = styled.div`
display: flex;
justify-content: center;
align-items: center;
button{
  cursor:pointer;
  margin:0 9px ;
  color:#1473E6;
  background: none;
    border: none;
    outline: none;
    font-size:14px;
}
`

const DateSperator = styled.div`
  display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0 10px;
    div{
      padding: 0 12px;
    }
    hr{
      flex: 1;
    }
    span{
      padding:0 24px ;
      font-size: 12px;
    }

`

const getTrackVerticalStyles = (dir)=>{
  const trackVerticalStyles = {position: "absolute", width: "6px", right: "2px", bottom: "2px", top: "2px", borderRadius: "3px"}
  if(dir === "rtl"){
    trackVerticalStyles.right="unset"
    trackVerticalStyles.left="2px"
  }

  return trackVerticalStyles;
}

export const ChatLoadMore = ({shown , isLoadingPrevMessages , hasPrev , onLoadMoreClick})=> {
  const t = useTranslate("chat");
  return  shown && (
  <>
    {
      isLoadingPrevMessages && <LoadMore>
      <button><RefreshSVG /> {t("retrieving-history")}</button>
      </LoadMore>
    } 

    {hasPrev && !isLoadingPrevMessages ?
      <LoadMore>
          <button onClick={onLoadMoreClick}><ReloadHistory />  {t("load-more")} </button>
      </LoadMore>:null
    }
  </>
)}

export const TextAreaCounter = ({msgLength , doesTextAreaExceedsMaxChars})=>doesTextAreaExceedsMaxChars ? (
  <span className="chars-count">
    {TEXTAREA_MAX_CHARS - msgLength}
  </span>
):null;

export const mapMessages = (item, i , messages) => {
         
  //  check if the current message has recieved at date
  // if the current has recieved and the previous has recieved at date otherwise ignore it
  // else render datetime holder has the date of the current message;
    let current = moment(item.receivedAt);
    let next = messages[i + 1]
    if(next){
      next = moment(next.receivedAt);
      let diff = Math.abs(Math.round(moment.duration(current.diff(next)).asDays()));
      if( diff > 0){
        return  <React.Fragment key={i}>
              <DateSperator>
                  <hr/>
                  <span>{current.format("dddd, MMMM DD")}</span>
                  <hr/>
            </DateSperator>
            <Message  message={item} messageIndex={i} />
        </React.Fragment>
      }
    }
    return  <Message key={i} message={item} messageIndex={i} />;

}

const IsDisconnectedContainer = styled.div`
padding: 0 16px;
padding-top: 12px;
`


export const EmojiPicker = ({shown , onEmojiClick})=>{
  const { lang } = useSelector((s) => s.ui);

  const returnLang = (language)=>{
    switch (language) {
      case 'en': {
        return en
      }
      case 'es': {
        return es
      }
      case 'it': {
        return it
      }
      case 'de': {
        return de
      }
      case 'fr': {
        return fr
      }
      case 'ru': {
        return ru
      }
      case 'he': {
        return he
      }
      case 'ja': {
        return ja
      }
      case 'ko': {
        return ko
      }
      case 'pt_BR': {
        return pt
      }
      case 'zh-cn': {
        return zh
      }
      case 'hu': {
        return hu
      }
      case 'zh-tw': {
        return zhtw
      }
      default: {
        return en
      }
  }
}

  return (
    shown && (<Picker data={data} i18n={returnLang(lang)}  maxFrequentRows={2} exceptEmojis={['middle_finger']} previewPosition="none" native onEmojiSelect={onEmojiClick} /> )
  )
}
const onMsgChange = (_msg , textarea)=>{
  if (_msg.length == 0) {
    textarea.current?.style.setProperty("height", "36px");
    textarea.current?.style.setProperty("overflow", "hidden");
  }
}

const endChat = async (engagementStatus)=>{
  store.dispatch(minimizeChatPopUp());
  store.dispatch(initChat());
  const engagement = store.getState().chat.engagement;
    if(engagement?.engagementStatus === 'ACTIVE'){
      await engagement.disconnect("USER_CLOSED");
    }
    await AvayaCCaaSChatSDK.shutdown("USER_CLOSED");
}
export const IsDisconnected= ({isDisconnected , restartChat , handleEndChatSession})=> {
    
  const t = useTranslate("chat");
  const { notification_state } = useSelector(state=>state.chat);
    const engagementError =  notification_state.current == NOTIFICATIONS.ENGAGEMENT_ERROR  ||  notification_state.current == NOTIFICATIONS.ENGAGEMENT_TERMINATED
    return (notification_state.current == NOTIFICATIONS.SESSION_EXPIRED || engagementError    && isDisconnected) ? (
    <IsDisconnectedContainer>
    <StartNewSession>
       <Button onClick={restartChat}>{t("start-new-chat")}</Button>
     </StartNewSession>
     {(notification_state.current != NOTIFICATIONS.SESSION_EXPIRED) && <SeconderyButton onClick={handleEndChatSession}>
      {t("end-chat")}
     </SeconderyButton>}
     </IsDisconnectedContainer>
   ):<></>
  }

function Chat() {
  const [msg, setMsg] = useState("");
  const t = useTranslate("chat");
  const { state:locationState } = useLocation();
  const [isEmojiShown, setIsEmojiShown] = useState(false);
  const [hasPrev,setHasPrev] = useState(false);
  const pageIterator = useRef(null);
  const textarea = useRef(null);
  const { ui } = useSelector((state) => state);
  const { config } = useSelector(state=>state.ui);
  const { messages , sendMessage , engagementStatus } = useContext(ChatContext);
  const trackVertical = <div style={getTrackVerticalStyles(config.direction)}><div style="position: relative; display: block; width: 100%; cursor: pointer; border-radius: inherit; background-color: rgba(0, 0, 0, 0.2); height: 445px; transform: translateY(0px);"></div></div>
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoadingPrevMessages,setIsLoadingPrevMessages] = useState(false);
  const { notification_state } = useSelector(state=>state.chat);
  const isLocationStateConsumed = useRef(false);
  useEffect(()=>{
    User.setEngagementId(locationState.engagement.engagementId)
    let {lastUpdatedAt , ..._engagement} = locationState.engagement
    dispatch(setEngagement(_engagement))
  },[])


  const doesTextAreaExceedsMaxChars = useMemo(
    () => msg.length > TEXTAREA_MAX_CHARS,
    [msg]
  );
 

  const onLocationStateChange = ()=>{
    if(isLocationStateConsumed.current) return;
    else {
     isLocationStateConsumed.current = true;
      locationState?.prevMessages?.forEach((m) => {
        dispatch(newMessageRecieved(m));
      });

      if(locationState?.pageIterator){
       
        pageIterator.current = locationState?.pageIterator;
        setHasPrev(pageIterator.current.hasPrevious());
      }
    }
    }
  useEffect(() => {
    onLocationStateChange();
  },[]);


  useEffect(() => {
    autosize(textarea.current);
  }, [textarea.current]);


  useEffect(() => {
    onMsgChange(msg,textarea)
  }, [msg]);

  useEffect(() => {
    setTimeout(() => {
      textarea.current?.focus();
    }, 2500);
  }, []);

  const handleButtonPressed = async (evt, _emojiPressed) => {
    var isEscape = evt.key === "Escape" || evt.key === "Esc";
    const isTextAreaFocused =document.activeElement.id === "chat-client-textarea";
    const isEmojiFocused = !!document.activeElement.closest("em-emoji-picker");
    const textAreaOrEmojiFocused = (isTextAreaFocused || isEmojiFocused)
    const isEmojiAndIsEscape = isEmojiShown && isEscape
    if (isEmojiAndIsEscape && textAreaOrEmojiFocused) {
      setIsEmojiShown(!isEmojiShown);
    } else if(isEscape) {
      endChat(engagementStatus.current)
      navigate("");
    } 
  };




  useEffect(() => {
 
    document.onkeydown = handleButtonPressed;
  }, [isEmojiShown]);

  useEffect(() => {
      scrollRef.current?.scrollToBottom();
  }, [messages]);


 


  
  const restartChat = async () => {
    dispatch(initChat());
    navigate('/',{state:{shouldCreatEngagement:true}});
  };



  const handleEndChatSession = () => {
    dispatch(openExitDialog());
  };

  const onEmojiClick = (emoji) => {
    let el = textarea.current;
    const [start, end] = [el.selectionStart, el.selectionEnd];
    el.setRangeText(emoji.native, start, end, "end");
    setMsg(el.value);
    el.focus();
  };

  const isConnected = useMemo(()=>notification_state.current == NOTIFICATIONS.AGENT_CONNECTED ||
  notification_state.current == NOTIFICATIONS.CONNECTED ||
  notification_state.current == NOTIFICATIONS.WAITING_FOR_AGENT||
  notification_state.current == NOTIFICATIONS.IDLE_TIMEOUT_EXPIRED,[notification_state])
  const canNotSendMessage = useMemo(()=>doesTextAreaExceedsMaxChars || msg.length == 0,[msg , doesTextAreaExceedsMaxChars])
  const textareaOnKeyDown = (event) => {
    if (event.shiftKey && event.key === "Enter") {
      event.preventDefault();
      const inputVal = `${msg} \n`;
      setMsg(inputVal);
      setIsEmojiShown(false);
    } else if (event.key === "Enter" ) {
      event.preventDefault();
        _sendMesssag();
    }
  };

  const _sendMesssag = ()=>{
    if(!canNotSendMessage){
      sendMessage(msg);
      setMsg(''); 
      setIsEmojiShown(false);
    }
  }



 



   const onLoadMoreClick = async()=>{
    setIsLoadingPrevMessages(true);
    await  pageIterator.current.previous();
    let m = pageIterator.current.items;
    dispatch(setPrevMessages(m.reverse()));
    setHasPrev(pageIterator.current.hasPrevious())
    setIsLoadingPrevMessages(false);   
   }
  
  return (
    <div  data-testid="Chat-container" className="chat" style={{ height: "100%" }}>
      <ChatCompInfo  shown={ui?.config?.showChatHeader } showParticipants={true}/>
      <ChatConnectivity/>
       <ChatLoadMore  data-testid="ChatLoadMore" shown={isConnected} isLoadingPrevMessages={isLoadingPrevMessages} hasPrev={hasPrev} onLoadMoreClick={onLoadMoreClick}  />
      <CustomScrollbars
        renderTrackVertical={()=>trackVertical}
        role="chat"
        aria-live="polite"
        renderThumbHorizontal={() => <span></span>}
        ref={scrollRef}
        className={"messages-container"}
      >
        {messages.map((item,i)=>mapMessages(item,i,messages))}
      </CustomScrollbars>
        <EmojiPicker data-testid="emoji-picker" shown={isEmojiShown} onEmojiClick={onEmojiClick} />
      {isConnected && <ChatBoxContainer textareaInvalid={doesTextAreaExceedsMaxChars}>
          <textarea
            aria-label={t("start-typing-your-message")}
            id={"chat-client-textarea"}
            onKeyDown={textareaOnKeyDown}
            value={msg}
            ref={textarea}
            onChange={(e) => setMsg(e.target.value)}
            placeholder={t("type-something")}
            data-testid="textarea"
          >
            {msg}
          </textarea>
          <ActionsContainer emojiControlDisabled={config.emojiControlDisabled} dir={config.direction} >
            {!config.emojiControlDisabled && <div>
              <button onClick={() => setIsEmojiShown(!isEmojiShown)}>
                <BsEmojiSmile
                  aria-label={t("open-emoji-icons")}
                  title={t("show-emojis-picker")}
                  size="25"
                  data-testid="show-emoji"
                />
              </button>
            </div>}
            <SendMessageActionContainer>
            <TextAreaCounter msgLength={msg.length} doesTextAreaExceedsMaxChars={doesTextAreaExceedsMaxChars} />
              <button
                className="send-msg"
                disabled={canNotSendMessage}
                onClick={_sendMesssag}
                data-testid="send-msg"
              >
                <FiSend
                  aria-label={t("send-message")}
                  title={t("send-message")}
                  size="25"
                />
              </button>
            </SendMessageActionContainer>
          </ActionsContainer>
    </ChatBoxContainer>}

      <IsDisconnected isDisconnected={!isConnected} restartChat={restartChat} handleEndChatSession={handleEndChatSession} />

    </div>
  );
}

const LoaderStyled = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    align-items: center;
    display: flex;
    flex-direction: column;
    p {
      font-weight: 700;
      font-family: "Noto Sans", sans-serif;
    }
  }
`;

export default Chat;
