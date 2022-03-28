import { createSlice } from "@reduxjs/toolkit";

const musicSlice = createSlice({
    name:"music",
    initialState:{
    },
    reducers:{
        setMusic(state,action){
            state.current = action.payload.music
        }
    }
})
export const {setMusic} = musicSlice.actions

export default musicSlice.reducer