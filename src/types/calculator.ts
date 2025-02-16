export interface PackageOption {
  name: string;
  description: string;
  cost: number;
  hours: number;
}

export interface PackageCategory {
  name: string;
  options: PackageOption[];
}

export interface SelectedPackage {
  name: string;
  category: string;
  tier: string;
  cost: number;
  hours: number;
}

export interface Savings {
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

export interface Inputs {
  revenue: number;
  employees: number;
  avgHourlyCost: number;
  manualTaskHours: number;
  customerServiceHours: number;
  lostLeadsPerMonth: number;
  avgDealSize: number;
}

export interface DriverInsights {
  paybackMonths: number;
  keyMetrics: {
    label: string;
    value: string;
  }[];
}
