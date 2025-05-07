import { useTheme } from '../ThemeContext'; // Adjust path as per your project structure

function Projects() {
  // Sample projects data (replace with your own)
  const projects = [
    {
      title: 'Tech-World',
      description:
        'A fully functional e-commerce website with user authentication, product filtering, and payment integration.',
      tech: ['React', 'Node.js', 'Tailwind', 'Firebase', 'React Router'],
      image: 'https://www.shutterstock.com/image-vector/online-shopping-digital-technology-icon-260nw-2217607781.jpg',
      github: 'https://github.com/HamzaMsheikh/React-Assigments/tree/main/React-Ecommerce/Tech-World',
      live: 'https://react-ecommerce-git-main-hamza-sheikhs-projects-bf301159.vercel.app/',
    },
    {
      title: 'Flying Superman Game',
      description:
        'I developed a fun and interactive Flying Superman Game using HTML, CSS, and JavaScript. The game features smooth animations and responsive controls, providing an engaging user experience.',
      tech: ['HTML', 'CSS', 'Javascript'],
      image: 'https://i.toynewsi.com/g/albums/Chillingo_Ltd/Superman/mzl.kpoitkjm.320x480-75.jpg',
      github: 'https://github.com/HamzaMsheikh/Javascript-Projects/tree/main/Flying-Superman-Game',
      live: 'https://flyingsuperman-1stgame-hamzasheikh.netlify.app/',
    },
    {
      title: 'Calculator',
      description:
        'I created a simple and fully functional calculator using HTML, CSS, and JavaScript. It performs basic arithmetic operations with a clean and user-friendly interface.',
      tech: ['HTML', 'CSS', 'Javascript'],
      image: 'https://lifehacker.com/imagery/articles/01J5QZ2SKPECB965ANKW19HNBQ/images-1.fill.size_2000x1000.v1724160341.jpg',
      github: 'https://github.com/HamzaMsheikh/Javascript-Projects/tree/main/Calculator',
      live: 'https://calculator-js-hamzasheikh.netlify.app/',
    },
  ];

  const { isDarkMode } = useTheme();

  return (
    <section className={`${isDarkMode ? 'bg-black' : 'bg-purple-50'} min-h-screen py-12`}>
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h1 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} text-center mb-8`}>
          My Projects
        </h1>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`${isDarkMode ? 'bg-blue-200 hover:bg-blue-300' : 'bg-purple-100 hover:bg-purple-200'} rounded-lg shadow-md overflow-hidden transition-all`}
            >
              {/* Project Image */}
              <div className={`${isDarkMode ? 'bg-blue-300' : 'bg-purple-200'} w-full h-48 flex items-center justify-center`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/placeholder.jpg';
                  }}
                />
              </div>

              {/* Project Details */}
              <div className="p-4">
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-black' : 'text-gray-800'} mb-2`}>
                  {project.title}
                </h2>
                <p className={`text-${isDarkMode ? 'gray-400' : 'gray-600'} mb-4`}>{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`${isDarkMode ? 'bg-blue-300 text-blue-900' : 'bg-purple-200 text-purple-800'} text-sm font-medium px-2 py-1 rounded`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${isDarkMode ? 'text-blue-400 hover:text-blue-600' : 'text-purple-600 hover:text-purple-800'} font-medium`}
                  >
                    GitHub
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${isDarkMode ? 'text-blue-400 hover:text-blue-600' : 'text-purple-600 hover:text-purple-800'} font-medium`}
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;