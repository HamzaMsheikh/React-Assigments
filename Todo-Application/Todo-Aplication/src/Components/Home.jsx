import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col">
      {/* Hero Section */}
      <motion.section
        className="flex-1 flex flex-col items-center justify-center text-center p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl font-bold text-gray-800 mb-4"
          variants={itemVariants}
        >
          Welcome to Your Todo App
        </motion.h1>
        <motion.p
          className="text-xl text-gray-600 mb-6 max-w-2xl"
          variants={itemVariants}
        >
          Organize your tasks, boost your productivity, and never miss a deadline with our user-friendly Todo App!
        </motion.p>
        <motion.button
          onClick={() => navigate('/auth')}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-12 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Why Use Our Todo App?
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <motion.div
            className="p-6 bg-gray-50 rounded-lg shadow-md"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Real-Time Sync</h3>
            <p className="text-gray-600">
              Your todos are synced in real-time with Firebase, so you never lose your data.
            </p>
          </motion.div>
          <motion.div
            className="p-6 bg-gray-50 rounded-lg shadow-md"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-2">User Authentication</h3>
            <p className="text-gray-600">
              Secure login and signup to keep your todos private and accessible only to you.
            </p>
          </motion.div>
          <motion.div
            className="p-6 bg-gray-50 rounded-lg shadow-md"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Easy Management</h3>
            <p className="text-gray-600">
              Add, update, and delete todos with a simple and intuitive interface.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;