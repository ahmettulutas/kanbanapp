import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./auth/AuthSlice";
import listSlice from './components/List/ListSlice';
import cardSlice from './components/Card/CardSlice';
const store = configureStore({
    reducer:{
        auth: loginSlice,
        listSlice: listSlice,
        cardSlice: cardSlice,
    }
})
export default store; 


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;