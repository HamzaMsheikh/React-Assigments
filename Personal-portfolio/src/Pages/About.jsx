// import { useTheme } from '../ThemeContext'; // Adjust path as per your project structure

// function About() {
//   const { isDarkMode } = useTheme();

//   return (
//     <section className={`${isDarkMode ? 'bg-black' : 'bg-purple-50'} min-h-screen py-12`}>
//       <div className="container mx-auto px-4">
//         {/* Heading */}
//         <h1 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} text-center mb-8`}>
//           About Me
//         </h1>

//         {/* Bio Section */}
//         <div className="flex flex-col md:flex-row items-center gap-8">
//           {/* Profile Image */}
//           <div className="w-48 h-48 md:w-64 md:h-64">
//             <img
//               src="https://avatars.githubusercontent.com/u/156770468?v=4"
//               alt="Hamza Sheikh"
//               className="w-full h-full rounded-full object-cover"
//             />
//           </div>

//           {/* Bio Text */}
//           <div className="flex-1">
//             <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
//               Hello! I'm Hamza Sheikh, a motivated and detail-oriented web developer with a strong foundation in both creative and technical aspects of web design and development. I completed my intermediate education from Islamia Arts and Commerce College, and I’m currently advancing my skills through a professional Web Development course.
//             </p>
//             <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
//               Over time, I have worked on several projects that have helped me gain practical experience in HTML, CSS, JavaScript, React, and Tailwind CSS. I have a strong passion for creating clean, responsive, and accessible web applications that offer a seamless user experience. My focus is not just on writing code but also on understanding user needs and turning ideas into well-crafted digital solutions. 
//             </p>
//             <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
//               I consider myself a quick learner, problem-solver, and team player who is always open to feedback and improvement. I’m highly driven by curiosity and committed to staying up-to-date with the latest trends and technologies in the web development world. Whether working independently or as part of a team, I bring dedication, creativity, and a positive mindset to every project I work on.
//             </p>
//             <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
//               I'm excited to continue growing as a developer and to contribute to real-world projects that make a meaningful impact.
//             </p>
//           </div>
//         </div>

//         {/* Additional Info (Optional) */}
//         <div className="mt-12">
//           <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} text-center mb-6`}>
//             Quick Facts
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
//             <div className={`${isDarkMode ? 'bg-blue-200 hover:bg-blue-300' : 'bg-purple-100 hover:bg-purple-200'} p-4 rounded-lg text-center transition-colors`}>
//               <h3 className={`text-lg font-medium ${isDarkMode ? 'text-black' : 'text-gray-700'}`}>Experience</h3>
//               <p className={`text-${isDarkMode ? 'gray-400' : 'gray-600'}`}>[1] Year in [Studying and Making Projects, Web Development]</p>
//             </div>
//             <div className={`${isDarkMode ? 'bg-blue-200 hover:bg-blue-300' : 'bg-purple-100 hover:bg-purple-200'} p-4 rounded-lg text-center transition-colors`}>
//               <h3 className={`text-lg font-medium ${isDarkMode ? 'text-black' : 'text-gray-700'}`}>Location</h3>
//               <p className={`text-${isDarkMode ? 'gray-400' : 'gray-600'}`}>[Karachi, Pakistan]</p>
//             </div>
//             <div className={`${isDarkMode ? 'bg-blue-200 hover:bg-blue-300' : 'bg-purple-100 hover:bg-purple-200'} p-4 rounded-lg text-center transition-colors`}>
//               <h3 className={`text-lg font-medium ${isDarkMode ? 'text-black' : 'text-gray-700'}`}>Education</h3>
//               <p className={`text-${isDarkMode ? 'gray-400' : 'gray-600'}`}>[Graduate, Islamia Govt.College]</p>
//             </div>
//             <div className={`${isDarkMode ? 'bg-blue-200 hover:bg-blue-300' : 'bg-purple-100 hover:bg-purple-200'} p-4 rounded-lg text-center transition-colors`}>
//               <h3 className={`text-lg font-medium ${isDarkMode ? 'text-black' : 'text-gray-700'}`}>Hobbies</h3>
//               <p className={`text-${isDarkMode ? 'gray-400' : 'gray-600'}`}>[Coding, Singing, Music, Reading, Playnig games.]</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default About;



