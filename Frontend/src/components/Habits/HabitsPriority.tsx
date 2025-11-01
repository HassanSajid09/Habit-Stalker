import { useHabits } from "../../hooks/habits";
import HabitItem from "./HabitItem";

const HabitsPriority = ({ priority }: { priority: string }) => {
  const { useHabitsByPriority } = useHabits();
  const { data: habits, isLoading, isError } = useHabitsByPriority(priority);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;
  console.log(habits);

  return (
    <div>
      {habits?.map((habit: any) => (
        <HabitItem key={habit._id} habit={habit} />
      ))}
    </div>
  );
};

export default HabitsPriority;
