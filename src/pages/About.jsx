import React from 'react';
import { motion } from "framer-motion";

const ContactCard = ({ name, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border-l-4 border-pastelPurple">
    <h2 className="text-xl font-semibold mb-2 text-pastelPurple">{name}</h2>
    <h3 className="text-md mb-4 text-gray-600">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
);


const About = () => {
  const contacts = [
    {
      name: "Brennan Lee",
      title: "Computer Vision Engineer",
      description:
        "Brennan Lee is a skilled computer vision engineer with expertise in developing advanced algorithms for healthcare applications. His work involves creating systems that can analyze medical images and videos to provide insights for clinical decision-making.",
    },
    {
      name: "Prof Teo Hock Hai",
      title: "Professor, NUS",
      description:
        "Prof Teo Hock Hai is a renowned professor at the National University of Singapore, specializing in health informatics and information systems. His research interests include the use of technology to enhance healthcare delivery and the adoption of innovative health IT solutions.",
    },
  ];

  return (
    <motion.main
      className="flex-grow p-8 bg-white text-primary"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <section className="container mx-auto max-w-screen-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pastelPurple to-pink-500">NUS Health Informatics Lab</h1>
        <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
          <div className="flex-1 bg-white p-6 rounded-soft shadow-soft hover:shadow-lg transition duration-300 border border-pastelPurple">
            <h2 className="text-2xl font-semibold mb-4 text-pastelPurple">About the Lab</h2>
            <p className="text-secondary text-gray-600">
              The NUS Health Informatics Lab focuses on leveraging data and informatics to improve healthcare delivery and outcomes. The lab conducts cutting-edge research and collaborates with industry and academic partners to drive innovation in health informatics.
            </p>
          </div>
          <div className="flex-1 flex flex-col space-y-8">
            {contacts.map((contact, index) => (
              <ContactCard
                key={index}
                name={contact.name}
                title={contact.title}
                description={contact.description}
              />
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  );
};

export default About;
