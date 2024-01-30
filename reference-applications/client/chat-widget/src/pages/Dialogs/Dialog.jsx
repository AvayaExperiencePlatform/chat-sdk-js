import React, { useContext, useEffect, useState } from "react";
import { DialogWrapper } from "./Dialogs.style";
import { useNavigate } from "react-router-dom";
import {  useTranslate } from "react-translate";
import {  PulseLoader } from "react-spinners";
import { ChatContext } from "../../contexts/ChatContextProvider";
import { format} from 'date-fns'
import { es, enUS, it, de, fr, ru, he, ja, ko, ptBR, zhCN, hu, zhTW } from 'date-fns/locale'
import { useSelector } from "react-redux";

export const returnLang =(lang)=>{
  switch (lang) {
    case 'en': {
      return enUS
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
      return ptBR
    }
    case 'zh-cn': {
      return zhCN
    }
    case 'hu': {
      return hu
    }
    case 'zh-tw': {
      return zhTW
    }
    default: {
      return enUS
    }
}
}

const Dialog = ({ engagement , onError }) => {
  const t = useTranslate("dialog");
  const navigate = useNavigate();
  const { lang } = useSelector((s) => s.ui);
  const [messages, setMessages] = useState([]);
  const [isFechingMessages , setIFetchingMessages] = useState(true);
  const { joinEngagement , resetTimer } = useContext(ChatContext)
 useEffect(() => {
   const getLastMessage =async ()=>{
        const _pageIterator = await engagement.getMessages(); 
        setMessages(_pageIterator.items.map(m=>({...m,isDelivered:true,isFailed:false,isSending:false})));
        setIFetchingMessages(false);
    }
    getLastMessage();
  }, []);

  const handleJoinChatDialog = async (_engagement) => {
    try{
    resetTimer();
    const _pageIterator = await engagement.getMessages(); 
    let _messages = _pageIterator.items.map(m=>({...m,isDelivered:true,isFailed:false,isSending:false}));
    const pMessages  = [..._messages].reverse()
    await joinEngagement(engagement)
    navigate("/chat", { state: { prevMessages: pMessages  , pageIterator:_pageIterator , engagement:_engagement} });
    } catch(e){
      console.log(e)
      onError();
    }

  } 


  return (
    <DialogWrapper>
      <div className="section" role="presentation">
        <label aria-label={t("date-and-time")}>{t("date-and-time")}</label>
        <span aria-label={engagement.createdAt}>
          {format(new Date(engagement.createdAt),  t("date-format") != "dialog.date-format" ? t("date-format") : "eee  MMM dd yyyy hh:mm a",{ locale: returnLang(lang) })}
        </span>
      </div>
        <div className="section">
          <label aria-label={t("last-message")}>{t("last-message")}</label>
          {isFechingMessages ?<div>
            <PulseLoader size={6} color={"#666"} />
          </div>
          : (
            <span>
              {messages[0]?.body.elementText.text}
            </span>
          )
          }
      </div>

    
        <button
          aria-label={t("continue-chat")}
          onClick={() => handleJoinChatDialog(engagement)}
          data-testid="continue-chat"
        >
          {t("continue-this-chat")}
        </button>
    </DialogWrapper>
  );
};

export default Dialog;
