import { createSlice } from "@reduxjs/toolkit";
import {RootState} from "../../store";
const cardSlice = createSlice({
    name:"cardSlice",
    initialState:{
        card: [],
        error:false,
        loading:false,
    },
    reducers:{
        addCard: (state:any, action:any) => {
            state.card.push(action.payload);
        }
    },

})
export default cardSlice.reducer;
export const {addCard} = cardSlice.actions;
const selectCards = (state:RootState) => state.cardSlice.card;