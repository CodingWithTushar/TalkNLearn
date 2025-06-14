import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { GetStreamToken } from "../utils/apiCalls";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import toast from "react-hot-toast";
import LoadingPage from "../components/loadingPage";

const VITE_STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

if (!VITE_STREAM_API_KEY) {
  toast.error("Stream API Key is missing!");
}

const CallPage = () => {
  const { id: videoCallId } = useParams();
  if (!videoCallId) {
  toast.error("Invalid call ID. Please check the link.");
  return <Navigate to="/" />;
}
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const { authUser, isLoading } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: GetStreamToken,
    enabled: !!authUser,
  });

  console.log(tokenData);

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData.token || !authUser || !videoCallId) {
        return;
      }
      try {
        console.log("Initializing stream chat client...");
        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };

        const videoClient = new StreamVideoClient({
          apiKey: VITE_STREAM_API_KEY,
          user,
          token: tokenData.token,
        });
        const callInstance = videoClient.call("default", videoCallId);
        await callInstance.join({
          create: true,
        });
        console.log("Joined call successfully ");
        setClient(videoClient);
        setCall(callInstance);
      } catch (e) {
        console.log(`Error joining call ${e}`);
        toast.error("Could not join th Call. Please try again");
      }finally {
        setIsConnecting(false)
      }
    };
    initCall();
  }, [tokenData, authUser, videoCallId]);

  if (isLoading) return <LoadingPage message="Authenticating user..." />;
if (isConnecting) return <LoadingPage message="Joining video call..." />;


  return (
<div className="min-h-screen w-full bg-base-100 flex items-center justify-center">
      <div className="relative">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Could not initialize call. Please refresh or try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const navigate = useNavigate();

  if (callingState === CallingState.LEFT) return navigate("/");

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallPage;
