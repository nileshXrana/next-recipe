import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/user.slice'
import recipeReducer from './features/recipe/recipe.slice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
    reducer: {
        users: userReducer,
        recipes: recipeReducer,
    }
})

// types
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()