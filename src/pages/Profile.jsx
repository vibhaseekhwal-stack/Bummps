import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    PiMapPinFill,
    PiBriefcaseFill,
    PiGraduationCapFill,
    PiTrashBold,
    PiSparkleFill,
    PiSealCheckFill,
    PiRulerFill,
    PiCrownFill,
    PiWarningCircleFill,
    PiHeartFill,
    PiXBold,
    PiArrowCounterClockwiseBold,
    PiTranslateBold,
    PiSlidersHorizontalBold,
} from "react-icons/pi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteAccount, getUserProfileById } from "../services/Apis/auth";
import { likeUser, passUser, rewindLastAction, cleanInterests } from "../services/Apis/Users";

const displayFont = { fontFamily: "'Playfair Display', Georgia, serif" };
const bodyFont = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };

function decodeJwtPayload(token) {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
                .join("")
        );
        return JSON.parse(jsonPayload);
    } catch {
        return null;
    }
}

function getOwnUserIdFromToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const payload = decodeJwtPayload(token);
    if (!payload) return null;
    return payload.id || payload._id || payload.userId || payload.sub || null;
}

export default function Profile() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [accountDeleted, setAccountDeleted] = useState(false);
    const [activePhoto, setActivePhoto] = useState(0);

    const [liking, setLiking] = useState(false);
    const [liked, setLiked] = useState(false);
    const [passing, setPassing] = useState(false);
    const [passed, setPassed] = useState(false);
    const [rewinding, setRewinding] = useState(false);
    const [likeResult, setLikeResult] = useState(null);

    useEffect(() => {
        resolveUser();
    }, [location.state, id]);

    useEffect(() => {
        if (!accountDeleted) return;
        const t = setTimeout(() => {
            localStorage.clear();
            navigate("/login");
        }, 1500);
        return () => clearTimeout(t);
    }, [accountDeleted, navigate]);

    const resolveUser = async () => {
        setLoadError("");

        const feedUser = location.state?.user;
        if (feedUser) {
            setUser(feedUser);
            setLoading(false);
            return;
        }

        if (id) {
            await loadProfileById(id);
            return;
        }

        const stored = localStorage.getItem("user");
        if (stored) {
            try {
                setUser(JSON.parse(stored));
                setLoading(false);
                return;
            } catch {
            }
        }

        const ownId = getOwnUserIdFromToken();
        if (ownId) {
            await loadProfileById(ownId);
            return;
        }

        setLoading(false);
        setLoadError("We couldn't find your session. Please log in again.");
    };

    const loadProfileById = async (userId) => {
        setLoading(true);
        try {
            const data = await getUserProfileById(userId);
            if (data?.user) {
                setUser(data.user);
            } else {
                setLoadError("Profile data came back empty.");
            }
        } catch (err) {
            setLoadError(err.response?.data?.message || "Could not load profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        setDeleting(true);
        setErrorMsg("");
        try {
            await deleteAccount();
            setShowConfirm(false);
            setAccountDeleted(true);
        } catch (err) {
            setErrorMsg(err.response?.data?.message || "Could not delete account. Try again.");
        } finally {
            setDeleting(false);
        }
    };

    const handleLike = async () => {
        if (!user?._id || liking || liked || passed) return;
        setLiking(true);
        setErrorMsg("");
        try {
            const data = await likeUser(user._id);
            setLiked(true);
            setLikeResult({
                isMatch: !!data?.isMatch,
                message: data?.message || "Profile liked successfully",
            });
        } catch (err) {
            setErrorMsg(err.response?.data?.message || "Could not like this profile. Try again.");
        } finally {
            setLiking(false);
        }
    };

    const handlePass = async () => {
        if (!user?._id || passing || liked || passed) return;
        setPassing(true);
        setErrorMsg("");
        try {
            await passUser(user._id);
            setPassed(true);
            navigate(-1);
        } catch (err) {
            setErrorMsg(err.response?.data?.message || "Could not pass this profile. Try again.");
        } finally {
            setPassing(false);
        }
    };

    const handleRewind = async () => {
        if (!user?._id || rewinding) return;
        setRewinding(true);
        setErrorMsg("");
        try {
            await rewindLastAction(user._id);
            setLiked(false);
            setPassed(false);
            setLikeResult(null);
        } catch (err) {
            setErrorMsg(err.response?.data?.message || "Could not rewind last action. Try again.");
        } finally {
            setRewinding(false);
        }
    };

    const photos = [user?.profilePic, ...(user?.additionalPhotos || [])].filter(Boolean);

    useEffect(() => {
        setActivePhoto(0);
    }, [user?._id]);

    useEffect(() => {
        if (photos.length <= 1) return;
        const interval = setInterval(() => {
            setActivePhoto((prev) => (prev + 1) % photos.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [photos.length]);

    if (loading) {
        return (
            <section
                style={bodyFont}
                className="min-h-screen bg-[#09090A] text-white flex flex-col items-center justify-center gap-3 select-none"
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-9 w-9 border-2 border-[#DAB25A] border-t-transparent rounded-full shadow-[0_0_15px_rgba(218,178,90,0.3)]"
                />
                <p className="text-xs font-bold uppercase tracking-widest text-[#DAB25A]">
                    Loading Experience...
                </p>
            </section>
        );
    }

    if (loadError || !user) {
        return (
            <section
                style={bodyFont}
                className="min-h-screen bg-[#09090A] text-white flex flex-col items-center justify-center px-4 gap-4 text-center select-none"
            >
                <PiWarningCircleFill className="text-5xl text-[#DAB25A]" />
                <p className="text-neutral-300 text-sm max-w-sm leading-relaxed">
                    {loadError || "Could not load this profile."}
                </p>
                <div className="flex gap-3 mt-2">
                    <button
                        onClick={() => navigate(-1)}
                        className="rounded-full border border-white/20 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 hover:bg-white/10 transition-all active:scale-95 cursor-pointer"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={resolveUser}
                        className="rounded-full bg-[#DAB25A] hover:bg-[#c49e48] text-[#09090A] text-xs font-bold uppercase tracking-wider px-6 py-3 transition-all active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(218,178,90,0.3)]"
                    >
                        Retry
                    </button>
                </div>
            </section>
        );
    }

    const isOwnProfile = !location.state?.user && !id;
    const hasActiveSubscription = !!user.subscription?.isActive;

    return (
        <section
            style={bodyFont}
            className="relative min-h-screen bg-[#09090A] text-white pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 select-none overflow-hidden flex items-start justify-center"
        >
            {/* Ambient Background Aura */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[90vw] max-w-[1000px] h-[500px] bg-gradient-to-tr from-[#DAB25A]/15 via-[#F3E5AB]/5 to-transparent blur-[160px] rounded-full pointer-events-none" />
            <div className="absolute top-10 left-10 w-72 h-72 bg-[#DAB25A]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#DAB25A]/8 blur-[130px] rounded-full pointer-events-none" />

            <div className="mx-auto max-w-5xl w-full relative z-10">
                <AnimatePresence mode="wait">
                    {accountDeleted && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mb-4 rounded-2xl border border-[#DAB25A]/40 bg-[#DAB25A]/10 px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-[#DAB25A] shadow-[0_0_25px_rgba(218,178,90,0.15)]"
                        >
                            Account deleted successfully. Redirecting to login...
                        </motion.p>
                    )}

                    {likeResult && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mb-4 rounded-2xl border border-[#DAB25A]/40 bg-[#DAB25A]/10 px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-[#DAB25A] shadow-[0_0_25px_rgba(218,178,90,0.15)]"
                        >
                            {likeResult.isMatch
                                ? `It's a Match! You and ${user.name || "this user"} connected!`
                                : "Profile liked!"}
                        </motion.p>
                    )}
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-2 sm:mt-4 rounded-3xl sm:rounded-[2.25rem] border border-[#DAB25A]/30 bg-neutral-950/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden grid lg:grid-cols-12 gap-0"
                >
                    {/* Left Column (Images & Actions) */}
                    <div className="lg:col-span-5 p-4 sm:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 bg-neutral-950/50">
                        <div>
                            <div className="relative h-[260px] sm:h-[320px] lg:h-[380px] w-full rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.7)] group border border-[#DAB25A]/20 bg-neutral-900">
                                <div
                                    className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl opacity-40 transition-all duration-700"
                                    style={{
                                        backgroundImage: `url(${photos[activePhoto] || user.profilePic || user.photo})`,
                                    }}
                                />

                                <AnimatePresence mode="popLayout">
                                    <motion.img
                                        key={activePhoto}
                                        src={photos[activePhoto] || user.profilePic || user.photo}
                                        alt={user.name || "profile"}
                                        initial={{ opacity: 0, scale: 1.03 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.97 }}
                                        transition={{ duration: 0.45, ease: "easeOut" }}
                                        className="absolute inset-0 h-full w-full object-contain"
                                    />
                                </AnimatePresence>

                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />

                                {user.isVerified && (
                                    <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#DAB25A] border border-[#DAB25A]/30 shadow-md">
                                        <PiSealCheckFill className="text-sm" /> Verified
                                    </div>
                                )}
                            </div>

                            {/* Thumbnail Selector List */}
                            {photos.length > 1 && (
                                <div className="flex gap-2 mt-3 overflow-x-auto pb-1 justify-center sm:justify-start">
                                    {photos.map((img, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setActivePhoto(i)}
                                            className={`h-10 w-10 sm:h-11 sm:w-11 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${i === activePhoto
                                                    ? "border-[#DAB25A] scale-105 shadow-[0_0_10px_rgba(218,178,90,0.4)]"
                                                    : "border-transparent opacity-40 hover:opacity-80"
                                                }`}
                                        >
                                            <img src={img} alt="thumbnail" className="h-full w-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Action Buttons for visitor profiles */}
                        {!isOwnProfile && (
                            <div className="mt-4 sm:mt-5 flex items-center gap-2.5">
                                <button
                                    type="button"
                                    onClick={handlePass}
                                    disabled={passing || liking || liked || passed}
                                    title="Pass"
                                    className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-white/15 text-neutral-300 flex items-center justify-center hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                                >
                                    <PiXBold className="text-lg" />
                                </button>

                                <button
                                    type="button"
                                    onClick={handleLike}
                                    disabled={liking || liked || passed}
                                    className="flex-1 h-10 sm:h-11 rounded-full bg-gradient-to-r from-[#DAB25A] to-[#c49e48] hover:from-[#c49e48] hover:to-[#b38e3a] text-[#09090A] font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-[0_4px_18px_rgba(218,178,90,0.3)] transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                                >
                                    <PiHeartFill className="text-base" />
                                    <span>{liked ? "Liked" : liking ? "Liking..." : "Connect Profile"}</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={handleRewind}
                                    disabled={rewinding || (!liked && !passed)}
                                    title="Rewind last action"
                                    className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-white/15 text-neutral-300 flex items-center justify-center hover:border-[#DAB25A]/50 hover:bg-[#DAB25A]/10 hover:text-[#DAB25A] transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                                >
                                    <PiArrowCounterClockwiseBold className="text-lg" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Column (User Details) */}
                    <div className="lg:col-span-7 p-5 sm:p-7 flex flex-col justify-between">
                        <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <div className="inline-flex items-center gap-1 rounded-full border border-[#DAB25A]/30 bg-[#DAB25A]/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#DAB25A]">
                                    <PiSparkleFill className="text-xs" />
                                    <span>{isOwnProfile ? "YOUR PROFILE" : "USER PROFILE"}</span>
                                </div>
                                {hasActiveSubscription && (
                                    <div className="inline-flex items-center gap-1 rounded-full border border-[#DAB25A] bg-[#DAB25A] px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#09090A] shadow-[0_0_12px_rgba(218,178,90,0.3)]">
                                        <PiCrownFill className="text-xs" />
                                        <span>VIP MEMBER</span>
                                    </div>
                                )}
                            </div>

                            <h1 style={displayFont} className="font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                                {user.name || user.fullName},{" "}
                                <span className="font-normal text-[#DAB25A]">{user.age}</span>
                            </h1>

                            {user.bio && (
                                <p className="mt-2 text-neutral-300 text-xs sm:text-sm leading-relaxed border-l-2 border-[#DAB25A]/40 pl-3 py-0.5 italic">
                                    "{user.bio}"
                                </p>
                            )}

                            {/* Info Badges Grid */}
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                                {user.livingIn && (
                                    <div className="p-2.5 sm:p-3 rounded-xl border border-white/10 bg-neutral-900/60 backdrop-blur-sm flex items-center gap-2.5">
                                        <div className="h-8 w-8 rounded-lg bg-[#DAB25A]/10 border border-[#DAB25A]/30 flex items-center justify-center text-[#DAB25A] shrink-0">
                                            <PiMapPinFill size={15} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[9px] uppercase font-bold text-neutral-400 tracking-wider">Location</p>
                                            <p className="text-xs font-semibold text-white mt-0.5 truncate">{user.livingIn}</p>
                                        </div>
                                    </div>
                                )}

                                {user.jobTitle && (
                                    <div className="p-2.5 sm:p-3 rounded-xl border border-white/10 bg-neutral-900/60 backdrop-blur-sm flex items-center gap-2.5">
                                        <div className="h-8 w-8 rounded-lg bg-[#DAB25A]/10 border border-[#DAB25A]/30 flex items-center justify-center text-[#DAB25A] shrink-0">
                                            <PiBriefcaseFill size={15} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[9px] uppercase font-bold text-neutral-400 tracking-wider">Occupation</p>
                                            <p className="text-xs font-semibold text-white mt-0.5 truncate">
                                                {user.jobTitle} {user.company && `at ${user.company}`}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {user.school && (
                                    <div className="p-2.5 sm:p-3 rounded-xl border border-white/10 bg-neutral-900/60 backdrop-blur-sm flex items-center gap-2.5">
                                        <div className="h-8 w-8 rounded-lg bg-[#DAB25A]/10 border border-[#DAB25A]/30 flex items-center justify-center text-[#DAB25A] shrink-0">
                                            <PiGraduationCapFill size={15} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[9px] uppercase font-bold text-neutral-400 tracking-wider">Education</p>
                                            <p className="text-xs font-semibold text-white mt-0.5 truncate">{user.school}</p>
                                        </div>
                                    </div>
                                )}

                                {user.height >= 100 && user.height <= 250 && (
                                    <div className="p-2.5 sm:p-3 rounded-xl border border-white/10 bg-neutral-900/60 backdrop-blur-sm flex items-center gap-2.5">
                                        <div className="h-8 w-8 rounded-lg bg-[#DAB25A]/10 border border-[#DAB25A]/30 flex items-center justify-center text-[#DAB25A] shrink-0">
                                            <PiRulerFill size={15} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[9px] uppercase font-bold text-neutral-400 tracking-wider">Height</p>
                                            <p className="text-xs font-semibold text-white mt-0.5 truncate">{user.height} cm</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Interests Tags */}
                            {cleanInterests(user.interests).length > 0 && (
                                <div className="mt-3.5 sm:mt-4">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#DAB25A] mb-1.5">
                                        Interests & Passions
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {cleanInterests(user.interests).map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full border border-[#DAB25A]/30 bg-[#DAB25A]/10 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#DAB25A]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Lifestyle Tags */}
                            {user.lifestyle?.length > 0 && (
                                <div className="mt-3">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1.5">
                                        Lifestyle Attributes
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {user.lifestyle.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-[11px] font-medium uppercase tracking-wider text-neutral-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Languages */}
                            {user.languages?.length > 0 && (
                                <div className="mt-3 flex items-center gap-2 text-xs text-neutral-400">
                                    <PiTranslateBold className="text-[#DAB25A] text-sm shrink-0" />
                                    <span>Speaks: <strong className="text-white font-semibold">{user.languages.join(", ")}</strong></span>
                                </div>
                            )}

                            {/* Match Preferences (Own Profile) */}
                            {isOwnProfile && (user.agePreference || user.distancePreference) && (
                                <div className="mt-3.5 p-3 rounded-xl border border-white/10 bg-neutral-900/60 flex items-start gap-2.5">
                                    <PiSlidersHorizontalBold className="text-[#DAB25A] text-sm mt-0.5 shrink-0" />
                                    <div className="text-xs text-neutral-300 space-y-0.5">
                                        <p className="font-bold text-white uppercase tracking-wider text-[9px]">Match Preferences</p>
                                        {user.agePreference && (
                                            <p><span className="text-neutral-400">Age Range:</span> {user.agePreference.min} – {user.agePreference.max} years</p>
                                        )}
                                        {typeof user.distancePreference === "number" && (
                                            <p><span className="text-neutral-400">Distance Radius:</span> Within {user.distancePreference} km</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            <AnimatePresence>
                                {errorMsg && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-3 rounded-xl border border-red-500/40 bg-red-500/10 px-3.5 py-2 text-center text-xs font-medium text-red-400"
                                    >
                                        {errorMsg}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Own Profile Delete Option */}
                        {isOwnProfile && (
                            <div className="mt-4 pt-3 sm:pt-4 border-t border-white/10">
                                {!showConfirm ? (
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(true)}
                                        className="py-2 px-4 rounded-full border border-red-500/40 text-red-400 hover:bg-red-500/10 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                                    >
                                        <PiTrashBold className="text-xs" /> Delete Account
                                    </button>
                                ) : (
                                    <div className="p-3 rounded-xl border border-red-500/30 bg-red-500/5 space-y-2">
                                        <p className="text-xs text-neutral-300">
                                            This action cannot be undone. Are you sure you want to permanently delete your account?
                                        </p>
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirm(false)}
                                                className="py-1.5 px-3.5 rounded-full border border-white/20 text-white text-[11px] font-bold uppercase tracking-wider hover:bg-white/10 transition-all active:scale-95 cursor-pointer"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleDeleteAccount}
                                                disabled={deleting}
                                                className="py-1.5 px-3.5 rounded-full bg-red-500 hover:bg-red-600 text-white text-[11px] font-bold uppercase tracking-wider transition-all active:scale-95 disabled:opacity-50 cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                                            >
                                                {deleting ? "Deleting..." : "Confirm Delete"}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}