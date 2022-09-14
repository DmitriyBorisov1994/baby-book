import React from 'react'
import { Link } from 'react-router-dom'

const AppPublic: React.FC = () => {
   return (
      <div>
         <h1>Добро пожаловать на baby-book</h1>
         <Link to='auth'>Войдите в свой аккаунт или зарегистрируйтесь</Link>
      </div>
   )
}

export default AppPublic