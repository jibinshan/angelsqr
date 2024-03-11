import { configureStore } from "@reduxjs/toolkit";
import Qrredux from "./Qrredux";




export const store = configureStore({
    reducer : {
        Qr:Qrredux
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});