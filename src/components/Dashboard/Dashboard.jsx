import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Chart, ArcElement } from 'chart.js';
import WaveBackground from '../WaveBackground'
import Results from '../FrailtyTest/Results';
import { useLocation } from 'react-router-dom';
Chart.register(ArcElement);

const Dashboard = () => {
    const [results, setResults] = useState([]);
    const location = useLocation();
    const resultsSectionRef = useRef(null);

    useEffect(() => {
        if (location.state?.scrollToResults) {
            if (resultsSectionRef.current) {
                resultsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location.state]);

    useEffect(() => {
        const storedResults = localStorage.getItem("results");
        if (storedResults) {
            setResults(JSON.parse(storedResults));
            toast.success("Previous results loaded successfully");
        } else {
            toast.error("No previous results found");
        }
    }, []);

    const totalTests = results.length;

    // Calculate average frailty score
    const averageFrailtyScore = useMemo(() => {
        const totalScore = results.reduce((sum, test) => sum + test.frailty_score, 0);
        return (totalScore / results.length).toFixed(2);
    }, [results]);

    // Calculate pass/fail rates
    const sitStandPassFailRate = useMemo(() => {
        const sitStandTests = results.filter(test => test.type === "5 Sit Stand");
        const passedTests = sitStandTests.filter(test => test.pass_fail === "PASSED");
        const passRate = (passedTests.length / sitStandTests.length) * 100;
        return passRate.toFixed(1);
    }, [results]);

    const walkTestPassFailRate = useMemo(() => {
        const walkTests = results.filter(test => test.type === "Gait Speed Walk Test");
        const passedTests = walkTests.filter(test => test.average_speed.toFixed(2) >= 100);
        const passRate = (passedTests.length / walkTests.length) * 100;
        return passRate.toFixed(1);
    }, [results]);

    const tugPassFailRate = useMemo(() => {
        const tugTests = results.filter(test => test.type === "Timed Up And Go");
        const passedTests = tugTests.filter(test => test.elapsed_time <= 12.0);
        const passRate = (passedTests.length / tugTests.length) * 100;
        return passRate.toFixed(1);
    }, [results]);

    const totalPassedTests = useMemo(() => {
        const passedTests = results.filter(test => {
            if (test.type === "5 Sit Stand") {
                return test.pass_fail === "PASSED";
            } else if (test.type === "Gait Speed Walk Test") {
                return test.average_speed >= 100;
            } else if (test.type === "TUG") {
                return test.elapsed_time <= 12.0;
            }
        });
        return passedTests.length;
    }, [results]);

    const passfailPieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 12,
                    font: { size: 10 },
                    padding: 5,
                },
            },
            title: {
                display: true,
                font: { size: 14 },
            },
        },
    };

    const sitStandPassFailData = {
        labels: ['Passed', 'Failed'],
        datasets: [
            {
                data: [parseFloat(sitStandPassFailRate), 100 - parseFloat(sitStandPassFailRate)],
                backgroundColor: ['#4CAF50', '#FF5252'],
                borderColor: ['#43A047', '#D32F2F'],
                borderWidth: 1,
            },
        ],
    };

    const gswtPassFailData = {
        labels: ['Passed', 'Failed'],
        datasets: [
            {
                data: [parseFloat(walkTestPassFailRate), 100 - parseFloat(walkTestPassFailRate)],
                backgroundColor: ['#4CAF50', '#FF5252'],
                borderColor: ['#43A047', '#D32F2F'],
                borderWidth: 1,
            },
        ],
    };

    const tugPassFailData = {
        labels: ['Passed', 'Failed'],
        datasets: [
            {
                data: [parseFloat(tugPassFailRate), 100 - parseFloat(tugPassFailRate)],
                backgroundColor: ['#4CAF50', '#FF5252'],
                borderColor: ['#43A047', '#D32F2F'],
                borderWidth: 1,
            },
        ],
    };

    const testPassFailChartData = [
        {
            title: "Sit Stand",
            data: sitStandPassFailData,
            delay: 0.1
        },
        {
            title: "Gait Speed Walk",
            data: gswtPassFailData,
            delay: 0.2
        },
        {
            title: "Timed Up and Go",
            data: tugPassFailData,
            delay: 0.3
        }
    ];

    const getFrailtyScoreDistribution = (results) => {
        const ranges = {
            '0-25': 0,
            '26-50': 0,
            '51-75': 0,
            '76-100': 0,
        };

        results.forEach((result) => {
            const score = result.frailty_score;
            if (score >= 0 && score <= 25) {
                ranges['0-25'] += 1;
            } else if (score > 25 && score <= 50) {
                ranges['26-50'] += 1;
            } else if (score > 50 && score <= 75) {
                ranges['51-75'] += 1;
            } else if (score > 75 && score <= 100) {
                ranges['76-100'] += 1;
            }
        });

        return ranges;
    };
    const frailtyScoreDistribution = getFrailtyScoreDistribution(results);

    const frailtyScoreData = {
        labels: ['0-25', '26-50', '51-75', '76-100'],
        datasets: [
            {
                label: 'Number of Tests',
                backgroundColor: '#C8A2C8',
                borderColor: '#9e6c9e',
                borderWidth: 1,
                data: [
                    frailtyScoreDistribution['0-25'],
                    frailtyScoreDistribution['26-50'],
                    frailtyScoreDistribution['51-75'],
                    frailtyScoreDistribution['76-100'],
                ],
            },
        ],
    };



    const getTestTypeDistribution = (results) => {
        if (!results || results.length === 0) return {};

        const testTypeDistribution = results.reduce((acc, result) => {
            acc[result.type] = (acc[result.type] || 0) + 1;
            return acc;
        }, {});
        return testTypeDistribution;
    };

    const testTypeDistribution = useMemo(() => {
        return getTestTypeDistribution(results);
    }, [results]);

    const getAverageTime = (testType) => {
        const testResults = results.filter(result => result.type === testType);
        const totalTime = testResults.reduce((sum, test) => sum + test.elapsed_time, 0);
        return (totalTime / testResults.length).toFixed(2);
    };
    const completionTimeData = {
        labels: ['5 Sit Stand', 'Gait Speed Walk Test', 'Timed Up and Go'],
        datasets: [
            {
                label: 'Average Time (s)',
                backgroundColor: ['#A2C8C8', '#C8A2C8', '#C8A2A2'],
                borderColor: ['#74b1b1', '#9e6c9e', '#9e6c6c'],
                borderWidth: 1,
                data: [
                    getAverageTime('5 Sit Stand'),
                    getAverageTime('Gait Speed Walk Test'),
                    getAverageTime('Timed Up And Go'),
                ],
            },
        ],
    };

    const testTypePieChartData = {
        labels: Object.keys(testTypeDistribution),
        datasets: [{
            data: Object.values(testTypeDistribution),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    };




    const completionTimeBarChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                boxWidth: 12,
                font: { size: 10 },
                padding: 5,
            },
            title: {
                // display: true,
                text: 'Average Completion Time',
                font: { size: 18 },
            },
        },
    };

    const testTypePieChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                boxWidth: 12,
                font: { size: 10 },
                padding: 5,
            },
            title: {
                // display: true,
                text: 'Test Type Distribution',
                font: { size: 18 },
            },
        },
    };
    const frailtyScoreBarChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    boxWidth: 12,
                    font: { size: 10 },
                    padding: 5,
                },
            },
            title: {
                display: false,
                text: 'Frailty Score Distribution',
                font: { size: 18 },
            },
        },
    };

    const overallMetricsChartData = [
        {
            title: "Frailty Score Distribution",
            data: frailtyScoreBarChartOptions,
            delay: 0.1,
            options: frailtyScoreBarChartOptions
        },
        {
            title: "Average Completion Time",
            data: gswtPassFailData,
            delay: 0.2,
            options: completionTimeBarChartOptions
        },
        {
            title: "Test Type Distribution",
            data: testTypePieChartData,
            delay: 0.3
        }
    ];

    const OverallMetricsCharts = ({ title }) => {
        switch (title) {
            case "Frailty Score Distribution":
                return <Bar data={frailtyScoreData} options={frailtyScoreBarChartOptions} />
            case "Average Completion Time":
                return <Bar data={completionTimeData} options={completionTimeBarChartOptions} />
            case "Test Type Distribution":
                return <Pie data={testTypePieChartData} options={testTypePieChartOptions} />
        }
    }
    return (
        <WaveBackground>

            <div className="max-w-7xl mx-auto p-6">
                <motion.h1 className="text-4xl font-bold text-pastelPurple mb-8 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    Dashboard
                </motion.h1>

                {/* Summary Section */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <motion.div
                        className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition border-l-4 border-pastelPurple"
                        whileHover={{ scale: 1.03 }}
                    >
                        <h2 className="text-xl font-semibold text-gray-700">Total Tests</h2>
                        <p className="text-4xl font-bold text-pastelPurple">{results.length}</p>
                    </motion.div>

                    <motion.div
                        className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition border-l-4 border-oliveDrab"
                        whileHover={{ scale: 1.03 }}
                    >
                        <h2 className="text-xl font-semibold text-gray-600">Average Frailty Score</h2>
                        <p className="text-4xl font-bold text-gray-600">{averageFrailtyScore}</p>
                    </motion.div>

                    <motion.div
                        className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition border-l-4 border-pastelPurple"
                        whileHover={{ scale: 1.03 }}
                    >
                        <h2 className="text-xl font-semibold text-gray-600">Total Passed Tests</h2>
                        <p className="text-4xl font-bold text-gray-600">{(totalPassedTests / results.length * 100).toFixed(2)}%</p>
                    </motion.div>
                </section>

                {/* Charts Section */}
                {/* Overall Metrics Section */}
                <section className="space-y-6 mb-12">
                    <h2 className="text-2xl font-semibold text-gray-700 pb-3">
                        Overall Metrics
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {overallMetricsChartData.map((chart, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">{chart.title}</h2>
                                <div className="h-48 flex justify-center items-center">
                                    <OverallMetricsCharts title={chart.title} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Passing Distribution Section */}
                <section className="space-y-6 mb-12">
                    <h2 className="text-2xl font-semibold text-gray-700 pb-3">
                        Passing Distribution
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testPassFailChartData.map((chart, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: chart.delay }}
                            >
                                <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">{chart.title}</h2>
                                <div className="h-48 flex justify-center items-center">
                                    <Pie data={chart.data} options={passfailPieOptions} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <div className='mt-6' ref={resultsSectionRef}>
                    <Results />
                </div>
            </div>
        </WaveBackground>
    );
};

export default Dashboard;
