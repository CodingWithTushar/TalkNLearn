import { VideoIcon } from "lucide-react";

const CallButton = ({ handleVideoCall }) => {
  return (
    <div className="p-3 border-b bg-white flex items-center justify-end max-w-7xl mx-auto w-full absoulte top-0">
      <button
        onClick={handleVideoCall}
        className="btn btn-primary btn-sm gap-2 text-base-100"
        aria-label="Start Video Call"
      >
        <VideoIcon className="w-5 h-5" />
        <span className="hidden sm:inline">Call</span>
      </button>
    </div>
  );
};

export default CallButton;
