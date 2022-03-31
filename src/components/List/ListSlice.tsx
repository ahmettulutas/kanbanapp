import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {RootState} from "../../store";
import axios from "axios";
function getCookie(name:any) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts?.pop()?.split(';')?.shift();
}
let token = getCookie('token');
// async thunks that control the list of boards;
export const getLists = createAsyncThunk(
    'listSlice/getLists',
    async (arg:any, {rejectWithValue}) => {
        let token = await getCookie('token'); 
        // arg is the board id.
        try {
            const response = await axios.get(`http://localhost:80/list?boardId=${arg}`, {headers: {'Authorization': `Bearer ${token}`}});
            console.log("getting lists from the server", response.data);
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
export const createList = createAsyncThunk(
    'listSlice/createList',
    async(arg:any, {rejectWithValue}) => {
        try {
            const response = await axios.post("http://localhost:80/list", arg, {headers: {'Authorization': `Bearer ${token}`}});
            console.log("adding list to the server", response.data);
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

export const updateList = createAsyncThunk(
    "listSlice/updateList",
    async (arg:any, {rejectWithValue}) => {
        const {id} = arg;
        try {
            const response = await axios.put(`http://localhost:80/list/${id}`, arg, {headers: {'Authorization': `Bearer ${token}`}});
            console.log("updating list on the server", response.data);
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
export const deleteList = createAsyncThunk(
    'listSlice/deleteList',
    async(args:any, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`http://localhost:80/list/${args}`, {headers: {'Authorization': `Bearer ${token}`}});
            console.log("deleting list from the server", response.data);
            if (response.status === 200) {
                return args; // Here we return the id of the list that was deleted to filter it from the redux store because api response returns "deleted" string only.
            }
            else {
                return rejectWithValue(response);
              }
        } catch(err) {
            return rejectWithValue(err);
        }

})
// slice that controls the lists;
const listSlice = createSlice({
    name:"listSlice",
    initialState: {
        list: [],
        loading: false,
        error: false,
    },
    reducers: {
        // this function prevents dnd from waiting for api response.
         updateListCardsWithDnd: (state:any, action:any) => {
            const {sourceId, destinationId, sourceCards, destinationCards } = action.payload;
            const list = state.list.map((item:any) => {
                if (item.id === sourceId) {
                    return {...item, cards:sourceCards};
                }
                if (destinationId && item.id === destinationId) {
                    return {...item, cards:destinationCards};
                }
                return item;
            });
            console.log("list", list);
            return {...state, list:list};
        },
        updateListsWithDnd: (state:any, action:any) => {
            console.log("listinthestate", action.payload);
            state.list = action.payload;
        } 
    },
    extraReducers: {
        [getLists.pending.toString()]: (state:any, action:any) => {
            state.loading = true;
        },
        [getLists.fulfilled.toString()]: (state:any, action:any) => {
            const sortfnc = ((a:any, b:any) => a.order - b.order);
            const sortedList = action.payload.sort(((a:any, b:any) => sortfnc(a, b)))
            const sortedCardsList = sortedList.map((item:any) => {
                return {...item, cards: item.cards.sort((a:any, b:any) => sortfnc(a, b))};
            })
            state.list = sortedCardsList;
            state.loading = false;
        },
        [getLists.rejected.toString()] : (state:any, action:any) => {
            state.error = true;
        },
        [updateList.pending.toString()]: (state:any, action:any) => {
            state.loading = true;
        },
        [updateList.fulfilled.toString()]: (state:any, action:any) => {
            state.list = state.list.map((list:any) => {
                if (list.id === action.payload.id) {
                    return {...list, title:action.payload.title};
                }
                return list;
            });
            state.loading = false;
        },
        [updateList.rejected.toString()] : (state:any, action:any) => {
            state.error = true;
        },
        [createList.pending.toString()]: (state:any, action:any) => {
            state.loading = true;
        },
        [createList.fulfilled.toString()]: (state:any, action:any) => {
            state.list.push({...action.payload, cards:[]});
            state.loading = false;
        },
        [createList.rejected.toString()] : (state:any, action:any) => {
            state.error = true;
        },
        [deleteList.pending.toString()]: (state:any, action:any) => {
            state.loading = true;
        },
        [deleteList.fulfilled.toString()]: (state:any, action:any) => {
            state.list = state.list.filter((list:any) => list.id !== action.payload);
            state.loading = false;
        },
        [deleteList.rejected.toString()] : (state:any, action:any) => {
            state.error = true;
        },
    }
})
export default listSlice.reducer;
export const {updateListCardsWithDnd, updateListsWithDnd} = listSlice.actions;
export const selectList = (state:any) => state.listSlice.list;