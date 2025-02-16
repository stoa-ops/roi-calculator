import React from "react";
import { formatNumberWithCommas } from "@/utils/calculator";

interface SavingsCardProps {
  category: string;
  annual: number;
  threeYear: number;
}

export const SavingsCard: React.FC<SavingsCardProps> = ({
  category,
  annual,
  threeYear,
}) => {
  return (
    <div className="savings-card">
      <h3 className="capitalize mb-6">{category}</h3>
      <div className="space-y-6">
        <div>
          <p className="savings-label">Annual Savings</p>
          <p className="savings-value">
            ${formatNumberWithCommas(Math.round(annual))}
          </p>
        </div>
        <div>
          <p className="savings-label">3-Year Savings</p>
          <p className="savings-value">
            ${formatNumberWithCommas(Math.round(threeYear))}
          </p>
        </div>
      </div>
    </div>
  );
};
