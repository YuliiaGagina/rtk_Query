import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface GithubState {
    favorites: string[]
}
const LS_FAW_KEY = 'rfk'

const initialState: GithubState = {
    favorites: JSON.parse(localStorage.getItem(LS_FAW_KEY) ?? '[]') 

}

export const githubSlice = createSlice({
    name: 'github',
    initialState,
    reducers: {
        addFavorite(state, action: PayloadAction<string>) {
            state.favorites.push(action.payload); 
            localStorage.setItem('rfk', JSON.stringify(state.favorites))
        },
        removeFavorite(state, action: PayloadAction<string>) {
            state.favorites = state.favorites.filter(f => f !== action.payload)
              localStorage.setItem('rfk', JSON.stringify(state.favorites))
        }
    }
})

export const githubActions = githubSlice.actions
export const githubReducer = githubSlice.reducer