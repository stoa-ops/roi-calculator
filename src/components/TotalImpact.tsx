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

  const calculateROI = (impact: number) => {
    if (implementationCost === 0) return 0;
    return ((impact - implementationCost) / implementationCost) * 100;
  };

  const annualROI = calculateROI(annualTotal);
  const threeYearROI = calculateROI(threeYearTotal);

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
          <p className="impact-roi">+{Math.round(annualROI)}% ROI</p>
        </div>
        <div className="impact-metric">
          <h3 className="impact-value">
            ${formatNumberWithCommas(Math.round(threeYearTotal))}
          </h3>
          <p className="impact-label">3-Year Total Impact</p>
          <p className="impact-roi">+{Math.round(threeYearROI)}% ROI</p>
        </div>
      </div>
    </div>
  );
};
