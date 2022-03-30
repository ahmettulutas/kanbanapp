/* THIS MODULE INCLUDES THUNKS, REDUCERS AND SELECTORS RELATED TO BOARDS */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

// This function is used to get the token from the cookie
function getCookie(name:any) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts?.pop()?.split(';')?.shift();
}
let token = getCookie('token');

// async thunks
export const getAllBoards = createAsyncThunk(
    'boardSlice/getBoards',
    async (_, {rejectWithValue}) => {
        // no args passed to this thunk and we destructure the rejectWithValue. 
        try {
            let token = await getCookie('token'); 
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
export const getSingleBoard = createAsyncThunk(
    'boardSlice/getSingleBoard',
    async (arg:any, {rejectWithValue}) => {
        // arg is the board id.
        try {
            let token = await getCookie('token');
            const response = await axios.get(`http://localhost:80/board/${arg}`, {headers: {'Authorization': `Bearer ${token}`}});
            console.log("getting single board from the server", response.data);
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
    'boardSlice/createBoard',
    async(arg:any, {rejectWithValue}) => {
        try {
            let token = getCookie('token');
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
export const deleteBoard = createAsyncThunk(
    'boardSlice/deleteBoard',
    async(arg:any, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`http://localhost:80/board/${arg}`, {headers: {'Authorization': `Bearer ${token}`}});
            console.log("deleting board from the server", response.data);
            if (response.status === 200) {
                return arg; // Here we return the id of the board that was deleted to filter it from the redux store because api response returns "deleted" string only.
            }
            else {
                return rejectWithValue(response);
              }
        } catch(err) {
            return rejectWithValue(err);
        }
})
export const updateBoard = createAsyncThunk(
    'boardSlice/updateBoard',
    async(arg:any, {rejectWithValue}) => {
        const {id, title} = arg;
        console.log("arg", arg);
        console.log("title", title);
        try {
            const response = await axios.put(`http://localhost:80/board/${id}`, arg, {headers: {'Authorization': `Bearer ${token}`}});
            console.log("updating board to the server", response.data);
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
        boards: [],
        isloading: false,
        error: false,
        singleBoard: {},
    },
    reducers: {
        updateSingleBoardWithDnd: (state:any, action:any) => {
            state.singleBoard.lists = action.payload;
        }
    },
    extraReducers:{
        [getAllBoards.fulfilled.toString()]: (state:any, action:any) => {
            state.boards = action.payload;
        },
        [getAllBoards.pending.toString()]: (state:any) => {
            state.isloading = true;
        },
        [getAllBoards.rejected.toString()]: (state:any, action:any) => {
            state.error = true;
        },
        [getSingleBoard.fulfilled.toString()]: (state:any, action:any) => {
            const sortfnc = ((a:any, b:any) => a.order - b.order);
            const sortedList = action.payload.lists.sort(((a:any, b:any) => sortfnc(a, b)))
            const orderedSingleBoard = {...action.payload, lists: sortedList};
            state.singleBoard = orderedSingleBoard;
        },
        [getSingleBoard.pending.toString()]: (state:any) => {
            state.isloading = true;
        },
        [getSingleBoard.rejected.toString()]: (state:any, action:any) => {
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
        [deleteBoard.fulfilled.toString()]: (state:any, action:any) => {
            state.boards = state.boards.filter((board:any) => board.id !== action.payload);
        },
        [deleteBoard.pending.toString()]: (state:any) => {
            state.isloading = true;
        },
        [deleteBoard.rejected.toString()]: (state:any, action:any) => {
            state.error = true;
        },
        [updateBoard.fulfilled.toString()]: (state:any, action:any) => {
            const {title, id} = action.payload;
            state.boards = state.boards.map((board:any) => board.id === id ? {...board, title:title} : board);
        },
        [updateBoard.pending.toString()]: (state:any) => {
            state.isloading = true;
        },
        [updateBoard.rejected.toString()]: (state:any, action:any) => {
            state.error = true;
        },
    }
})
export default boardSlice.reducer;
export const {updateSingleBoardWithDnd} = boardSlice.actions;
export const selectBoards = (state:any) => state.boardSlice;
export const selectSingleBoard = (state:any) => state.boardSlice.singleBoard;