import { SelectedPackage } from "@/types/calculator";

export const formatNumberWithCommas = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(1)}%`;
};

export const getMultiplier = (
  driver: "growth" | "fulfillment" | "innovation",
  packageName: string,
  selectedPackages: SelectedPackage[]
): number => {
  const selection = selectedPackages.find(
    (p) => p.category === driver && p.name === packageName
  );

  if (!selection) return 0;

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
