import React from "react";
import { motion } from "framer-motion";

const Privacy = () => {
  return (
    <motion.div
      className="max-w-3xl mx-auto p-6 md:p-10 mt-16 bg-white shadow-lg rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Privacy Policy
      </motion.h1>

      <motion.p
        className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        We value your privacy and are committed to ensuring the confidentiality and security of your personal data. This Privacy Policy explains how we handle the data you share with us, especially regarding video processing via our CV algorithms and the use of local storage in your browser.
      </motion.p>

      {/* Sections */}
      {[
        {
          title: "Video Processing and Disposal",
          content: "Our computer vision (CV) algorithms process videos directly in your browser to extract relevant metrics. These videos are used solely for this purpose and are not stored on any server. Once the analysis is complete, the videos are immediately discarded, ensuring that your personal data remains private and secure.",
          highlight: "Videos are processed locally and discarded after analysis. No video files are saved or transferred to external servers."
        },
        {
          title: "Local Storage Use",
          content: "The results of your tests, including processed metrics, are saved in your browser's local storage. This storage is specific to your device and browser, meaning that no other users or servers can access this data.",
          highlight: "All data is saved only in local storage, which is specific to your browser. No data is sent to external servers or third parties."
        },
        {
          title: "Data Security",
          content: "We prioritize your privacy and have designed this application to operate without external data storage. The only storage used is local, specific to your browser, ensuring that your personal information and video files remain private and inaccessible to external parties."
        },
        {
          title: "Changes to This Policy",
          content: "We may update this Privacy Policy from time to time. Any changes will be posted here, so we encourage you to review this policy periodically to stay informed about how we are protecting your data."
        }
      ].map((section, index) => (
        <motion.div
          key={index}
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 * (index + 1), duration: 0.8 }}
        >
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">
            {section.title}
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-4 leading-relaxed">
            {section.content}
          </p>
          {section.highlight && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm md:text-base text-blue-700">
                <span className="font-bold">Key Point:</span> {section.highlight}
              </p>
            </div>
          )}
        </motion.div>
      ))}

      {/* Contact Section */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
      >
        <p className="text-base md:text-lg text-gray-600">
          If you have any questions or concerns about this Privacy Policy, feel free to contact us at{" "}
          <a href="mailto:brennan.lee@u.nus.edu" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
            brennan.lee@u.nus.edu
          </a>.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Privacy;
