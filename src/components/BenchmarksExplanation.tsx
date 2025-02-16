"use client";

import React from "react";

const benchmarks = [
  {
    category: "Growth Driver",
    metrics: [
      {
        name: "Lead Capture Improvement",
        value: "25%",
        explanation:
          "Based on industry data showing digital transformation typically improves lead conversion rates by 20-30% through better tracking and engagement.",
      },
      {
        name: "Sales Efficiency",
        value: "30%",
        explanation:
          "Reduction in manual sales tasks through automation and improved CRM integration.",
      },
      {
        name: "Marketing Impact",
        value: "5%",
        explanation:
          "Conservative estimate of revenue increase through improved digital marketing capabilities and customer targeting.",
      },
    ],
  },
  {
    category: "Fulfillment Driver",
    metrics: [
      {
        name: "Operational Efficiency",
        value: "40%",
        explanation:
          "Reduction in manual operational tasks through process automation and workflow optimization.",
      },
      {
        name: "Customer Service Optimization",
        value: "35%",
        explanation:
          "Improvement in customer service efficiency through automated responses and better ticket management.",
      },
      {
        name: "Error Reduction",
        value: "2%",
        explanation:
          "Cost savings from reduced errors in manual processes and improved accuracy.",
      },
    ],
  },
  {
    category: "Innovation Driver",
    metrics: [
      {
        name: "Process Automation",
        value: "3%",
        explanation:
          "Efficiency gains through automated workflows and reduced manual intervention.",
      },
      {
        name: "Competitive Advantage",
        value: "4%",
        explanation:
          "Revenue impact from improved market position and customer satisfaction.",
      },
      {
        name: "Scalability Value",
        value: "2%",
        explanation:
          "Additional growth capacity through improved systems and processes.",
      },
    ],
  },
];

export const BenchmarksExplanation = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-green-900 dark:text-green-400 mb-4">
          How We Calculate Your ROI
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
          Our calculator uses industry benchmarks and real-world data to
          estimate the potential impact of digital transformation on your
          business. We break this down into three key areas:
        </p>
      </div>

      <div className="space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Growth Driver: Improving Your Sales & Marketing
          </h3>
          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Lead Capture Improvement
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                By implementing better systems to track and engage with
                potential customers, businesses typically see:
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-600 dark:text-gray-300">
                <li>Basic tier: 25% improvement in lead conversion</li>
                <li>Standard tier: 37.5% better conversion rates</li>
                <li>Enterprise tier: 50% increase in successful conversions</li>
              </ul>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Sales Process Efficiency
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Automating manual sales tasks and improving CRM integration
                leads to:
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-600 dark:text-gray-300">
                <li>Basic tier: 30% reduction in manual sales work</li>
                <li>Standard tier: 45% time saved on repetitive tasks</li>
                <li>Enterprise tier: 60% more efficient sales processes</li>
              </ul>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Marketing Performance
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Enhanced digital marketing capabilities result in revenue
                growth:
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-600 dark:text-gray-300">
                <li>Basic tier: 5% increase in revenue</li>
                <li>Standard tier: 7.5% revenue growth</li>
                <li>Enterprise tier: 10% revenue improvement</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Fulfillment Driver: Streamlining Your Operations
          </h3>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Operational Efficiency
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Automating day-to-day operations typically results in:
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-600 dark:text-gray-300">
                <li>Basic tier: 40% reduction in manual tasks</li>
                <li>Standard tier: 60% more efficient processes</li>
                <li>Enterprise tier: 80% improvement in workflow efficiency</li>
              </ul>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Customer Service Optimization
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Better service delivery systems lead to time savings:
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-600 dark:text-gray-300">
                <li>Basic tier: 35% reduction in service time</li>
                <li>Standard tier: 52.5% faster service delivery</li>
                <li>Enterprise tier: 70% improvement in response times</li>
              </ul>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Error Reduction
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Automated systems help reduce costly mistakes:
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-600 dark:text-gray-300">
                <li>Basic tier: 2% cost savings</li>
                <li>Standard tier: 3% reduction in errors</li>
                <li>Enterprise tier: 4% improvement in accuracy</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Innovation Driver: Future-Proofing Your Business
          </h3>
          <div className="space-y-6">
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Process Automation Impact
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Digital processes create revenue opportunities:
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-600 dark:text-gray-300">
                <li>Basic tier: 3% revenue improvement</li>
                <li>Standard tier: 4.5% increased efficiency</li>
                <li>Enterprise tier: 6% growth in revenue</li>
              </ul>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Competitive Advantage
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Modern systems help you stay ahead:
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-600 dark:text-gray-300">
                <li>Basic tier: 4% market advantage</li>
                <li>Standard tier: 6% improved market position</li>
                <li>Enterprise tier: 8% competitive edge</li>
              </ul>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Business Scalability
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Better systems enable growth:
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-600 dark:text-gray-300">
                <li>Basic tier: 2% scalability improvement</li>
                <li>Standard tier: 3% enhanced growth capacity</li>
                <li>Enterprise tier: 4% increased scaling potential</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Understanding the Costs
        </h3>
        <div className="space-y-4 text-gray-600 dark:text-gray-300">
          <p className="text-lg">Your investment includes:</p>
          <div className="ml-4 space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Initial Technology Assessment
              </h4>
              <p className="mt-1">
                We start with a comprehensive evaluation of your current systems
                and needs ($3,600)
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Solution Implementation
              </h4>
              <p className="mt-1">
                Each solution is available in three tiers to match your needs:
              </p>
              <ul className="list-disc ml-6 mt-2">
                <li>Basic/Starter: Core features for essential needs</li>
                <li>
                  Standard/Professional: Advanced features for growing
                  businesses
                </li>
                <li>
                  Enterprise: Comprehensive solutions for complex requirements
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                What's Included
              </h4>
              <p className="mt-1">
                All packages include implementation, training, and support at
                our standard rate of $120/hour
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
