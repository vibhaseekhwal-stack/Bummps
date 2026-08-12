import api from "../Interceptor/api";

export const extractList = (data, keys = ["profiles"]) => {
  if (Array.isArray(data)) return data;

  for (const key of keys) {
    if (Array.isArray(data?.[key])) return data[key];
  }

  return [];
};

export const extractMeta = (data) => ({
  page: data?.page ?? 1,
  totalPages: data?.totalPages ?? 1,
  total: data?.totalProfiles ?? data?.count ?? 0,
});

export const cleanInterests = (interests) => {
  if (!Array.isArray(interests)) return [];

  const cleaned = interests
    .map((i) => String(i).replace(/[\[\]"]/g, "").trim())
    .flatMap((i) => i.split(","))
    .map((i) => i.trim())
    .filter((i) => i && i.length <= 30 && !/[()\n]/.test(i));

  return [...new Set(cleaned)];
};

export const getFeed = async (page = 1, limit = 10) => {
  const res = await api.get(`/matches/feed?page=${page}&limit=${limit}`);
  return res.data;
};

export const likeUser = async (targetUserId) => {
  const res = await api.post("/matches/like", {
    targetUserId,
  });
  return res.data;
};

export const passUser = async (targetUserId) => {
  const res = await api.post("/matches/pass", {
    targetUserId,
  });
  return res.data;
};

export const rewindLastAction = async (targetUserId) => {
  const res = await api.post("/matches/rewind", {
    targetUserId,
  });
  return res.data;
};

export const getMyMatches = async () => {
  const res = await api.get("/matches/my-matches");
  return res.data;
};

export const filterMatches = async (
  filters,
  page = 1,
  limit = 10
) => {
  const res = await api.post(
    `/matches/filter?page=${page}&limit=${limit}`,
    filters
  );

  return res.data;
};