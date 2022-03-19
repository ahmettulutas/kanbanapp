import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

function getCookie(name:any) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts?.pop()?.split(';')?.shift();
}
let token = getCookie('token');

// async thunks
export const getBoards = createAsyncThunk(
    'boards/getBoards',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get("http://localhost:80/board", {headers: {'Authorization': `Bearer ${token}`}});
            console.log("getting boards from the server", response.data);
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
export const createBoard = createAsyncThunk(
    'boards/createBoard',
    async(arg:any, {rejectWithValue}) => {
        try {
            const response = await axios.post("http://localhost:80/board", arg, {headers: {'Authorization': `Bearer ${token}`}});
            console.log("adding board to the server", response.data);
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

const boardSlice = createSlice({
    name:"boardSlice",
    initialState: {
        boards: [/* {title:"newlist", id:1} */],
        isloading: false,
        error: false,
    },
    reducers: {

    },
    extraReducers:{
        [getBoards.fulfilled.toString()]: (state:any, action:any) => {
            state.boards = action.payload;
        },
        [getBoards.pending.toString()]: (state:any) => {
            state.isloading = true;
        },
        [getBoards.rejected.toString()]: (state:any, action:any) => {
            state.error = true;
        },
        [createBoard.fulfilled.toString()]: (state:any, action:any) => {
            state.boards.push(action.payload);
        },
        [createBoard.pending.toString()]: (state:any) => {
            state.isloading = true;
        },
        [createBoard.rejected.toString()]: (state:any, action:any) => {
            state.error = true;
        },
    }
})
export default boardSlice.reducer;
export const selectBoards = (state:any) => state.boardSlice;