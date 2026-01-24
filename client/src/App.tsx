import { Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './pages/login.jsx';
import SignUp from './pages/signup.jsx';
import Home from "@/pages/home.jsx";
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Layout from "@/components/Layout.jsx"
import Events from "@/pages/events.js";

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<Layout />}>
          <Route path="/events" element={<Events />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
