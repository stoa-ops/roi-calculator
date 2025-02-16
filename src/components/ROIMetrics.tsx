import React from "react";
import { DriverInsights } from "@/types/calculator";

interface ROIMetricsProps {
  category: string;
  insights: DriverInsights;
}

export const ROIMetrics: React.FC<ROIMetricsProps> = ({
  category,
  insights,
}) => {
  if (insights.keyMetrics.length === 0) return null;

  return (
    <div className="roi-card">
      <h3 className="capitalize">{category}</h3>
      <div className="space-y-6">
        {insights.keyMetrics.map((metric, index) => (
          <div key={index}>
            <p className="metric-label">{metric.label}</p>
            <p className="metric-value">{metric.value}</p>
          </div>
        ))}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="metric-label">ROI Positive In</p>
          <p className="metric-value">{insights.paybackMonths} months</p>
        </div>
      </div>
    </div>
  );
};
