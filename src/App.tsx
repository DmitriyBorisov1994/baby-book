import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.less';
import AppPublic from './components/AppPublic';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import AuthPage from './pages/AuthPage';
import EditNotePage from './pages/EditNotePage';
import NotesPage from './pages/NotesPage';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<AppPublic />} />
        <Route path="auth" element={<AuthPage />} />
        <Route element={<RequireAuth />}>
          <Route path="home" element={<p>homepage</p>} />
          <Route path='notes' element={<NotesPage />} />
          <Route path='edit/:noteId' element={<EditNotePage />} />
          <Route path='posts' element={<p>postspage</p>} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
