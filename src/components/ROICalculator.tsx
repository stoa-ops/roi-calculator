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

    // Add costs for selected packages
    selectedPackages.forEach(({ category, cost }) => {
      const packageCategory = packages[category].find(
        (p) => p.name === category
      );
      if (packageCategory) {
        const option = packageCategory.options.find((o) => o.name === category);
        if (option) {
          totalCost += option.cost;
        }
      }
    });

    return totalCost;
  }, [selectedPackages]);

  // Helper function to calculate implementation cost for a specific driver
  const calculateDriverCost = useCallback(
    (driver: "growth" | "fulfillment" | "innovation") => {
      let driverCost = 0;
      selectedPackages.forEach(({ category, cost }) => {
        const packageCategory = packages[driver].find(
          (p) => p.name === category
        );
        if (packageCategory) {
          const option = packageCategory.options.find(
            (o) => o.name === category
          );
          if (option) {
            driverCost += option.cost;
          }
        }
      });
      return driverCost + (selectedPackages.length > 0 ? 1200 : 0); // Add 1/3 of assessment cost if driver has selections
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

    // Get multipliers based on selected package tiers
    const getMultiplier = (
      driver: "growth" | "fulfillment" | "innovation",
      category: string
    ) => {
      const selection = selectedPackages.find(
        (p) => p.name === category && p.category === driver
      );
      if (!selection) return 0; // Return 0 if no tier is selected for this category
      const tier = selection.name;
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
    const hasGrowthTiers = selectedPackages.some(
      (p) => p.category === "growth"
    );
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
    const hasFulfillmentTiers = selectedPackages.some(
      (p) => p.category === "fulfillment"
    );
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
    const hasInnovationTiers = selectedPackages.some(
      (p) => p.category === "innovation"
    );
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
  }, [
    inputs,
    selectedPackages,
    hasSelectedPackages,
    calculateDriverCost,
    setInsights,
    setSavings,
  ]);

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

  const handlePackageSelection = (category: string, option: PackageOption) => {
    setSelectedPackages((prev) => {
      const exists = prev.some(
        (p) => p.name === option.name && p.category === category
      );

      if (exists) {
        return prev.filter(
          (p) => !(p.name === option.name && p.category === category)
        );
      }

      return [...prev, { ...option, category }];
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
                className="w-full p-2 border rounded"
                onChange={(e) => {
                  const newValue = e.target.value;
                  const selectedOption = category.options.find(
                    (opt) => opt.name === newValue
                  );
                  if (selectedOption) {
                    handlePackageSelection(driver, selectedOption);
                  }
                }}
                value={
                  selectedPackages.find((p) => p.category === driver)?.name ||
                  ""
                }
              >
                <option value="">Choose a tier</option>
                {category.options.map((option) => (
                  <option key={option.name} value={option.name}>
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
    <div className="calculator-container">
      <h1>ROI Calculator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="input-group">
          <label className="input-label">
            Annual Revenue
            <span className="input-tooltip">($)</span>
          </label>
          <input
            type="number"
            value={inputs.revenue}
            onChange={(e) => handleInputChange("revenue", e.target.value)}
            placeholder="Enter annual revenue"
          />
          <div className="tooltip-content">
            <p className="tooltip-text">
              Enter your company&apos;s annual revenue to help calculate
              potential savings.
            </p>
          </div>
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
          />
          <div className="tooltip-content">
            <p className="tooltip-text">
              The total number of employees in your organization.
            </p>
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
          />
          <div className="tooltip-content">
            <p className="tooltip-text">
              The average hourly cost per employee including benefits and
              overhead.
            </p>
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
          />
          <div className="tooltip-content">
            <p className="tooltip-text">
              Hours spent on manual tasks that could be automated per month.
            </p>
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
          />
          <div className="tooltip-content">
            <p className="tooltip-text">
              Hours spent on customer service activities per month.
            </p>
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
          />
          <div className="tooltip-content">
            <p className="tooltip-text">
              Number of potential customers lost due to inefficient processes
              per month.
            </p>
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
          />
          <div className="tooltip-content">
            <p className="tooltip-text">
              The average value of a closed deal or sale.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2>Select Your Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(packages).map(([category, categoryPackages]) => (
            <div key={category} className="space-y-4">
              <h3 className="capitalize">{category}</h3>
              <PackageSelector
                driver={category as "growth" | "fulfillment" | "innovation"}
              />
            </div>
          ))}
        </div>
      </div>

      {insights && (
        <div className="space-y-6">
          <h2>ROI Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.values(insights).map(
              (driverInsight: DriverInsights, index: number) => (
                <div
                  key={index}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
                >
                  {driverInsight.keyMetrics.map((metric, metricIndex) => (
                    <div key={metricIndex}>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {metric.label}
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      )}

      {savings && (
        <div className="mt-8 space-y-6">
          <h2>Projected Savings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(savings).map(([category, data]) => (
              <div
                key={category}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow"
              >
                <h3 className="capitalize mb-4">{category}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Annual Savings
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      ${data.annual.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      3-Year Savings
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      ${data.threeYear.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
