import Header from "./Header";
import StatsGrid from "./StatsGrid";
import AnalyticsPreview from "./Analytics";
import HabitsList from "./Habits";
import MotivationCard from "./MotivationCard";
import QuickActions from "./QucikActions";
import SidePanel from "../Layout/SidePanel";
import NavBar from "../Layout/NavBar";

export default function Dashboard() {
  return (
    <div className="flex">
      {/* Sidebar (only md and up) */}
      <div className="hidden lg:block fixed top-0 left-0 h-screen z-20">
        <SidePanel />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen font-montserrat lg:ml-80">
        {/* Navbar (only small screens) */}
        <div className="block lg:hidden w-full fixed top-0 left-0 z-20">
          <NavBar />
        </div>

        {/* Dashboard Content */}
        <section className="bg-stalker-offwhite min-h-screen px-6 py-10">
          <Header />
          <StatsGrid />

          {/* Analytics & Habits side by side on md, stacked on small */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnalyticsPreview />
            <HabitsList />
          </div>

          {/* Motivation card full width */}
          <div className="mt-6">
            <MotivationCard />
          </div>

          <QuickActions />
        </section>
      </div>
    </div>
  );
}
