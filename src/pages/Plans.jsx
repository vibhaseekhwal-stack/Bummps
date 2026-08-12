import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PiSparkleFill, PiCheckBold } from "react-icons/pi";
import { getAllPlans, subscribePlan } from "../services/Apis/Plans";

export default function Plans() {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subscribingId, setSubscribingId] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        loadPlans();
    }, []);

    useEffect(() => {
        if (!successMsg) return;
        const t = setTimeout(() => setSuccessMsg(""), 2500);
        return () => clearTimeout(t);
    }, [successMsg]);

    const loadPlans = async () => {
        setLoading(true);
        setErrorMsg("");
        try {
            const data = await getAllPlans(); // ✅ service already returns res.data

            // ✅ FIX: defensive unwrapping (pehle data.data?.plans galat tha)
            if (Array.isArray(data)) {
                setPlans(data);
            } else if (Array.isArray(data?.plans)) {
                setPlans(data.plans);
            } else if (Array.isArray(data?.data)) {
                setPlans(data.data);
            } else {
                setPlans([]);
            }
        } catch (err) {
            setErrorMsg(err.response?.data?.message || "Could not load plans.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubscribe = async (planId) => {
        setSubscribingId(planId);
        setErrorMsg("");
        try {
            await subscribePlan(planId);
            setSuccessMsg("Subscribed successfully! 🎉");
        } catch (err) {
            setErrorMsg(err.response?.data?.message || "Subscription failed. Try again.");
        } finally {
            setSubscribingId(null);
        }
    };

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#000000] text-white flex flex-col items-center px-4 py-16 sm:py-20">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -left-24 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-[#DAB25A]/10 blur-3xl animate-pulse" />
                <div className="absolute top-40 -right-20 h-80 w-80 sm:h-96 sm:w-96 rounded-full bg-[#DAB25A]/15 blur-3xl animate-pulse [animation-delay:2s]" />
            </div>

            <div className="relative flex justify-center mb-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#DAB25A]/40 bg-[#DAB25A]/10 px-3.5 py-1.5 text-xs font-bold text-[#DAB25A]">
                    <PiSparkleFill className="shrink-0" />
                    <span>GO PREMIUM</span>
                </div>
            </div>
            <h1 className="relative font-bold text-2xl sm:text-3xl text-white tracking-tight text-center">
                Choose Your <span className="text-[#DAB25A] italic">Plan</span>
            </h1>
            <p className="relative mt-2 text-sm text-gray-400 text-center max-w-md">
                Unlock more matches, likes, and features with Bummps premium plans.
            </p>

            {successMsg && (
                <p className="relative mt-4 w-full max-w-md rounded-xl border border-[#DAB25A]/40 bg-[#DAB25A]/10 px-4 py-2.5 text-center text-sm text-[#DAB25A]">
                    {successMsg}
                </p>
            )}

            {errorMsg && (
                <p className="relative mt-4 w-full max-w-md rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-center text-sm text-red-400">
                    {errorMsg}
                </p>
            )}

            <div className="relative mt-10 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <p className="col-span-full text-center text-gray-400">Loading plans...</p>
                ) : plans.length === 0 ? (
                    <p className="col-span-full text-center text-gray-400">No plans available right now.</p>
                ) : (
                    plans.map((plan, i) => (
                        <motion.div
                            key={plan._id}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="rounded-[2rem] border-2 border-[#DAB25A]/40 bg-neutral-950/90 backdrop-blur-md shadow-[0_0_35px_rgba(218,178,90,0.15)] px-7 py-8 flex flex-col"
                        >
                            <h3 className="font-bold text-xl text-white">{plan.name}</h3>
                            <p className="mt-2 text-3xl font-bold text-[#DAB25A]">
                                ₹{plan.price}
                                <span className="text-sm font-normal text-gray-400">
                                    /{plan.duration || "mo"}
                                </span>
                            </p>
                            {plan.description && (
                                <p className="mt-2 text-sm text-gray-400">{plan.description}</p>
                            )}

                            {plan.features?.length > 0 && (
                                <ul className="mt-5 flex flex-col gap-2 flex-1">
                                    {plan.features.map((f) => (
                                        <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                                            <PiCheckBold className="text-[#DAB25A] shrink-0" /> {f}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <button
                                onClick={() => handleSubscribe(plan._id)}
                                disabled={subscribingId === plan._id}
                                className="mt-6 w-full rounded-full bg-[#DAB25A] hover:bg-[#c99f47] text-black font-bold py-3 transition-all active:scale-95 disabled:opacity-60"
                            >
                                {subscribingId === plan._id ? "Subscribing..." : "Subscribe"}
                            </button>
                        </motion.div>
                    ))
                )}
            </div>
        </section>
    );
}