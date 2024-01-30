import { combineReducers } from "redux";
import { chatReducer } from "./chat/reducer";
import { uiReducer } from "./ui/reducer";

const rootReducer = combineReducers({
    ui:uiReducer,
    chat:chatReducer,
});

export default rootReducer;