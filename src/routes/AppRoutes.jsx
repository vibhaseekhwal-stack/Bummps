import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AboutPage from "../pages/AboutPage";
import SuccessStoriesPage from "../pages/SuccessStoriesPage";
import PlansPage from "../pages/PlansPage";
import ContactPage from "../pages/ContactPage";
import InvestorPage from "../pages/InvestorPage";

export default function AppRoutes({ isLoggedIn }) {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/about-page" element={<AboutPage />} />

            <Route path="/about" element={<AboutPage />} />

            <Route
                path="/success-stories"
                element={<SuccessStoriesPage />}
            />

            <Route
                path="/our-plans"
                element={<PlansPage />}
            />

            <Route
                path="/contact"
                element={<ContactPage />}
            />

            {/* Investor Page */}
            <Route
                path="/investors"
                element={<InvestorPage />}
            />

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    );
}