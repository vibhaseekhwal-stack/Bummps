import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    PiHeartFill,
    PiSparkleFill,
    PiUserBold,
    PiEnvelopeSimpleBold,
    PiLockSimpleBold,
    PiEyeBold,
    PiEyeSlashBold,
    PiBriefcaseBold,
    PiBuildingsBold,
    PiGraduationCapBold,
    PiMapPinBold,
    PiTextAlignLeftBold,
    PiCameraBold,
    PiImagesBold,
    PiXBold,
    PiWarningCircleBold,
    PiShieldCheckBold,
    PiCheckCircleFill,
    PiArrowLeftBold,
} from "react-icons/pi";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/Apis/auth";
import logoImg from "../assets/logo.png";

// Exact fonts matching Contact Page & Hero
const displayFont = { fontFamily: '"Playfair_Display", "Playfair Display", serif' };
const bodyFont = { fontFamily: '"Plus_Jakarta_Sans", sans-serif' };

function BummpsLogo({ className = "h-9" }) {
    return (
        <div className={`flex items-center gap-2.5 select-none ${className}`}>
            <img
                src={logoImg}
                alt="Bummps Logo"
                className="h-full w-auto object-contain drop-shadow-[0_0_10px_rgba(218,178,90,0.3)]"
            />
            <span style={displayFont} className="text-2xl font-bold tracking-tight text-white">
                bummps<span className="text-[#DAB25A]">.</span>
            </span>
        </div>
    );
}

const GENDER_OPTIONS = ["Male", "Female", "Other"];
const INTERESTED_IN_OPTIONS = ["Male", "Female", "Both"];

