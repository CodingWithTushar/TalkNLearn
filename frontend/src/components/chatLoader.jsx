import { LoaderIcon } from "lucide-react";

const ChatLoader = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-base-100 text-primary transition-all duration-300">
      <div className="p-4 rounded-full bg-base-200 animate-spin shadow-md">
        <LoaderIcon className="h-12 w-12" />
      </div>
      <h2 className="text-2xl font-bold tracking-wide animate-pulse">
        Connecting to Chat...
      </h2>
      <p className="text-base-content text-sm opacity-70">
        Please wait while we establish a secure connection.
      </p>
    </div>
  );
};

export default ChatLoader;
