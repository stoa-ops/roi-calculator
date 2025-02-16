"use client";

import React, { useState, useEffect, useCallback } from "react";

interface Savings {
  growth: {
    annual: number;
    threeYear: number;
    details: {
      leadCapture?: number;
      salesEfficiency?: number;
      marketingImpact?: number;
    };
  };
  fulfillment: {
    annual: number;
    threeYear: number;
    details: {
      operational?: number;
      customerService?: number;
      errorReduction?: number;
    };
  };
  innovation: {
    annual: number;
    threeYear: number;
    details: {
      automation?: number;
      competitive?: number;
      scalability?: number;
    };
  };
}

interface Inputs {
  revenue: number;
  employees: number;
  avgHourlyCost: number;
  manualTaskHours: number;
  customerServiceHours: number;
  lostLeadsPerMonth: number;
  avgDealSize: number;
}

interface DriverInsights {
  paybackMonths: number;
  keyMetrics: {
    label: string;
    value: string;
  }[];
}

interface PackageOption {
  name: string;
  description: string;
  cost: number;
  hours: number;
}

interface PackageCategory {
  name: string;
  options: PackageOption[];
}

interface SelectedPackage {
  name: string;
  category: string;
  tier: string;
  cost: number;
  hours: number;
}

const packages: Record<string, PackageCategory[]> = {
  growth: [
    {
      name: "Lead Management System",
      options: [
        {
          name: "Basic",
          description: "Core functionality with standard integrations",
          cost: 9600,
          hours: 80,
        },
        {
          name: "Standard",
          description: "Enhanced functionality with advanced integrations",
          cost: 14400,
          hours: 120,
        },
        {
          name: "Enterprise",
          description: "Full functionality with enterprise integrations",
          cost: 21600,
          hours: 180,
        },
      ],
    },
    {
      name: "Sales Process Automation",
      options: [
        {
          name: "Basic",
          description: "Core automation features",
          cost: 12000,
          hours: 100,
        },
        {
          name: "Standard",
          description: "Advanced automation with CRM integration",
          cost: 18000,
          hours: 150,
        },
        {
          name: "Enterprise",
          description: "Full-scale automation solution",
          cost: 24000,
          hours: 200,
        },
      ],
    },
    {
      name: "Marketing Performance Suite",
      options: [
        {
          name: "Basic",
          description: "Essential marketing tools",
          cost: 7200,
          hours: 60,
        },
        {
          name: "Standard",
          description: "Comprehensive marketing solution",
          cost: 12000,
          hours: 100,
        },
        {
          name: "Enterprise",
          description: "Enterprise marketing platform",
          cost: 18000,
          hours: 150,
        },
      ],
    },
  ],
  fulfillment: [
    {
      name: "Operations Automation",
      options: [
        {
          name: "Basic",
          description: "Core operations automation",
          cost: 14400,
          hours: 120,
        },
        {
          name: "Standard",
          description: "Advanced operations suite",
          cost: 21600,
          hours: 180,
        },
        {
          name: "Enterprise",
          description: "Enterprise operations platform",
          cost: 30000,
          hours: 250,
        },
      ],
    },
    {
      name: "Client Portal Development",
      options: [
        {
          name: "Basic",
          description: "Standard client portal",
          cost: 18000,
          hours: 150,
        },
        {
          name: "Standard",
          description: "Advanced client portal",
          cost: 24000,
          hours: 200,
        },
        {
          name: "Enterprise",
          description: "Enterprise portal solution",
          cost: 36000,
          hours: 300,
        },
      ],
    },
    {
      name: "Service Delivery Automation",
      options: [
        {
          name: "Basic",
          description: "Core service automation",
          cost: 12000,
          hours: 100,
        },
        {
          name: "Standard",
          description: "Advanced service platform",
          cost: 18000,
          hours: 150,
        },
        {
          name: "Enterprise",
          description: "Enterprise service suite",
          cost: 24000,
          hours: 200,
        },
      ],
    },
  ],
  innovation: [
    {
      name: "Custom Software Development",
      options: [
        {
          name: "Starter",
          description: "Basic custom development",
          cost: 24000,
          hours: 200,
        },
        {
          name: "Professional",
          description: "Advanced development suite",
          cost: 36000,
          hours: 300,
        },
        {
          name: "Enterprise",
          description: "Enterprise development platform",
          cost: 60000,
          hours: 500,
        },
      ],
    },
    {
      name: "Business Intelligence Implementation",
      options: [
        {
          name: "Basic",
          description: "Core BI functionality",
          cost: 18000,
          hours: 150,
        },
        {
          name: "Standard",
          description: "Advanced BI platform",
          cost: 24000,
          hours: 200,
        },
        {
          name: "Enterprise",
          description: "Enterprise BI solution",
          cost: 36000,
          hours: 300,
        },
      ],
    },
    {
      name: "Process Digitization",
      options: [
        {
          name: "Basic",
          description: "Core digitization features",
          cost: 14400,
          hours: 120,
        },
        {
          name: "Standard",
          description: "Advanced digitization suite",
          cost: 21600,
          hours: 180,
        },
        {
          name: "Enterprise",
          description: "Enterprise digitization platform",
          cost: 30000,
          hours: 250,
        },
      ],
    },
  ],
};

