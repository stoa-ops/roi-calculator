"use client";

import { useState } from "react";
import { ROICalculator } from "@/components/ROICalculator";
import { BenchmarksExplanation } from "@/components/BenchmarksExplanation";
import { useTheme } from "@/context/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"calculator" | "benchmarks">(
    "calculator"
  );
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab("calculator")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "calculator"
                  ? "bg-green-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Calculator
            </button>
            <button
              onClick={() => setActiveTab("benchmarks")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "benchmarks"
                  ? "bg-green-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Methodology & Benchmarks
            </button>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === "light" ? (
              <MoonIcon className="w-6 h-6" />
            ) : (
              <SunIcon className="w-6 h-6" />
            )}
          </button>
        </div>

        {activeTab === "calculator" ? (
          <ROICalculator />
        ) : (
          <BenchmarksExplanation />
        )}
      </div>
    </div>
  );
}
