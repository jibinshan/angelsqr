import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const qrasync = createAsyncThunk('Qr/qrasync',async(_,{getState,dispatch})=>{
    const {qrids} = getState().Qr;
    const api = `https://angelsqr-3.onrender.com/qrcodes/qrwithid/${qrids}`
    try {
     const response = await axios(api)
     dispatch(currentqr(response.data))
     return response
    } catch (error) {
        return error
    }
})
const initialState = {
   qrids:'',
   user:{}
}
const Qrslice = createSlice({
    name:"Qr",
    initialState,
    reducers:{
      getQrid : (state,action)=>{
        state.qrids = action.payload
      },
      currentqr:(state,action)=>{
        state.user = action.payload
      }
 }
})

export const { getQrid,currentqr } = Qrslice.actions;
export default Qrslice.reducer