import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.less';
import AppPublic from './components/AppPublic';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import AuthPage from './pages/AuthPage';
import NotesPage from './pages/NotesPage';

import AddNotePage from './pages/AddNotePage';
import EditNotePage from './pages/EditNotePage';

const LazyEditNotePage = React.lazy(() => import('./pages/EditNotePage'))
const LazyAddNote = React.lazy(() => import('./pages/AddNotePage'))

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<AppPublic />} />
        <Route path="auth" element={<AuthPage />} />
        <Route element={<RequireAuth />}>
          <Route path='notes' element={<NotesPage />} />
          <Route path='edit/:noteId' element={<LazyEditNotePage />} />
          <Route path='add' element={<LazyAddNote />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
