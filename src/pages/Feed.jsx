import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    PiHeartFill,
    PiXBold,
    PiMapPinBold,
    PiBriefcaseBold,
    PiArrowCounterClockwiseBold,
    PiGlobeHemisphereWestFill,
    PiSparkleFill,
} from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
import {
    getFeed,
    likeUser,
    passUser,
    rewindLastAction,
    extractList,
    cleanInterests
} from "../services/Apis/Users";

export default function Feed() {
    const [users, setUsers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lastActionUser, setLastActionUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [actionLoading, setActionLoading] = useState(false);
    const [exitDir, setExitDir] = useState(1);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.filteredUsers) {
            setUsers(location.state.filteredUsers);
            setCurrentIndex(0);
            setLoading(false);
        } else {
            loadFeed();
        }
    }, [location.state]);

    useEffect(() => {
        if (!successMsg) return;
        const t = setTimeout(() => setSuccessMsg(""), 3000);
        return () => clearTimeout(t);
    }, [successMsg]);

    const loadFeed = async () => {
        setLoading(true);
        setErrorMsg("");
        try {
            const data = await getFeed();
            setUsers(extractList(data));
            setCurrentIndex(0);
            setLastActionUser(null);
        } catch (err) {
            setErrorMsg(err.response?.data?.message || "Could not load feed.");
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async (likedUser) => {
        if (!likedUser?._id || actionLoading) return;
        setActionLoading(true);
        setExitDir(1);
        try {
            const data = await likeUser(likedUser._id);
            const name = likedUser.name || likedUser.fullName;
            if (data?.isMatch) setSuccessMsg(`It's a Match! You and ${name} liked each other`);
            setLastActionUser(likedUser);
            setCurrentIndex((prev) => prev + 1);
        } catch (err) {
            setErrorMsg(err.response?.data?.message || "Could not like this profile.");
        } finally {
            setActionLoading(false);
        }
    };

    const handlePass = async (passedUser) => {
        if (!passedUser?._id || actionLoading) return;
        setActionLoading(true);
        setExitDir(-1);
        try {
            await passUser(passedUser._id);
            setLastActionUser(passedUser);
            setCurrentIndex((prev) => prev + 1);
        } catch (err) {
            setErrorMsg(err.response?.data?.message || "Could not pass profile.");
        } finally {
            setActionLoading(false);
        }
    };

    const handleRewind = async () => {
        if (actionLoading) return;

        const targetUser = lastActionUser || users[currentIndex - 1];

        if (!targetUser?._id) {
            setErrorMsg("No previous profile to rewind.");
            return;
        }

        setActionLoading(true);
        try {
            await rewindLastAction(targetUser._id);
            setSuccessMsg("Rewound last action!");
            if (currentIndex > 0) {
                setCurrentIndex((prev) => prev - 1);
            } else {
                loadFeed();
            }
        } catch (err) {
            setErrorMsg(err.response?.data?.message || "Could not rewind last action.");
        } finally {
            setActionLoading(false);
        }
    };

    const goToProfile = (user) => navigate("/profile", { state: { user } });

    const currentUser = users[currentIndex];

    return (
        <section className="relative min-h-screen w-full bg-[#121214] text-white flex flex-col items-center justify-between px-4 pt-24 pb-8 sm:pt-28 sm:pb-10 font-['Plus_Jakarta_Sans',sans-serif] overflow-hidden select-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[350px] bg-gradient-to-tr from-[#DAB25A]/15 via-[#F3E5AB]/5 to-transparent blur-[160px] rounded-full pointer-events-none z-0" />

            <AnimatePresence>
                {successMsg && (
                    <motion.div
                        initial={{ y: -40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="fixed top-24 z-50 bg-[#DAB25A] text-black px-6 py-2.5 rounded-full font-bold shadow-[0_4px_25px_rgba(218,178,90,0.3)] text-xs sm:text-sm text-center max-w-[90vw]"
                    >
                        {successMsg}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {errorMsg && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-24 z-50 w-full max-w-xs sm:max-w-sm rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-2 text-center text-xs text-red-400 backdrop-blur-md"
                    >
                        {errorMsg}
                    </motion.p>
                )}
            </AnimatePresence>

            <div className="relative z-10 w-full max-w-xs sm:max-w-sm lg:max-w-md flex-1 flex items-center justify-center my-auto">
                {loading ? (
                    <div className="w-full h-[520px] sm:h-[580px] rounded-3xl border border-[#DAB25A]/20 bg-neutral-900/60 animate-pulse" />
                ) : currentUser ? (
                    <AnimatePresence mode="wait" custom={exitDir}>
                        <motion.div
                            key={currentUser._id}
                            custom={exitDir}
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={(dir) => ({ opacity: 0, x: dir * 250, rotate: dir * 10, transition: { duration: 0.3 } })}
                            className="relative w-full h-[520px] sm:h-[580px] rounded-3xl border border-[#DAB25A]/20 bg-neutral-900/40 backdrop-blur-xl shadow-2xl flex flex-col justify-between overflow-hidden"
                        >
                            <div
                                className="relative flex-1 w-full overflow-hidden cursor-pointer group"
                                onClick={() => goToProfile(currentUser)}
                            >
                                <img
                                    src={currentUser.profilePic || currentUser.photo}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    alt="profile"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-transparent" />

                                <div className="absolute top-4 left-4">
                                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-[#DAB25A] bg-[#DAB25A]/10 border border-[#DAB25A]/30 backdrop-blur-md px-3 py-1 rounded-full uppercase shadow-[0_0_15px_rgba(218,178,90,0.15)]">
                                        <PiSparkleFill className="text-xs" /> Exclusive
                                    </span>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                                    <h2 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold flex items-baseline gap-2 leading-tight">
                                        {currentUser.name || currentUser.fullName}
                                        <span className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-light text-neutral-400">
                                            {currentUser.age}
                                        </span>
                                    </h2>

                                    <div className="flex flex-col gap-1 mt-2">
                                        {currentUser.livingIn && (
                                            <span className="flex items-center gap-2 text-xs text-neutral-300">
                                                <PiMapPinBold className="text-[#DAB25A] shrink-0" /> {currentUser.livingIn}
                                            </span>
                                        )}
                                        {currentUser.jobTitle && (
                                            <span className="flex items-center gap-2 text-xs text-neutral-300">
                                                <PiBriefcaseBold className="text-[#DAB25A] shrink-0" /> {currentUser.jobTitle}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                        {cleanInterests(currentUser.interests).slice(0, 3).map((item, idx) => (
                                            <span key={idx} className="bg-neutral-900/80 border border-[#DAB25A]/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider text-[#DAB25A]">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-neutral-950/80 border-t border-[#DAB25A]/10 flex items-center justify-center gap-6 shrink-0">
                                <button
                                    onClick={handleRewind}
                                    disabled={actionLoading}
                                    title="Rewind Last Action"
                                    className="w-12 h-12 rounded-2xl bg-neutral-900/60 border border-[#DAB25A]/20 text-neutral-400 flex items-center justify-center hover:text-white hover:border-[#DAB25A]/50 transition-all disabled:opacity-50 cursor-pointer shadow-md"
                                >
                                    <PiArrowCounterClockwiseBold size={20} />
                                </button>

                                <button
                                    onClick={() => handlePass(currentUser)}
                                    disabled={actionLoading}
                                    title="Pass User"
                                    className="w-14 h-14 rounded-2xl bg-neutral-900/60 border border-red-500/30 text-red-400 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500 transition-all disabled:opacity-50 cursor-pointer shadow-md"
                                >
                                    <PiXBold size={22} />
                                </button>

                                <button
                                    onClick={() => handleLike(currentUser)}
                                    disabled={actionLoading}
                                    title="Like User"
                                    className="w-16 h-16 rounded-full bg-[#DAB25A] hover:bg-[#c49e48] text-black flex items-center justify-center shadow-[0_4px_25px_rgba(218,178,90,0.3)] transition-all duration-300 active:scale-95 disabled:opacity-60 cursor-pointer"
                                >
                                    <PiHeartFill size={30} />
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center text-center px-4 py-8"
                    >
                        <div className="relative mb-8">
                            {[1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0.5, opacity: 0.8 }}
                                    animate={{ scale: 2, opacity: 0 }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        delay: i * 0.7,
                                        ease: "easeOut"
                                    }}
                                    className="absolute inset-0 border border-[#DAB25A]/30 rounded-full"
                                />
                            ))}

                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                className="relative z-10 w-20 h-20 rounded-full bg-[#DAB25A] flex items-center justify-center shadow-[0_4px_25px_rgba(218,178,90,0.3)] text-black"
                            >
                                <PiGlobeHemisphereWestFill size={38} />
                            </motion.div>
                        </div>

                        <h3 className="font-['Playfair_Display',serif] text-2xl font-bold text-white mb-2">
                            Discovering New Souls
                        </h3>
                        <p className="text-neutral-400 text-xs sm:text-sm max-w-xs mb-6 leading-relaxed">
                            You've seen everyone nearby. We're polishing more profiles for you!
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={loadFeed}
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#DAB25A] hover:bg-[#c49e48] text-black font-bold uppercase tracking-wider text-xs shadow-[0_4px_25px_rgba(218,178,90,0.3)] transition-all duration-300 cursor-pointer"
                        >
                            <PiArrowCounterClockwiseBold size={16} /> Refresh Radar
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}