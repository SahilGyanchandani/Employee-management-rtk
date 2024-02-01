import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "../features/employee/employeeSlice";

export const store = configureStore({
    reducer: employeeSlice
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch