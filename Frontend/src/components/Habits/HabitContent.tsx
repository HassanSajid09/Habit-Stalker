import { Edit, Trash2, ArrowLeft } from "lucide-react";
import { NavLink, useParams } from "react-router-dom";
import { useHabits } from "../../hooks/habits";

const HabitContent = () => {
  const { Habit, del } = useHabits();
  console.log(Habit);

  const { id } = useParams();

  const handleDel = () => {
    const confirm = window.confirm("Confirm to delete the habit?");
    if (!confirm) return;

    del.mutate({ id });
  };

  if (!Habit) return <p>No Habit found!</p>;
  return (
    <>
      <div className="flex justify-center items-start py-16 px-6 font-montserrat bg-stalker-offwhite min-h-screen">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-12 border border-stalker-brown/10">
          {/* Back link */}
          <NavLink
            to={"/habits"}
            className="flex items-center gap-2 text-stalker-brown mb-10 hover:text-stalker-brown/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Habits</span>
          </NavLink>

          {/* Header */}
          <div className="flex justify-between items-start mb-8 border-b border-stalker-brown/20 pb-6">
            <h1 className="text-4xl font-extrabold text-stalker-brown leading-tight">
              {Habit.title}
            </h1>
            <div className="flex gap-3 shrink-0">
              <NavLink
                to={`/habit/edit/${Habit._id}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stalker-brown text-stalker-brown font-medium hover:bg-stalker-brown hover:text-white transition-colors shadow-sm"
              >
                <Edit className="w-5 h-5" />
                Edit
              </NavLink>
              <button
                onClick={handleDel}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stalker-brown text-white font-medium hover:bg-stalker-offwhite hover:text-stalker-brown border border-stalker-brown transition-colors shadow-sm"
              >
                <Trash2 className="w-5 h-5" />
                Delete
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-700 mb-10 leading-relaxed">
            {Habit.description}
          </p>

          {/* Info section */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-8 text-sm">
            <div>
              <span className="block text-stalker-brown font-semibold mb-1">
                Created On
              </span>
              <p className="text-gray-600">{Habit.createdAt}</p>
            </div>
            <div>
              <span className="block text-stalker-brown font-semibold mb-1">
                Frequency
              </span>
              <p className="text-gray-600">{Habit.frequency}</p>
            </div>
            <div>
              <span className="block text-stalker-brown font-semibold mb-1">
                Priority
              </span>
              <p className="text-gray-600 mb-2">{Habit.priority}</p>
            </div>
            <div>
              <span className="block text-stalker-brown font-semibold mb-1">
                Category
              </span>
              <p className="text-gray-600">{Habit.category}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HabitContent;
