import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage';
import BookList from './components/BookList';
import ProtectedRoute from './components/ProtectedRoutes';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <ProtectedRoute path="/" element={BookList} /> */}
          <Route path="/" element={<ProtectedRoute component={BookList} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
