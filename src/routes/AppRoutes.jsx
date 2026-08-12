import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AboutPage from "../pages/AboutPage";
import SuccessStoriesPage from "../pages/SuccessStoriesPage"; // New public page
import PlansPage from "../pages/PlansPage"; // New public plans page (marketing UI only)
import ContactPage from "../pages/ContactPage"; // New public page
import Feed from "../pages/Feed";
import Filter from "../pages/Filter";
import Profile from "../pages/Profile";
import Plans from "../pages/Plans";
import Matches from "../pages/Matches";
import ChatList from "../pages/ChatList";
import Chat from "../pages/Chat";

export default function AppRoutes({ isLoggedIn }) {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about-page" element={<AboutPage />} /> 
            <Route path="/about" element={<AboutPage />} /> 
            <Route path="/success-stories" element={<SuccessStoriesPage />} /> 

          
            <Route path="/our-plans" element={<PlansPage />} /> 

            <Route path="/contact" element={<ContactPage />} /> 

            <Route
                path="/feed"
                element={isLoggedIn ? <Feed /> : <Navigate to="/login" replace />}
            />

            <Route
                path="/filter"
                element={isLoggedIn ? <Filter /> : <Navigate to="/login" replace />}
            />

            <Route
                path="/profile"
                element={isLoggedIn ? <Profile /> : <Navigate to="/login" replace />}
            />

            <Route
                path="/plans"
                element={isLoggedIn ? <Plans /> : <Navigate to="/login" replace />}
            />

            <Route
                path="/matches"
                element={isLoggedIn ? <Matches /> : <Navigate to="/login" replace />}
            />

            <Route
                path="/chats"
                element={isLoggedIn ? <ChatList /> : <Navigate to="/login" replace />}
            />

            <Route
                path="/chat"
                element={isLoggedIn ? <Chat /> : <Navigate to="/login" replace />}
            />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}