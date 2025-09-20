import { useState } from "react";
import { NavLink } from "react-router-dom";
import type { HabitsType } from "../../types/types";
import { useHabits } from "../../hooks/habits";

const HabitForm = () => {
  const [formData, setFormData] = useState<HabitsType>({
    title: "",
    category: "",
    description: "",
    frequency: "daily",
    priority: "important",
  });

  const handleData = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { create } = useHabits();
  const { title, description, category, frequency, priority } = formData;

  const body = {
    title,
    description,
    category,
    frequency,
    priority,
  };

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    create.mutate({ body });
  };
  return (
    <>
      <div className="min-h-screen bg-stalker-offwhite text-stalker-brown flex flex-col font-montserrat">
        {/* Motivational Banner */}
        <div>
          <header className="bg-stalker-brown text-stalker-offwhite py-10 px-6 text-center shadow-md">
            <h1 className="text-4xl font-extrabold tracking-wide mb-2">
              Let’s Build Your Next Habit 🚀
            </h1>
            <p className="text-lg opacity-90">
              Small steps daily lead to big transformations.
            </p>
          </header>
          <NavLink
            to={"/habits"}
            className="m-6 inline-flex items-start bg-stalker-offwhite py-4 px-8 border border-stalker-brown rounded-xl text-lg hover:bg-stalker-brown hover:text-stalker-offwhite hover:border-stalker-offwhite hover:scale-110 translate transition-all"
          >
            Go Back
          </NavLink>
        </div>

        {/* Form Section */}
        <form
          className="flex-1 w-full max-w-3xl mx-auto py-12 px-6 space-y-12"
          onSubmit={handleSubmit}
        >
          <section className="bg-stalker-brown text-stalker-offwhite rounded-2xl shadow-lg p-10 space-y-8">
            <h2 className="text-2xl font-bold text-center mb-4">
              New Habit Blueprint
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  📌 Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Morning Run"
                  className="w-full px-4 py-3 rounded-xl border border-stalker-brown bg-stalker-offwhite text-stalker-brown focus:outline-none focus:ring-2 focus:ring-stalker-offwhite placeholder:text-stalker-brown"
                  name="title"
                  onChange={handleData}
                  value={formData.title}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  🗂 Category
                </label>
                <input
                  className="w-full px-4 py-3 rounded-xl border border-stalker-brown bg-stalker-offwhite text-stalker-brown focus:outline-none focus:ring-2 focus:ring-stalker-offwhite placeholder:text-stalker-brown"
                  name="category"
                  onChange={handleData}
                  value={formData.category}
                  placeholder="e.g. Health"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                📖 Description
              </label>
              <textarea
                placeholder="Describe your habit..."
                className="w-full px-4 py-3 rounded-xl border border-stalker-brown bg-stalker-offwhite text-stalker-brown focus:outline-none focus:ring-2 focus:ring-stalker-offwhite placeholder:text-stalker-brown"
                rows={3}
                name="description"
                onChange={handleData}
                value={formData.description}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  ⏰ Frequency
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-stalker-brown bg-stalker-offwhite text-stalker-brown focus:outline-none focus:ring-2 focus:ring-stalker-offwhite"
                  name="frequency"
                  onChange={handleData}
                  value={formData.frequency}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  🔥 Priority
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-stalker-offwhite bg-stalker-offwhite text-stalker-brown focus:outline-none focus:ring-2 focus:ring-stalker-offwhite"
                  name="priority"
                  onChange={handleData}
                  value={formData.priority}
                >
                  <option value="Important">Important</option>
                  <option value="Moderate">Moderate</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-stalker-brown text-stalker-offwhite border border-stalker-offwhite py-4 rounded-xl font-bold tracking-wide hover:bg-stalker-offwhite hover:text-stalker-brown hover:border-stalker-brown transition transform hover:scale-[1.02] shadow-md"
            >
              Add Habit
            </button>
          </section>
        </form>

        {/* Footer */}
        <footer className="text-center py-6 text-sm opacity-80">
          Keep pushing forward — your future self will thank you. ✨
        </footer>
      </div>
    </>
  );
};

export default HabitForm;
