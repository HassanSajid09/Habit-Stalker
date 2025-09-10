import {
  CircleUser,
  Home,
  LayoutDashboard,
  Leaf,
  LogIn,
  LogOut,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { isAuthenticated } from "../../utils/auth";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideBar({ isOpen, onClose }: SidebarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    const confirm = window.confirm("Confirm to Sign Out?");
    if (!confirm) return;
    logout();
    navigate("/home");
  };

  const linksUnderline = `relative text-stalker-brown transition duration-300 after:content-[''] after:absolute after:left-1/2 after:-bottom-1 after:w-0 after:h-[2px] after:bg-stalker-offwhite after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:w-full`;
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 h-full w-72 md:w-80 bg-gradient-to-b from-stalker-offwhite to-stalker-brown shadow-2xl transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-end px-6 py-10 border-b border-stalker-offwhite/20">
          <button onClick={onClose}>
            <X className="w-6 h-6 text-stalker-brown hover:opacity-80 transition" />
          </button>
        </div>
        <h2 className="px-8 pb-8 text-3xl text-stalker-brown">Hi, John</h2>

        <nav className="flex flex-col text-lg gap-4 p-8 text-stalker-brown">
          {location.pathname === "/dashboard" ? (
            <NavLink
              to="/home"
              className={() =>
                `flex items-center gap-3 px-1 py-3 rounded-xl transition-colors ${linksUnderline} text-stalker-brown hover:text-stalker-offwhite`
              }
            >
              <Home /> Home
            </NavLink>
          ) : (
            <NavLink
              to="/dashboard"
              className={() =>
                `flex items-center gap-3 px-1 py-3 rounded-xl transition-colors ${linksUnderline} text-stalker-brown hover:text-stalker-offwhite`
              }
            >
              <LayoutDashboard /> Dashboard
            </NavLink>
          )}
          <NavLink
            to="/habits"
            className={() =>
              `flex items-center gap-3 px-1 py-3 rounded-xl transition-colors ${linksUnderline} text-stalker-brown hover:text-stalker-offwhite`
            }
          >
            <Leaf /> Habits
          </NavLink>

          {isAuthenticated() ? (
            <>
              <NavLink
                to="/profile"
                className={() =>
                  `flex items-center gap-3 px-1 py-3 rounded-xl transition-colors ${linksUnderline} text-stalker-brown hover:text-stalker-offwhite`
                }
              >
                <CircleUser /> Profile
              </NavLink>
              <button
                className={`flex items-center gap-3 px-1 py-3 rounded-xl transition-colors text-stalker-brown hover:text-stalker-offwhite ${linksUnderline}`}
                onClick={handleLogOut}
              >
                <LogOut /> Sign Out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/signin"
                className={() =>
                  `flex items-center gap-3 px-1 py-3 rounded-xl transition-colors ${linksUnderline} text-stalker-brown hover:text-stalker-offwhite`
                }
              >
                <LogIn /> Sign In
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </>
  );
}
