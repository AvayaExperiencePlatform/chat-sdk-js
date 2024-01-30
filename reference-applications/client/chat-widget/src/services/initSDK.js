
import store from "../store/store"

const initSDK = ()=>{

    const configs = {
        reconnectionTimeout: 300,
        idleTimeout: 300,
        idleShutdownGraceTimeout: 60,
        logLevel: "INFO"
    }

   
    const init = {
        integrationId:store.getState().ui.config.integrationId,
        hostURL:store.getState().ui.config.connectorUrl,
        token:store.getState().user.jwt,
        displayName:store.getState().user.data.displayName,
        sessionParameters: { 
          
        }
    };

    return AvayaCCaaSChatSDK.init(init,configs);

}
export default initSDK;