import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectCurrentToken } from '../features/auth/authSlice'



const AppPublic: React.FC = () => {

   const token = useAppSelector(selectCurrentToken)

   return (
      <div>
         <h1>Добро пожаловать на baby-book</h1>
         {!token && <Link to='auth'>Войдите в свой аккаунт или зарегистрируйтесь</Link>}
      </div>
   )
}

export default AppPublic