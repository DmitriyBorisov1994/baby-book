import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { selectCurrentToken } from "../features/auth/authSlice"

const RequireAuth = () => {

   const token = useAppSelector(selectCurrentToken)
   const location = useLocation()

   console.log("TOKEN!!!" + token)

   return (
      token
         ? <Outlet />
         : <Navigate to="/auth" state={{ from: location }} replace />
   )
}
export default RequireAuth