import React from "react";
import ProcessVideoWithCV from "../components/FrailtyTest/ProcessVideoWithCV";
import Results from "../components/FrailtyTest/Results";
import { motion } from "framer-motion";
import WaveBackground from "../components/WaveBackground";

const FrailtyTest = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5, ease: "easeIn" } },
  };

  return (
    <WaveBackground>
      <div className="flex flex-col h-full overflow-hidden">
        <motion.div
          className="flex-grow overflow-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="max-w-7xl mx-auto p-6">
            <ProcessVideoWithCV />
          </div>
        </motion.div>
        <motion.div
          className="flex-shrink-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="max-w-7xl mx-auto p-6">
            <Results sliceFromStartTo={6} />
          </div>
        </motion.div>
      </div>
    </WaveBackground>
  );
};

export default FrailtyTest;
