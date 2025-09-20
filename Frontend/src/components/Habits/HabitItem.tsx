import type { HabitsType } from "../../types/types";

const HabitItem = ({ habit }: { habit: HabitsType }) => {
  return (
    <div className="space-y-4">
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
        <div className="flex gap-4">
          <button className="p-2 rounded-full hover:bg-red-100 transition">
            📝
          </button>
          <button className="p-2 rounded-full hover:bg-red-100 transition">
            🗑
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitItem;
