import { axiosInstance } from "../lib/axios.js";

export const AuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    const result = res.data;
    return result;
  } catch (error) {
    console.log(`Error happened While getting AuthUser ${error}`);
    return null;
  }
};

export const SignUp = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

export const LogIn = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};
export const LogOut = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const OnBoarding = async (onBoardingData) => {
  const response = await axiosInstance.post("/auth/onboarding", onBoardingData);
  return response.data;
};

export const GetRecommendedUsers = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
};

export const GetUserFriends = async () => {
  const response = await axiosInstance.get("/users/friends");
  console.log(response.data);
  return response.data;
};

export const GetOutgoingFriendsReqs = async () => {
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
};

export const SendFriendReq = async (userId) => {
  if (
    !userId ||
    typeof userId !== "string" ||
    userId.includes(":") ||
    userId.trim() === ""
  ) {
    console.warn("Invalid userId passed to SendFriendReq:", userId);
    return;
  }
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data;
};

export const GetFriendReq = async () => {
  const response = await axiosInstance.get(`/users/friend-request`);
  return response.data;
};

export const AcceptFriendReq = async (requestId) => {
  if (
    !requestId ||
    typeof requestId !== "string" ||
    requestId.includes(":") ||
    requestId.trim() === ""
  ) {
    console.warn("Invalid requestId passed to AcceptFriendReq:", requestId);
    return;
  }
  const response = await axiosInstance.put(
    `/users/friend-request/${requestId}/accept`
  );
  return response.data;
};

export const GetStreamToken = async () => {
  const response = await axiosInstance.get(`/chat/token`);
  return response.data;
};
