import { PlusCircle, LogOut } from "lucide-react";

const QuickActions = () => (
  <div className="flex gap-4 mt-6">
    <button className="flex items-center gap-2 bg-stalker-brown text-stalker-offwhite px-4 py-2 rounded-xl hover:bg-stalker-gray transition">
      <PlusCircle size={18} /> Add Habit
    </button>
    <button className="flex items-center gap-2 border border-stalker-brown text-stalker-brown px-4 py-2 rounded-xl hover:bg-stalker-brown hover:text-stalker-offwhite transition">
      <LogOut size={18} /> Sign Out
    </button>
  </div>
);
export default QuickActions;
