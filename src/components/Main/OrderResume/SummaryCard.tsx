import { ReactNode } from "react";

type SummaryCardProps = {
  icon: ReactNode;
  label: string;
  value: number;
  bgColor: string;
  iconBgColor: string;
  textColor?: string;
};

export default function SummaryCard({
  icon,
  label,
  value,
  bgColor,
  iconBgColor,
  textColor = "text-black",
}: SummaryCardProps) {
  return (
    <div
      className={`flex items-center cursor-pointer gap-4 rounded-md p-4 w-full transition-all ${bgColor} hover:shadow-sm hover:-translate-y-1`}
    >
      <div className={`p-2 rounded-full ${iconBgColor}`}>{icon}</div>
      <div>
        <p className={`text-sm font-medium ${textColor}`}>{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}
