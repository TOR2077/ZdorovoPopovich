import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Page2 from './pages/Page2';
// import Registration from './pages/Registration';

// localStorage.clear(); // Отключаю очистку localStorage

// function RedirectToRegistration() {
//   const navigate = useNavigate();
//   useEffect(() => {
//     const user = localStorage.getItem('userProfile');
//     if (!user && window.location.pathname !== '/registration') {
//       navigate('/registration', { replace: true });
//     }
//   }, [navigate]);
//   return null;
// }

function App() {
  return (
    <Router>
      {/* <RedirectToRegistration /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page2" element={<Page2 />} />
        {/* <Route path="/registration" element={<Registration />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
