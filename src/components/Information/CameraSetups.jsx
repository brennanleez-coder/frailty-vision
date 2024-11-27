import React from 'react'
import GSWT_Initial_Position from "../../assets/GSWT_Initial_Position.png";
import TUG_Initial_Position from "../../assets/TUG_Initial_Position.png";
import ST_Initial_Position from "../../assets/ST_Initial_Position.png";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
const cameraSetups = [
    {
        title: "Gait Speed Walk Test",
        description:
            "Position the camera perpendicular to the direction of movement at chest level for accurate data capture.",
        imageSrc: GSWT_Initial_Position,
        imageAlt: "Gait Speed Walk Test Setup",
        imageStyle: "object-cover",
    },
    {
        title: "Timed Up and Go Test",
        description:
            "The camera should be placed perpendicular to the movement, capturing the entire walking sequence and turn.",
        imageSrc: TUG_Initial_Position,
        imageAlt: "Timed Up and Go Test Setup",
        imageStyle: "object-cover",
    },
    {
        title: "5 Repetition Chair Rise",
        description:
            "Position the camera at the side, ensuring it captures the full sitting and rising motion for accurate assessment.",
        imageSrc: ST_Initial_Position,
        imageAlt: "5 Repetition Chair Rise Setup",
        imageStyle: "object-contain bg-gray-200",
    },
];
const CameraSetups = () => {
    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="camerasetups">
                {cameraSetups.map((setup, index) => (
                    <motion.div
                        key={index}
                        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                    >
                        <img
                            src={setup.imageSrc}
                            alt={setup.imageAlt}
                            className={`w-full h-48 rounded-lg shadow-md ${setup.imageStyle} transition-transform transform hover:scale-105 duration-300 mb-4`}
                        />
                        <h3 className="text-xl font-semibold text-pastelPurple mb-2">
                            {setup.title}
                        </h3>
                        <p className="text-gray-600">
                            {setup.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};


export default CameraSetups
