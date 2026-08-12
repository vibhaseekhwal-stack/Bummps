export const getWhoLikedMe = async () => {
    const res = await api.get("/matches/who-liked-me");
    return res.data;
  };
  
  export const searchLikes = async (query) => {
    const res = await api.get(
      `/matches/search-likes?query=${encodeURIComponent(query)}`
    );
    return res.data;
  };
  
  export const superLikeUser = async (targetUserId) => {
    const res = await api.post("/swipes/super-like", {
      targetUserId,
    });
    return res.data;
  };