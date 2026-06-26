import React from "react";
import { useTrainerClientDetail } from "@/lib/hooks/useTrainerClients";

interface ClientWorkoutProgressProps {
  clientId: string;
  onClose: () => void;
}

export function ClientWorkoutProgress({
  clientId,
  onClose,
}: ClientWorkoutProgressProps) {
  const { data: detail, isLoading } = useTrainerClientDetail(clientId);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#1a1a1a] rounded-[24px] p-6 w-full max-w-2xl mx-4">
          <p className="text-center text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!detail) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] rounded-[24px] p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">{detail.name}</h2>
            <p className="text-gray-400 text-sm">{detail.email}</p>
          </div>
          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-[#222] rounded-lg p-4">
            <p className="text-xs font-medium text-gray-400 mb-2">Consistency</p>
            <p className="text-2xl font-bold text-[#7c69ef]">
              {detail.consistency}%
            </p>
          </div>
          <div className="bg-[#222] rounded-lg p-4">
            <p className="text-xs font-medium text-gray-400 mb-2">Weekly Volume</p>
            <p className="text-2xl font-bold text-[#7c69ef]">
              {detail.weeklyVolume} min
            </p>
          </div>
          <div className="bg-[#222] rounded-lg p-4">
            <p className="text-xs font-medium text-gray-400 mb-2">
              Next Workout
            </p>
            <p className="text-sm font-bold text-[#7c69ef]">
              {detail.nextWorkout
                ? new Date(detail.nextWorkout).toLocaleDateString()
                : "TBD"}
            </p>
          </div>
        </div>

        {/* Last 5 Sessions */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-white">Last 5 Sessions</h3>
          <div className="space-y-2 bg-[#111111] rounded-lg p-4">
            {detail.lastFiveSessions.map((session: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-[#222] rounded border border-gray-700"
              >
                <div>
                  <p className="font-medium text-white">{session.type}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(session.date).toLocaleDateString()} •{" "}
                    {session.duration} min
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#7c69ef]">
                    {session.exercisesCompleted}/{session.totalExercises}
                  </p>
                  <p className="text-xs text-gray-400">exercises</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Records */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-white">Personal Records</h3>
          <div className="space-y-2 bg-[#111111] rounded-lg p-4">
            {detail.personalRecords.length > 0 ? (
              detail.personalRecords.map((pr: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-[#222] rounded border border-gray-700"
                >
                  <div>
                    <p className="font-medium text-white">{pr.exercise}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(pr.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-lg font-bold text-green-400">{pr.weight} kg</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 py-4">No PRs recorded yet</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-[#222] text-gray-300 rounded-lg font-medium hover:bg-[#333] transition-colors border border-gray-700"
          >
            Close
          </button>
          <button className="flex-1 px-4 py-2 bg-[#7c69ef] text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
            Adjust Program
          </button>
        </div>
      </div>
    </div>
  );
}
