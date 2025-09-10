import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  Area,
  Line,
} from "recharts";

const data = [
  { day: "Mon", completed: 3, planned: 5 },
  { day: "Tue", completed: 4, planned: 5 },
  { day: "Wed", completed: 2, planned: 4 },
  { day: "Thu", completed: 5, planned: 5 },
  { day: "Fri", completed: 3, planned: 5 },
  { day: "Sat", completed: 4, planned: 5 },
  { day: "Sun", completed: 5, planned: 5 },
];

const AnalyticsPreview = () => (
  <div className="bg-stalker-offwhite shadow rounded-xl p-6">
    <h3 className="text-lg font-semibold mb-4 text-stalker-brown">
      Weekly Habit Analytics
    </h3>
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          {/* Completed habits fill */}
          <linearGradient id="completedFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8B5E3C" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8B5E3C" stopOpacity={0} />
          </linearGradient>
          {/* Planned habits fill */}
          <linearGradient id="plannedFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#C19A6B" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#C19A6B" stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis dataKey="day" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" stroke="#e0d7cf" />
        <Tooltip />

        {/* Areas */}
        <Area
          type="monotone"
          dataKey="planned"
          stroke="#C19A6B"
          fillOpacity={1}
          fill="url(#plannedFill)"
        />
        <Area
          type="monotone"
          dataKey="completed"
          stroke="#8B5E3C"
          fillOpacity={1}
          fill="url(#completedFill)"
        />

        {/* Lines overlay */}
        <Line
          type="monotone"
          dataKey="planned"
          stroke="#9C7B56"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="completed"
          stroke="#5C4033"
          strokeWidth={2}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default AnalyticsPreview;
