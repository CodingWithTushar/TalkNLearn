import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser.js";
import { useQuery } from "@tanstack/react-query";
import { GetStreamToken } from "../utils/apiCalls.js";
import { StreamChat } from "stream-chat";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import ChatLoader from "../components/chatLoader.jsx";
import toast from "react-hot-toast";
import CallButton from "../components/callButton.jsx";

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: GetStreamToken,
    enabled: !!authUser,
  });

  const streamApiKey = import.meta.env.VITE_STREAM_API_KEY;

  useEffect(() => {
    if (!streamApiKey) {
      toast.error("Stream API key is missing!");
      return;
    }

    let isMounted = true;
    const initChat = async () => {
      if (!tokenData?.token || !authUser || !targetUserId) return;

      try {
        const client = StreamChat.getInstance(streamApiKey);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");
        const currentChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currentChannel.watch();

        if (isMounted) {
          setChatClient(client);
          setChannel(currentChannel);
        }
      } catch (e) {
        console.error("Chat init error:", e);
        toast.error("Failed to connect to chat. Please try again.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initChat();

    return () => {
      isMounted = false;
      if (chatClient) chatClient.disconnectUser();
    };
  }, [tokenData, targetUserId, authUser]);

  const handleVideoCall = async () => {
    if (!channel) return;

    const callUrl = `${window.location.origin}/call/${channel.id}`;
    await channel.sendMessage({
      text: `I have started a video call. Join me here: ${callUrl}`,
    });
    toast.success("Video call link sent successfully!");
  };

  if (loading || !channel) return <ChatLoader />;

  return (
    <div className="h-[92.6vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <Window>
              <CallButton handleVideoCall={handleVideoCall} />
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
