import React, { useState } from 'react';

const SitStandResult = ({
    counter,
    elapsed_time,
    pass_fail,
    rep_durations,
    violations,
    max_angles,
    keypoint_mean_magnitudes,
    keypoint_std_devs,
    keypoint_circular_mean,
    keypoint_circular_std,
    frailty_score,
}) => {

    return (
        <>
            <h2 className="text-2xl font-bold text-gray-600 mb-6 text-center">
                Sit Stand Test Result {pass_fail === "PASSED" ? "✅" : "❌"} - {new Date().toLocaleString()}
            </h2>
            {/* Counter and Elapsed Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${counter === 5 ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <h3 className="font-medium text-primary">Counter</h3>
                    <p className="text-primary text-xl">{counter}</p>
                </div>
                <div className={`p-4 rounded-lg ${elapsed_time < 12 ? 'bg-green-100' : 'bg-red-100'}`}>
                    <h3 className="font-medium text-primary">Elapsed Time</h3>
                    <p className="text-primary text-xl">{elapsed_time.toFixed(2)} seconds</p>
                </div>
            </div>

            {/* Repetition Durations, Violations, and Max Angles */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Repetition Durations */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-400 mb-4">Repetition Durations</h3>
                    <ul className="list-disc list-inside">
                        {rep_durations.map((duration, index) => (
                            <li key={index} className="text-gray-700">
                                {duration.toFixed(2)} seconds
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Violations */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-400 mb-4">Violations</h3>
                    <ul className="list-disc list-inside">
                        {violations.length > 0 ? (
                            violations.map((violation, index) => (
                                <li key={index} className="text-red-600">
                                    {violation}
                                </li>
                            ))
                        ) : (
                            <p className="text-green-600">No violations</p>
                        )}
                    </ul>
                </div>

                {/* Max Angles */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-400 mb-4">Max Angles</h3>
                    <ul className="list-disc list-inside">
                        {max_angles.map((angle, index) => (
                            <li key={index} className="text-gray-700">
                                {angle.toFixed(2)} degrees
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Keypoint Analysis */}
            <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-400 mb-4">Keypoint Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-100 rounded-lg">
                        <h4 className="font-medium text-primary">Mean Magnitudes</h4>
                        <ul className="list-disc list-inside">
                            {Object.entries(keypoint_mean_magnitudes).map(([keypoint, magnitude], index) => (
                                <li key={index} className="text-gray-700">
                                    {keypoint}: {magnitude.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-4 bg-gray-100 rounded-lg">
                        <h4 className="font-medium text-primary">Standard Deviations</h4>
                        <ul className="list-disc list-inside">
                            {Object.entries(keypoint_std_devs).map(([keypoint, stdDev], index) => (
                                <li key={index} className="text-gray-700">
                                    {keypoint}: {stdDev.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-4 bg-gray-100 rounded-lg">
                        <h4 className="font-medium text-primary">Circular Mean</h4>
                        <ul className="list-disc list-inside">
                            {Object.entries(keypoint_circular_mean).map(([keypoint, mean], index) => (
                                <li key={index} className="text-gray-700">
                                    {keypoint}: {mean.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-4 bg-gray-100 rounded-lg">
                        <h4 className="font-medium text-primary">Circular Standard Deviation</h4>
                        <ul className="list-disc list-inside">
                            {Object.entries(keypoint_circular_std).map(([keypoint, stdDev], index) => (
                                <li key={index} className="text-gray-700">
                                    {keypoint}: {stdDev.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SitStandResult;
