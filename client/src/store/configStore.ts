import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch } from 'react-redux'
import rootReducer from './rootReducer'
import { useSelector } from 'react-redux'

const store = configureStore({
    reducer: rootReducer
   
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;

