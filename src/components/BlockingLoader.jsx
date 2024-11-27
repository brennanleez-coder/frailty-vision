import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const tips = {
  "tips": [
    {
      "title": "Engage in Regular Physical Activity",
      "description": "Aim for at least 30 minutes of moderate exercise most days of the week."
    },
    {
      "title": "Incorporate Strength Training",
      "description": "Strength training twice a week helps maintain muscle mass and strength."
    },
    {
      "title": "Walk Daily",
      "description": "Walking keeps your muscles active, improves balance, and helps maintain mobility."
    },
    {
      "title": "Practice Balance Exercises",
      "description": "Activities like tai chi or simple balance drills can help reduce the risk of falls."
    },
    {
      "title": "Stretch Regularly",
      "description": "Improve flexibility with regular stretching to prevent stiffness and improve range of motion."
    },
    {
      "title": "Maintain a Healthy Weight",
      "description": "Avoid excessive weight loss or weight gain, which can increase frailty."
    },
    {
      "title": "Eat a Protein-Rich Diet",
      "description": "Protein is crucial for muscle maintenance; include lean meats, fish, eggs, and legumes."
    },
    {
      "title": "Consume Omega-3 Fatty Acids",
      "description": "Omega-3s help reduce inflammation and improve muscle function; eat fatty fish like salmon."
    },
    {
      "title": "Get Enough Calcium and Vitamin D",
      "description": "These are essential for bone health. Include dairy products or fortified plant-based milk and get sunlight exposure."
    },
    {
      "title": "Stay Hydrated",
      "description": "Drink enough water throughout the day to maintain hydration and reduce fatigue."
    },
    {
      "title": "Limit Alcohol Intake",
      "description": "Excessive alcohol can weaken bones and increase frailty risk."
    },
    {
      "title": "Avoid Smoking",
      "description": "Smoking increases the risk of osteoporosis and overall frailty."
    },
    {
      "title": "Reduce Sedentary Behavior",
      "description": "Avoid sitting for prolonged periods. Get up and move every 30 minutes."
    },
    {
      "title": "Use Resistance Bands",
      "description": "These are excellent for strength exercises that help maintain muscle mass."
    },
    {
      "title": "Include High-Fiber Foods",
      "description": "Fiber-rich foods help with digestion and prevent constipation."
    },
    {
      "title": "Practice Yoga",
      "description": "Yoga improves strength, flexibility, and balance, reducing the risk of falls."
    },
    {
      "title": "Consume Anti-Inflammatory Foods",
      "description": "Berries, nuts, and green leafy vegetables can reduce inflammation, which is linked to frailty."
    },
    {
      "title": "Get Adequate Sleep",
      "description": "Aim for 7-8 hours of sleep per night for overall health and recovery."
    },
    {
      "title": "Monitor Bone Health",
      "description": "Get regular bone density tests to monitor osteoporosis risk."
    },
    {
      "title": "Avoid Excess Sugar and Processed Foods",
      "description": "These contribute to inflammation and reduced muscle health."
    },
    {
      "title": "Take Supplements if Necessary",
      "description": "Consider a multivitamin or specific supplements based on a doctor's recommendation."
    },
    {
      "title": "Use Proper Footwear",
      "description": "Wear supportive shoes to reduce the risk of falls and maintain good posture."
    },
    {
      "title": "Practice Deep Breathing",
      "description": "Deep breathing exercises help improve lung capacity and relaxation."
    },
    {
      "title": "Engage in Gardening",
      "description": "Gardening is a form of physical activity that helps with strength and reduces stress."
    },
    {
      "title": "Join Group Exercise Programs",
      "description": "Social exercise groups improve fitness and mental health while reducing loneliness."
    },
    {
      "title": "Have Regular Check-Ups",
      "description": "Visit your healthcare provider regularly to monitor and manage health risks."
    },
    {
      "title": "Strengthen Core Muscles",
      "description": "A strong core helps with stability and reduces the risk of falls."
    },
    {
      "title": "Reduce Stress Levels",
      "description": "Practice mindfulness, meditation, or other stress-relieving activities to improve overall health."
    },
    {
      "title": "Socialize Frequently",
      "description": "Maintaining social connections can reduce stress and mental decline, which contribute to frailty."
    },
    {
      "title": "Play Brain Games",
      "description": "Engage in puzzles, chess, or other cognitive activities to keep the mind sharp."
    },
    {
      "title": "Avoid Overexertion",
      "description": "Exercise within your limits to prevent injury."
    },
    {
      "title": "Include Vitamin B12",
      "description": "Deficiency in B12 can lead to weakness. Eat eggs, fish, and dairy to meet your needs."
    },
    {
      "title": "Cook Balanced Meals",
      "description": "Incorporate fruits, vegetables, proteins, and whole grains in your diet."
    },
    {
      "title": "Set Realistic Fitness Goals",
      "description": "Setting achievable fitness goals can help maintain motivation and consistency."
    },
    {
      "title": "Practice Safe Lifting Techniques",
      "description": "Avoid straining your back when lifting objects; bend at the knees and keep objects close."
    },
    {
      "title": "Incorporate Functional Training",
      "description": "Do exercises that mimic everyday movements, such as squats, to maintain practical strength."
    },
    {
      "title": "Get Up Slowly",
      "description": "When getting up from bed or a chair, do so slowly to avoid dizziness and falls."
    },
    {
      "title": "Address Depression or Anxiety",
      "description": "Seek support if struggling with mental health issues, as they can impact physical health."
    },
    {
      "title": "Use Assistive Devices",
      "description": "If necessary, use a cane or walker to improve stability and reduce the risk of falls."
    },
    {
      "title": "Monitor Medications",
      "description": "Some medications can cause drowsiness or dizziness, increasing the risk of falls. Discuss side effects with your doctor."
    },
    {
      "title": "Modify Your Home",
      "description": "Remove tripping hazards like rugs, and add grab bars in the bathroom to prevent falls."
    },
    {
      "title": "Get Your Vision and Hearing Checked",
      "description": "Poor vision or hearing can lead to accidents, so regular check-ups are essential."
    },
    {
      "title": "Practice Mind-Body Techniques",
      "description": "Tai chi and Pilates are excellent for maintaining mobility and reducing frailty."
    },
    {
      "title": "Limit Caffeine Intake",
      "description": "Excessive caffeine can interfere with sleep quality and hydration."
    },
    {
      "title": "Stay Informed About Health",
      "description": "Keep up-to-date with health recommendations and practices that can help maintain vitality."
    },
    {
      "title": "Use Resistance Weights",
      "description": "Lifting light weights can help strengthen muscles, even if done while sitting."
    },
    {
      "title": "Eat Smaller, Frequent Meals",
      "description": "This helps maintain energy levels, especially if you have reduced appetite."
    },
    {
      "title": "Keep a Daily Journal",
      "description": "Track your physical activity, diet, and mental health to identify areas for improvement."
    },
    {
      "title": "Volunteer or Stay Active in the Community",
      "description": "This keeps you mentally active and socially engaged, reducing frailty risk."
    },
    {
      "title": "Listen to Your Body",
      "description": "Avoid pushing through pain. Rest when needed to avoid injuries that can lead to frailty."
    }
  ]
}

const loaderVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};

const spinVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

const BlockingLoader = ({ loading, message, progress }) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    if (loading) {
      const tipInterval = setInterval(() => {
        setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.tips.length);
      }, 5000);

      return () => clearInterval(tipInterval);
    }
  }, [loading]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-purple-600 via-blue-500 to-pink-500 bg-opacity-50 backdrop-blur-lg flex items-center justify-center">
      <motion.div
        className="p-10 bg-gradient-to-r from-white/70 to-white/50 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/30 flex flex-col items-center space-y-8"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 10 }}
      >
        {/* Spinning Circle */}
        <motion.div
          className="w-32 h-32 border-8 border-t-purple-500 border-b-blue-300 rounded-full shadow-lg"
          variants={spinVariants}
          animate="animate"
        />

        {/* Bouncing Text */}
        <motion.p
          className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-500"
          variants={loaderVariants}
          initial="initial"
          animate="animate"
        >
          {message || 'Processing your video...'}
        </motion.p>

        {/* Tip Section */}
        <div className="mt-4 p-6 bg-white/60 backdrop-blur-md rounded-2xl shadow-xl">
          <h4 className="text-xl font-semibold text-purple-700">Tip of the Moment:</h4>
          <p className="text-lg font-medium text-gray-900 mt-2">{tips.tips[currentTipIndex].title}</p>
          <p className="text-md text-gray-700 mt-1">{tips.tips[currentTipIndex].description}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default BlockingLoader;
