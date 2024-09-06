// components/PerformanceCard.tsx
import React, { ReactNode } from "react";

type PerformanceCardProps = {
  title: string | ReactNode | any;
  value: string | number | any;
};

const PerformanceCard: React.FC<PerformanceCardProps> = ({ title, value }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-[#501078] mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export { PerformanceCard };
