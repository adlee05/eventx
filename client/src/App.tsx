import { Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './pages/login.tsx';
import SignUp from './pages/signup.tsx';

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App
