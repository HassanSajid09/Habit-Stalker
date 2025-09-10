import { CheckCircle, BarChart3, Bell } from "lucide-react";
import NavBar from "./Layout/NavBar";
import { NavLink, useNavigate } from "react-router-dom";
import SidePanel from "./Layout/SidePanel";

export default function Home() {
  const linksUnderline = `relative text-stalker-offwhite transition duration-300 after:content-[''] after:absolute after:left-1/2 after:-bottom-1 after:w-0 after:h-[2px] after:bg-stalker-offwhite after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:w-full`;

  const navigate = useNavigate();

  return (
    <>
      <div className="flex">
        {/* Sidebar (only on md and above) */}
        <div className="hidden md:block fixed top-0 left-0 h-screen w-64 z-20">
          <SidePanel />
        </div>

        {/* Navbar (only on small screens) */}
        <div className="block md:hidden w-full fixed top-0 left-0 z-20">
          <NavBar />
        </div>

        {/* Main Content */}
        <div
          className="flex-1 flex flex-col min-h-screen font-montserrat 
                  ml-0 md:ml-64 pt-16 md:pt-0"
        >
          {/* Hero Section */}
          <header className="bg-stalker-brown text-stalker-offwhite py-24 px-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/memphis-mini.png')]" />
            <div className="relative z-10">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                Transform Habits,
                <br /> Elevate Your Life
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-stalker-offwhite">
                Habit Stalker isn’t just a tracker — it’s your personal
                accountability partner. Build consistency, visualize progress,
                and crush your goals.
              </p>
              <div className="flex justify-center gap-4">
                <NavLink
                  to="/signin"
                  className="bg-stalker-offwhite text-stalker-brown font-medium text-xl px-12 md:px-14 py-4 rounded-2xl shadow-lg hover:bg-stalker-offwhite transition transform hover:scale-105"
                >
                  Start Free
                </NavLink>
                <a
                  href="#features"
                  className="border border-stalker-offwhite px-12 py-4 rounded-2xl text-xl font-medium hover:bg-stalker-offwhite hover:text-stalker-brown transition transform hover:scale-105"
                >
                  Explore Features
                </a>
              </div>
            </div>
          </header>

          {/* Features Section */}
          <section id="features" className="py-24 px-6 bg-stalker-offwhite">
            <div className="max-w-7xl md:max-w-5xl mx-auto text-center">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-stalker-brown">
                Why Choose Habit Stalker?
              </h2>
              <p className="text-xl text-stalker-brown mb-16 max-w-4xl mx-auto">
                We designed Habit Stalker with simplicity, science, and
                motivation in mind — everything you need to build unstoppable
                consistency.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="bg-stalker-brown rounded-2xl shadow-lg p-10 md:p-12 hover:shadow-xl transition flex flex-col items-center justify-center">
                  <CheckCircle className="size-12 text-stalker-offwhite mb-4" />
                  <h3 className="text-3xl md:text-4xl text-stalker-offwhite font-semibold mb-6 text-center">
                    Stay Consistent
                  </h3>
                  <p className="text-stalker-offwhite text-lg md:text-xl text-center">
                    Stay on top of your goals with streaks and reminders.
                  </p>
                </div>
                <div className="bg-stalker-brown rounded-2xl shadow-lg p-10 md:p-12 hover:shadow-xl transition flex flex-col items-center justify-center">
                  <BarChart3 className="size-12 text-stalker-offwhite mb-4" />
                  <h3 className="text-3xl md:text-4xl text-stalker-offwhite font-semibold mb-6 text-center">
                    Analytics Dashboard
                  </h3>
                  <p className="text-stalker-offwhite text-lg md:text-xl text-center">
                    Gain insights with clear charts showing your growth.
                  </p>
                </div>
                <div className="bg-stalker-brown rounded-2xl shadow-lg p-10 md:p-12 hover:shadow-xl transition flex flex-col items-center justify-center">
                  <Bell className="size-12 text-stalker-offwhite mb-4" />
                  <h3 className="text-3xl md:text-4xl text-stalker-offwhite font-semibold mb-6 text-center">
                    Smart Reminders
                  </h3>
                  <p className="text-stalker-offwhite text-lg md:text-xl text-center">
                    Get nudges exactly when you need them.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-24 px-6 bg-stalker-brown">
            <div className="max-w-7xl md:max-w-5xl mx-auto text-center">
              <h2 className="text-5xl md:text-6xl font-bold mb-16 text-stalker-offwhite">
                Loved by Habit Builders Worldwide
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  {
                    name: "John D.",
                    quote:
                      "I finally hit a 60-day streak — Habit Stalker kept me motivated.",
                  },
                  {
                    name: "Sarah K.",
                    quote:
                      "The charts helped me see exactly where I was slipping.",
                  },
                  {
                    name: "Ali R.",
                    quote:
                      "Clean, beautiful, and motivating. I actually enjoy opening it.",
                  },
                ].map((t, i) => (
                  <div
                    key={i}
                    className="bg-stalker-offwhite rounded-2xl p-8 md:p-12 shadow-md hover:shadow-xl transition"
                  >
                    <p className="italic mb-6 text-lg md:text-xl text-stalker-brown">
                      “{t.quote}”
                    </p>
                    <p className="font-semibold text-base md:text-lg text-black">
                      – {t.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-stalker-offwhite text-stalker-brown text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/dot-grid.png')]" />
            <div className="relative z-10">
              <h2 className="text-5xl font-extrabold mb-6">
                Start Building Your Future Self Today
              </h2>
              <p className="mb-10 text-2xl max-w-2xl mx-auto">
                Don’t wait for the perfect moment. Take the first step now —
                your streak starts here.
              </p>
              <NavLink
                to="/signin"
                className="inline-block bg-stalker-brown text-stalker-offwhite text-xl px-10 py-5 rounded-2xl shadow-lg hover:bg-stalker-offwhite hover:text-stalker-brown border hover:border-stalker-brown transition transform hover:scale-105"
                onClick={() => navigate("/signin")}
              >
                Create Your Free Account
              </NavLink>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-stalker-brown text-stalker-offwhite py-12 text-center text-2xl md:text-3xl">
            <p className="mb-6">
              Habit Stalker © {new Date().getFullYear()} • Designed for
              consistency, built for you
            </p>
            <div className="flex justify-center gap-8 text-xl">
              <a href="/" className={`${linksUnderline}`}>
                About
              </a>
              <a href="/" className={`${linksUnderline}`}>
                Privacy
              </a>
              <a href="/" className={`${linksUnderline}`}>
                Contact
              </a>
              <NavLink to="/signin" className={`${linksUnderline}`}>
                Login
              </NavLink>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
