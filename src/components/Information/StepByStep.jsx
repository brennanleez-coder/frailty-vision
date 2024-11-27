import { Link } from 'react-scroll';
import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Step 1: Set Up Your Camera",
    description: (
      <>
        Refer to our setup guide to position your camera at the right angle. Make sure you have enough space to move around.
        <br />
        For more details, check out our{" "}
        <Link
          to="camerasetups"
          smooth={true}
          duration={500}
          className="text-pastelPurple font-semibold hover:underline cursor-pointer"
        >
          Camera Setup Guide
        </Link>.
      </>
    ),
    icon: "📸",
  },
  {
    title: "Step 2: Record Your Test",
    description: "Record your test using our web app. Follow the instructions to complete the test accurately.",
    icon: "🏃‍♂️",
  },
  {
    title: "Step 3: Analyze Your Movements",
    description: "Our CV algorithms will process your movements in real-time, extracting stride length, speed, and more key indicators.",
    icon: "💻",
  },
  {
    title: "Step 4: Get Your Results",
    description: "After completing the test, you’ll receive in-depth details with your frailty score.",
    icon: "📊",
  },
];

const StepByStep = () => {
  return (
    <section className="py-4 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pastelPurple to-pink-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          How It Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-2xl font-semibold text-pastelPurple mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepByStep;
