import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { motion } from 'framer-motion';
import Select from 'react-select';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WaveBackground from '../components/WaveBackground';
import CompareSitStand from '../components/CompareTests/CompareSitStand';
import CompareGswt from '../components/CompareTests/CompareGswt';
import CompareTug from '../components/CompareTests/CompareTug';

const CompareTests = () => {
  const [results, setResults] = useState([]);
  const [selectedResults, setSelectedResults] = useState([null, null]);

  useEffect(() => {
    const storedResults = localStorage.getItem("results");
    if (storedResults) {
      const parsedResults = JSON.parse(storedResults).map((result, index) => ({
        ...result,
        id: result.id || `${result.type}-${index}-${result.date}`,
      }));
      setResults(parsedResults);
      toast.success("Results loaded successfully.");
    } else {
      toast.error("No results found. Please run some tests first.");
    }
  }, []);

  const clearSelectedTests = () => {
    setSelectedResults([null, null]);
  };

  const handleSelectResult = (index, selectedOption) => {
    const selectedResultId = selectedOption.value;
    const selectedResult = results.find((result) => String(result.id) === selectedResultId);

    if (!selectedResult) return;

    const otherResult = selectedResults[1 - index];

    if (otherResult && selectedResult.type !== otherResult.type) {
      toast.error("Both selected tests must be of the same type.");
      return;
    }

    if (otherResult && selectedResultId === otherResult.id) {
      toast.error("Cannot select the same test twice.");
      return;
    }

    const newSelection = [...selectedResults];
    newSelection[index] = selectedResult;
    setSelectedResults(newSelection);
  };

  const prepareKeypointChartData = (keypointType) => {
    if (!selectedResults[0] || !selectedResults[1]) return null;

    const keypointLabels = Object.keys(selectedResults[0][keypointType]);

    return {
      labels: keypointLabels,
      datasets: selectedResults.map((result, index) => ({
        label: `Test ${index + 1}: ${result.date}`,
        backgroundColor: index === 0 ? "#C8A2C8" : "#A2C8C8",
        data: keypointLabels.map((key) => result[keypointType][key] || 0),
      })),
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        enabled: true,
        backgroundColor: '#f3f4f6',
        titleColor: '#333',
        bodyColor: '#666',
      },
    },
  };

  const dropdownOptions = results.map((result) => ({
    value: result.id,
    label: `${result.type} - ${result.date} - Frailty Score: ${result.frailty_score.toFixed(2)}`,
  }));

  return (
    <WaveBackground>

      <div className="max-w-7xl mx-auto p-8">
        <motion.h1 className="text-4xl font-bold text-pastelPurple mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Compare Your Test Results
        </motion.h1>

        {/* Step 1: Select Tests */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Step 1: Select Two Tests</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {selectedResults.map((selected, index) => (
              <motion.div
                key={index}
                className="flex flex-col space-y-6 p-8 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all ease-in-out"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <label className="text-lg font-semibold text-gray-600">
                  {`Select Test ${index + 1}`}
                </label>

                <Select
                  value={selected ? { value: selected.id, label: `${selected.type} - ${selected.date}` } : null}
                  onChange={(option) => handleSelectResult(index, option)}
                  options={dropdownOptions}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  isSearchable={true}
                  placeholder="Choose a test..."
                />

                {selected && (
                  <motion.div
                    className="p-6 bg-gray-50 rounded-lg shadow-md text-center relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-xl font-bold text-pastelPurple">
                      Test {index + 1}: {selected.type}
                    </h3>
                    <p className="text-gray-500">{selected.date}</p>
                    <p className="text-lg font-semibold mt-4">
                      Frailty Score:{" "}
                      <span className={`${selected.frailty_score < 50
                        ? "text-green-600"
                        : selected.frailty_score < 70
                          ? "text-yellow-600"
                          : "text-red-600"
                        }`}
                      >
                        {selected.frailty_score.toFixed(2)}
                      </span>
                    </p>

                    <div className="flex justify-center mt-3">
                      {selected.pass_fail === "PASSED" ? (
                        <FiCheckCircle className="text-green-500 text-3xl" />
                      ) : (
                        <FiXCircle className="text-red-500 text-3xl" />
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {selectedResults.some(result => result) && (
            <div className="p-4 flex justify-center items-center mt-6">
              <button
                onClick={clearSelectedTests}
                className="px-8 py-3 bg-red-500 text-white font-bold rounded-lg shadow-lg hover:bg-red-600 transition-all duration-300"
              >
                Clear Tests
              </button>
            </div>
          )}
        </div>

        {/* Step 2: Show Comparisons */}
        {selectedResults[0] && selectedResults[1] && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Step 2: Compare the Tests</h2>

            {selectedResults[0].type === "5 Sit Stand" && selectedResults[1].type === "5 Sit Stand" && (
              <CompareSitStand selectedResults={selectedResults} chartOptions={chartOptions} />
            )}
            {selectedResults[0].type === "Gait Speed Walk Test" && selectedResults[1].type === "Gait Speed Walk Test" && (
              <CompareGswt selectedResults={selectedResults} chartOptions={chartOptions} />
            )}
            {selectedResults[0].type === "Timed Up And Go" && selectedResults[1].type === "Timed Up And Go" && (
              <CompareTug selectedResults={selectedResults} chartOptions={chartOptions} />
            )}
          </div>
        )}

        {/* Step 3: Additional Keypoint Data */}
        {selectedResults[0] && selectedResults[1] && prepareKeypointChartData("keypoint_std_devs") && (
          <div className="p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-gray-500 mb-4 text-center">
              Joint Movement Variability
            </h2>
            <Bar data={prepareKeypointChartData("keypoint_std_devs")} options={chartOptions} />
          </div>
        )}
      </div>
    </WaveBackground>
  );
};

export default CompareTests;
