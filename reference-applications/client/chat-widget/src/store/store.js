import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";

const store = configureStore(
  {
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false, immutableCheck: false,}).concat(thunk),
  },
  
);

export default store;
