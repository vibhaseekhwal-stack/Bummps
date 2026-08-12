import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    PiHeartFill,
    PiMapPinFill,
    PiMagnifyingGlassBold,
    PiSealCheckFill,
    PiSmileySadFill,
    PiPlusBold,
    PiMinusBold,
    PiSparkleFill,
    PiSlidersHorizontalBold,
} from "react-icons/pi";
import { filterMatches, likeUser, extractList, extractMeta, cleanInterests } from "../services/Apis/Users";

const displayFont = { fontFamily: "'Playfair Display', Georgia, serif" };
const bodyFont = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };

const inputStyle =
    "w-full rounded-xl border border-white/10 bg-neutral-950/80 py-3 px-3.5 text-xs text-white placeholder:text-neutral-500 focus:border-[#DAB25A] focus:outline-none focus:ring-1 focus:ring-[#DAB25A] focus:shadow-[0_0_15px_rgba(218,178,90,0.15)] transition-all duration-300";

const Stepper = ({ label, value, onChange, min = 0, max = 120, step = 1, unit }) => {
    const move = (dir) => {
        const next = Number(value) + dir * step;
        if (next < min || next > max) return;
        onChange(next);
    };

    return (
        <div className="relative rounded-xl border border-white/10 bg-neutral-950/80 px-3.5 py-3 flex items-center justify-between gap-2 transition-all duration-300 focus-within:border-[#DAB25A] focus-within:ring-1 focus-within:ring-[#DAB25A]">
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#DAB25A] absolute -top-2 left-3 bg-[#09090A] px-1.5 rounded">
                {label}
            </span>

            <motion.button
                type="button"
                onClick={() => move(-1)}
                whileTap={{ scale: 0.85 }}
                className="h-8 w-8 shrink-0 flex items-center justify-center rounded-full border border-[#DAB25A]/30 text-[#DAB25A] bg-[#DAB25A]/10 hover:bg-[#DAB25A]/20 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                disabled={Number(value) <= min}
            >
                <PiMinusBold size={11} />
            </motion.button>

            <motion.span
                key={value}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white font-semibold text-xs tabular-nums min-w-[3ch] text-center"
            >
                {value}
                {unit && <span className="text-neutral-400 text-[10px] ml-0.5">{unit}</span>}
            </motion.span>

            <motion.button
                type="button"
                onClick={() => move(1)}
                whileTap={{ scale: 0.85 }}
                className="h-8 w-8 shrink-0 flex items-center justify-center rounded-full border border-[#DAB25A]/30 text-[#DAB25A] bg-[#DAB25A]/10 hover:bg-[#DAB25A]/20 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                disabled={Number(value) >= max}
            >
                <PiPlusBold size={11} />
            </motion.button>
        </div>
    );
};

