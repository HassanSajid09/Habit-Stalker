const HabitsList = () => {
  const habits = [
    { name: "Morning Run", status: "Done ✅" },
    { name: "Read 20 mins", status: "Pending ⏳" },
    { name: "Meditate", status: "Done ✅" },
  ];

  return (
    <div className="bg-stalker-offwhite shadow rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-stalker-brown">
        Today's Habits
      </h3>
      <ul className="space-y-3">
        {habits.map((habit, i) => (
          <li
            key={i}
            className="flex justify-between items-center border-b pb-2"
          >
            <span>{habit.name}</span>
            <span className="text-stalker-gray">{habit.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default HabitsList;