const formatNumberWithCommas = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

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
    growth: {
      annual: 0,
      threeYear: 0,
      details: {},
    },
    fulfillment: {
      annual: 0,
      threeYear: 0,
      details: {},
    },
    innovation: {
      annual: 0,
      threeYear: 0,
      details: {},
    },
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

      // Add 1/3 of assessment cost if driver has selections
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

  const handleInputChange = (key: keyof Inputs, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [key]: value === "" ? 0 : Number(value),
    }));
  };

  const handlePackageSelection = (
    category: string,
    packageName: string,
    option: PackageOption
  ) => {
    setSelectedPackages((prev) => {
      // Find if there's already a selection for this package in this category
      const existingIndex = prev.findIndex(
        (p) => p.category === category && p.name === packageName
      );

      // If this exact package is already selected, remove it (toggle off)
      if (existingIndex >= 0 && prev[existingIndex].tier === option.name) {
        return prev.filter((_, index) => index !== existingIndex);
      }

      // Remove any existing package of the same type (if different tier was selected)
      const filtered = prev.filter(
        (p) => !(p.category === category && p.name === packageName)
      );

      // Add the new selection with explicit tier tracking
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
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  // Package selection component
  const PackageSelector = ({
    driver,
  }: {
    driver: "growth" | "fulfillment" | "innovation";
  }) => {
    return (
      <div className="space-y-6">
        {packages[driver].map((category) => {
          // Find the current selection for this package
          const currentSelection = selectedPackages.find(
            (p) => p.category === driver && p.name === category.name
          );

          return (
            <div key={category.name} className="package-option">
              <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                {category.name}
                <span className="ml-1 text-gray-400">(Select tier)</span>
              </label>
              <div className="relative group">
                <select
                  className="w-full"
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (newValue === "") {
                      setSelectedPackages((prev) =>
                        prev.filter(
                          (p) =>
                            !(p.category === driver && p.name === category.name)
                        )
                      );
                    } else {
                      const selectedOption = category.options.find(
                        (opt) => opt.name === newValue
                      );
                      if (selectedOption) {
                        handlePackageSelection(
                          driver,
                          category.name,
                          selectedOption
                        );
                      }
                    }
                  }}
                  value={currentSelection?.tier || ""}
                >
                  <option value="">Choose a tier</option>
                  {category.options.map((option) => (
                    <option key={option.name} value={option.name}>
                      {option.name} (${formatNumberWithCommas(option.cost)})
                    </option>
                  ))}
                </select>
                <div className="tooltip-content left-full ml-4 top-0">
                  <div className="space-y-4">
                    {category.options.map((option) => (
                      <div key={option.name}>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {option.name}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                          {option.description}
                        </p>
                        <p className="text-green-600 dark:text-green-400 text-sm mt-1">
                          ${formatNumberWithCommas(option.cost)} •{" "}
                          {option.hours} hours
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Input tooltips content
  const inputTooltips: Record<keyof Inputs, string> = {
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
  };

  const getMultiplier = (
    driver: "growth" | "fulfillment" | "innovation",
    packageName: string,
    selectedPackages: SelectedPackage[]
  ): number => {
    const selection = selectedPackages.find(
      (p) => p.category === driver && p.name === packageName
    );

    if (!selection) return 0;

    // Use the explicitly stored tier name for multiplier calculation
    switch (selection.tier) {
      case "Basic":
      case "Starter":
        return 1;
      case "Standard":
      case "Professional":
        return 1.5;
      case "Enterprise":
        return 2;
      default:
        return 0;
    }
  };

  return (
    <div className="calculator-container">
      <div className="flex items-center justify-between mb-8">
        <img src="/stoa-logo.svg" alt="STOA" className="stoa-logo" />
        <h1>Digital Transformation ROI Calculator</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Fields */}
        <div className="input-group">
          <label className="input-label">
            Annual Revenue
            <span className="input-tooltip">(USD)</span>
          </label>
          <input
            type="number"
            value={inputs.revenue}
            onChange={(e) => handleInputChange("revenue", e.target.value)}
            placeholder="Enter annual revenue"
            min="0"
          />
          <div className="tooltip-content">{inputTooltips.revenue}</div>
        </div>

        <div className="input-group">
          <label className="input-label">
            Number of Employees
            <span className="input-tooltip">(#)</span>
          </label>
          <input
            type="number"
            value={inputs.employees}
            onChange={(e) => handleInputChange("employees", e.target.value)}
            placeholder="Enter number of employees"
            min="0"
          />
          <div className="tooltip-content">
            <p className="tooltip-text">{inputTooltips.employees}</p>
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">
            Average Hourly Cost
            <span className="input-tooltip">($)</span>
          </label>
          <input
            type="number"
            value={inputs.avgHourlyCost}
            onChange={(e) => handleInputChange("avgHourlyCost", e.target.value)}
            placeholder="Enter average hourly cost"
            min="0"
          />
          <div className="tooltip-content">
            <p className="tooltip-text">{inputTooltips.avgHourlyCost}</p>
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">
            Manual Task Hours
            <span className="input-tooltip">(monthly)</span>
          </label>
          <input
            type="number"
            value={inputs.manualTaskHours}
            onChange={(e) =>
              handleInputChange("manualTaskHours", e.target.value)
            }
            placeholder="Enter manual task hours"
            min="0"
          />
          <div className="tooltip-content">
            <p className="tooltip-text">{inputTooltips.manualTaskHours}</p>
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">
            Customer Service Hours
            <span className="input-tooltip">(monthly)</span>
          </label>
          <input
            type="number"
            value={inputs.customerServiceHours}
            onChange={(e) =>
              handleInputChange("customerServiceHours", e.target.value)
            }
            placeholder="Enter customer service hours"
            min="0"
          />
          <div className="tooltip-content">
            <p className="tooltip-text">{inputTooltips.customerServiceHours}</p>
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">
            Lost Leads per Month
            <span className="input-tooltip">(#)</span>
          </label>
          <input
            type="number"
            value={inputs.lostLeadsPerMonth}
            onChange={(e) =>
              handleInputChange("lostLeadsPerMonth", e.target.value)
            }
            placeholder="Enter lost leads per month"
            min="0"
          />
          <div className="tooltip-content">
            <p className="tooltip-text">{inputTooltips.lostLeadsPerMonth}</p>
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">
            Average Deal Size
            <span className="input-tooltip">($)</span>
          </label>
          <input
            type="number"
            value={inputs.avgDealSize}
            onChange={(e) => handleInputChange("avgDealSize", e.target.value)}
            placeholder="Enter average deal size"
            min="0"
          />
          <div className="tooltip-content">
            <p className="tooltip-text">{inputTooltips.avgDealSize}</p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2>Select Your Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(packages).map(([category]) => (
            <div key={category} className="package-selector">
              <h3 className="capitalize">{category}</h3>
              <PackageSelector
                driver={category as "growth" | "fulfillment" | "innovation"}
              />
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
                    <div key={category} className="roi-card">
                      <h3 className="capitalize">{category}</h3>
                      <div className="space-y-6">
                        {driverInsight.keyMetrics.map((metric, index) => (
                          <div key={index}>
                            <p className="metric-label">{metric.label}</p>
                            <p className="metric-value">{metric.value}</p>
                          </div>
                        ))}
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                          <p className="metric-label">ROI Positive In</p>
                          <p className="metric-value">
                            {driverInsight.paybackMonths} months
                          </p>
                        </div>
                      </div>
                    </div>
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
              <div key={category} className="savings-card">
                <h3 className="capitalize mb-6">{category}</h3>
                <div className="space-y-6">
                  <div>
                    <p className="savings-label">Annual Savings</p>
                    <p className="savings-value">
                      ${formatNumberWithCommas(Math.round(data.annual))}
                    </p>
                  </div>
                  <div>
                    <p className="savings-label">3-Year Savings</p>
                    <p className="savings-value">
                      ${formatNumberWithCommas(Math.round(data.threeYear))}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="total-impact-footer">
        <div className="total-impact-content">
          <div className="impact-metric">
            <h3 className="impact-value">
              ${formatNumberWithCommas(calculateImplementationCost())}
            </h3>
            <p className="impact-label">Total Implementation Cost</p>
          </div>
          <div className="impact-metric">
            <h3 className="impact-value">
              $
              {formatNumberWithCommas(
                Math.round(
                  savings.growth.annual +
                    savings.fulfillment.annual +
                    savings.innovation.annual || 0
                )
              )}
            </h3>
            <p className="impact-label">Annual Total Impact</p>
          </div>
          <div className="impact-metric">
            <h3 className="impact-value">
              $
              {formatNumberWithCommas(
                Math.round(
                  savings.growth.threeYear +
                    savings.fulfillment.threeYear +
                    savings.innovation.threeYear || 0
                )
              )}
            </h3>
            <p className="impact-label">3-Year Total Impact</p>
          </div>
        </div>
      </div>
    </div>
  );
}
