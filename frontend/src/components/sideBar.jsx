import { Link, useLocation} from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser.js";
import { BellRingIcon, HomeIcon, Projector} from "lucide-react";

const SideBar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const navLinks = [
    { to: "/", label: "Home", icon: HomeIcon },
    { to: "/notifications", label: "Notifications", icon: BellRingIcon },
  ];

  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-base-300">
        <Link to="/" className="flex items-center gap-2.5">
          <Projector className="size-6 text-primary" />
          <span className="text-2xl font-bold font-mono bg-clip-text text-transparent tracking-wider bg-gradient-to-r from-primary to-secondary">
            TalkNLearn
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navLinks.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-3 px-4 py-2 rounded-full transition-colors duration-200 ${
              currentPath === to
                ? "bg-base-300 text-base-content font-semibold"
                : "hover:bg-base-300 text-base-content opacity-70"
            }`}
          >
            <Icon className="size-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-base-300 mt-auto">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-11 rounded-full">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{authUser?.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block"></span>
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
