import React, { useState, useEffect, useRef, useContext, useCallback } from "react";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import VideoUploadWithPreview from "./VideoUploadWithPreview";
import { toast } from 'react-toastify';
import TestResult from "../TestResults/TestResult";
import Select from 'react-select';

const videos = {
  "5 Sit Stand": {
    video: "/assets/CST.mp4",
    checks: [
      "Camera is facing the left side of the subject",
      "Subject has their arms crossed over their chest",
      "Ankles and feet are visible throughout the video",
      "In a standing position, subject's shoulders should be visible"
    ]
  },
  "Gait Speed Walk Test": {
    video: "/assets/GSWT.mp4",
    checks: [
      "Subject's initial standing position is stationary",
      "Subject's feet should be visible through the video",
      "Subject is walking for a minimum of 4 meters",
      "Subject should move from left to right in the video"
    ]
  },
  "Timed Up and Go": {

    video: "/assets/TUG.mp4",
    checks: [
      "Camera is facing the right side of the subject",
      "Subject should walk for a minimum of 3 meters before the turn",
      "Subject's should be visible throughout the video, including the turn",
      "Subject should move from left to right in the video",
    ]
  }
};

const testOptions = [
  { value: "5 Sit Stand", label: "5 Sit Stand" },
  { value: "Gait Speed Walk Test", label: "Gait Speed Walk Test" },
  { value: "Timed Up and Go", label: "Timed Up and Go" }
];
const TestForm = ({ test, setTest, height, setHeight, sittingHeight, setSittingHeight, distance, setDistance }) => {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 w-full">
      <div className="flex flex-col">
        <label htmlFor="category" className="text-primary mb-2 text-gray-600">
          Choose Test
        </label>
        <Select
          id="category"
          options={testOptions}
          onChange={(selectedOption) => setTest(selectedOption ? selectedOption.value : "Choose Test")}
          className="react-select-container py-2 rounded-lg outline-none bg-light text-primary w-60"
          classNamePrefix="react-select"
          placeholder="Choose Test"
        />
      </div>

      {(test === "Gait Speed Walk Test" || test === "Timed Up and Go") && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {test === "Gait Speed Walk Test" && (
            <div className="flex flex-col">
              <label htmlFor="height" className="text-primary mb-2 text-gray-600">
                Height (cm)
              </label>
              <input
                type="number"
                id="height"
                name="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="p-4 rounded-lg border border-gray-300 outline-none bg-light text-primary w-60"
              />
            </div>)
          }
          {test === "Timed Up and Go" && (
            <div className="flex flex-col">
              <label htmlFor="sittingHeight" className="text-primary mb-2 text-gray-600">
                Sitting Height (cm)
              </label>
              <input
                type="number"
                id="sittingHeight"
                name="sittingHeight"
                value={sittingHeight}
                onChange={(e) => setSittingHeight(e.target.value)}
                className="p-4 rounded-lg border border-gray-300 outline-none bg-light text-primary w-60"
                placeholder="Sitting Height"
              />
            </div>
          )}

          <div className="flex flex-col">
            <label htmlFor="distance" className="text-primary mb-2 text-gray-600">
              Distance (m)
            </label>
            <input
              type="number"
              id="distance"
              name="distance"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="p-4 rounded-lg border border-gray-300 outline-none bg-light text-primary w-60"
              // disallow input
              disabled={test === "Gait Speed Walk Test" || test === "Timed Up and Go"}
            />
          </div>
        </div>
      )}
    </div>
  )
}