const Filter = () => {
    const [form, setForm] = useState({
        gender: "male",
        minAge: 18,
        maxAge: 30,
        minHeight: 150,
        maxHeight: 200,
        interests: "",
        isVerified: false,
    });

    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleRangeStep = (minKey, maxKey, name, value) => {
        setForm((prev) => {
            const updated = { ...prev, [name]: value };
            if (name === minKey && value > prev[maxKey]) updated[maxKey] = value;
            if (name === maxKey && value < prev[minKey]) updated[minKey] = value;
            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSearched(true);
        setErrorMsg("");

        const payload = {
            page: 1,
            limit: 10,
            gender: form.gender,
            minAge: Number(form.minAge),
            maxAge: Number(form.maxAge),
            minHeight: Number(form.minHeight),
            maxHeight: Number(form.maxHeight),
            interests: form.interests
                .split(",")
                .map((i) => i.trim())
                .filter(Boolean),
            isVerified: form.isVerified,
        };

        try {
            const data = await filterMatches(payload);
            setUsers(extractList(data));
            setTotal(extractMeta(data).total);
        } catch (error) {
            setErrorMsg(error.response?.data?.message || "Could not apply filters.");
            setUsers([]);
            setTotal(0);
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async (id) => {
        try {
            await likeUser(id);
            setUsers((prev) => prev.filter((user) => user._id !== id));
        } catch (error) {
            setErrorMsg(error.response?.data?.message || "Could not like this profile.");
        }
    };

    return (
        <section
            style={bodyFont}
            className="relative min-h-screen pt-28 pb-16 sm:pt-36 sm:pb-24 bg-[#09090A] text-white overflow-hidden select-none"
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[750px] h-[450px] bg-gradient-to-tr from-[#DAB25A]/15 via-[#F3E5AB]/5 to-transparent blur-[160px] rounded-full pointer-events-none" />

            <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
                <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] text-[#DAB25A] uppercase bg-[#DAB25A]/10 border border-[#DAB25A]/30 px-3.5 py-1 rounded-full mb-3 shadow-md"
                    >
                        <PiSparkleFill className="text-xs text-[#DAB25A]" /> Precision Search
                    </motion.div>

                    <h1 style={displayFont} className="font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
                        Refine Your{" "}
                        <span className="italic font-normal text-[#DAB25A] bg-gradient-to-r from-[#DAB25A] via-[#F3E5AB] to-[#DAB25A] bg-clip-text text-transparent">
                            Search.
                        </span>
                    </h1>
                    <p className="mt-2 text-neutral-400 text-xs sm:text-sm leading-relaxed">
                        Customize options to discover your ideal connection on Bummps.
                    </p>
                </div>

                <AnimatePresence>
                    {errorMsg && (
                        <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-center text-xs font-medium text-red-400 backdrop-blur-md"
                        >
                            {errorMsg}
                        </motion.p>
                    )}
                </AnimatePresence>

                <motion.form
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={handleSubmit}
                    className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-neutral-900/80 via-neutral-900/50 to-neutral-950/90 border border-[#DAB25A]/20 backdrop-blur-2xl shadow-2xl space-y-5 mb-12 max-w-4xl mx-auto lg:max-w-none"
                >
                    <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                        <PiSlidersHorizontalBold className="text-[#DAB25A] text-sm" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#DAB25A]">
                            Filter Options
                        </span>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-300 block mb-1.5">
                                Target Gender
                            </label>
                            <select name="gender" value={form.gender} onChange={handleChange} className={inputStyle}>
                                <option value="male" className="bg-neutral-950 text-white">Male</option>
                                <option value="female" className="bg-neutral-950 text-white">Female</option>
                            </select>
                        </div>

                        <div className="flex items-end lg:col-span-1">
                            <label className="w-full flex items-center gap-2.5 text-xs font-medium text-neutral-300 py-3 px-3.5 rounded-xl border border-white/10 bg-neutral-950/80 hover:border-[#DAB25A]/40 transition-all duration-300 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    name="isVerified"
                                    checked={form.isVerified}
                                    onChange={handleChange}
                                    className="accent-[#DAB25A] h-3.5 w-3.5 rounded cursor-pointer"
                                />
                                <span className="text-xs text-neutral-300 flex items-center gap-1.5">
                                    <PiSealCheckFill className="text-[#DAB25A]" /> Verified Profiles Only
                                </span>
                            </label>
                        </div>

                        <div className="sm:col-span-2 lg:col-span-2">
                            <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-300 block mb-1.5">
                                Interests & Keywords
                            </label>
                            <input
                                name="interests"
                                value={form.interests}
                                onChange={handleChange}
                                placeholder="e.g. Travel, Music, Fitness..."
                                className={inputStyle}
                            />
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
                        <Stepper
                            label="Min Age"
                            value={form.minAge}
                            onChange={(val) => handleRangeStep("minAge", "maxAge", "minAge", val)}
                            min={18}
                            max={99}
                        />
                        <Stepper
                            label="Max Age"
                            value={form.maxAge}
                            onChange={(val) => handleRangeStep("minAge", "maxAge", "maxAge", val)}
                            min={18}
                            max={99}
                        />
                        <Stepper
                            label="Min Height"
                            value={form.minHeight}
                            onChange={(val) => handleRangeStep("minHeight", "maxHeight", "minHeight", val)}
                            min={120}
                            max={220}
                            unit="cm"
                        />
                        <Stepper
                            label="Max Height"
                            value={form.maxHeight}
                            onChange={(val) => handleRangeStep("minHeight", "maxHeight", "maxHeight", val)}
                            min={120}
                            max={220}
                            unit="cm"
                        />
                    </div>

                    <div className="pt-2 flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-auto sm:min-w-[240px] flex py-3 px-8 rounded-full font-bold uppercase tracking-wider text-xs bg-[#DAB25A] hover:bg-[#c49e48] text-black shadow-lg shadow-[#DAB25A]/15 transition-all duration-300 active:scale-95 cursor-pointer items-center justify-center gap-2 disabled:opacity-60"
                        >
                            {loading ? (
                                <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                    className="h-3.5 w-3.5 border-2 border-black border-t-transparent rounded-full"
                                />
                            ) : (
                                <PiMagnifyingGlassBold className="text-sm" />
                            )}
                            <span>{loading ? "Searching..." : "Apply Filters"}</span>
                        </button>
                    </div>
                </motion.form>

                {searched && !loading && users.length > 0 && (
                    <p className="text-center text-xs text-neutral-400 mb-6 uppercase tracking-wider font-medium">
                        {total} {total === 1 ? "profile" : "profiles"} found
                    </p>
                )}

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading &&
                        Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={`skeleton-${i}`}
                                className="rounded-[2rem] p-4 bg-neutral-900/60 border border-white/5 space-y-4 animate-pulse"
                            >
                                <div className="h-80 sm:h-96 w-full rounded-2xl bg-neutral-800/50" />
                                <div className="h-3 w-1/2 rounded bg-neutral-800/50" />
                                <div className="h-10 w-full rounded-full bg-neutral-800/50" />
                            </div>
                        ))}

                    <AnimatePresence mode="popLayout">
                        {!loading &&
                            users.map((user, i) => (
                                <motion.div
                                    key={user._id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.35, delay: i * 0.04 }}
                                    className="group rounded-[2rem] p-4 bg-gradient-to-b from-neutral-900/90 to-neutral-950 border border-[#DAB25A]/20 shadow-2xl flex flex-col justify-between hover:border-[#DAB25A]/60 hover:shadow-[0_10px_30px_rgba(218,178,90,0.15)] transition-all duration-500"
                                >
                                    <div>
                                        <div className="relative h-80 sm:h-96 w-full overflow-hidden rounded-2xl">
                                            <img
                                                src={user.profilePic || user.photo || "https://via.placeholder.com/400"}
                                                alt={user.name}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-90" />

                                            {user.isVerified && (
                                                <span className="absolute top-3 right-3 flex items-center gap-1 bg-neutral-950/80 border border-[#DAB25A]/40 text-[#DAB25A] text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md shadow-md">
                                                    <PiSealCheckFill className="text-xs" /> Verified
                                                </span>
                                            )}

                                            <div className="absolute bottom-3.5 left-4 right-4 text-white">
                                                <p style={displayFont} className="text-xl font-bold leading-tight">
                                                    {user.name || user.fullName},{" "}
                                                    <span className="font-normal text-[#DAB25A]">{user.age}</span>
                                                </p>
                                                {user.livingIn && (
                                                    <p className="text-[11px] text-neutral-300 flex items-center gap-1.5 mt-1">
                                                        <PiMapPinFill className="text-[#DAB25A] shrink-0" /> {user.livingIn}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-3.5 flex flex-wrap gap-1.5 min-h-[1.75rem]">
                                            {cleanInterests(user.interests).slice(0, 3).map((item, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-[#DAB25A]/10 border border-[#DAB25A]/25 text-[#DAB25A] px-2.5 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleLike(user._id)}
                                        className="mt-4 w-full py-3 rounded-full font-bold uppercase tracking-wider text-xs bg-[#DAB25A] hover:bg-[#c49e48] text-black shadow-md transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                                    >
                                        <PiHeartFill className="text-sm" /> Connect
                                    </button>
                                </motion.div>
                            ))}
                    </AnimatePresence>

                    {searched && !loading && users.length === 0 && !errorMsg && (
                        <div className="col-span-full flex flex-col items-center justify-center gap-2 text-neutral-400 py-16 text-center">
                            <PiSmileySadFill className="text-4xl text-[#DAB25A]" />
                            <p className="text-xs font-semibold tracking-wider uppercase text-white">
                                No profiles matched your search
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Filter;