import React, { useState } from 'react'

const TugResult = ({
    distance_walked,
    elapsed_time,
    segment_times,
    average_speed,
    average_stride_length,
    keypoint_mean_magnitudes,
    keypoint_std_devs,
    keypoint_circular_mean,
    keypoint_circular_std,
    frailty_score,
}) => {

    return (
        <>
            <h2 className="text-2xl font-bold text-gray-600 mb-6 text-center">
                Timed Up and Go Test Result {(elapsed_time > 12.0) ? "❌" : "✅"} - {new Date().toLocaleDateString()}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${elapsed_time > 12.0 ? 'bg-green-100' : 'bg-red-100'}`}>
                    <h3 className="font-medium text-primary">Elapsed Time (s)</h3>
                    <p className="text-primary text-xl">{elapsed_time.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                    <h3 className="font-medium text-primary">Average Stride Length (cm)</h3>
                    <p className="text-primary text-xl">{average_stride_length.toFixed(2)}</p>
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
    )
}

export default TugResult
