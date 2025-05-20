import React, { useState } from 'react';
import { auth } from '../Firebase/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/actions';
import { motion } from 'framer-motion';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      let userCredential;
      if (isSignup) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Sign up successful:", userCredential.user);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Login successful:", userCredential.user);
      }
      dispatch(setUser(userCredential.user.toJSON()));
      setEmail('');
      setPassword('');
      navigate('/todos'); // Login ke baad todos page pe redirect
    } catch (error) {
      console.error("Authentication error:", error.code, error.message);
      if (error.code === 'auth/invalid-email') {
        alert("Invalid email format.");
      } else if (error.code === 'auth/user-not-found') {
        alert("No user found with this email.");
      } else if (error.code === 'auth/wrong-password') {
        alert("Incorrect password.");
      } else if (error.code === 'auth/email-already-in-use') {
        alert("This email is already in use.");
      } else {
        alert(`Authentication failed: ${error.message}`);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
      <motion.div
        className="flex-1 flex items-center justify-center p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {isSignup ? 'Sign Up' : 'Login'}
          </h2>
          <form onSubmit={handleAuth}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <motion.button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSignup ? 'Sign Up' : 'Login'}
            </motion.button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            {isSignup ? 'Already have an account?' : 'Need an account?'}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-500 hover:underline ml-1"
            >
              {isSignup ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Auth;