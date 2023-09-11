import {configureStore} from "@reduxjs/toolkit";
import taskReducer from "./taskReducer.ts";

export const store = configureStore({
    reducer: {
        tasks: taskReducer
    }
})