import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Post from '../src/components/Post';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/blog/:slug" element={<Post />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
