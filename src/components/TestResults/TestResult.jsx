import React, { useState } from 'react'
import SitStandResult from './SitStandResult';
import GswtResult from './GswtResult';
import TugResult from './TugResult';

const TestResult = ({ test, result, savedMessage, handleClearFile, }) => {
  const [isDisputing, setIsDisputing] = useState(false); // To manage the dispute state
  const [doctorScore, setDoctorScore] = useState(result?.frailty_score); // Doctor's decided score
  console.log("TestResult component:" + test)
  const handleSaveResult = () => {
    if (result) {
      const storedResults = localStorage.getItem("results");
      const resultsArray = storedResults ? JSON.parse(storedResults) : [];
      result.date = new Date().toLocaleString();
      result.test = "Sit Stand Test";
      result.frailty_score = doctorScore; // Use the updated frailty score
      resultsArray.push(result);
      localStorage.setItem("results", JSON.stringify(resultsArray));
      handleClearFile();
      setIsDisputing(false); // Close the input after the score is saved
      setDoctorScore(result?.frailty_score); // Reset the doctor's score to the original frailty score
    }
  };

  const handleDispute = () => {
    setIsDisputing(true); // Enable the input for the doctor to enter their own score
  };

  const handleDisputeSave = () => {
    setIsDisputing(false); // Close the input after the score is entered
  };

  const DisplayResult = ({ test, result }) => {
    switch (test) {
      case "5 Sit Stand":
        return <SitStandResult {...result} />;
      case "Gait Speed Walk Test":
        return <GswtResult {...result} />;
      case "Timed Up and Go":
        return <TugResult {...result} />;
      default:
        return null;
    }
  }

  return (
    <div className="mt-4 p-6 bg-white rounded-soft shadow-soft">
      {/* Frailty Score */}
      <div className="p-4 mb-6 bg-gray-100 rounded-lg text-center">
        <h3 className="text-xl font-semibold text-pastelPurple">Frailty Score</h3>
        <div className="flex items-center justify-center gap-4 flex-col">
          {result?.frailty_score && (
            <p className={`text-3xl font-semibold ${doctorScore > 50 ? 'text-red-500' : doctorScore < 30 ? 'text-purple-500' : 'text-yellow-400'}`}>
              {doctorScore.toFixed(2)} / 100
            </p>
          )}

          {!isDisputing && (
            <button
              className="bg-purple-500 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:bg-purple-600 transition duration-300"
              onClick={handleDispute}
            >
              Dispute Score
            </button>
          )}
        </div>

        {/* Input for the doctor to enter a new score */}
        {isDisputing && (
          <div className="p-2 flex gap-x-2 justify-center">
            <input
              type="number"
              min="0"
              max="100"
              value={doctorScore}
              onChange={(e) => setDoctorScore(Number(e.target.value))}
              className="p-2 border border-gray-300 rounded-lg text-center"
            />
            <button
              className="bg-pastelPurple hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-soft shadow-soft transition duration-300"
              onClick={handleDisputeSave}
            >
              Save Score
            </button>
          </div>
        )}
      </div>
      {/* Test Results */}
      <DisplayResult test={test} result={result} />

      {/* Save Button */}
      <button
        onClick={handleSaveResult}
        className="mt-6 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 w-full md:w-auto"
      >
        Save Result to Local Storage
      </button>

      {savedMessage && <p className="mt-4 text-green-700">{savedMessage}</p>}

    </div>
  )
}

export default TestResult
