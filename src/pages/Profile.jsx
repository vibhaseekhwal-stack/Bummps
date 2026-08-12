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
    PiCaretLeftBold,
    PiCaretRightBold,
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
    const [photoDir, setPhotoDir] = useState(1);

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
            setPhotoDir(1);
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
                        className="rounded-full bg-[#DAB25A] hover:bg-[#c49e48] text-black text-xs font-bold uppercase tracking-wider px-6 py-3 transition-all active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(218,178,90,0.3)]"
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
            className="relative min-h-screen bg-[#09090A] text-white pt-24 pb-10 sm:pt-28 sm:pb-16 lg:pt-32 px-4 sm:px-6 lg:px-12 select-none overflow-hidden"
        >
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[90vw] max-w-[1000px] h-[550px] bg-gradient-to-tr from-[#DAB25A]/15 via-[#F3E5AB]/5 to-transparent blur-[180px] rounded-full pointer-events-none" />
            <div className="absolute top-10 left-10 w-80 h-80 bg-[#DAB25A]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#DAB25A]/8 blur-[140px] rounded-full pointer-events-none" />

            <div className="mx-auto max-w-6xl relative z-10">
                <AnimatePresence mode="wait">
                    {accountDeleted && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mb-6 rounded-2xl border border-[#DAB25A]/40 bg-[#DAB25A]/10 px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-[#DAB25A] shadow-[0_0_25px_rgba(218,178,90,0.15)]"
                        >
                            Account deleted successfully. Redirecting to login...
                        </motion.p>
                    )}

                    {likeResult && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mb-6 rounded-2xl border border-[#DAB25A]/40 bg-[#DAB25A]/10 px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-[#DAB25A] shadow-[0_0_25px_rgba(218,178,90,0.15)]"
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
                    className="rounded-[2.5rem] border border-[#DAB25A]/30 bg-gradient-to-b from-neutral-900/90 via-neutral-950/80 to-neutral-950/95 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden grid lg:grid-cols-12 gap-0"
                >
                    <div className="lg:col-span-5 p-6 lg:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 bg-neutral-950/50">
                        <div>
                            <div className="relative h-[320px] sm:h-[420px] lg:h-[460px] w-full rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] group border border-[#DAB25A]/20 bg-neutral-950">
                                <div
                                    className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl opacity-40"
                                    style={{
                                        backgroundImage: `url(${photos[activePhoto] || user.profilePic || user.photo})`,
                                    }}
                                />
                                <AnimatePresence initial={false} custom={photoDir} mode="popLayout">
                                    <motion.img
                                        key={activePhoto}
                                        src={photos[activePhoto] || user.profilePic || user.photo}
                                        alt={user.name || "profile"}
                                        custom={photoDir}
                                        initial={(dir) => ({ opacity: 0, x: dir * 60 })}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={(dir) => ({ opacity: 0, x: dir * -60 })}
                                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                        className="absolute inset-0 h-full w-full object-contain"
                                    />
                                </AnimatePresence>
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent opacity-90 pointer-events-none" />

                                {photos.length > 1 && (
                                    <div className="absolute top-4 left-4 right-4 flex gap-1.5 z-20">
                                        {photos.map((_, i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => {
                                                    setPhotoDir(i > activePhoto ? 1 : -1);
                                                    setActivePhoto(i);
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}

                                {photos.length > 1 && (
                                    <div className="absolute inset-0 flex z-10">
                                        <div
                                            className="w-1/2 h-full cursor-pointer flex items-center justify-start pl-3"
                                            onClick={() => setActivePhoto((p) => (p - 1 + photos.length) % photos.length)}
                                        >
                                            <span className="p-2 rounded-full bg-black/50 text-white/70 opacity-80 hover:opacity-100 hover:bg-[#DAB25A] hover:text-black transition-all duration-300 backdrop-blur-md">
                                                <PiCaretLeftBold size={20} />
                                            </span>
                                        </div>
                                        <div
                                            className="w-1/2 h-full cursor-pointer flex items-center justify-end pr-3"
                                            onClick={() => setActivePhoto((p) => (p + 1) % photos.length)}
                                        >
                                            <span className="p-2 rounded-full bg-black/50 text-white/70 opacity-80 hover:opacity-100 hover:bg-[#DAB25A] hover:text-black transition-all duration-300 backdrop-blur-md">
                                                <PiCaretRightBold size={20} />
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {user.isVerified && (
                                    <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-neutral-950/80 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#DAB25A] border border-[#DAB25A]/30 shadow-lg">
                                        <PiSealCheckFill className="text-base" /> Verified
                                    </div>
                                )}
                            </div>

                            {photos.length > 1 && (
                                <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
                                    {photos.map((img, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setActivePhoto(i)}
                                            className={`h-16 w-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${i === activePhoto ? "border-[#DAB25A] scale-105 shadow-[0_0_10px_rgba(218,178,90,0.3)]" : "border-transparent opacity-50 hover:opacity-100"
                                                }`}
                                        >
                                            <img src={img} alt="thumbnail" className="h-full w-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {!isOwnProfile && (
                            <div className="mt-6 flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={handlePass}
                                    disabled={passing || liking || liked || passed}
                                    title="Pass"
                                    className="h-12 w-12 rounded-full border border-white/15 text-neutral-300 flex items-center justify-center hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                                >
                                    <PiXBold className="text-xl" />
                                </button>

                                <button
                                    type="button"
                                    onClick={handleLike}
                                    disabled={liking || liked || passed}
                                    className="flex-1 h-12 rounded-full bg-[#DAB25A] hover:bg-[#c49e48] text-black font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(218,178,90,0.35)] transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                                >
                                    <PiHeartFill className="text-lg" />
                                    <span>{liked ? "Liked" : liking ? "Liking..." : "Connect Profile"}</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={handleRewind}
                                    disabled={rewinding || (!liked && !passed)}
                                    title="Rewind last action"
                                    className="h-12 w-12 rounded-full border border-white/15 text-neutral-300 flex items-center justify-center hover:border-[#DAB25A]/50 hover:bg-[#DAB25A]/10 hover:text-[#DAB25A] transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                                >
                                    <PiArrowCounterClockwiseBold className="text-xl" />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#DAB25A]/30 bg-[#DAB25A]/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-[#DAB25A]">
                                    <PiSparkleFill className="text-xs" />
                                    <span>{isOwnProfile ? "YOUR PROFILE" : "USER PROFILE"}</span>
                                </div>
                                {hasActiveSubscription && (
                                    <div className="inline-flex items-center gap-1.5 rounded-full border border-[#DAB25A] bg-[#DAB25A] px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-black">
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
                                <p className="mt-3 text-neutral-300 text-sm leading-relaxed border-l-2 border-[#DAB25A]/40 pl-4 py-0.5 italic">
                                    "{user.bio}"
                                </p>
                            )}

                            <div className="mt-8 grid sm:grid-cols-2 gap-3.5">
                                {user.livingIn && (
                                    <div className="p-3.5 rounded-2xl border border-white/10 bg-neutral-950/80 flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-xl bg-[#DAB25A]/10 border border-[#DAB25A]/30 flex items-center justify-center text-[#DAB25A] shrink-0">
                                            <PiMapPinFill size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Location</p>
                                            <p className="text-xs font-semibold text-white mt-0.5">{user.livingIn}</p>
                                        </div>
                                    </div>
                                )}

                                {user.jobTitle && (
                                    <div className="p-3.5 rounded-2xl border border-white/10 bg-neutral-950/80 flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-xl bg-[#DAB25A]/10 border border-[#DAB25A]/30 flex items-center justify-center text-[#DAB25A] shrink-0">
                                            <PiBriefcaseFill size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Occupation</p>
                                            <p className="text-xs font-semibold text-white mt-0.5">
                                                {user.jobTitle} {user.company && `at ${user.company}`}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {user.school && (
                                    <div className="p-3.5 rounded-2xl border border-white/10 bg-neutral-950/80 flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-xl bg-[#DAB25A]/10 border border-[#DAB25A]/30 flex items-center justify-center text-[#DAB25A] shrink-0">
                                            <PiGraduationCapFill size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Education</p>
                                            <p className="text-xs font-semibold text-white mt-0.5">{user.school}</p>
                                        </div>
                                    </div>
                                )}

                                {user.height >= 100 && user.height <= 250 && (
                                    <div className="p-3.5 rounded-2xl border border-white/10 bg-neutral-950/80 flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-xl bg-[#DAB25A]/10 border border-[#DAB25A]/30 flex items-center justify-center text-[#DAB25A] shrink-0">
                                            <PiRulerFill size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Height</p>
                                            <p className="text-xs font-semibold text-white mt-0.5">{user.height} cm</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {cleanInterests(user.interests).length > 0 && (
                                <div className="mt-6">
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#DAB25A] mb-2.5">
                                        Interests & Passions
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {cleanInterests(user.interests).map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full border border-[#DAB25A]/30 bg-[#DAB25A]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#DAB25A]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {user.lifestyle?.length > 0 && (
                                <div className="mt-5">
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-2.5">
                                        Lifestyle Attributes
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {user.lifestyle.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-neutral-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {user.languages?.length > 0 && (
                                <div className="mt-5 flex items-center gap-2 text-xs text-neutral-400">
                                    <PiTranslateBold className="text-[#DAB25A] text-base shrink-0" />
                                    <span>Speaks: <strong className="text-white font-semibold">{user.languages.join(", ")}</strong></span>
                                </div>
                            )}

                            {isOwnProfile && (user.agePreference || user.distancePreference) && (
                                <div className="mt-6 p-4 rounded-2xl border border-white/10 bg-neutral-950/80 flex items-start gap-3">
                                    <PiSlidersHorizontalBold className="text-[#DAB25A] text-lg mt-0.5 shrink-0" />
                                    <div className="text-xs text-neutral-300 space-y-1">
                                        <p className="font-bold text-white uppercase tracking-wider text-[10px]">Match Preferences</p>
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
                                        className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-center text-xs font-medium text-red-400"
                                    >
                                        {errorMsg}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {isOwnProfile && (
                            <div className="mt-8 pt-6 border-t border-white/10">
                                {!showConfirm ? (
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(true)}
                                        className="py-3 px-6 rounded-full border border-red-500/40 text-red-400 hover:bg-red-500/10 font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                                    >
                                        <PiTrashBold className="text-sm" /> Delete Account
                                    </button>
                                ) : (
                                    <div className="p-4 rounded-2xl border border-red-500/30 bg-red-500/5 space-y-3">
                                        <p className="text-xs text-neutral-300">
                                            This action cannot be undone. Are you sure you want to permanently delete your account?
                                        </p>
                                        <div className="flex gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirm(false)}
                                                className="py-2.5 px-5 rounded-full border border-white/20 text-white font-bold uppercase tracking-wider text-[11px] hover:bg-white/10 transition-all cursor-pointer"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleDeleteAccount}
                                                disabled={deleting}
                                                className="py-2.5 px-5 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold uppercase tracking-wider text-[11px] transition-all cursor-pointer disabled:opacity-50"
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