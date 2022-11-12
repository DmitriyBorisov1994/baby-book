import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.less';
import AppPublic from './components/AppPublic';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import AddNote from './features/notes/AddNote';
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
          <Route path='notes' element={<NotesPage />} />
          <Route path='edit/:noteId' element={<EditNotePage />} />
          <Route path='add' element={<AddNote />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
