import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {RootState} from "../../store";

const listSlice = createSlice({
    name:"listSlice",
    initialState: {
        list: [/* {title:"newlist", id:1} */],
        loading: false,
        error: false,
    },
    reducers: {
        addList: (state:any, action:any) => {
            state.list.push(action.payload);
        },
    }
})
export default listSlice.reducer;
export const { addList } = listSlice.actions;
export const selectList = (state:RootState) => state.listSlice.list;