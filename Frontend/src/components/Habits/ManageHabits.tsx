import { useState } from "react";
import NavBar from "../Layout/NavBar";
import SidePanel from "../Layout/SidePanel";

const ManageHabits = () => {
  const [sortMode, setSortMode] = useState<"time" | "category" | "priority">(
    "time"
  );

  const habits = [
    {
      id: 1,
      title: "Drink 2L Water",
      category: "Health",
      priority: "important",
    },
    { id: 2, title: "Morning Run", category: "Fitness", priority: "moderate" },
    { id: 3, title: "Read 10 Pages", category: "Mindset", priority: "low" },
  ];

  const priorityMap: Record<string, number> = {
    important: 1,
    moderate: 2,
    low: 3,
  };

  const sortedHabits = [...habits].sort((a, b) => {
    if (sortMode === "category") return a.category.localeCompare(b.category);
    if (sortMode === "priority")
      return priorityMap[a.priority] - priorityMap[b.priority];
    return a.id - b.id;
  });

  return (
    <>
      <div className="flex font-montserrat">
        {/* Desktop Sidebar */}
        <div className="hidden md:block fixed top-0 left-0 h-screen w-64 z-20">
          <SidePanel />
        </div>

        {/* Mobile Navbar */}
        <div className="block md:hidden w-full fixed top-0 left-0 z-20">
          <NavBar />
        </div>

        {/* Page Content */}
        <div className="flex-1 min-h-screen bg-stalker-offwhite p-8 mt-24 md:mt-0 md:p-20 md:ml-64">
          {/* Header */}
          <div className="relative mb-12 overflow-hidden">
            <div className="flex items-center justify-between relative z-10">
              <div>
                <h1 className="text-5xl font-extrabold text-stalker-brown tracking-tight">
                  🌱 Build Your Habits
                </h1>
                <p className="text-stalker-brown/70 mt-2 text-lg">
                  Track progress. Stay consistent. Grow stronger daily.
                </p>
              </div>
              <button className="inline-flex items-center justify-center px-8 py-3 bg-stalker-brown text-stalker-offwhite rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition font-semibold mr-3">
                + Add Habit
              </button>
            </div>

            {/* Mobile Background Accent */}
            <div className="absolute inset-0 flex justify-center md:hidden">
              <div className="w-72 h-72 bg-stalker-brown/10 rounded-full blur-3xl mt-6"></div>
            </div>
            {/* Desktop accents */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-stalker-brown/30 to-transparent rounded-full blur-3xl hidden md:block"></div>
            <div className="absolute -top-16 -left-10 w-72 h-72 bg-gradient-to-br from-stalker-brown/30 to-transparent rounded-full blur-3xl hidden md:block"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tr from-stalker-brown/20 to-transparent rounded-full blur-3xl hidden md:block"></div>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* LEFT SIDE: Buttons + Habits */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Sorting buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSortMode("time")}
                  className={`px-4 py-2 rounded-xl border transition ${
                    sortMode === "time"
                      ? "bg-stalker-brown text-white"
                      : "bg-white text-stalker-brown border-stalker-brown"
                  }`}
                >
                  ⏱ Added Time
                </button>
                <button
                  onClick={() => setSortMode("category")}
                  className={`px-4 py-2 rounded-xl border transition ${
                    sortMode === "category"
                      ? "bg-stalker-brown text-white"
                      : "bg-white text-stalker-brown border-stalker-brown"
                  }`}
                >
                  📂 Category
                </button>
                <button
                  onClick={() => setSortMode("priority")}
                  className={`px-4 py-2 rounded-xl border transition ${
                    sortMode === "priority"
                      ? "bg-stalker-brown text-white"
                      : "bg-white text-stalker-brown border-stalker-brown"
                  }`}
                >
                  ⭐ Priority
                </button>
              </div>

              {/* Habits List */}
              <div className="space-y-4">
                {sortedHabits.map((habit) => (
                  <div
                    key={habit.id}
                    className="flex items-center justify-between p-5 rounded-2xl shadow-md border-l-4 border-stalker-brown bg-white hover:shadow-lg hover:-translate-y-1 transition"
                  >
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold text-stalker-brown">
                        {habit.title}
                      </span>
                      <p className="ml-1 text-sm text-stalker-brown/60 italic">
                        {habit.category} | {habit.priority}
                      </p>
                    </div>
                    <button className="p-2 rounded-full hover:bg-red-100 transition">
                      🗑
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Motivation / Streaks / Progress */}
            <div className="space-y-8">
              {/* Motivation Card */}
              <div className="p-8 rounded-2xl shadow-lg bg-gradient-to-br from-stalker-brown to-stalker-brown/90 text-stalker-offwhite">
                <h3 className="text-xl font-bold mb-3">💡 Daily Motivation</h3>
                <p className="italic opacity-90 text-lg leading-relaxed">
                  "Discipline is choosing between what you want now and what you
                  want most."
                </p>
              </div>

              {/* Streaks Card */}
              <div className="p-8 rounded-2xl shadow-md bg-white border border-stalker-brown/20">
                <h3 className="text-xl font-bold text-stalker-brown mb-3">
                  🔥 Your Streaks
                </h3>
                <div className="space-y-2 text-stalker-brown/80">
                  <p>
                    <span className="font-semibold">Morning Run</span> — 7-day
                    streak
                  </p>
                  <p>
                    <span className="font-semibold">Drink Water</span> — 3-day
                    streak
                  </p>
                </div>
              </div>

              {/* Progress Card */}
              <div className="p-8 rounded-2xl shadow-md bg-white border border-stalker-brown/20">
                <h3 className="text-xl font-bold text-stalker-brown mb-5">
                  📊 Today’s Progress
                </h3>
                <div className="flex items-center gap-6">
                  {/* Circular Progress */}
                  <div className="relative w-20 h-20">
                    <svg className="w-20 h-20">
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="#E6E6E6"
                        strokeWidth="6"
                        fill="none"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="#7C4A31" /* stalker-brown */
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray="226"
                        strokeDashoffset="75"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center font-bold text-stalker-brown">
                      66%
                    </span>
                  </div>
                  <p className="text-stalker-brown/70 text-lg">
                    2 / 3 habits completed 🎉
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageHabits;
