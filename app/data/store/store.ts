import { combineReducers, configureStore } from "@reduxjs/toolkit";
import bookmarkSlice from "../slice/bookmarkSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";

const rootReducer = combineReducers({
    bookmarks: bookmarkSlice,
})

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;