"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { InputField } from "./InputField";
import { PackageOption } from "./PackageOption";
import { ROIMetrics } from "./ROIMetrics";
import { SavingsCard } from "./SavingsCard";
import { TotalImpact } from "./TotalImpact";
import {
  formatNumberWithCommas,
  formatPercentage,
  getMultiplier,
} from "@/utils/calculator";
import type {
  Inputs,
  Savings,
  DriverInsights,
  SelectedPackage,
} from "@/types/calculator";
import { packages } from "@/data/packages";

export default function ROICalculator() {
  // Business inputs state with empty initial values
  const [inputs, setInputs] = useState<Inputs>({
    revenue: 0,
    employees: 0,
    avgHourlyCost: 0,
    manualTaskHours: 0,
    customerServiceHours: 0,
    lostLeadsPerMonth: 0,
    avgDealSize: 0,
  });

  // Calculated savings state
  const [savings, setSavings] = useState<Savings>({
    growth: { annual: 0, threeYear: 0, details: {} },
    fulfillment: { annual: 0, threeYear: 0, details: {} },
    innovation: { annual: 0, threeYear: 0, details: {} },
  });

  // Add insights state
  const [insights, setInsights] = useState<{
    growth: DriverInsights;
    fulfillment: DriverInsights;
    innovation: DriverInsights;
  }>({
    growth: { paybackMonths: 0, keyMetrics: [] },
    fulfillment: { paybackMonths: 0, keyMetrics: [] },
    innovation: { paybackMonths: 0, keyMetrics: [] },
  });

  // Add selected packages state
  const [selectedPackages, setSelectedPackages] = useState<SelectedPackage[]>(
    []
  );

  const hasSelectedPackages = useCallback(() => {
    return selectedPackages.length > 0;
  }, [selectedPackages]);

  const calculateImplementationCost = useCallback(() => {
    // Start with Technology Assessment cost
    let totalCost = 3600;

    // Add costs for selected packages with validation
    selectedPackages.forEach(({ category, name, cost }) => {
      // Find the package category in the packages data
      const categoryPackages = packages[category];
      if (!categoryPackages) return;

      // Find the specific package in the category
      const packageData = categoryPackages.find((p) => p.name === name);
      if (!packageData) return;

      // Find the option that matches the cost to validate it exists
      const optionExists = packageData.options.some((opt) => opt.cost === cost);
      if (optionExists) {
        totalCost += cost;
      }
    });

    return totalCost;
  }, [selectedPackages]);

  const calculateDriverCost = useCallback(
    (driver: "growth" | "fulfillment" | "innovation") => {
      let driverCost = 0;
      const driverPackages = selectedPackages.filter(
        (p) => p.category === driver
      );
      driverPackages.forEach(({ cost }) => {
        driverCost += cost;
      });
      return driverCost + (driverPackages.length > 0 ? 1200 : 0);
    },
    [selectedPackages]
  );

  const calculateROI = useCallback(() => {
    if (!hasSelectedPackages()) {
      setInsights({
        growth: { paybackMonths: 0, keyMetrics: [] },
        fulfillment: { paybackMonths: 0, keyMetrics: [] },
        innovation: { paybackMonths: 0, keyMetrics: [] },
      });
      setSavings({
        growth: { annual: 0, threeYear: 0, details: {} },
        fulfillment: { annual: 0, threeYear: 0, details: {} },
        innovation: { annual: 0, threeYear: 0, details: {} },
      });
      return;
    }

    // Growth Driver Calculations
    const hasGrowthTiers = selectedPackages.some(
      (p) => p.category === "growth"
    );
    const leadManagementMultiplier = getMultiplier(
      "growth",
      "Lead Management System",
      selectedPackages
    );
    const salesProcessMultiplier = getMultiplier(
      "growth",
      "Sales Process Automation",
      selectedPackages
    );
    const marketingMultiplier = getMultiplier(
      "growth",
      "Marketing Performance Suite",
      selectedPackages
    );

    const improvedLeadCapture = hasGrowthTiers
      ? inputs.lostLeadsPerMonth *
        inputs.avgDealSize *
        (0.25 * 12 * leadManagementMultiplier)
      : 0;
    const salesEfficiency = hasGrowthTiers
      ? inputs.manualTaskHours *
        (0.3 * salesProcessMultiplier) *
        inputs.avgHourlyCost *
        52
      : 0;
    const marketingImpact = hasGrowthTiers
      ? inputs.revenue * (0.05 * marketingMultiplier)
      : 0;

    // Fulfillment Driver Calculations
    const hasFulfillmentTiers = selectedPackages.some(
      (p) => p.category === "fulfillment"
    );
    const operationsMultiplier = getMultiplier(
      "fulfillment",
      "Operations Automation",
      selectedPackages
    );
    const clientPortalMultiplier = getMultiplier(
      "fulfillment",
      "Client Portal Development",
      selectedPackages
    );
    const serviceDeliveryMultiplier = getMultiplier(
      "fulfillment",
      "Service Delivery Automation",
      selectedPackages
    );

    const operationalEfficiency = hasFulfillmentTiers
      ? inputs.manualTaskHours *
        (0.4 * operationsMultiplier) *
        inputs.avgHourlyCost *
        inputs.employees *
        52
      : 0;
    const customerServiceSavings = hasFulfillmentTiers
      ? inputs.customerServiceHours *
        (0.35 * serviceDeliveryMultiplier) *
        inputs.avgHourlyCost *
        52
      : 0;
    const errorReduction = hasFulfillmentTiers
      ? inputs.revenue * (0.02 * clientPortalMultiplier)
      : 0;

    // Innovation Driver Calculations
    const hasInnovationTiers = selectedPackages.some(
      (p) => p.category === "innovation"
    );
    const processDigitizationMultiplier = getMultiplier(
      "innovation",
      "Process Digitization",
      selectedPackages
    );
    const customSoftwareMultiplier = getMultiplier(
      "innovation",
      "Custom Software Development",
      selectedPackages
    );
    const businessIntelligenceMultiplier = getMultiplier(
      "innovation",
      "Business Intelligence Implementation",
      selectedPackages
    );

    const processAutomation = hasInnovationTiers
      ? inputs.revenue * (0.03 * processDigitizationMultiplier)
      : 0;
    const competitiveAdvantage = hasInnovationTiers
      ? inputs.revenue * (0.04 * customSoftwareMultiplier)
      : 0;
    const scalabilityValue = hasInnovationTiers
      ? inputs.revenue * (0.02 * businessIntelligenceMultiplier)
      : 0;

    // Calculate costs and totals
    const growthCost = calculateDriverCost("growth");
    const fulfillmentCost = calculateDriverCost("fulfillment");
    const innovationCost = calculateDriverCost("innovation");

    const growthTotal = improvedLeadCapture + salesEfficiency + marketingImpact;
    const fulfillmentTotal =
      operationalEfficiency + customerServiceSavings + errorReduction;
    const innovationTotal =
      processAutomation + competitiveAdvantage + scalabilityValue;

    // Update insights
    setInsights({
      growth: {
        paybackMonths:
          growthTotal > 0 ? Math.ceil((growthCost / growthTotal) * 12) : 0,
        keyMetrics: hasGrowthTiers
          ? [
              {
                label: "Additional Deals/Year",
                value: Math.round(
                  improvedLeadCapture / inputs.avgDealSize
                ).toString(),
              },
              {
                label: "Hours Saved/Year",
                value: Math.round(
                  inputs.manualTaskHours * (0.3 * salesProcessMultiplier) * 52
                ).toString(),
              },
              {
                label: "Revenue Growth",
                value: formatPercentage(0.05 * marketingMultiplier),
              },
            ]
          : [],
      },
      fulfillment: {
        paybackMonths:
          fulfillmentTotal > 0
            ? Math.ceil((fulfillmentCost / fulfillmentTotal) * 12)
            : 0,
        keyMetrics: hasFulfillmentTiers
          ? [
              {
                label: "Operational Hours Saved/Year",
                value: Math.round(
                  inputs.manualTaskHours * (0.4 * operationsMultiplier) * 52
                ).toString(),
              },
              {
                label: "Service Efficiency Gain",
                value: formatPercentage(0.35 * serviceDeliveryMultiplier),
              },
              {
                label: "Error Reduction",
                value: formatPercentage(0.02 * clientPortalMultiplier),
              },
            ]
          : [],
      },
      innovation: {
        paybackMonths:
          innovationTotal > 0
            ? Math.ceil((innovationCost / innovationTotal) * 12)
            : 0,
        keyMetrics: hasInnovationTiers
          ? [
              {
                label: "Process Efficiency Gain",
                value: formatPercentage(0.03 * processDigitizationMultiplier),
              },
              {
                label: "Market Advantage",
                value: formatPercentage(0.04 * customSoftwareMultiplier),
              },
              {
                label: "Scalability Impact",
                value: formatPercentage(0.02 * businessIntelligenceMultiplier),
              },
            ]
          : [],
      },
    });

    // Update savings
    setSavings({
      growth: {
        annual: growthTotal,
        threeYear: growthTotal * 3.2,
        details: {
          leadCapture: improvedLeadCapture,
          salesEfficiency: salesEfficiency,
          marketingImpact: marketingImpact,
        },
      },
      fulfillment: {
        annual: fulfillmentTotal,
        threeYear: fulfillmentTotal * 3,
        details: {
          operational: operationalEfficiency,
          customerService: customerServiceSavings,
          errorReduction: errorReduction,
        },
      },
      innovation: {
        annual: innovationTotal,
        threeYear: innovationTotal * 3.5,
        details: {
          automation: processAutomation,
          competitive: competitiveAdvantage,
          scalability: scalabilityValue,
        },
      },
    });
  }, [inputs, selectedPackages, hasSelectedPackages, calculateDriverCost]);

  // Calculate ROI whenever inputs or selected packages change
  useEffect(() => {
    calculateROI();
  }, [calculateROI]);

  // Set default values after initial render
  useEffect(() => {
    setInputs({
      revenue: 1000000,
      employees: 10,
      avgHourlyCost: 50,
      manualTaskHours: 20,
      customerServiceHours: 15,
      lostLeadsPerMonth: 10,
      avgDealSize: 5000,
    });
  }, []);

  const handleInputChange = useCallback((key: keyof Inputs, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [key]: value === "" ? 0 : Number(value),
    }));
  }, []);

  const handlePackageSelection = useCallback(
    (category: string, packageName: string, option: PackageOption) => {
      setSelectedPackages((prev) => {
        const existingIndex = prev.findIndex(
          (p) => p.category === category && p.name === packageName
        );

        if (existingIndex >= 0 && prev[existingIndex].tier === option.name) {
          return prev.filter((_, index) => index !== existingIndex);
        }

        const filtered = prev.filter(
          (p) => !(p.category === category && p.name === packageName)
        );

        return [
          ...filtered,
          {
            category,
            name: packageName,
            tier: option.name,
            cost: option.cost,
            hours: option.hours,
          },
        ];
      });
    },
    []
  );

  // Input tooltips content
  const inputTooltips = useMemo(
    () => ({
      revenue: "Your company's total annual revenue before taxes and expenses",
      employees: "Total number of full-time employees in your organization",
      avgHourlyCost:
        "Average hourly cost per employee including benefits and overhead",
      manualTaskHours:
        "Hours spent per week by each employee on manual, repetitive tasks that could be automated",
      customerServiceHours:
        "Total weekly hours spent on customer service and support activities",
      lostLeadsPerMonth:
        "Number of potential customers lost monthly due to slow follow-up or process inefficiencies",
      avgDealSize:
        "Average revenue generated from a single customer or transaction",
    }),
    []
  );

  return (
    <div className="calculator-container">
      <div className="flex items-center justify-between mb-8">
        <Image
          src="/stoa-logo.svg"
          alt="STOA"
          className="stoa-logo"
          width={120}
          height={40}
          priority
        />
        <h1>Digital Transformation ROI Calculator</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Annual Revenue"
          tooltipUnit="USD"
          value={inputs.revenue}
          onChange={(value) => handleInputChange("revenue", value)}
          placeholder="Enter annual revenue"
          tooltip={inputTooltips.revenue}
        />
        {/* Add other input fields similarly */}
      </div>

      <div className="mt-12">
        <h2>Select Your Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(packages).map(([category, categoryPackages]) => (
            <div key={category} className="package-selector">
              <h3 className="capitalize">{category}</h3>
              {categoryPackages.map((pkg) => (
                <PackageOption
                  key={pkg.name}
                  name={pkg.name}
                  options={pkg.options}
                  currentSelection={
                    selectedPackages.find(
                      (p) => p.category === category && p.name === pkg.name
                    )?.tier
                  }
                  onSelect={(value) =>
                    handlePackageSelection(
                      category,
                      pkg.name,
                      pkg.options.find((opt) => opt.name === value)!
                    )
                  }
                  formatNumberWithCommas={formatNumberWithCommas}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {insights &&
        Object.values(insights).some(
          (insight) => insight.keyMetrics.length > 0
        ) && (
          <div className="mt-12">
            <h2>ROI Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(insights).map(
                ([category, driverInsight]) =>
                  driverInsight.keyMetrics.length > 0 && (
                    <ROIMetrics
                      key={category}
                      category={category}
                      insights={driverInsight}
                    />
                  )
              )}
            </div>
          </div>
        )}

      {savings && hasSelectedPackages() && (
        <div className="mt-12">
          <h2>Projected Savings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(savings).map(([category, data]) => (
              <SavingsCard
                key={category}
                category={category}
                annual={data.annual}
                threeYear={data.threeYear}
              />
            ))}
          </div>
        </div>
      )}

      <TotalImpact
        implementationCost={calculateImplementationCost()}
        savings={savings}
      />
    </div>
  );
}
