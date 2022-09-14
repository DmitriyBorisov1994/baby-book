import { firebaseSignIn, firebaseSignUp } from './firebaseAuth';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

export type AuthQueryArg = {
   email: string,
   password: string,
   confirmPassword?: string
}

export const authApiSlice = createApi({
   baseQuery: fakeBaseQuery(),
   tagTypes: ['Auth'],
   endpoints: (build) => ({
      signIn: build.mutation({
         queryFn: async (arg: AuthQueryArg) => {
            const { email, password } = arg
            const { userEmail, userId, userToken } = await firebaseSignIn(email, password)
            console.log(userEmail, userId, userToken)
            return { data: { userEmail, userId, userToken } }
         },
         invalidatesTags: ['Auth']
      }),
      signUp: build.mutation({
         queryFn: async (arg: AuthQueryArg) => {
            const { email, password } = arg
            const { userEmail, userId, userToken } = await firebaseSignUp(email, password)
            console.log(userEmail, userId, userToken)
            return { data: { userEmail, userId, userToken } }
         },
         invalidatesTags: ['Auth']
      }),
   })
})

export const { useSignInMutation, useSignUpMutation } = authApiSlice