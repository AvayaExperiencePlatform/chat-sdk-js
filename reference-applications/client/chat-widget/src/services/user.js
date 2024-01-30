
const USER_ITEM_NAME = 'ccaasUser'
const ENAGEMENT_ID_ITEM_NAME= 'ccaasUserEngagementId'
class User {
    static set(data){
        sessionStorage.setItem(USER_ITEM_NAME,JSON.stringify(data));
    }

    static get(){
        let user = sessionStorage.getItem(USER_ITEM_NAME)
        if(user){
            return JSON.parse(user)
        } else {
            return null;
        }
    }
    static setEngagementId(engagementId){
        sessionStorage.setItem(ENAGEMENT_ID_ITEM_NAME,engagementId);
    }
    static getEngagementId(){
        return sessionStorage.getItem(ENAGEMENT_ID_ITEM_NAME);
    }
    static reset(){
        sessionStorage.removeItem(USER_ITEM_NAME);
        sessionStorage.removeItem(ENAGEMENT_ID_ITEM_NAME);
    }
}

export default User;