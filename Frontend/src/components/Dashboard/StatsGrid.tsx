import { TrendingUp, CalendarCheck, Clock } from "lucide-react";
import StatsCard from "./StatsCard";

const StatsGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <StatsCard
      icon={<CalendarCheck size={20} />}
      title="Habits Completed"
      value="8/10"
    />
    <StatsCard icon={<TrendingUp size={20} />} title="Streak" value="12 days" />
    <StatsCard
      icon={<Clock size={20} />}
      title="Avg. Time Spent"
      value="45 min"
    />
  </div>
);
export default StatsGrid;
