import { useAuthUser } from "../hooks/useAuthUser";
import { Link, useLocation } from "react-router-dom";
import useLogOut from "../hooks/useLogOut.js";
import {
  BellRingIcon,
  LogOutIcon,
  Projector,
} from "lucide-react";
import ThemeSelector from "./themeSelector.jsx";

const NavBar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const { LogOutFn } = useLogOut();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {isChatPage ? (
          <Link to="/" className="flex items-center gap-2 group">
            <Projector className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-bold font-mono bg-clip-text text-transparent tracking-wide bg-gradient-to-r from-primary to-secondary">
              TalkNLearn
            </span>
          </Link>
        ) : (
          <div className="text-xl font-semibold tracking-tight text-primary">Welcome 👋</div>
        )}
        
        <div className="flex items-center gap-3 sm:gap-4">
    
          <Link to="/notifications" title="Notifications">
            <button className="btn btn-ghost btn-circle">
              <BellRingIcon className="w-6 h-6 text-base-content opacity-70 hover:opacity-100 transition" />
            </button>
          </Link>

          <ThemeSelector />

          {authUser && (
            <div className="avatar tooltip tooltip-left" data-tip={authUser.fullName}>
              <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-md">
                <img
                  src={authUser.profilePic}
                  alt="User Avatar"
                  className="object-cover"
                />
              </div>
            </div>
          )}

          <button
            onClick={LogOutFn}
            className="btn btn-ghost btn-circle"
            title="Logout"
          >
            <LogOutIcon className="w-6 h-6 text-base-content opacity-70 hover:opacity-100 transition" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
