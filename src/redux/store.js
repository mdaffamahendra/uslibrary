import { configureStore } from "@reduxjs/toolkit";
import PustakawanSlice from "./slice/PustakawanSlice";
const store = configureStore({
    reducer: {
        pustakawan: PustakawanSlice,
    }
})

console.log("oncreate store : ", store.getState())

store.subscribe(() => {
    console.log("Store change : ", store.getState())
})

export default store