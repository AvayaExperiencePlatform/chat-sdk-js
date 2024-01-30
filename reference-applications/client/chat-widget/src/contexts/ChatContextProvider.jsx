import React, {   useEffect, useRef  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CUSTOMER, NOTIFICATIONS, PARTICIPANT_ADDED, PARTICIPANT_REMOVED } from '../constants';
import { AGENT, SUPERVISOR } from '../utils/config';
import {
    addParticipant,
    newMessageRecieved,
    removeParticipant,
    countMessageUnread,
    setMessageSent,
    setMessageFailed,
    setMessageSending,
    setNotification,
    hideCurrentEventStreamNotification,
    initChat,
    newMessageDelivered,
  } from "../store/chat/actions";
import sendCustomerTextMsgFailed from '../utils/sendCustomerTextMsgFailed';
import sendCustomerTextMsg from '../utils/sendCustomerTextMsg';
import buildMsg from '../utils/buildMsg';
import store from '../store/store';
import User from '../services/user';
import createJWT from '../services/createJWT';
const audio = new Audio('./assets/audio/notifi.wav');
export const ENGAGEMENT_STATUS = {
    ACTIVE:"ACTIVE",
    TERMINATED:"TERMINATED",
    ERROR:"ERROR",
}
export const ChatContext = React.createContext();
const  ChatContextProvider = ({children})=>{
    const initRes = useRef(null);
    const doesSDKHasSession = useRef(false);
    const { isChatPopUpMinimized } = useSelector((state) => state.ui );
    const { messages, participants , engagement , notification_state } = useSelector((state) => state.chat );
    const timeOutId = useRef(null);
    const connectedCount = useRef(0);
    const reconnectedCount = useRef(0);
    const dispatch = useDispatch();
    const disconnectingCount = useRef(0);
    const engagementStatus = useRef()
    useEffect(()=>{
        AvayaCCaaSChatSDK.on("PARTICIPANT_ADDED", function (message) {
            onParticpantAdded(message.participant);
          });
      
          AvayaCCaaSChatSDK.on("PARTICIPANT_DISCONNECTED", async function (message) {
            let p = message.participant;
            let _message = {
              participantId: p.participantId,
              notificationType: PARTICIPANT_REMOVED,
              participantType: p.participantType,
              displayName: p.displayName,
            };
            dispatch(removeParticipant(_message));
            if (p.participantType != CUSTOMER) {
              dispatch(newMessageRecieved(_message, true));
            }
          });
    
        },[engagement])
    

    useEffect(()=>{
            AvayaCCaaSChatSDK.on("MESSAGE_ARRIVED", function (message) { 
                dispatch(newMessageRecieved(message));
                if(isChatPopUpMinimized){
                    dispatch(countMessageUnread()); 
                    audio.play();
                }
            });

            AvayaCCaaSChatSDK.on("MESSAGE_DELIVERED", function (message) { 
                dispatch(newMessageDelivered(message));
                if(isChatPopUpMinimized){
                    dispatch(countMessageUnread()); 
                    audio.play();
                }
            });


            
    },[isChatPopUpMinimized, engagement])

    useEffect(()=>{

        const onJwtTokenExpires =async ()=>{
          try {
            let {jwt} = await createJWT(User.get());
            AvayaCCaaSChatSDK.setJwtToken(jwt);
          } catch(e){
            console.log('error while refreshing jwt token');
            console.log(e)
          }
    
        } 
    
    
    
          AvayaCCaaSChatSDK.on("TOKEN_EXPIRED", onJwtTokenExpires);
          AvayaCCaaSChatSDK.on("TOKEN_EXPIRY_REMINDER", onJwtTokenExpires);
        return ()=>{
          AvayaCCaaSChatSDK.off("TOKEN_EXPIRED");
          AvayaCCaaSChatSDK.off("TOKEN_EXPIRY_REMINDER");
        }
      },[])

    useEffect(()=>{
        //  handle event stream
        AvayaCCaaSChatSDK.on('EVENT_STREAM_CONNECTING',function(e){
            if(reconnectedCount.current == 0) {
                reconnectedCount.current+=1;
                return;
            }
            dispatch(setNotification(NOTIFICATIONS.CONNECTING));
        })

        AvayaCCaaSChatSDK.on('EVENT_STREAM_CONNECTED',function(e){
            if(connectedCount.current == 0) {
                connectedCount.current+=1;
                return;
            }
            dispatch(setNotification(NOTIFICATIONS.CONNECTED));
        })

        AvayaCCaaSChatSDK.on('ENGAGEMENT_ERROR',function(){
            engagementStatus.current = ENGAGEMENT_STATUS.ERROR
            dispatch(setNotification(NOTIFICATIONS.ENGAGEMENT_ERROR));
        })

        AvayaCCaaSChatSDK.on('ENGAGEMENT_ACTIVE',function(){
            engagementStatus.current = ENGAGEMENT_STATUS.ACTIVE
        })
        AvayaCCaaSChatSDK.on('ENGAGEMENT_TERMINATED',function(){
            engagementStatus.current = ENGAGEMENT_STATUS.TERMINATED
            dispatch(setNotification(NOTIFICATIONS.ENGAGEMENT_TERMINATED));
        })

        AvayaCCaaSChatSDK.on('EVENT_STREAM_FAILED',function(e){
            if(disconnectingCount.current > 0 || e.reason === 'RECONNECTION_TIMEOUT' ){
                dispatch(setNotification(NOTIFICATIONS.DISCONNECTED));
            } else {
                dispatch(setNotification(NOTIFICATIONS.CONNECTING));
            }
        })

        AvayaCCaaSChatSDK.on('IDLE_TIMEOUT_EXPIRED',function(e){
            dispatch(setNotification(NOTIFICATIONS.IDLE_TIMEOUT_EXPIRED));
        })

      

         


        AvayaCCaaSChatSDK.on("SHUTDOWN", ()=>{
            initRes.current = null;
            doesSDKHasSession.current = true;
            dispatch(setNotification(NOTIFICATIONS.SESSION_EXPIRED))
          });

    },[disconnectingCount])

    useEffect(()=>{
        // console.log(participants,'participants')
        onParticipantsListChange(participants)
    },[participants])

    const onParticipantsListChange =(partis)=>{
        if(([ENGAGEMENT_STATUS.ERROR,ENGAGEMENT_STATUS.TERMINATED].includes(engagementStatus.current))) return;
        // here will handle notifications
        // first check the participants check if there is no agent or supervisor then change the notification to wating for agent
        const doesItHaveAgentOrSupervisor = partis.filter(p=>p.participantType === AGENT || p.participantType === SUPERVISOR)
        // console.log(partis,'partis',doesItHaveAgentOrSupervisor,'doesItHaveAgentOrSupervisor')
        if(!doesItHaveAgentOrSupervisor.length){
            dispatch(setNotification(NOTIFICATIONS.WAITING_FOR_AGENT));
        } else {
            dispatch(setNotification(NOTIFICATIONS.AGENT_CONNECTED));
        }
    } 
    const reconnect =()=>{
        // console.log('disconnectingCount.current',disconnectingCount.current)
        disconnectingCount.current = disconnectingCount.current + 1;
        // console.log('disconnectingCount.current',disconnectingCount.current)
        AvayaCCaaSChatSDK.retryConnection();
        dispatch(setNotification(NOTIFICATIONS.CONNECTING));
    }
   
    const resetTimer = ()=>{
        AvayaCCaaSChatSDK.resetIdleTimeout();
        if(notification_state.current ===NOTIFICATIONS.IDLE_TIMEOUT_EXPIRED){
            clearTimeout(timeOutId.current);
            dispatch(hideCurrentEventStreamNotification());
        }
    }
    const onParticpantAdded = (participant)=>{
        let _message = {
          participantId: participant.participantId,
          notificationType: PARTICIPANT_ADDED,
          participantType: participant.participantType,
          displayName: participant.displayName,
        };
        
        dispatch(addParticipant(_message));
        if (participant.participantType != CUSTOMER) {
          dispatch(newMessageRecieved(_message, true));
        }

    }
    const joinEngagement =async (_engagement)=>{
        doesSDKHasSession.current = true;
        dispatch(initChat())
        if(_engagement.engagementStatus =='TERMINATING' || _engagement.engagementStatus =='TERMINATED'){
                throw new Error("engagement is terminated")
          } else if(_engagement.engagementStatus == 'ACTIVE'){
            _engagement.participants.forEach(p=>{
                onParticpantAdded(p)
            })
            return _engagement;
          } else {
            _engagement.participants.forEach(p=>{
                onParticpantAdded(p)
            })
            return _engagement.join();
          }
    }

    const initSdk = async (customerInfo)=>{
        doesSDKHasSession.current = true;
        dispatch(initChat())
        if(initRes.current) return initRes.current;
        const {jwt, appKey} = await createJWT(customerInfo);
        const res = await  AvayaCCaaSChatSDK.init({
            integrationId:store.getState().ui.config.integrationId,
            hostURL:store.getState().ui.config.connectorUrl,
            token:jwt,
            appkey: appKey,
            displayName:customerInfo.displayName,
            sessionParameters: { }
          },{
            reconnectionTimeout: 300,
            idleTimeout: 300,
            idleShutdownGraceTimeout: 30,
            logLevel: "INFO"
          });


          initRes.current = res;

          return res;
    }


    const createEngagement =  ()=>{
        return  AvayaCCaaSChatSDK.createEngagement(User.get().engagementParamters);
    }


    const sendMessage = async(msg) => {
        const message = buildMsg(msg)
        sendCustomerTextMsg(message)
        try{
            let m = await engagement.sendMessage(msg);
            dispatch(setMessageSent(message.messageId,m))
            resetTimer()
        } catch(e){
            if(e.code === 'ACS-314'){
                dispatch(setNotification(NOTIFICATIONS.ENGAGEMENT_ERROR));
            } 
            else if(e.code === 'ACS-313' && engagement.engagementStatus !== 'ACTIVE'){
                await engagement.join();
            } 
            else {
                sendCustomerTextMsgFailed(message)
                dispatch(setMessageFailed(message.messageId))
            }
         
        }
      };

      const resendMessage = async(message) => {
          dispatch(setMessageSending(message.messageId))
        try{
            let m = await engagement.sendMessage(message.body.elementText.text);
            dispatch(setMessageSent(message.messageId,m))
            AvayaCCaaSChatSDK.resetIdleTimeout();
        } catch(e){
            console.log(e)
          sendCustomerTextMsgFailed(message)
          dispatch(setMessageFailed(message.messageId))
        }
      };



    return <ChatContext.Provider value={{ participants , joinEngagement , messages , sendMessage , resendMessage , initSdk , createEngagement , resetTimer , reconnect , disconnectingCount,doesSDKHasSession , engagementStatus}}>
        {children}
    </ChatContext.Provider>
}



export default ChatContextProvider;