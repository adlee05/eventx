import { Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './pages/login.tsx';
import SignUp from './pages/signup.tsx';
import Home from "@/pages/home.tsx";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App
