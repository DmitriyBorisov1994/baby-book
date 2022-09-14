import { RootState } from './../../app/store';
import { createSlice } from "@reduxjs/toolkit"

export type AuthState = {
   email: string | null,
   token: string | null,
   userId: string | null
}

const initialState: AuthState = { email: null, token: null, userId: null }


const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setCredentials: (state, action) => {
         const { userEmail, userId, userToken } = action.payload
         state.email = userEmail
         state.token = userToken
         state.userId = userId
      },
      logOut: (state) => {
         state.email = null
         state.token = null
         state.userId = null
      }
   },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.userId
export const selectCurrentToken = (state: RootState) => state.auth.token