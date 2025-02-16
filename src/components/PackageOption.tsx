import React from "react";
import { PackageOption as PackageOptionType } from "@/types/calculator";

interface PackageOptionProps {
  name: string;
  options: PackageOptionType[];
  currentSelection?: string;
  onSelect: (value: string) => void;
  formatNumberWithCommas: (value: number) => string;
}

export const PackageOption: React.FC<PackageOptionProps> = ({
  name,
  options,
  currentSelection,
  onSelect,
  formatNumberWithCommas,
}) => {
  return (
    <div className="package-option group">
      <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
        {name}
        <span className="ml-1 text-gray-400">(Select tier)</span>
      </label>
      <div className="relative">
        <select
          className="w-full"
          onChange={(e) => onSelect(e.target.value)}
          value={currentSelection || ""}
        >
          <option value="">Choose a tier</option>
          {options.map((option) => (
            <option key={option.name} value={option.name}>
              {option.name} (${formatNumberWithCommas(option.cost)})
            </option>
          ))}
        </select>
        <div className="tooltip-content left-full ml-4 top-0">
          <div className="space-y-4">
            {options.map((option) => (
              <div key={option.name}>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {option.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                  {option.description}
                </p>
                <p className="text-green-600 dark:text-green-400 text-sm mt-1">
                  ${formatNumberWithCommas(option.cost)} • {option.hours} hours
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
