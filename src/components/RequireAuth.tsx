import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { selectCurrentToken } from "../features/auth/authSlice"
import { Spin } from 'antd';
import React, { Suspense } from "react";


const RequireAuth = () => {

   const token = useAppSelector(selectCurrentToken)
   const location = useLocation()

   return (
      token
         ? <Suspense fallback={<Spin />}><Outlet /></Suspense>
         : <Navigate to="/auth" state={{ from: location }} replace />
   )
}
export default RequireAuth