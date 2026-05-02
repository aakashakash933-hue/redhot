import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import RedHotStore from './RedHotStore'
import RedHotAdmin from './RedHotAdmin'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RedHotStore />} />
      <Route path="/admin" element={<RedHotAdmin />} />
    </Routes>
  </BrowserRouter>
)
