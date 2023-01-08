import { apiSlice } from './../api/apiSlice';
import { firebaseDeleteActivity, firebaseGetActivities, firebaseAddActivity, firebaseUpdateActivity } from './firebaseActivities';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type Activity = {
   key: string,
   id: string,
   noteId: string,
   eatTime: string,
   eatAmount: string,
   startSleep: string,
   endSleep: string
}

export type ActivitiesState = {
   activities: Activity[] | null,
   activitiesIds: string[] | null
}

export const activitiesApiSlice = apiSlice.injectEndpoints({
   endpoints: (build) => ({
      getActivities: build.query({
         queryFn: async (userId: string) => {
            const { activities, activitiesIds } = await firebaseGetActivities(userId)
            return {
               data: {
                  activities,
                  activitiesIds
               } as ActivitiesState
            }
         },
         providesTags: [{ type: 'Activities' }]
      }),
      deleteActivity: build.mutation({
         queryFn: async ({ userId, activityId }) => {
            await firebaseDeleteActivity(userId, activityId)
            return { data: 'deleted' }
         },
         invalidatesTags: (result, error, arg) => [{ type: 'Activities', id: arg.activityId }]
      }),
      addActivity: build.mutation({
         queryFn: async ({ userId, newActivity }) => {
            await firebaseAddActivity(userId, newActivity)
            return { data: 'new activity added' }
         },
         invalidatesTags: (result, error, arg) => [{ type: 'Activities' }]
      }),
      updateActivity: build.mutation({
         queryFn: async ({ userId, updatedActivity }) => {
            await firebaseUpdateActivity(userId, updatedActivity.id, updatedActivity)
            return { data: 'new activity added' }
         },
         invalidatesTags: (result, error, arg) => [{ type: 'Activities' }]
      }),
   }),
})

export const { useGetActivitiesQuery, useDeleteActivityMutation, useAddActivityMutation, useUpdateActivityMutation } = activitiesApiSlice

const selectActivitiesResult = activitiesApiSlice.endpoints.getActivities.select('')

const selectAllActivities = createSelector(
   [selectActivitiesResult],
   postsResult => {
      if (postsResult.data)
         return postsResult.data.activities as Activity[]
   }
)
export const selectActivitiesIds = createSelector(
   selectActivitiesResult,
   postsResult => {
      if (postsResult.data)
         return postsResult.data.activitiesIds
   }
)

export const selectActivityById = createSelector(
   [selectAllActivities, (state: RootState, noteId: string) => noteId],
   (activities, noteId) => {
      if (activities)
         return activities.find(activity => activity.noteId === noteId) as Activity
   }
)

export const selectActivitiesByNoteId = createSelector(
   [selectAllActivities, (state: RootState, noteId: string) => noteId],
   (activities, noteId) => {
      if (activities)
         return activities.filter(activity => activity.noteId === noteId) as Activity[]
   }
)



