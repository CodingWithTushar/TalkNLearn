import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  GetOutgoingFriendsReqs,
  GetRecommendedUsers,
  GetUserFriends,
  SendFriendReq,
} from "../utils/apiCalls.js";
import { Link } from "react-router-dom";
import {
  CheckCircleIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import FriendCard from "../components/friendCard.jsx";
import NoFriendFound from "../components/noFriendFound.jsx";
import GetLanguageFlag from "../utils/getLanguageFlag.jsx";
import toast from "react-hot-toast";
import { Capitialize } from "../utils/capitialize.js";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingfriends } = useQuery({
    queryKey: ["friends"],
    queryFn: GetUserFriends,
  });
  const friend = friends.friends;

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: GetRecommendedUsers,
  });
  const recommendedUser = recommendedUsers.recommendedUsers;

  const { data: rawOutgoingFriendReqsData } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: GetOutgoingFriendsReqs,
  });

  const outgoingFriendReqs = Array.isArray(
    rawOutgoingFriendReqsData?.outgoingRequests
  )
    ? rawOutgoingFriendReqsData.outgoingRequests
    : [];

  const { mutate: SendFriendReqFn, isPending } = useMutation({
    mutationFn: SendFriendReq,
    onSuccess: () => {
      toast.success("Friend request sent!");
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
    },
    onError: () => {
      toast.error("Failed to send request. Try again later.");
    },
  });

  const handleSendFriendRequest = (id) => {
    setOutgoingRequestsIds((prev) => new Set(prev).add(id));
    SendFriendReqFn(id);
  };

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="container mx-auto space-y-10 ">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter">
            Your Friends
          </h2>
          <Link
            to={"/notifications"}
            className="btn btn-outline btn-sm rounded-full"
          >
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>
        {loadingfriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friend.length === 0 ? (
          <NoFriendFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-4 ">
            {friend.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}
        <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Meet New Learners
                </h2>
                <p className="opacity-70">
                  Discover perfect language exchange partners based on your
                  profile
                </p>
              </div>
            </div>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : recommendedUser.length === 0 ? (
            <div className="card bg-base-200 p-6 text-center rounded-lg">
              <h3 className="font-semibold text-lg mb-2">
                No Recommendation Available
              </h3>
              <p className="text-base-content opacity-70">
                Check back later for new language partners!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUser.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                return (
                  <div
                    key={user._id}
                    className="card bg-base-200 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="card-body p-5 space-y-4 ">
                      <div className="flex items-center gap-3 ">
                        <div className="avatar size-16 rounded-full">
                          <img src={user.profilePic || "/default-avatar.png"} alt={user.fullName} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {user.fullName}
                          </h3>
                          {user.location && (
                            <div className="flex items-center text-xs opacity-70 mt-1">
                              <MapPinIcon className="size-3 mr-1" />
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        <span className="badge badge-secondary">
                          {GetLanguageFlag(user.nativeLanguage)}
                          Native: {Capitialize(user.nativeLanguage)}
                        </span>
                        <span className="badge badge-outline">
                          {GetLanguageFlag(user.learningLanguage)}
                          Learning: {Capitialize(user.learningLanguage)}
                        </span>
                      </div>

                      {user.bio && (
                        <p className="text-sm opacity-70">{user.bio}</p>
                      )}

                      <button
                        onClick={() => handleSendFriendRequest(user._id)}
                        className={`btn w-full mt-2 ${
                          hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                        }`}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {hasRequestBeenSent ? (
                          <>
                            <CheckCircleIcon className="size-4 mr-2" />
                            Request Sent!
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="size-4 mr-2" />
                            Send Friend Request
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
