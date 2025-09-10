type StatsCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string | number;
};

const StatsCard = ({ icon, title, value }: StatsCardProps) => (
  <div className="bg-stalker-offwhite shadow rounded-xl p-4 flex items-center gap-4 hover:shadow-lg transition">
    <div className="p-3 bg-stalker-brown text-stalker-offwhite rounded-lg">
      {icon}
    </div>
    <div>
      <h4 className="text-stalker-gray text-sm">{title}</h4>
      <p className="text-2xl font-semibold text-stalker-brown">{value}</p>
    </div>
  </div>
);
export default StatsCard;
