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
                return {listId:arg, cards:response.data};
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
        const {id} = arg;
        try {
            const response = await axios.put(`http://localhost:80/card/${id}`, arg, {headers: {'Authorization': `Bearer ${token}`}});
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
export const addComment = createAsyncThunk (
    "cardSlice/addComment",
    async (arg:any, {rejectWithValue}) => {
        const {listId} = arg;
        try {
            const response = await axios.post(`http://localhost:80/comment`, arg, {headers: {'Authorization': `Bearer ${token}`}});
            console.log("adding comment to the server", response.data);
            if (response.status === 200) {
                return {listId:listId, comment:response.data};

            }
            else {
                return rejectWithValue(response);
            }
        } catch(err) {
            return rejectWithValue(err);
        }
})
export const deleteComment = createAsyncThunk (
    "cardSlice/deleteComment",
    async (arg:any, {rejectWithValue}) => {
        const {listId} = arg;
        try {
            const response = await axios.delete(`http://localhost:80/comment/${arg.comment.id}`, {headers: {'Authorization': `Bearer ${token}`}});
            console.log("deleting comment from the server", response.data);
            if (response.status === 200) {
                console.log({listId:listId, comment:arg.comment});
                return {listId:listId, comment:arg.comment};
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
            const {listId, cards} = action.payload;
            if(action.payload.length > 0) {
                state.cards = {...state.cards, [listId]:cards}
            }
            else {
                state.cards = {...state.cards, [listId]:[]}
            };
            console.log("allcards", state.cards);
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
                    return {...action.payload, comments:[...card.comments], labels:[...card.labels]};
                }
                return card;
            })};
            console.log("updated card", state.cards);
            state.loading = false;
        }, 
        [updateCard.rejected.toString()]: (state, action) => {
            state.error = true;
            state.loading = false;
        },
        [addComment.pending.toString()]: (state:any, action:any) => {
            state.loading = true;
        },
        [addComment.fulfilled.toString()]: (state:any, action:any) => {
            const {cardId} = action.payload.comment;
            const {listId} = action.payload;
            state.cards[listId] = state.cards[listId].map((card:any) => {
                if (card.id === cardId) {
                    card.comments = [...card.comments, action.payload.comment];
                }
                return card;
            })
        },
        [deleteComment.pending.toString()]: (state:any, action:any) => {
            state.loading = true;
        },
        [deleteComment.fulfilled.toString()]: (state:any, action:any) => {
            const {listId, comment} = action.payload;
            state.cards[listId] = state.cards[listId].map((card:any) => {
                if (card.id === comment.cardId) {
                    card.comments = card.comments.filter((item:any) => item.id === comment.id);
                }
                return card;
            })
        },
        [deleteComment.rejected.toString()]: (state, action) => {
            state.error = true;
            state.loading = false;
        },
        
    },
})
export default cardSlice.reducer;
export const selectCards = (state:RootState) => state.cardSlice.cards;