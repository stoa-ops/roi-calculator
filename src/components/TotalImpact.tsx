import React from "react";
import { formatNumberWithCommas } from "@/utils/calculator";
import { Savings } from "@/types/calculator";

interface TotalImpactProps {
  implementationCost: number;
  savings: Savings;
}

export const TotalImpact: React.FC<TotalImpactProps> = ({
  implementationCost,
  savings,
}) => {
  const annualTotal =
    savings.growth.annual +
      savings.fulfillment.annual +
      savings.innovation.annual || 0;

  const threeYearTotal =
    savings.growth.threeYear +
      savings.fulfillment.threeYear +
      savings.innovation.threeYear || 0;

  return (
    <div className="total-impact-footer">
      <div className="total-impact-content">
        <div className="impact-metric">
          <h3 className="impact-value">
            ${formatNumberWithCommas(implementationCost)}
          </h3>
          <p className="impact-label">Total Implementation Cost</p>
        </div>
        <div className="impact-metric">
          <h3 className="impact-value">
            ${formatNumberWithCommas(Math.round(annualTotal))}
          </h3>
          <p className="impact-label">Annual Total Impact</p>
        </div>
        <div className="impact-metric">
          <h3 className="impact-value">
            ${formatNumberWithCommas(Math.round(threeYearTotal))}
          </h3>
          <p className="impact-label">3-Year Total Impact</p>
        </div>
      </div>
    </div>
  );
};
