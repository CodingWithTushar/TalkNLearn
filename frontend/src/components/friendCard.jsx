import { Link } from "react-router-dom";
import GetLanguageFlag from "../utils/getLanguageFlag";

const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-lg transition-all duration-300 border border-base-300">
      <div className="card-body p-5 space-y-4">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={friend.profilePic} alt={friend.fullName} />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-primary truncate">
              {friend.fullName}
            </h3>
            <p className="text-sm text-base-content opacity-70 truncate">
              {friend.location || "🌍 Unknown location"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="badge badge-primary badge-outline text-xs">
            {GetLanguageFlag(friend.nativeLanguage)}
            &nbsp;Native: {friend.nativeLanguage}
          </span>
          <span className="badge badge-accent badge-outline text-xs">
            {GetLanguageFlag(friend.learningLanguage)}
            &nbsp;Learning: {friend.learningLanguage}
          </span>
        </div>

        {friend._id ? (
          <Link
            to={`/chat/${friend._id}`}
            className="btn btn-primary btn-sm w-full rounded-full text-white tracking-wide shadow"
          >
            Message
          </Link>
        ) : (
          <button
            disabled
            className="btn btn-disabled btn-sm w-full rounded-full text-white tracking-wide"
          >
            Invalid User
          </button>
        )}
      </div>
    </div>
  );
};

export default FriendCard;
