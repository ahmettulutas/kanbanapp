import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//token getter function;
function getCookie(name:any) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts?.pop()?.split(';')?.shift();
  }
// login thunk
export const login = createAsyncThunk(
    "auth/login",
    async (arg:any, {rejectWithValue}) => {
        try {
            const response = await axios.post("http://localhost:80/auth/login", arg);
            console.log("logging in to the server", response.data);
            if (response.status === 200) {
                document.cookie = `token=${response.data.token}`;
                return response.data;
            }
            else {
                return rejectWithValue(response);
              }
        } catch(err) {
            return rejectWithValue(err);
        }

})

// register thunk
export const register = createAsyncThunk(
    "auth/register",
    async (arg:any, {rejectWithValue}) => {
        try {
            const response = await axios.post("http://localhost:80/auth/register", arg)
            console.log("registering to the server", response.data);
            if (response.status === 200) {
                document.cookie = `token=${response.data.token}`;
                return response.data;
            }
            else {
                return rejectWithValue(response);
              }
        } catch(err) {
            return rejectWithValue(err);
        }
})

// auth slice that controls the token and the success of the login;
const authSlice = createSlice({
    name: "auth",
    initialState: { 
        success: /* getCookie('token') ? true : false, */ false,
        loading: false,
        failed:false,
        token: getCookie('token'),
        userId: "",
    },
    reducers:{},
    extraReducers: {
        [login.pending.toString()]: (state:any) => {
            state.loading = true;
        },
        [login.fulfilled.toString()]: (state:any, action: any) => {
            state.loading = false;
            state.token = action.payload.token;
            state.success = true;
            state.userId = action.payload.id;
        },
        [login.rejected.toString()]: (state:any, action: any) => {
            state.loading = false;
            state.failed = true;
        },
        [register.pending.toString()]: (state:any) => {
            state.loading = true;
        },
        [register.fulfilled.toString()]: (state:any, action: any) => {
            state.loading = false;
            state.success = true;
            state.token = action.payload;
        },
        [register.rejected.toString()]: (state:any) => {
            state.loading = false;
            state.failed = true;
        }

    }
})
export default authSlice.reducer;
// selectors
export const selectToken = (state:any) => state.auth.token;
export const selectSuccess = (state:any) => state.auth.success;
export const selectUserId = (state:any) => state.auth.userId;
export const selectFailed = (state:any) => state.auth.failed;
export const selectAuth = (state:any) => state.auth;
