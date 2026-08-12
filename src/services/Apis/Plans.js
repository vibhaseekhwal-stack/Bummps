import api from "../Interceptor/api";

export const getPlans = async () => {
  const res = await api.get("/plans/allplans");
  return res.data;
};

// Alias so existing imports of `getAllPlans` (e.g. in Plans.jsx) keep working
export const getAllPlans = getPlans;

export const subscribePlan = async (planId, billingCycle) => {
  const res = await api.post("/plans/subscribe", {
    planId,
    billingCycle,
  });
  return res.data;
};

export const getMySubscription = async () => {
  const res = await api.get("/plans/my-subscription");
  return res.data;
};