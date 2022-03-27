import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {RootState} from "../../store";
import axios from "axios";
function getCookie(name:any) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts?.pop()?.split(';')?.shift();
}
let token = getCookie('token');
export const getCards = createAsyncThunk( 
    "cardSlice/getCards",
    async (arg:any, {rejectWithValue}) => {
        try {
            const response = await axios.get(`http://localhost:80/card?listId=${arg}`, {headers: {'Authorization': `Bearer ${token}`}});
            console.log("getting cards from the server", response.data);
            if (response.status === 200) {
                return response.data;
            }
            else {
                return rejectWithValue(response);
              }
        } catch(err) {
            return rejectWithValue(err);
        }
})
export const createCard = createAsyncThunk (
    "cardSlice/createCard",
    async (arg:any, {rejectWithValue}) => {
        try {
            const response = await axios.post("http://localhost:80/card", arg, {headers: {'Authorization': `Bearer ${token}`}});
            console.log("adding card to the server", response.data);
            if (response.status === 200) {
                return response.data;
            }
            else {
                return rejectWithValue(response);
              }
        } catch(err) {
            return rejectWithValue(err);
        }
})
export const deleteCard = createAsyncThunk (
    "cardSlice/deleteCard",
    async (arg:any, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`http://localhost:80/card/${arg}`, {headers: {'Authorization': `Bearer ${token}`}});
            console.log("deleting card from the server", response.data);
            if (response.status === 200) {
                return arg; // Here we return the id of the card that was deleted to filter it from the redux store because api response returns "deleted" string only.
            }
            else {
                return rejectWithValue(response);
                }
        } catch(err) {
            return rejectWithValue(err);
        }
})

const cardSlice = createSlice({
    name:"cardSlice",
    initialState:{
        cards:[],
        error:false,
        loading:false,
    },
    reducers:{
    },
    extraReducers:{
        [getCards.pending.toString()]: (state, action) => {
            state.loading = true;
        },
        [getCards.fulfilled.toString()]: (state:any, action:any) => {
            state.cards = action.payload; // I push all cards to the state and filter it in the list component.
            state.loading = false;
        },
        [getCards.rejected.toString()]: (state:any, action:any) => {
            state.error = true;
            state.loading = false;
        },
        [createCard.pending.toString()]: (state:any, action:any) => {
            state.loading = true;
        },
        [createCard.fulfilled.toString()]: (state:any, action:any) => {
            state.cards.push(action.payload);
            state.loading = false;
        },
        [createCard.rejected.toString()]: (state, action) => {
            state.error = true;
            state.loading = false;
        },
        [deleteCard.pending.toString()]: (state:any, action:any) => {
            state.loading = true;
        },
        [deleteCard.fulfilled.toString()]: (state:any, action:any) => {
            state.cards = state.cards.filter((card:any) => card.id !== action.payload);
            state.loading = false;
        },
        [deleteCard.rejected.toString()]: (state, action) => {
            state.error = true;
            state.loading = false;
        },        
    },

})
export default cardSlice.reducer;
export const selectCards = (state:RootState) => state.cardSlice.cards;