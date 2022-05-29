import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import Employees from './pages/Employees';
import Todos from './pages/Todos';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/employees' element={<Employees />} />
        <Route path='/todos' element={<Todos />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
