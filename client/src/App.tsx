import { Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './pages/login.tsx';
import SignUp from './pages/signup.tsx';
import Home from "@/pages/home.tsx";
import ProtectedRoute from './components/protectedRoute.tsx';

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
