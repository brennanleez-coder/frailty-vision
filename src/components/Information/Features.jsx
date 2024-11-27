import { Link } from 'react-router-dom';
import { HiArrowNarrowRight } from 'react-icons/hi';

import { motion } from 'framer-motion';
const features = [
    {
        title: "Computer Vision Algorithms",
        description:
            <div className="text-center">
                <p className="text-gray-700 mb-4">
                    Highly performant algorithms are crafted to extract key movement features.
                </p>
                <Link
                    to="/understanding-frailty-vision"
                    className="text-pastelPurple font-semibold hover:underline inline-block mt-2 transition-transform duration-300 ease-in-out hover:scale-105"
                >
                    <span className="flex items-center justify-center text-gray-600">
                        Learn More Here
                        <HiArrowNarrowRight className="ml-2 text-lg" />
                    </span>
                </Link>
            </div>
    },
    {
        title: "ML-based Scoring",
        description:
            <div className="text-center">
                <p className="text-gray-700 p-2">
                    Our model evaluates your test performance in real-time, generating an accurate frailty score.
                </p>
                <Link
                    to="/ml-scoring"
                    className="text-pastelPurple font-semibold hover:underline inline-block mt-2 transition-transform duration-300 ease-in-out hover:scale-105"
                >
                    <span className="flex items-center justify-center text-gray-600">
                        Understand the Model
                        <HiArrowNarrowRight className="ml-2 text-lg" />
                    </span>
                </Link>
            </div>
    },
    {
        title: "Frailty Tracking",
        description:
            <div className="text-center">
                <p className="text-gray-700 p-2">
                    Visualize your results and track your frailty levels over multiple tests, helping you monitor changes over time.
                </p>
                <Link
                    to="/track-progress"
                    className="text-pastelPurple font-semibold hover:underline inline-block mt-2 transition-transform duration-300 ease-in-out hover:scale-105"
                >
                    <span className="flex items-center justify-center text-gray-600">
                        Track Your Progress
                        <HiArrowNarrowRight className="ml-2 text-lg" />
                    </span>
                </Link>
            </div>
    }
]

const Features = () => (
    <section id="features" className="py-8 bg-gradient-to-b from-pink-50 to-white">
        <div className="container mx-auto px-4">
            <motion.h2 
                className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pastelPurple to-pink-500"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Key Features
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <motion.div 
                        key={index} 
                        className="flex flex-col items-center justify-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                    >
                        <h3 className="text-xl font-bold text-pastelPurple mb-4">{feature.title}</h3>
                        {feature.description}
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default Features;