import { useTheme } from '../ThemeContext'; // Adjust path as per your project structure

function About() {
  const { isDarkMode } = useTheme();

  return (
    <section className={`${isDarkMode ? 'bg-black' : 'bg-purple-50'} min-h-screen py-12`}>
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h1 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} text-center mb-8`}>
          About Me
        </h1>

        {/* Bio Section */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Profile Image */}
          <div className="w-48 h-48 md:w-64 md:h-64">
            <img
              src="https://avatars.githubusercontent.com/u/156770468?v=4"
              alt="Hamza Sheikh"
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {/* Bio Text */}
          <div className="flex-1">
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Hello! I'm Hamza Sheikh, a motivated and detail-oriented web developer with a strong foundation in both creative and technical aspects of web design and development. I completed my intermediate education from Islamia Arts and Commerce College, and I’m currently advancing my skills through a professional Web Development course.
            </p>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Over time, I have worked on several projects that have helped me gain practical experience in HTML, CSS, JavaScript, React, and Tailwind CSS. I have a strong passion for creating clean, responsive, and accessible web applications that offer a seamless user experience. My focus is not just on writing code but also on understanding user needs and turning ideas into well-crafted digital solutions. 
            </p>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              I consider myself a quick learner, problem-solver, and team player who is always open to feedback and improvement. I’m highly driven by curiosity and committed to staying up-to-date with the latest trends and technologies in the web development world. Whether working independently or as part of a team, I bring dedication, creativity, and a positive mindset to every project I work on.
            </p>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              I'm excited to continue growing as a developer and to contribute to real-world projects that make a meaningful impact.
            </p>
          </div>
        </div>

        {/* Additional Info (Optional) */}
        <div className="mt-12">
          <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} text-center mb-6`}>
            Quick Facts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <div className={`${isDarkMode ? 'bg-blue-200 hover:bg-blue-300' : 'bg-purple-100 hover:bg-purple-200'} p-4 rounded-lg text-center transition-colors`}>
              <h3 className={`text-lg font-medium ${isDarkMode ? 'text-black' : 'text-gray-700'}`}>Experience</h3>
              <p className={`text-${isDarkMode ? 'gray-400' : 'gray-600'}`}>[1] Year in [Studying and Making Projects, Web Development]</p>
            </div>
            <div className={`${isDarkMode ? 'bg-blue-200 hover:bg-blue-300' : 'bg-purple-100 hover:bg-purple-200'} p-4 rounded-lg text-center transition-colors`}>
              <h3 className={`text-lg font-medium ${isDarkMode ? 'text-black' : 'text-gray-700'}`}>Location</h3>
              <p className={`text-${isDarkMode ? 'gray-400' : 'gray-600'}`}>[Karachi, Pakistan]</p>
            </div>
            <div className={`${isDarkMode ? 'bg-blue-200 hover:bg-blue-300' : 'bg-purple-100 hover:bg-purple-200'} p-4 rounded-lg text-center transition-colors`}>
              <h3 className={`text-lg font-medium ${isDarkMode ? 'text-black' : 'text-gray-700'}`}>Education</h3>
              <p className={`text-${isDarkMode ? 'gray-400' : 'gray-600'}`}>[Graduate, Islamia Govt.College]</p>
            </div>
            <div className={`${isDarkMode ? 'bg-blue-200 hover:bg-blue-300' : 'bg-purple-100 hover:bg-purple-200'} p-4 rounded-lg text-center transition-colors`}>
              <h3 className={`text-lg font-medium ${isDarkMode ? 'text-black' : 'text-gray-700'}`}>Hobbies</h3>
              <p className={`text-${isDarkMode ? 'gray-400' : 'gray-600'}`}>[Coding, Singing, Music, Reading, Playnig games.]</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
