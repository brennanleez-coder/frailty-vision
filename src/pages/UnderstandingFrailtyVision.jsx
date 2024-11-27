import React from "react";
import { motion } from "framer-motion";
import { IoMdConstruct } from "react-icons/io";

const steps = [
  {
    title: "Step 1: Pose Estimation with MediaPipe",
    description:
      <>
        We use MediaPipe’s pose estimation to detect 32 key body landmarks such as knees, hips, and feet.
        <br />
        The model continuously captures the 3D coordinates of these landmarks as you move.
      </>,
    icon: "🎯",
  },
  {
    title: "Step 2: Extracting Key Features",
    description:
      <>
        From the pose estimation data, we extract critical features.
        <br />
        These include knee and hip angles, stride lengths, and other joint-specific data.
      </>,
    icon: "📐",
  },
  {
    title: "Step 3: Optical Flow for Motion Detection",
    description:
      <>
        We apply sparse optical flow to the pose estimation output to track the movement of key joints over time.
      </>,
    icon: "🌊",
  },
  {
    title: "Step 4: Joint Movement Variability",
    description:
      <>
        To assess frailty, we calculate the standard deviation of each joint’s movement, known as joint movement variability.
        <br />
      </>,
    icon: "📊",
  },
];
const UnderstandingFrailtyVision = () => {

  return (
    <section className="max-w-7xl mx-auto p-8">
      <motion.h1
        className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pastelPurple to-pink-500"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
      >
        How Our Computer Vision Algorithms Work
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-soft hover:shadow-xl transition-all duration-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <div className="text-5xl mb-4">{step.icon}</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">
              {step.title}
            </h3>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-12 bg-gray-100 rounded-lg p-8 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-pastelPurple">
          Visual Representation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-4">
            <video controls className="rounded-lg shadow-lg w-full">
              <source src="/assets/pose-estimation-demo.mp4" type="video/mp4" />
              Your browser does not support video playback.
            </video>
            <p className="text-center text-gray-600 mt-4">
              Pose Estimation using MediaPipe
            </p>
          </div>
          <div className="p-4">
            <img
              src="/assets/optical-flow-demo.png"
              alt="Optical Flow Demo"
              className="rounded-lg shadow-lg"
            />
            <p className="text-center text-gray-600 mt-4">
              Optical Flow Applied to Joints
            </p>
          </div>
        </div>
      </motion.div>

      {/* Conclusion Section */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-pastelPurple mb-6">
          What Does This Mean for You?
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">

          Using advanced computer vision techniques, our test results deliver precise, decimal-level accuracy. We analyze your movement patterns to offer valuable insights into your mobility and frailty. These insights empower you to better understand your physical performance and track any changes over time.
        </p>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <a
            href="/frailty-test"
            className="px-8 py-4 bg-pastelPurple text-white font-bold rounded-lg shadow-md hover:bg-pink-500 transition-all duration-300"
          >
            Start Your Frailty Test Now
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default UnderstandingFrailtyVision;
