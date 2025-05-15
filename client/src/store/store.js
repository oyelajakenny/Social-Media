import {createSlice} from '@reduxjs/toolkit';


const userSlice =create({
    name: 'user',
    initialState:{currentUser: JSON.parse(localStorage.getItem('currentuser')) || null, socket: null, onlineUsers: []},
    reducers:{
        changeCurrentUser:(state, action)=>{
            state.currentUser = action.payload;
        },
        setSocket:(state, action)=>{
            state.socket = action.payload;
        },
        setOnlineUsers:(state, action)=>{
            state.onlineUsers = action.payload;
        }
    }

})

export const userActions = userSlice.actions;
export default userSlice;