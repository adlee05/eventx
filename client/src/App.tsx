import { Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './pages/login.jsx';
import SignUp from './pages/signup.jsx';
import Home from "@/pages/home.jsx";
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Layout from "@/components/Layout.jsx"
import Events from "@/pages/events.js";
import Profile from "@/pages/profile/Profile.js";
import Details from './pages/profile/Details.js';
import SavedEvents from './pages/profile/savedEvents.js';
import UpcomingEvents from './pages/profile/upcomingEvents.js';
import PastEvents from './pages/profile/pastEvents.js';
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
