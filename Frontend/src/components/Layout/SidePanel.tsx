import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  CircleUser,
  Home,
  LayoutDashboard,
  Leaf,
  LogIn,
  LogOut,
} from "lucide-react";
import { isAuthenticated } from "../../utils/auth";

export default function SidePanel() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    const confirm = window.confirm("Confirm to Sign Out?");
    if (!confirm) return;
    logout();
    navigate("/home");
  };

  const linksUnderline = `relative text-stalker-brown transition duration-300 after:content-[''] after:absolute after:left-1/2 after:-bottom-1 after:w-0 after:h-[2px] after:bg-stalker-offwhite after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:w-full`;

  const location = useLocation();

  return (
    <>
      {/* <div className="hidden md:block fixed top-0 left-0 h-screen w-64 z-20"> */}
      <div className="h-screen w-64  lg:w-80 bg-gradient-to-b from-stalker-offwhite to-stalker-brown font-montserrat">
        <div className="h-full w-full py-20">
          <h2 className="px-8 pb-10 text-3xl text-stalker-brown">Hi, John</h2>

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
      </div>
      {/* </div> */}
    </>
  );
}
