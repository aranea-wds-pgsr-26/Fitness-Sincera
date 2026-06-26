import React from "react";
import { useNutritionistClientDetail } from "@/lib/hooks/useNutritionistClients";

interface ClientNutritionDetailProps {
  clientId: string;
  onClose: () => void;
}

export function ClientNutritionDetail({
  clientId,
  onClose,
}: ClientNutritionDetailProps) {
  const { data: detail, isLoading } = useNutritionistClientDetail(clientId);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-[24px] p-6 w-full max-w-2xl mx-4">
          <p className="text-center">Loading...</p>
        </div>
      </div>
    );
  }

  if (!detail) {
    return null;
  }

  const currentMetrics = detail.currentMetrics;
  const macroPercentages = {
    protein: (currentMetrics.protein / currentMetrics.proteinGoal) * 100,
    carbs: (currentMetrics.carbs / currentMetrics.carbsGoal) * 100,
    fat: (currentMetrics.fat / currentMetrics.fatGoal) * 100,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[24px] p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a]">{detail.name}</h2>
            <p className="text-gray-600 text-sm">{detail.email}</p>
          </div>
          <button
            onClick={onClose}
            className="text-2xl hover:opacity-70 transition-opacity"
          >
            ✕
          </button>
        </div>

        {/* Current Metrics */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-[#1a1a1a]">
            Today's Nutrition
          </h3>

          {/* Calories */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-700">Calories</span>
              <span className="font-bold text-[#1a1a1a]">
                {currentMetrics.caloriesConsumed} / {currentMetrics.caloriesGoal}
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#d4f54c]"
                style={{
                  width: `${Math.min(
                    (currentMetrics.caloriesConsumed /
                      currentMetrics.caloriesGoal) *
                      100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>

          {/* Macros */}
          <div className="grid grid-cols-3 gap-3">
            {/* Protein */}
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-xs font-medium text-blue-700 mb-2">Protein</p>
              <p className="font-bold text-[#1a1a1a]">
                {currentMetrics.protein}g
              </p>
              <p className="text-xs text-gray-600">
                Goal: {currentMetrics.proteinGoal}g
              </p>
              <div className="w-full h-1 bg-blue-200 rounded-full mt-2">
                <div
                  className="h-full bg-blue-500"
                  style={{
                    width: `${Math.min(macroPercentages.protein, 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Carbs */}
            <div className="bg-yellow-50 rounded-lg p-3">
              <p className="text-xs font-medium text-yellow-700 mb-2">Carbs</p>
              <p className="font-bold text-[#1a1a1a]">{currentMetrics.carbs}g</p>
              <p className="text-xs text-gray-600">
                Goal: {currentMetrics.carbsGoal}g
              </p>
              <div className="w-full h-1 bg-yellow-200 rounded-full mt-2">
                <div
                  className="h-full bg-yellow-500"
                  style={{
                    width: `${Math.min(macroPercentages.carbs, 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Fat */}
            <div className="bg-red-50 rounded-lg p-3">
              <p className="text-xs font-medium text-red-700 mb-2">Fat</p>
              <p className="font-bold text-[#1a1a1a]">{currentMetrics.fat}g</p>
              <p className="text-xs text-gray-600">
                Goal: {currentMetrics.fatGoal}g
              </p>
              <div className="w-full h-1 bg-red-200 rounded-full mt-2">
                <div
                  className="h-full bg-red-500"
                  style={{
                    width: `${Math.min(macroPercentages.fat, 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day History */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#1a1a1a]">
            7-Day History
          </h3>
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            {detail.metrics.slice(-7).map((metric: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 border-b last:border-b-0"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {new Date(metric.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    {metric.caloriesConsumed} / {metric.caloriesGoal} cal
                  </p>
                </div>
                <div className="w-20 h-2 bg-white rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#d4f54c]"
                    style={{
                      width: `${Math.min(
                        (metric.caloriesConsumed / metric.caloriesGoal) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
          <button className="flex-1 px-4 py-2 bg-[#d4f54c] text-[#1a1a1a] rounded-lg font-medium hover:opacity-90 transition-opacity">
            Adjust Plan
          </button>
        </div>
      </div>
    </div>
  );
}
