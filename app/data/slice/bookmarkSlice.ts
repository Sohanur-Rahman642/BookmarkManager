import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookMark, BookMarkState, Category } from "./types";


const initialState : BookMarkState = {
    categories: {}
}

const bookmarkSlice = createSlice({
    name: 'bookmarks',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<string>) => {
            const newCategory: Category = { name: action?.payload, bookmarks: []}
            state.categories[action?.payload] = newCategory
        },

        addBookMark: (state, action: PayloadAction<{category: string, bookmark: BookMark}>) => {
            const { category, bookmark} = action?.payload
            state.categories[category]?.bookmarks?.push(bookmark)
        }
    }
})

export const { addCategory, addBookMark } = bookmarkSlice.actions
export default bookmarkSlice.reducer