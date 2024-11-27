import React, { useState, useEffect, useDeferredValue } from "react";
import Modal from "../Modal";
import GswtResult from "../TestResults/GswtResult";
import TugResult from "../TestResults/TugResult";
import SitStandResult from "../TestResults/SitStandResult";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { motion } from "framer-motion"
import customParseFormat from "dayjs/plugin/customParseFormat";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
dayjs.extend(customParseFormat);

const Results = ({ sliceFromStartTo }) => {

  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();
  const deferredSearchTerm = useDeferredValue(searchTerm);


  const handleViewAllResults = () => {
    navigate('/dashboard', { state: { scrollToResults: true } });
  };


  useEffect(() => {
    const storedResults = localStorage.getItem("results");
    if (storedResults) {
      setResults(JSON.parse(storedResults));
      toast.success("Previous results loaded successfully");
    } else {
      toast.error("No previous results found");
    }
  }, []);
  const filteredResults = results.filter((result) => {
    const matchesSearchTerm = result?.type?.toLowerCase().includes(deferredSearchTerm.toLowerCase());
    const resultDate = dayjs(result.date, "DD/MM/YYYY, HH:mm:ss");
    const isWithinDateRange = (!startDate || resultDate.isSame(dayjs(startDate), 'day') || resultDate.isAfter(dayjs(startDate), 'day')) &&
      (!endDate || resultDate.isSame(dayjs(endDate), 'day') || resultDate.isBefore(dayjs(endDate), 'day'));
    return matchesSearchTerm && isWithinDateRange;
  });

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate && dayjs(date).isAfter(endDate)) {
      setEndDate(null);
      toast.warn("End date reset as it was before the new start date");
    }
  };

  const handleEndDateChange = (date) => {
    if (startDate && dayjs(date).isBefore(startDate)) {
      toast.warn("End date must be after start date");
    } else {
      setEndDate(date);
    }
  };

  // Open the modal with the selected result
  const handleShowResult = (result) => {
    setSelectedResult(result);
    setOpenModal(true);
  };

  const renderResult = (selectedResult) => {
    console.log("Selected Result:", selectedResult);

    const { type, ...testProps } = selectedResult;

    switch (type) {
      case "Gait Speed Walk Test":
        return <GswtResult {...testProps} />;
      case "Timed Up And Go":
        return <TugResult {...testProps} />;
      case "5 Sit Stand":
        return <SitStandResult {...testProps} />;
      default:
        return <p>Error retrieving test</p>;
    }
  };

  const getTestStatus = (result) => {
    switch (result.type) {
      case '5 Sit Stand':
        return result.pass_fail;
      case 'Gait Speed Walk Test':
        return result.average_speed >= 100 ? "PASSED" : "FAILED";
      case 'Timed Up And Go':
        return result.elapsed_time <= 12 ? "PASSED" : "FAILED";
      default:
        return "N/A";
    }
  };
  const getFrailtyScoreColor = (score) => {
    if (score <= 20) return 'bg-green-500';
    if (score <= 40) return 'bg-green-300';
    if (score <= 60) return 'bg-yellow-300';
    if (score <= 80) return 'bg-orange-400';
    return 'bg-red-500';
  };

  const ResultCard = ({ result, status, frailtyScore }) => (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-600">
          {result.type}
        </h3>
        <span className={`px-4 py-1 rounded-full text-xs font-medium ${status === "PASSED"
          ? "bg-green-200 text-green-800 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.5)]"
          : status === "FAILED"
            ? "bg-red-200 text-red-800 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.5)]"
            : "bg-gray-200 text-gray-800 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.5)]"
          }`}>
          {status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-2">
        {dayjs(result.date, "DD/MM/YYYY, HH:mm:ss").format("DD MMM YYYY, HH:mm:ss")}
      </p>
      <div className="mt-4 flex items-center">
        <span className="text-sm font-medium text-gray-700 mr-2">Frailty Score:</span>
        <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className={`h-full ${getFrailtyScoreColor(frailtyScore)}`}
            style={{ width: `${frailtyScore}%` }}
          ></div>
        </div>
        <span className="text-sm font-medium text-gray-700 ml-2">{frailtyScore.toFixed(2)}</span>
      </div>
    </>
  )

  return (
    <div className="p-2 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search results..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-4 rounded-soft w-full mb-6 shadow-soft"
        />

        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd/MM/yyyy"
          placeholderText="Start Date"
          className="border border-gray-300 p-4 rounded-soft w-full mb-6 shadow-soft"
        />
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="dd/MM/yyyy"
          placeholderText="End Date"
          className="border border-gray-300 p-4 rounded-soft w-full mb-6 shadow-soft"
        />
      </div>
      {sliceFromStartTo && (
        <div className="p-2 py-3 flex w-full justify-end items-center">
          <button
            onClick={handleViewAllResults}
            className="font-semibold inline-block mt-2 transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <span className="flex items-center justify-center text-gray-600">
              View All Results
              <HiArrowNarrowRight className="ml-2 text-lg" />
            </span>
          </button>
        </div>
      )
      }


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredResults.length > 0 ? (
          filteredResults.slice(0, sliceFromStartTo || filteredResults.length)  // Adjust to show all results if sliceFromStartTo is not provided
            .map((result) => {
              const status = getTestStatus(result);
              const frailtyScore = result.frailty_score || Math.floor(Math.random() * 100) + 1;
              return (
                <motion.div
                  key={result.id}
                  className="bg-white rounded-2xl p-6 cursor-pointer"
                  onClick={() => handleShowResult(result)}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                >
                  <ResultCard result={result} status={status} frailtyScore={frailtyScore} />
                </motion.div>)
            })
        ) : (
          <div className="col-span-full text-center text-pastelPurple py-8
                          bg-gray-100 rounded-2xl
                          shadow-[inset_-12px_-12px_20px_#ffffff,inset_12px_12px_20px_rgba(70,70,70,0.12)]">
            No results found.
          </div>
        )}
      </div>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        {selectedResult && (
          <div className="p-4">{renderResult(selectedResult)}</div>
        )}
      </Modal>
    </div>
  );
};

export default Results;
