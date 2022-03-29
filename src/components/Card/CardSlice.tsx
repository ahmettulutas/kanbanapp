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
        const {id, listId} = arg;
        try {
            const response = await axios.delete(`http://localhost:80/card/${id}`, {headers: {'Authorization': `Bearer ${token}`}});
            console.log("deleting card from the server", response.data);
            if (response.status === 200) {
                return {id,listId}; // Here we return the id of the list that was deleted to filter it from the redux store because api response returns "deleted" string only.
            }
            else {
                return rejectWithValue(response);
                }
        } catch(err) {
            return rejectWithValue(err);
        }
})
export const updateCard = createAsyncThunk (
    "cardSlice/updateCard",
    async (arg:any, {rejectWithValue}) => {
        try {
            const response = await axios.put(`http://localhost:80/card/${arg.id}`, arg, {headers: {'Authorization': `Bearer ${token}`}});
            console.log("updating card in the server", response.data);
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

const cardSlice = createSlice({
    name:"cardSlice",
    initialState:{
        cards:{},
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
            state.cards = {...state.cards, [action.payload[0].listId]: action.payload};
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
            const {listId} = action.payload;
            state.cards = {...state.cards, [listId]: [...state.cards[listId], action.payload]};
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
            const {id,listId} = action.payload;
            state.cards = {...state.cards, [listId]:state.cards[listId].filter((card:any) => card.id === id)};
            state.loading = false;
        },
        [deleteCard.rejected.toString()]: (state, action) => {
            state.error = true;
            state.loading = false;
        },
        [updateCard.pending.toString()]: (state:any, action:any) => {
            state.loading = true;
        },
        [updateCard.fulfilled.toString()]: (state:any, action:any) => {
            const {id,listId} = action.payload;
            state.cards = {...state.cards, [listId]: state.cards[listId].map((card:any) => {
                if (card.id === id) {
                    return action.payload;
                }
                return card;
            })};
            state.loading = false;
        }, 
        [updateCard.rejected.toString()]: (state, action) => {
            state.error = true;
            state.loading = false;
        }     
    },
})
export default cardSlice.reducer;
export const selectCards = (state:RootState) => state.cardSlice.cards;