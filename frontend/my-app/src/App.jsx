import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './pages/loginPage';
import Todo from './pages/todoList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/todo" element={<Todo />} /> 
      </Routes>
    </Router>
  );
}

export default App
