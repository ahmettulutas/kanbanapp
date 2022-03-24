import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/AuthSlice";
import listSlice from './components/List/ListSlice';
import cardSlice from './components/Card/CardSlice';
import boardsSlice from "./components/Boards/BoardsSlice";
const store = configureStore({
    reducer:{
        auth: authSlice,
        listSlice: listSlice,
        cardSlice: cardSlice,
        boardSlice: boardsSlice,
    }
})
export default store; 


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;