
import { useInView } from "react-intersection-observer";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Tooltip } from 'react-tooltip'
import CameraSetups from "./CameraSetups";
import { motion } from "framer-motion";
// import {testIntroduction as tests} from '../constants/testintroduction';
// import {cameraSetup as cameraSetups} from '../constants/camerasetup';
const tests = [
    {
        title: "4m Gait Speed Walk Test",
        video: "/assets/GSWT.mp4",
        description:
            <>
                <p className="font-semibold">4 metres Gait Speed Walk Test</p> measures the time it takes to walk four meters.
                <br />
                <span className="font-semibold">Evaluates:</span> overall walking ability and has been linked to functional independence and survival in older adults.
            </>,
        passingCriteria: "Average speed of 1.0 m/s or lower is considered a risk factor for frailty.",
    },
    {
        title: "Timed Up and Go",
        video: "/assets/TUG.mp4",
        description:
            <>
                <p className="font-semibold">Timed Up and Go (TUG) Test</p> measures the time it takes for a person to <span className="font-semibold">rise from a chair</span>,
                walk <span className="font-semibold">3 meters</span>,
                <span className="font-semibold">turn around </span>,
                <span className="font-semibold">walk back to the chair</span>,
                and
                <span className="font-semibold">sit down </span>.
                <br />
                <span className="font-semibold">Evaluates:</span> mobility, balance, walking ability, and risk of falls, particularly in older adults.
            </>,
        passingCriteria: "Total time taken more than 12 seconds is considered a risk factor for frailty.",
    },
    {
        title: "5 Repetitions Sit Stand",
        video: "/assets/CST.mp4",
        description:
            <>
                <p className="font-semibold">5 Repetitions Sit Stand Test</p> measures the time to perform 5 Chair Rises.
                <br />
                <span className="font-semibold">Evaluates:</span> lower body strength and endurance, which are important for daily activities.
            </>,
        passingCriteria: "Total time taken more than 12 seconds is considered a risk factor for frailty.",
    }
];


const TestCard = ({index, title, description, video, passingCriteria }) => {

    return (
        <motion.div
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-pastelPurple mr-2">{title}</h2>
                <a data-tooltip-id="my-tooltip" data-tooltip-content={passingCriteria}>
                    <IoIosInformationCircleOutline size={28} color="gray" />
                </a>
                <Tooltip id="my-tooltip" />
            </div>

            <div className="w-full h-48 mb-4 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-300">
                <video key={index} className="w-full h-full rounded-lg" loading="lazy" controls>
                    <source src={video} type="video/mp4" />
                    Your browser does not support the rendering of videos.
                </video>

            </div>

            <div className="text-gray-600">{description}</div>
        </motion.div>
    );
};

const TestIntro = ({ cameraSetupRef }) => {
    return (
        <section className="py-24 bg-gradient-to-b from-purple-50 to-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pastelPurple to-pink-500"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    About Our Tests
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tests.map((test, index) => (
                        <TestCard
                            key={index}
                            title={test.title}
                            description={test.description}
                            video={test.video}
                            passingCriteria={test.passingCriteria}
                        />
                    ))}
                </div>
            </div>
            <div id="camerasetups" ref={cameraSetupRef} className="mt-24 container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pastelPurple to-pink-500"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Optimal Camera Setup
                </motion.h2>
                <CameraSetups />
            </div>
        </section>
    );
};

export default TestIntro;
