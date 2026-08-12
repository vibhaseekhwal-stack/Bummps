import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PiMapPinFill, PiChatCircleFill, PiHeartBreakFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { getMyMatches, extractList, extractMeta } from "../services/Apis/Users";

export default function Matches() {
    const [matches, setMatches] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        loadMatches();
    }, []);

    const loadMatches = async () => {
        setLoading(true);
        setErrorMsg("");
        try {
            const data = await getMyMatches();
            setMatches(extractList(data, ["matches", "data"]));
            setTotal(extractMeta(data).total);
        } catch (err) {
            setErrorMsg(err.response?.data?.message || "Could not load your matches.");
        } finally {
            setLoading(false);
        }
    };

    const goToProfile = (user) => navigate("/profile", { state: { user } });

    const goToChat = (e, match) => {
        e.stopPropagation();
        navigate("/chat", { state: { targetUser: match } });
    };

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#000000] text-white px-4 py-16 sm:py-20">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -left-24 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-[#DAB25A]/10 blur-3xl animate-pulse" />
                <div className="absolute top-40 -right-20 h-80 w-80 sm:h-96 sm:w-96 rounded-full bg-[#DAB25A]/15 blur-3xl animate-pulse [animation-delay:2s]" />
            </div>

            <div className="relative max-w-7xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-white text-center tracking-tight mb-2">
                    Your <span className="text-[#DAB25A]">Matches</span>
                </h1>
                <p className="text-center text-sm text-gray-400 mb-10">
                    {total > 0 ? `${total} ${total === 1 ? "person" : "people"} liked you back` : "People who liked you back"}
                </p>

                {errorMsg && (
                    <p className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-center text-sm text-red-400">
                        {errorMsg}
                    </p>
                )}

                {loading ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={`skeleton-${i}`}
                                className="rounded-4xl h-72 bg-neutral-950/80 border border-white/5 animate-pulse"
                            />
                        ))}
                    </div>
                ) : matches.length === 0 ? (
                    <div className="flex flex-col items-center gap-4 py-16 text-center">
                        <PiHeartBreakFill className="text-4xl text-[#DAB25A]/60" />
                        <p className="text-gray-400">No matches yet. Keep swiping!</p>
                        <button
                            onClick={() => navigate("/feed")}
                            className="rounded-full bg-[#DAB25A] hover:bg-[#c99f47] text-black font-bold px-6 py-3 transition-all active:scale-95 cursor-pointer"
                        >
                            Go to Feed
                        </button>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {matches.map((match, i) => (
                            <motion.div
                                key={match._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                                whileHover={{ y: -6 }}
                                className="rounded-4xl overflow-hidden border border-[#DAB25A]/20 bg-neutral-950/80 backdrop-blur-md shadow-xl cursor-pointer"
                                onClick={() => goToProfile(match)}
                            >
                                <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                                    <img
                                        src={match.profilePic || "https://via.placeholder.com/400"}
                                        alt={match.name || match.fullName}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent" />
                                    <div className="absolute bottom-4 left-5 right-5 text-white">
                                        <p className="text-lg font-bold">
                                            {match.name || match.fullName}
                                            {match.age && `, ${match.age}`}
                                        </p>
                                        {match.livingIn && (
                                            <p className="text-xs text-gray-300 flex items-center gap-1 mt-1">
                                                <PiMapPinFill className="text-[#DAB25A]" /> {match.livingIn}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="p-5">
                                    <button
                                        onClick={(e) => goToChat(e, match)}
                                        className="w-full flex items-center justify-center gap-2 bg-[#DAB25A] hover:bg-[#c99f47] text-black font-bold uppercase tracking-wider text-sm py-3 rounded-full shadow-md transition-all active:scale-95 cursor-pointer"
                                    >
                                        <PiChatCircleFill /> Message
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}