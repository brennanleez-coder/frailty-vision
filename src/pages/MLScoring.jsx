import React from "react";
import { motion } from "framer-motion";

const MLScoring = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="container mx-auto px-6">
        <motion.div
          className="bg-white p-8 md:p-12 soft-shadow max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pastelPurple to-pink-500 text-center mb-8">
            Machine Learning Scoring with Random Forest
          </h1>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed text-center">
            At <span className="font-semibold text-pastelPurple">Frailty Vision</span>, we leverage state-of-the-art machine learning techniques to assess frailty. One key algorithm we use is <span className="text-pastelPurple font-bold">Random Forest</span>, a powerful model that combines multiple decision trees to provide highly accurate and reliable predictions.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-soft hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-2xl font-semibold text-pastelPurple mb-4">
                Why Random Forest?
              </h2>
              <p className="text-gray-600">
                Random Forest is an ensemble learning method that builds multiple decision trees. Each tree is trained on random subsets of the data, ensuring a diverse and unbiased prediction. The results from all the trees are aggregated to provide the final frailty score.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-soft hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-2xl font-semibold text-pastelPurple mb-4">
                Key Benefits
              </h2>
              <p className="text-gray-600">
                The Random Forest model excels at <span className="text-pastelPurple font-bold">handling complex datasets</span> and mitigating overfitting. This makes it ideal for real-time frailty assessments, offering consistent and accurate scores that help you monitor your physical performance over time.
              </p>
            </motion.div>
          </div>

          {/* More Information Section */}
          <motion.div
            className="mt-12 p-6 bg-white rounded-xl shadow-soft"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2 className="text-3xl font-semibold text-center text-pastelPurple mb-6">
              How it Works
            </h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto">
              We collect key features from your test, such as joint movement variability, stride length, and speed. These features are then fed into our Random Forest model, which calculates the probability of frailty by evaluating multiple decision trees. The final score is a weighted average of all these evaluations, providing a robust and reliable frailty score.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default MLScoring;
