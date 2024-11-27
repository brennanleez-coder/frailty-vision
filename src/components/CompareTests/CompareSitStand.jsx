import React from 'react'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const CompareSitStand = ({ selectedResults, chartOptions }) => {

  // Chart Data Preparation
  const getOverallMetricsData = () => {
    if (!selectedResults[0] || !selectedResults[1]) return null;

    return {
      labels: ["Counter", "Elapsed Time (s)"],
      datasets: selectedResults.map((result, index) => ({
        label: `Test ${index + 1}: ${result.date}`,
        backgroundColor: index === 0 ? "#C8A2C8" : "#A2C8C8",
        data: [
          result.counter || 0,
          result.elapsed_time || 0,
        ],
      })),
    };
  };

  const getRepetitionDurationsData = () => {
    if (!selectedResults[0] || !selectedResults[1]) return null;

    return {
      labels: selectedResults[0].rep_durations.map((_, i) => `Rep ${i + 1}`),
      datasets: [
        {
          label: `Test 1 - Repetitions`,
          backgroundColor: "#C8A2C8",
          data: selectedResults[0].rep_durations,
        },
        {
          label: `Test 2 - Repetitions`,
          backgroundColor: "#A2C8C8",
          data: selectedResults[1].rep_durations,
        },
      ],
    };
  };

  const getMaxAnglesData = () => {
    if (!selectedResults[0] || !selectedResults[1]) return null;

    return {
      labels: selectedResults[0].max_angles.map((_, i) => `Rep ${i + 1}`),
      datasets: [
        {
          label: `Test 1 - Max Angles`,
          backgroundColor: "#A2A2D8",
          data: selectedResults[0].max_angles,
        },
        {
          label: `Test 2 - Max Angles`,
          backgroundColor: "#82A8C8",
          data: selectedResults[1].max_angles,
        },
      ],
    };
  };
  
  return (
    <>
      {/* Overall Metrics */}
      {getOverallMetricsData() && (
        <motion.div className="mt-8 p-6 bg-white rounded-lg shadow-soft"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg font-bold text-gray-500 mb-4 text-center">
            Overall Metrics
          </h2>
          <Bar data={getOverallMetricsData()} options={chartOptions} />
        </motion.div>
      )}

      {/* Repetition Durations */}
      {getRepetitionDurationsData() && (
        <motion.div className="mt-8 p-6 bg-white rounded-lg shadow-soft"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg font-bold text-gray-500 mb-4 text-center">
            Repetition Durations
          </h2>
          <Bar data={getRepetitionDurationsData()} options={chartOptions} />
        </motion.div>
      )}

      {/* Max Angles */}
      {getMaxAnglesData() && (
        <motion.div className="mt-8 p-6 bg-white rounded-lg shadow-soft"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg font-bold text-gray-500 mb-4 text-center">
            Max Angles
          </h2>
          <Bar data={getMaxAnglesData()} options={chartOptions} />
        </motion.div>
      )}

    </>
  )
}

export default CompareSitStand
