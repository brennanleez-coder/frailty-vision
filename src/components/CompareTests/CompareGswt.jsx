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
const CompareGswt = ({ selectedResults, chartOptions }) => {

  const getOverallMetricsData = () => {
    if (!selectedResults[0] || !selectedResults[1]) return null;

    return {
      labels: ["Average Speed (cm/s)", "Average Stride Length (cm)"],
      datasets: selectedResults.map((result, index) => ({
        label: `Test ${index + 1}: ${result.date}`,
        backgroundColor: index === 0 ? "#C8A2C8" : "#A2C8C8",
        data: [
          result.average_speed || 0,
          result.average_stride_length || 0
        ],
      })),
    };
  };

  return (
    <>
      {/* Distance Traveled and Time Elapsed - Displayed as Cards */}
      {selectedResults[0] && selectedResults[1] && (
        <motion.div
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {selectedResults.map((result, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-soft hover:shadow-lg transition duration-300 ease-in-out"
            >
              <h3 className="text-xl font-bold text-pastelPurple text-center mb-4">
              Test {index + 1}: {result.date}
              </h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-600">Distance Traveled:</span>
                <span className="text-lg font-bold text-pastelPurple">
                  {result.distance_walked.toFixed(2)} m
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-600">Time Elapsed:</span>
                <span className="text-lg font-bold text-pastelPurple">
                  {result.elapsed_time.toFixed(2)} s
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      )}
      {getOverallMetricsData() && (
        <motion.div className="mt-8 p-6 bg-white rounded-lg shadow-soft"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg font-bold text-gray-500 mb-4 text-center">
            Gait Speed Walk Test - Overall Metrics
          </h2>
          <Bar data={getOverallMetricsData()} options={chartOptions} />
        </motion.div>
      )}
    </>
  )
}

export default CompareGswt
