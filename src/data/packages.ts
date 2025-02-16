import { PackageCategory } from "@/types/calculator";

export const packages: Record<string, PackageCategory[]> = {
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
      name: "Custom Software Development",
      options: [
        {
          name: "Basic",
          description: "Basic custom development",
          cost: 24000,
          hours: 200,
        },
        {
          name: "Standard",
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
  ],
};
