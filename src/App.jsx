import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Page2 from './pages/Page2';
import Registration from './pages/Registration';

function App() {
  const [showRegistration, setShowRegistration] = useState(false);

  const handleRegister = () => {
    setShowRegistration(false);
  };

  if (showRegistration) {
    return <Registration onRegister={handleRegister} />;
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page2" element={<Page2 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