export default function Register() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [interestInput, setInterestInput] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        interestedIn: "",
        age: "",
        bio: "",
        jobTitle: "",
        company: "",
        school: "",
        livingIn: "",
        distancePreference: 50,
        agePreferenceMin: 20,
        agePreferenceMax: 35,
        interests: [],
    });

    const [profilePic, setProfilePic] = useState(null);
    const [profilePicPreview, setProfilePicPreview] = useState(null);
    const [additionalPhotos, setAdditionalPhotos] = useState([]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePillSelect = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleAddInterest = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const value = interestInput.trim();
            if (value && !form.interests.includes(value)) {
                setForm({ ...form, interests: [...form.interests, value] });
            }
            setInterestInput("");
        }
    };

    const removeInterest = (value) => {
        setForm({ ...form, interests: form.interests.filter((i) => i !== value) });
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfilePic(file);
            setProfilePicPreview(URL.createObjectURL(file));
        }
    };

    const handleAdditionalPhotosChange = (e) => {
        const files = Array.from(e.target.files || []);
        const withPreviews = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setAdditionalPhotos((prev) => [...prev, ...withPreviews]);
    };

    const removeAdditionalPhoto = (index) => {
        setAdditionalPhotos((prev) => prev.filter((_, i) => i !== index));
    };

    const validateStep = (currentStep) => {
        setErrorMsg("");
        if (currentStep === 1) {
            if (!form.fullName || !form.email || !form.password || !form.confirmPassword) {
                setErrorMsg("Please fill in all required fields.");
                return false;
            }
            if (form.password !== form.confirmPassword) {
                setErrorMsg("Passwords do not match.");
                return false;
            }
        } else if (currentStep === 2) {
            if (!form.gender) {
                setErrorMsg("Please select your gender.");
                return false;
            }
            if (!form.interestedIn) {
                setErrorMsg("Please select your preference.");
                return false;
            }
            if (!form.age || Number(form.age) < 18) {
                setErrorMsg("You must be at least 18 years old.");
                return false;
            }
        }
        return true;
    };

    const handleNextStep = () => {
        if (validateStep(step)) {
            setStep((prev) => prev + 1);
        }
    };

    const handlePrevStep = () => {
        setErrorMsg("");
        setStep((prev) => prev - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep(step)) return;

        setLoading(true);

        try {
            const data = new FormData();
            data.append("name", form.fullName);
            data.append("email", form.email);
            data.append("password", form.password);
            data.append("gender", form.gender.toLowerCase());
            data.append("interestedIn", form.interestedIn.toLowerCase());
            data.append("age", form.age);
            data.append("bio", form.bio);
            data.append("jobTitle", form.jobTitle);
            data.append("company", form.company);
            data.append("school", form.school);
            data.append("livingIn", form.livingIn);
            data.append("distancePreference", form.distancePreference);
            data.append(
                "agePreference",
                JSON.stringify({ min: Number(form.agePreferenceMin), max: Number(form.agePreferenceMax) })
            );
            data.append("interests", JSON.stringify(form.interests));

            if (profilePic) data.append("profilePic", profilePic);
            additionalPhotos.forEach((p) => data.append("additionalPhotos", p.file));

            const res = await register(data);
            console.log("register response:", res.data);

            setLoading(false);
            setShowPopup(true);
        } catch (err) {
            console.error("register error:", err.response?.data || err.message);
            setErrorMsg(err.response?.data?.message || "Something went wrong. Try again.");
            setLoading(false);
        }
    };

    // Input style identical to login page
    const inputStyle =
        "w-full rounded-2xl border border-white/10 bg-neutral-950/60 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-neutral-500 focus:border-[#DAB25A] focus:outline-none focus:ring-1 focus:ring-[#DAB25A] transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s] [&:-webkit-autofill]:[-webkit-text-fill-color:white]";

    return (
        <section
            style={bodyFont}
            className="relative min-h-screen w-full bg-[#121214] text-white flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden select-none py-16 sm:py-24"
        >
            {/* Background Radial Glow Spotlight */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-100 bg-linear-to-tr from-[#DAB25A]/15 via-[#F3E5AB]/5 to-transparent blur-[160px] rounded-full pointer-events-none" />

            {/* Main Split Glass Container */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-5xl overflow-hidden rounded-4xl bg-linear-to-b from-neutral-900/90 to-neutral-950/90 border border-[#DAB25A]/20 backdrop-blur-2xl shadow-2xl grid grid-cols-1 lg:grid-cols-12"
            >
                {/* Left Side: Branding Hero Showcase (Desktop) */}
                <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-10 bg-neutral-900/30 border-r border-white/10 backdrop-blur-2xl">
                    <div className="absolute inset-0 bg-[#DAB25A]/5 blur-2xl pointer-events-none" />

                    <div className="relative z-10">
                        <BummpsLogo className="h-10" />
                    </div>

                    <div className="relative z-10 my-auto py-12">
                        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#DAB25A] uppercase bg-[#DAB25A]/10 border border-[#DAB25A]/30 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(218,178,90,0.15)] mb-6">
                            <PiSparkleFill className="text-xs text-[#DAB25A]" /> Start Your Journey
                        </span>

                        <h2 style={displayFont} className="text-3xl font-bold leading-tight text-white">
                            Begin your{" "}
                            <span className="italic font-normal text-[#DAB25A] bg-linear-to-r from-[#DAB25A] via-[#F3E5AB] to-[#DAB25A] bg-clip-text text-transparent">
                                story
                            </span>{" "}
                            with us.
                        </h2>
                        <p className="mt-4 text-sm text-neutral-300 leading-relaxed font-normal">
                            Join our curated community designed for genuine connections, shared interests, and real chemistry.
                        </p>

                        <div className="mt-8 flex items-center gap-4 rounded-2xl border border-white/10 bg-neutral-950/60 p-4 backdrop-blur-md">
                            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#DAB25A]/10 border border-[#DAB25A]/30 text-[#DAB25A]">
                                <PiHeartFill className="text-2xl" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white uppercase tracking-wider">100% Verified Profiles</p>
                                <p className="text-[11px] text-neutral-400 mt-0.5">Safe and authentic conversations</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 flex items-center gap-2 text-xs text-neutral-400">
                        <PiShieldCheckBold className="text-[#DAB25A] text-base" />
                        <span>Encrypted & Safe Registration</span>
                    </div>
                </div>

                {/* Right Side: Form Content */}
                <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
                    <div className="lg:hidden flex justify-center mb-6">
                        <BummpsLogo className="h-9" />
                    </div>

                    <div className="max-w-md mx-auto w-full">
                        <h1 style={displayFont} className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                            Create an{" "}
                            <span className="italic font-normal text-[#DAB25A] bg-linear-to-r from-[#DAB25A] via-[#F3E5AB] to-[#DAB25A] bg-clip-text text-transparent">
                                Account
                            </span>
                        </h1>
                        <p className="mt-2 text-xs sm:text-sm text-neutral-300">
                            {step === 1 && "Step 1 of 3: Enter your account credentials"}
                            {step === 2 && "Step 2 of 3: Tell us about yourself"}
                            {step === 3 && "Step 3 of 3: Add photos & preferences"}
                        </p>

                        {/* Animated Progress Bar */}
                        <div className="w-full bg-neutral-950 h-1.5 rounded-full my-6 overflow-hidden relative border border-white/5">
                            <motion.div
                                className="bg-[#DAB25A] h-full rounded-full shadow-[0_0_12px_#DAB25A]"
                                initial={{ width: "33.3%" }}
                                animate={{ width: `${(step / 3) * 100}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>

                        {errorMsg && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 flex items-center gap-2.5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-400"
                            >
                                <PiWarningCircleBold className="text-base shrink-0" />
                                <span>{errorMsg}</span>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <AnimatePresence mode="wait">
                                {/* STEP 1: Account Credentials */}
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.25 }}
                                        className="space-y-4"
                                    >
                                        <div>
                                            <label htmlFor="reg_fullName" className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-2">
                                                Full Name
                                            </label>
                                            <div className="relative">
                                                <PiUserBold className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#DAB25A] text-lg z-10" />
                                                <input
                                                    id="reg_fullName"
                                                    name="fullName"
                                                    type="text"
                                                    required
                                                    value={form.fullName}
                                                    onChange={handleChange}
                                                    placeholder="John Doe"
                                                    className={inputStyle}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="reg_email" className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-2">
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <PiEnvelopeSimpleBold className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#DAB25A] text-lg z-10" />
                                                <input
                                                    id="reg_email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    required
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    placeholder="you@example.com"
                                                    className={inputStyle}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="reg_password" className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-2">
                                                Password
                                            </label>
                                            <div className="relative">
                                                <PiLockSimpleBold className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#DAB25A] text-lg z-10" />
                                                <input
                                                    id="reg_password"
                                                    name="password"
                                                    type={showPassword ? "text" : "password"}
                                                    required
                                                    minLength={6}
                                                    value={form.password}
                                                    onChange={handleChange}
                                                    placeholder="••••••••"
                                                    className={`${inputStyle} pr-11`}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword((v) => !v)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#DAB25A] transition-colors cursor-pointer z-10 focus:outline-none"
                                                >
                                                    {showPassword ? <PiEyeSlashBold className="text-lg" /> : <PiEyeBold className="text-lg" />}
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="reg_confirmPassword" className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-2">
                                                Confirm Password
                                            </label>
                                            <div className="relative">
                                                <PiLockSimpleBold className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#DAB25A] text-lg z-10" />
                                                <input
                                                    id="reg_confirmPassword"
                                                    name="confirmPassword"
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    required
                                                    minLength={6}
                                                    value={form.confirmPassword}
                                                    onChange={handleChange}
                                                    placeholder="••••••••"
                                                    className={`${inputStyle} pr-11`}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword((v) => !v)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#DAB25A] transition-colors cursor-pointer z-10 focus:outline-none"
                                                >
                                                    {showConfirmPassword ? <PiEyeSlashBold className="text-lg" /> : <PiEyeBold className="text-lg" />}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 2: Basic Profile Information */}
                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.25 }}
                                        className="space-y-4"
                                    >
                                        <div>
                                            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-2">
                                                I am a
                                            </label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {GENDER_OPTIONS.map((g) => (
                                                    <button
                                                        key={g}
                                                        type="button"
                                                        onClick={() => handlePillSelect("gender", g)}
                                                        className={`py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${form.gender === g
                                                                ? "border-[#DAB25A] bg-[#DAB25A]/10 text-[#DAB25A]"
                                                                : "border-white/10 bg-neutral-950/60 text-neutral-400 hover:border-white/20"
                                                            }`}
                                                    >
                                                        {g}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-2">
                                                Looking for
                                            </label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {INTERESTED_IN_OPTIONS.map((i) => (
                                                    <button
                                                        key={i}
                                                        type="button"
                                                        onClick={() => handlePillSelect("interestedIn", i)}
                                                        className={`py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${form.interestedIn === i
                                                                ? "border-[#DAB25A] bg-[#DAB25A]/10 text-[#DAB25A]"
                                                                : "border-white/10 bg-neutral-950/60 text-neutral-400 hover:border-white/20"
                                                            }`}
                                                    >
                                                        {i}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="reg_age" className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-2">
                                                Age
                                            </label>
                                            <div className="relative">
                                                <PiUserBold className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#DAB25A] text-lg z-10" />
                                                <input
                                                    id="reg_age"
                                                    name="age"
                                                    type="number"
                                                    min={18}
                                                    max={100}
                                                    required
                                                    value={form.age}
                                                    onChange={handleChange}
                                                    placeholder="24"
                                                    className={inputStyle}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="reg_bio" className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-2">
                                                Bio
                                            </label>
                                            <div className="relative">
                                                <PiTextAlignLeftBold className="pointer-events-none absolute left-4 top-4 text-[#DAB25A] text-lg z-10" />
                                                <textarea
                                                    id="reg_bio"
                                                    name="bio"
                                                    rows={3}
                                                    value={form.bio}
                                                    onChange={handleChange}
                                                    placeholder="Tell us something about yourself..."
                                                    className="w-full rounded-2xl border border-white/10 bg-neutral-950/60 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-neutral-500 focus:border-[#DAB25A] focus:outline-none focus:ring-1 focus:ring-[#DAB25A] transition-all duration-300 resize-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label htmlFor="reg_jobTitle" className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-2">
                                                    Job Title
                                                </label>
                                                <div className="relative">
                                                    <PiBriefcaseBold className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#DAB25A] text-lg z-10" />
                                                    <input
                                                        id="reg_jobTitle"
                                                        name="jobTitle"
                                                        type="text"
                                                        value={form.jobTitle}
                                                        onChange={handleChange}
                                                        placeholder="Designer"
                                                        className={inputStyle}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="reg_company" className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-2">
                                                    Company
                                                </label>
                                                <div className="relative">
                                                    <PiBuildingsBold className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#DAB25A] text-lg z-10" />
                                                    <input
                                                        id="reg_company"
                                                        name="company"
                                                        type="text"
                                                        value={form.company}
                                                        onChange={handleChange}
                                                        placeholder="Acme Inc."
                                                        className={inputStyle}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label htmlFor="reg_school" className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-2">
                                                    School / College
                                                </label>
                                                <div className="relative">
                                                    <PiGraduationCapBold className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#DAB25A] text-lg z-10" />
                                                    <input
                                                        id="reg_school"
                                                        name="school"
                                                        type="text"
                                                        value={form.school}
                                                        onChange={handleChange}
                                                        placeholder="Stanford"
                                                        className={inputStyle}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="reg_livingIn" className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-2">
                                                    Living In
                                                </label>
                                                <div className="relative">
                                                    <PiMapPinBold className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#DAB25A] text-lg z-10" />
                                                    <input
                                                        id="reg_livingIn"
                                                        name="livingIn"
                                                        type="text"
                                                        value={form.livingIn}
                                                        onChange={handleChange}
                                                        placeholder="New York, NY"
                                                        className={inputStyle}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 3: Photos, Interests & Preferences */}
                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.25 }}
                                        className="space-y-4"
                                    >
                                        {/* Profile Picture */}
                                        <div>
                                            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-2">
                                                Profile Picture
                                            </label>
                                            <div className="flex items-center gap-4">
                                                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/60 grid place-items-center text-neutral-500">
                                                    {profilePicPreview ? (
                                                        <img src={profilePicPreview} alt="Profile preview" className="h-full w-full object-cover" />
                                                    ) : (
                                                        <PiCameraBold className="text-2xl text-[#DAB25A]" />
                                                    )}
                                                </div>
                                                <label className="cursor-pointer rounded-2xl border border-[#DAB25A]/30 bg-[#DAB25A]/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#DAB25A] hover:bg-[#DAB25A]/20 transition-all">
                                                    Upload Photo
                                                    <input type="file" accept="image/*" className="hidden" onChange={handleProfilePicChange} />
                                                </label>
                                            </div>
                                        </div>

                                        {/* Additional Photos */}
                                        <div>
                                            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-2">
                                                Additional Photos
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                                {additionalPhotos.map((p, idx) => (
                                                    <div key={idx} className="relative h-14 w-14 overflow-hidden rounded-xl border border-white/10">
                                                        <img src={p.preview} alt={`Photo ${idx + 1}`} className="h-full w-full object-cover" />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeAdditionalPhoto(idx)}
                                                            className="absolute top-1 right-1 grid h-4 w-4 place-items-center rounded-full bg-black/70 text-white hover:bg-red-500"
                                                        >
                                                            <PiXBold className="text-[10px]" />
                                                        </button>
                                                    </div>
                                                ))}
                                                <label className="flex h-14 w-14 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-neutral-950/60 text-neutral-400 hover:border-[#DAB25A] hover:text-[#DAB25A] transition-all">
                                                    <PiImagesBold className="text-lg" />
                                                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleAdditionalPhotosChange} />
                                                </label>
                                            </div>
                                        </div>

                                        {/* Interests Tag Input */}
                                        <div>
                                            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-2">
                                                Interests (Press Enter)
                                            </label>
                                            <input
                                                type="text"
                                                value={interestInput}
                                                onChange={(e) => setInterestInput(e.target.value)}
                                                onKeyDown={handleAddInterest}
                                                placeholder="e.g. Travel, Music, Photography"
                                                className={inputStyle}
                                            />
                                            {form.interests.length > 0 && (
                                                <div className="mt-2.5 flex flex-wrap gap-1.5">
                                                    {form.interests.map((interest) => (
                                                        <span
                                                            key={interest}
                                                            className="inline-flex items-center gap-1.5 rounded-full bg-[#DAB25A]/10 border border-[#DAB25A]/30 px-3 py-1 text-xs font-semibold text-[#DAB25A]"
                                                        >
                                                            {interest}
                                                            <button type="button" onClick={() => removeInterest(interest)} className="hover:text-white">
                                                                <PiXBold className="text-xs" />
                                                            </button>
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Preferences Sliders */}
                                        <div className="space-y-3 pt-2">
                                            <div>
                                                <div className="flex justify-between text-xs font-semibold text-neutral-300 mb-1">
                                                    <span className="uppercase tracking-wider">Distance Range</span>
                                                    <span className="text-[#DAB25A]">{form.distancePreference} km</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min={5}
                                                    max={200}
                                                    value={form.distancePreference}
                                                    onChange={(e) => setForm({ ...form, distancePreference: Number(e.target.value) })}
                                                    className="w-full accent-[#DAB25A] cursor-pointer"
                                                />
                                            </div>

                                            <div>
                                                <div className="flex justify-between text-xs font-semibold text-neutral-300 mb-1">
                                                    <span className="uppercase tracking-wider">Age Preference</span>
                                                    <span className="text-[#DAB25A]">
                                                        {form.agePreferenceMin} - {form.agePreferenceMax} yrs
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="range"
                                                        min={18}
                                                        max={60}
                                                        value={form.agePreferenceMin}
                                                        onChange={(e) =>
                                                            setForm({
                                                                ...form,
                                                                agePreferenceMin: Math.min(Number(e.target.value), form.agePreferenceMax - 1),
                                                            })
                                                        }
                                                        className="w-full accent-[#DAB25A] cursor-pointer"
                                                    />
                                                    <input
                                                        type="range"
                                                        min={18}
                                                        max={60}
                                                        value={form.agePreferenceMax}
                                                        onChange={(e) =>
                                                            setForm({
                                                                ...form,
                                                                agePreferenceMax: Math.max(Number(e.target.value), form.agePreferenceMin + 1),
                                                            })
                                                        }
                                                        className="w-full accent-[#DAB25A] cursor-pointer"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Control Buttons */}
                            <div className="mt-4 flex items-center gap-3">
                                {step > 1 && (
                                    <button
                                        type="button"
                                        onClick={handlePrevStep}
                                        className="w-1/3 rounded-full border border-white/10 bg-neutral-950/60 hover:bg-neutral-900 text-white font-bold text-xs sm:text-sm uppercase tracking-wider py-4 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <PiArrowLeftBold className="text-base" />
                                        <span>Back</span>
                                    </button>
                                )}

                                {step < 3 ? (
                                    <button
                                        type="button"
                                        onClick={handleNextStep}
                                        className="flex-1 rounded-full bg-[#DAB25A] hover:bg-[#c49e48] text-black font-bold text-xs sm:text-sm uppercase tracking-wider py-4 shadow-[0_4px_25px_rgba(218,178,90,0.4)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer outline-none"
                                    >
                                        <span>Next</span>
                                        <HiOutlineArrowRight className="text-base" />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 rounded-full bg-[#DAB25A] hover:bg-[#c49e48] text-black font-bold text-xs sm:text-sm uppercase tracking-wider py-4 shadow-[0_4px_25px_rgba(218,178,90,0.4)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed outline-none"
                                    >
                                        {loading ? (
                                            <span>Creating...</span>
                                        ) : (
                                            <>
                                                <span>Complete Sign Up</span>
                                                <HiOutlineArrowRight className="text-base" />
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </form>

                        <p className="mt-8 text-center text-xs text-neutral-400">
                            Already have an account?{" "}
                            <Link to="/login" className="font-bold text-[#DAB25A] hover:underline focus:outline-none">
                                Log In
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Registration Success Popup Modal */}
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="max-w-sm w-full rounded-3xl border border-[#DAB25A]/30 bg-neutral-900 p-6 text-center shadow-2xl relative"
                        >
                            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#DAB25A]/10 text-[#DAB25A] mb-4 border border-[#DAB25A]/30">
                                <PiCheckCircleFill className="text-4xl" />
                            </div>
                            <h3 style={displayFont} className="text-2xl font-bold text-white mb-2">
                                Welcome to Bummps!
                            </h3>
                            <p className="text-xs text-neutral-300 mb-6 leading-relaxed">
                                Your account has been created successfully. Log in now to explore matches and start connecting.
                            </p>
                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="w-full rounded-full bg-[#DAB25A] hover:bg-[#c49e48] text-black font-bold text-xs uppercase tracking-wider py-3.5 shadow-[0_4px_20px_rgba(218,178,90,0.3)] transition-all cursor-pointer"
                            >
                                Go to Login
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}