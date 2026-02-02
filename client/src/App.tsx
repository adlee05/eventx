import { Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './pages/login.jsx';
import SignUp from './pages/signup.jsx';
import Home from "@/pages/home.jsx";
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Layout from "@/components/Layout.jsx"
import Events from "@/pages/events.js";
import Profile from "@/pages/Profile.js";
import Details from './pages/Details.js';
import SavedEvents from './pages/savedEvents.js';
import UpcomingEvents from './pages/upcomingEvents.js';
import PastEvents from './pages/pastEvents.js';
import Contact from "@/pages/contact.js";
import Notify from "@/components/notification.jsx";

function App() {

  return (
    <>
      <Notify />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<Layout />}>
          <Route path="/events" element={<Events />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/profile" element={<Profile />}>
              <Route index element={<Details />} />
              <Route path="savedEvents" element={<SavedEvents />} />
              <Route path="upcomingEvents" element={<UpcomingEvents />} />
              <Route path="pastEvents" element={<PastEvents />} />
            </Route>

          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
