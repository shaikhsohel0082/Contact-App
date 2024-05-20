import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { contactReducer } from "../features/Redux/contactRedux";

const store = configureStore({
  reducer: {
    contact: contactReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export {store};
