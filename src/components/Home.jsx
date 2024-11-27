import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter'
import { motion } from 'framer-motion'
import TestIntro from './Information/TestIntro';
import StepByStep from './Information/StepByStep'
import Features from './Information/Features'

const Hero = () => (
    <section className="flex-grow flex items-center justify-center bg-gradient-to-b from-white via-purple-50 to-pink-50 py-20 overflow-hidden relative">

        <div className="container mx-auto text-center relative z-10">
            <motion.h2
                className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pastelPurple to-pink-500"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                Welcome to the Future of Frailty Tracking
            </motion.h2>
            <motion.p
                className="text-3xl md:text-4xl text-center text-gray-700 mb-12 leading-relaxed"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            >
                Discover your strength with{" "}
                <span className="text-pastelPurple font-bold">Frailty Vision</span>
                <br />
                <span className="block text-lg md:text-xl mt-4 text-gray-500 font-light">
                    Delivering <span className="font-semibold text-pastelPurple">reliable</span> results with:
                </span>
                <span className="inline-block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-pastelPurple to-pink-500 font-bold">
                    <Typewriter
                        words={["Precision", "Simplicity", "Speed", "Accuracy", "Innovation"]}
                        loop={true}
                        cursor
                        cursorStyle="_"
                        typeSpeed={80}
                        deleteSpeed={30}
                        delaySpeed={1000}
                    />
                </span>
            </motion.p>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
            >
                <Link to="/frailty-test" className="inline-block">
                    <motion.button
                        className="bg-gradient-to-r from-pastelPurple to-pink-500 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition duration-300"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(123, 31, 162, 0.5)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get Started
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    </section>
)

const Home = () => {
    const cameraSetupRef = useRef(null)
    const scrollToCameraSetup = () => {
        if (cameraSetupRef.current) {
            cameraSetupRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (
        <>

            <Hero />
            <Features />
            <StepByStep scrollToCameraSetup={scrollToCameraSetup} />
            <TestIntro cameraSetupRef={cameraSetupRef} />
        </>
    )
}

export default Home
