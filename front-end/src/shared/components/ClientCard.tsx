import React from "react";

interface ClientCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor?: string;
  textColor?: string;
}

export function ClientCard({
  title,
  value,
  icon,
  bgColor = "bg-white",
  textColor = "text-[#1a1a1a]",
}: ClientCardProps) {
  return (
    <div
      className={`${bgColor} rounded-[24px] shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-3`}
    >
      <div className="flex items-center justify-between">
        <h3 className={`${textColor} text-sm font-medium opacity-70`}>{title}</h3>
        <div className="text-2xl">{icon}</div>
      </div>
      <p className={`${textColor} text-3xl font-bold`}>{value}</p>
    </div>
  );
}
