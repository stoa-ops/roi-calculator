"use client";

import React, { useState, useEffect } from "react";

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

export const ROICalculator = () => {
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
  const [selectedPackages, setSelectedPackages] = useState<{
    growth: string[];
    fulfillment: string[];
    innovation: string[];
  }>({
    growth: [],
    fulfillment: [],
    innovation: [],
  });

  // Calculate ROI whenever inputs or selected packages change
  useEffect(() => {
    calculateROI();
  }, [inputs, selectedPackages]);

  const calculateImplementationCost = () => {
    // Start with Technology Assessment cost
    let totalCost = 3600;

    // Add costs for selected packages
    Object.entries(selectedPackages).forEach(([driver, selections]) => {
      selections.forEach((selection) => {
        const [category, tier] = selection.split("|");
        const packageCategory = packages[driver].find(
          (p) => p.name === category
        );
        if (packageCategory) {
          const option = packageCategory.options.find((o) => o.name === tier);
          if (option) {
            totalCost += option.cost;
          }
        }
      });
    });

    return totalCost;
  };

  const hasSelectedPackages = () => {
    return Object.values(selectedPackages).some(
      (selections) => selections.length > 0
    );
  };

  const calculateROI = () => {
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

    // Get multipliers based on selected package tiers
    const getMultiplier = (
      driver: "growth" | "fulfillment" | "innovation",
      category: string
    ) => {
      const selection = selectedPackages[driver].find((s: string) =>
        s.startsWith(category)
      );
      if (!selection) return 0; // Return 0 if no tier is selected for this category
      const tier = selection.split("|")[1];
      switch (tier) {
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

    // Growth Driver Calculations - only if growth tiers are selected
    const hasGrowthTiers = selectedPackages.growth.length > 0;
    const improvedLeadCapture = hasGrowthTiers
      ? inputs.lostLeadsPerMonth *
        inputs.avgDealSize *
        (0.25 * getMultiplier("growth", "Lead Management System")) *
        12
      : 0;
    const salesEfficiency = hasGrowthTiers
      ? inputs.manualTaskHours *
        (0.3 * getMultiplier("growth", "Sales Process Automation")) *
        inputs.avgHourlyCost *
        52
      : 0;
    const marketingImpact = hasGrowthTiers
      ? inputs.revenue *
        (0.05 * getMultiplier("growth", "Marketing Performance Suite"))
      : 0;

    // Fulfillment Driver Calculations - only if fulfillment tiers are selected
    const hasFulfillmentTiers = selectedPackages.fulfillment.length > 0;
    const operationalEfficiency = hasFulfillmentTiers
      ? inputs.manualTaskHours *
        (0.4 * getMultiplier("fulfillment", "Operations Automation")) *
        inputs.avgHourlyCost *
        inputs.employees *
        52
      : 0;
    const customerServiceSavings = hasFulfillmentTiers
      ? inputs.customerServiceHours *
        (0.35 * getMultiplier("fulfillment", "Service Delivery Automation")) *
        inputs.avgHourlyCost *
        52
      : 0;
    const errorReduction = hasFulfillmentTiers
      ? inputs.revenue *
        (0.02 * getMultiplier("fulfillment", "Client Portal Development"))
      : 0;

    // Innovation Driver Calculations - only if innovation tiers are selected
    const hasInnovationTiers = selectedPackages.innovation.length > 0;
    const processAutomation = hasInnovationTiers
      ? inputs.revenue *
        (0.03 * getMultiplier("innovation", "Process Digitization"))
      : 0;
    const competitiveAdvantage = hasInnovationTiers
      ? inputs.revenue *
        (0.04 * getMultiplier("innovation", "Custom Software Development"))
      : 0;
    const scalabilityValue = hasInnovationTiers
      ? inputs.revenue *
        (0.02 *
          getMultiplier("innovation", "Business Intelligence Implementation"))
      : 0;

    // Calculate insights for each driver independently
    const growthCost = calculateDriverCost("growth");
    const fulfillmentCost = calculateDriverCost("fulfillment");
    const innovationCost = calculateDriverCost("innovation");

    const growthInsights = {
      paybackMonths: hasGrowthTiers
        ? Math.ceil(
            (growthCost /
              (improvedLeadCapture + salesEfficiency + marketingImpact)) *
              12
          )
        : 0,
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
                inputs.manualTaskHours *
                  (0.3 * getMultiplier("growth", "Sales Process Automation")) *
                  52
              ).toString(),
            },
            {
              label: "Revenue Growth",
              value: formatPercentage(
                0.05 * getMultiplier("growth", "Marketing Performance Suite")
              ),
            },
          ]
        : [],
    };

    const fulfillmentInsights = {
      paybackMonths: hasFulfillmentTiers
        ? Math.ceil(
            (fulfillmentCost /
              (operationalEfficiency +
                customerServiceSavings +
                errorReduction)) *
              12
          )
        : 0,
      keyMetrics: hasFulfillmentTiers
        ? [
            {
              label: "Operational Hours Saved/Year",
              value: Math.round(
                inputs.manualTaskHours *
                  (0.4 *
                    getMultiplier("fulfillment", "Operations Automation")) *
                  52
              ).toString(),
            },
            {
              label: "Service Efficiency Gain",
              value: formatPercentage(
                0.35 *
                  getMultiplier("fulfillment", "Service Delivery Automation")
              ),
            },
            {
              label: "Error Reduction",
              value: formatPercentage(
                0.02 * getMultiplier("fulfillment", "Client Portal Development")
              ),
            },
          ]
        : [],
    };

    const innovationInsights = {
      paybackMonths: hasInnovationTiers
        ? Math.ceil(
            (innovationCost /
              (processAutomation + competitiveAdvantage + scalabilityValue)) *
              12
          )
        : 0,
      keyMetrics: hasInnovationTiers
        ? [
            {
              label: "Process Efficiency Gain",
              value: formatPercentage(
                0.03 * getMultiplier("innovation", "Process Digitization")
              ),
            },
            {
              label: "Market Advantage",
              value: formatPercentage(
                0.04 *
                  getMultiplier("innovation", "Custom Software Development")
              ),
            },
            {
              label: "Scalability Impact",
              value: formatPercentage(
                0.02 *
                  getMultiplier(
                    "innovation",
                    "Business Intelligence Implementation"
                  )
              ),
            },
          ]
        : [],
    };

    setInsights({
      growth: growthInsights,
      fulfillment: fulfillmentInsights,
      innovation: innovationInsights,
    });

    setSavings({
      growth: {
        annual: improvedLeadCapture + salesEfficiency + marketingImpact,
        threeYear:
          (improvedLeadCapture + salesEfficiency + marketingImpact) * 3.2,
        details: {
          leadCapture: improvedLeadCapture,
          salesEfficiency: salesEfficiency,
          marketingImpact: marketingImpact,
        },
      },
      fulfillment: {
        annual: operationalEfficiency + customerServiceSavings + errorReduction,
        threeYear:
          (operationalEfficiency + customerServiceSavings + errorReduction) * 3,
        details: {
          operational: operationalEfficiency,
          customerService: customerServiceSavings,
          errorReduction: errorReduction,
        },
      },
      innovation: {
        annual: processAutomation + competitiveAdvantage + scalabilityValue,
        threeYear:
          (processAutomation + competitiveAdvantage + scalabilityValue) * 3.5,
        details: {
          automation: processAutomation,
          competitive: competitiveAdvantage,
          scalability: scalabilityValue,
        },
      },
    });
  };

  // Helper function to calculate implementation cost for a specific driver
  const calculateDriverCost = (
    driver: "growth" | "fulfillment" | "innovation"
  ) => {
    let driverCost = 0;
    selectedPackages[driver].forEach((selection) => {
      const [category, tier] = selection.split("|");
      const packageCategory = packages[driver].find((p) => p.name === category);
      if (packageCategory) {
        const option = packageCategory.options.find((o) => o.name === tier);
        if (option) {
          driverCost += option.cost;
        }
      }
    });
    return driverCost + (selectedPackages[driver].length > 0 ? 1200 : 0); // Add 1/3 of assessment cost if driver has selections
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value.replace(/,/g, "")) || 0;
    setInputs((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
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
      <div className="space-y-6 mt-6">
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
          Select Solutions
        </h4>
        {packages[driver].map((category) => (
          <div key={category.name} className="relative">
            <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
              {category.name}
              <span className="ml-1 text-gray-400">(Select tier)</span>
            </label>
            <div className="relative group">
              <select
                suppressHydrationWarning
                className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg transition-all duration-200 hover:border-indigo-300 dark:hover:border-indigo-400"
                onChange={(e) => {
                  const newValue = e.target.value;
                  setSelectedPackages((prev) => ({
                    ...prev,
                    [driver]: newValue
                      ? [
                          ...prev[driver].filter(
                            (p) => !p.startsWith(category.name)
                          ),
                          newValue,
                        ]
                      : prev[driver].filter(
                          (p) => !p.startsWith(category.name)
                        ),
                  }));
                }}
                value={
                  selectedPackages[driver].find((p) =>
                    p.startsWith(category.name)
                  ) || ""
                }
              >
                <option value="">Choose a tier</option>
                {category.options.map((option) => (
                  <option
                    key={option.name}
                    value={`${category.name}|${option.name}`}
                  >
                    {option.name} (${formatNumberWithCommas(option.cost)})
                  </option>
                ))}
              </select>
              <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute left-full ml-4 top-0 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 transition-all duration-200 z-10">
                <div className="space-y-4">
                  {category.options.map((option) => (
                    <div key={option.name}>
                      <h5 className="font-medium text-gray-900 dark:text-white">
                        {option.name}
                      </h5>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                        {option.description}
                      </p>
                      <p className="text-indigo-600 dark:text-indigo-400 text-sm mt-1">
                        ${formatNumberWithCommas(option.cost)} • {option.hours}{" "}
                        hours
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
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

  return (
    <div className="w-full max-w-5xl mx-auto bg-gray-50 dark:bg-gray-900 p-8 rounded-xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Digital Transformation ROI Calculator
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Calculate the potential impact of digital transformation on your
          business across three key drivers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {Object.entries(inputs).map(([key, value]) => (
          <div key={key} className="space-y-2 relative group">
            <label
              htmlFor={key}
              className="block text-lg font-medium text-gray-900 dark:text-gray-100"
            >
              {key === "revenue"
                ? "Annual Revenue ($)"
                : key === "avgHourlyCost"
                ? "Average Hourly Cost ($/hour)"
                : key === "avgDealSize"
                ? "Average Deal Size ($)"
                : key === "manualTaskHours"
                ? "Weekly Manual Task Hours per Employee"
                : key === "customerServiceHours"
                ? "Weekly Customer Service Hours"
                : key === "lostLeadsPerMonth"
                ? "Lost Leads per Month"
                : "Number of Employees"}
              <span className="ml-1 text-gray-400 text-sm">(?)</span>
            </label>
            <div className="relative">
              <input
                id={key}
                name={key}
                type={
                  key === "revenue" || key === "avgDealSize" ? "text" : "number"
                }
                value={
                  key === "revenue" || key === "avgDealSize"
                    ? formatNumberWithCommas(value)
                    : value
                }
                onChange={handleInputChange}
                className="block w-full px-4 py-3 text-lg rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
                placeholder={key === "revenue" ? "1,000,000" : "0"}
              />
              <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute left-0 top-full mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 transition-all duration-200 z-10">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {inputTooltips[key as keyof Inputs]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-t-4 border-green-500">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Growth Driver
          </h3>
          <div className="space-y-6">
            {hasSelectedPackages() ? (
              <>
                <div>
                  <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(savings.growth.annual)}
                  </p>
                  <p className="text-base text-gray-600 dark:text-gray-400 mt-2">
                    Annual Impact
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-green-800 dark:text-green-300">
                    {formatCurrency(savings.growth.threeYear)}
                  </p>
                  <p className="text-base text-gray-600 dark:text-gray-400 mt-2">
                    3-Year Impact
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 dark:text-gray-400">
                  Select package tiers to see ROI calculations
                </p>
              </div>
            )}
            <PackageSelector driver="growth" />
            {hasSelectedPackages() && (
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-base font-medium text-gray-900 dark:text-white mb-2">
                  ROI Positive In
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">
                  {insights.growth.paybackMonths} months
                </p>
                <div className="space-y-3">
                  {insights.growth.keyMetrics.map((metric, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-base text-gray-600 dark:text-gray-400">
                        {metric.label}
                      </span>
                      <span className="text-base font-medium text-gray-900 dark:text-white">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-t-4 border-blue-500">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Fulfillment Driver
          </h3>
          <div className="space-y-6">
            {hasSelectedPackages() ? (
              <>
                <div>
                  <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(savings.fulfillment.annual)}
                  </p>
                  <p className="text-base text-gray-600 dark:text-gray-400 mt-2">
                    Annual Impact
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-blue-800 dark:text-blue-300">
                    {formatCurrency(savings.fulfillment.threeYear)}
                  </p>
                  <p className="text-base text-gray-600 dark:text-gray-400 mt-2">
                    3-Year Impact
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 dark:text-gray-400">
                  Select package tiers to see ROI calculations
                </p>
              </div>
            )}
            <PackageSelector driver="fulfillment" />
            {hasSelectedPackages() && (
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-base font-medium text-gray-900 dark:text-white mb-2">
                  ROI Positive In
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                  {insights.fulfillment.paybackMonths} months
                </p>
                <div className="space-y-3">
                  {insights.fulfillment.keyMetrics.map((metric, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-base text-gray-600 dark:text-gray-400">
                        {metric.label}
                      </span>
                      <span className="text-base font-medium text-gray-900 dark:text-white">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-t-4 border-purple-500">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Innovation Driver
          </h3>
          <div className="space-y-6">
            {hasSelectedPackages() ? (
              <>
                <div>
                  <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                    {formatCurrency(savings.innovation.annual)}
                  </p>
                  <p className="text-base text-gray-600 dark:text-gray-400 mt-2">
                    Annual Impact
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-purple-800 dark:text-purple-300">
                    {formatCurrency(savings.innovation.threeYear)}
                  </p>
                  <p className="text-base text-gray-600 dark:text-gray-400 mt-2">
                    3-Year Impact
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 dark:text-gray-400">
                  Select package tiers to see ROI calculations
                </p>
              </div>
            )}
            <PackageSelector driver="innovation" />
            {hasSelectedPackages() && (
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-base font-medium text-gray-900 dark:text-white mb-2">
                  ROI Positive In
                </p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                  {insights.innovation.paybackMonths} months
                </p>
                <div className="space-y-3">
                  {insights.innovation.keyMetrics.map((metric, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-base text-gray-600 dark:text-gray-400">
                        {metric.label}
                      </span>
                      <span className="text-base font-medium text-gray-900 dark:text-white">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {hasSelectedPackages() ? (
        <div className="bg-green-900 dark:bg-green-800 p-8 rounded-xl shadow-lg text-white">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-2xl font-semibold">Total Impact</h3>
              <p className="text-base opacity-80 mt-2">
                Estimated return on your digital transformation investment
              </p>
            </div>
            <div className="text-right">
              <p className="text-base font-medium">Total Implementation Cost</p>
              <p className="text-3xl font-bold mt-1">
                {formatCurrency(calculateImplementationCost())}
              </p>
              <p className="text-sm opacity-80 mt-2">
                Includes Initial Technology Assessment & Roadmap ($3,600)
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 rounded-xl p-6">
              <div>
                <div className="flex items-baseline">
                  <p className="text-5xl font-bold">
                    {formatCurrency(
                      savings.growth.annual +
                        savings.fulfillment.annual +
                        savings.innovation.annual
                    )}
                  </p>
                  <p className="text-lg ml-2 opacity-80">
                    (
                    {Math.round(
                      ((savings.growth.annual +
                        savings.fulfillment.annual +
                        savings.innovation.annual -
                        calculateImplementationCost()) /
                        calculateImplementationCost()) *
                        100
                    )}
                    % ROI)
                  </p>
                </div>
                <p className="text-base opacity-80 mt-2">Annual Total Impact</p>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <div>
                <div className="flex items-baseline">
                  <p className="text-5xl font-bold">
                    {formatCurrency(
                      savings.growth.threeYear +
                        savings.fulfillment.threeYear +
                        savings.innovation.threeYear
                    )}
                  </p>
                  <p className="text-lg ml-2 opacity-80">
                    (
                    {Math.round(
                      ((savings.growth.threeYear +
                        savings.fulfillment.threeYear +
                        savings.innovation.threeYear -
                        calculateImplementationCost()) /
                        calculateImplementationCost()) *
                        100
                    )}
                    % ROI)
                  </p>
                </div>
                <p className="text-base opacity-80 mt-2">3-Year Total Impact</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl text-center">
          <p className="text-xl text-gray-500 dark:text-gray-400">
            Select at least one package tier to see total impact calculations
          </p>
        </div>
      )}
    </div>
  );
};