const ProcessVideoWithCV = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [requestId, setRequestId] = useState(null);
  const [savedMessage, setSavedMessage] = useState(null);
  const [test, setTest] = useState("Choose Test");
  const [height, setHeight] = useState(null);
  const [sittingHeight, setSittingHeight] = useState(null);
  const [distance, setDistance] = useState(null);
  const [checklist, setChecklist] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const { setLoading, setLoadingMessage, setProgress } = useContext(GlobalContext)


  const handleChecklistChange = (index) => {
    const newChecklist = [...checklist];
    newChecklist[index] = !newChecklist[index];
    setChecklist(newChecklist);

  };

  const isChecklistComplete = () => {
    return checklist.length == 4 && checklist.every(item => item);
  };

  const handleProcessVideo = async () => {
    if (!selectedFile) return;

    if (test === "Choose Test") {
      toast.error("Please select a test");

      return;
    }
    if (!areInputsValid()) {
      toast.error("Please enter all required fields");
      return;
    }


    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("algo", test);

    if (test === "Gait Speed Walk Test") {
      formData.append("standingHeight", height);
      formData.append("distance", distance);
    }

    if (test === "Timed Up and Go") {
      formData.append("sittingHeight", sittingHeight);
      formData.append("distance", distance);
    }

    setLoading(true);
    setLoadingMessage("Uploading video...");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/video_processing", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setRequestId(response.data.request_id);
      pollForResult(response.data.request_id);
    } catch (error) {
      console.error("Error processing video:", error);
      setLoading(false);
      toast.error("Error processing video");

    }
  };


  const pollForResult = async (requestId) => {
    setLoadingMessage("Processing video...");

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/video_result/${requestId}`,
      );
      if (response.status === 202) {
        setTimeout(() => pollForResult(requestId), 4000);
      } else if (response.status === 200) {
        console.log(response.data);

        setLoading(false);
        setResult(response.data);
        console.log(result);
        setShowResult(true);
      }
    } catch (error) {
      console.error("Error fetching result:", error);
      setLoading(false);
      setShowResult(false);
      toast.error("Error fetching result");

    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setVideoPreview(null)
    setResult(null);
    setRequestId(null);
    setLoading(false);
    setSavedMessage(null);
    setChecklist([]);
    setHeight(null);
    setSittingHeight(null);
  };


  useEffect(() => {
    if (test === "Gait Speed Walk Test") {
      setDistance(400); // Default for Gait Speed Walk Test
    }
    if (test === "Timed Up and Go") {
      setDistance(300); // Default for Timed Up and Go
    }
  }, [test]);

  const testFormProps = {
    test,
    setTest,
    height,
    setHeight,
    sittingHeight,
    setSittingHeight,
    distance,
    setDistance,
  }

  const videoUploadWithPreviewProps = {
    setSelectedFile,
    setVideoPreview,
    selectedFile,
    videoPreview,
    test,
    videos,
  }

  const areInputsValid = useCallback(() => {
    if (test === "Gait Speed Walk Test") {
      return height && Number(height) > 0;
    }
    if (test === "Timed Up and Go") {
      return sittingHeight && Number(sittingHeight) > 0;
    }
    return true; // For other tests, no special validation
  }, [test, height, sittingHeight]);



  return (
    <>
      <div className="max-w-7xl mx-auto p-2">
        <TestForm
          {...testFormProps}
        />

        <VideoUploadWithPreview
          {...videoUploadWithPreviewProps}
        />

        {/* Checklist with checkboxes */}
        {test !== "Choose Test" && selectedFile && (
          <div className="mt-8 p-4 rounded-lg shadow-soft bg-gray-100/90">
            <h4 className="text-lg text-primary mb-4 text-center">Checklist</h4>
            <ul className="list-disc pl-4 space-y-2 text-gray-600">
              {videos[test].checks.map((check, index) => (
                <li key={index} className="text-primary flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist[index]}
                      onChange={() => handleChecklistChange(index)}
                      className="mr-2"
                      disabled={!selectedFile}
                    />
                    {check}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}


        {test !== "Choose Test" && selectedFile && (
          <div className="mt-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <p className="text-sm text-primary flex-grow text-gray-600">
              Selected File: {selectedFile.name}
            </p>
            <div className="flex space-x-2">
              <button
                onClick={handleClearFile}
                className="p-2 bg-red-400 font-bold text-gray-600 rounded-soft shadow-soft hover:bg-red-600 transition duration-300"
              >
                Clear File
              </button>
              <button
                onClick={handleProcessVideo}
                className={`${!isChecklistComplete() || test === "Choose Test"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-pastelPurple hover:bg-opacity-90"
                  } text-white font-bold py-3 px-8 rounded-soft shadow-soft transition duration-300`}
                disabled={!isChecklistComplete() || test === "Choose Test"}>
                {"Process Video"}
              </button>
            </div>
          </div>
        )}
        {showResult && result && (
          <TestResult
            test={test}
            result={result}
            handleClearFile={handleClearFile}
          />
        )}
      </div>
    </>
  );
};

export default ProcessVideoWithCV;
