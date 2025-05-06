function Projects() {
    // Sample projects data (replace with your own)
    const projects = [
      {
        title: 'Tech-World',
        description:
          'A fully functional e-commerce website with user authentication, product filtering, and payment integration.',
        tech: ['React', 'Node.js', 'Tailwind', 'Firebase', 'React Router'],
        image: './src/assets/Images/tech-world.png',
        github: 'https://github.com/HamzaMsheikh/React-Assigments/tree/main/React-Ecommerce/Tech-World',
        live: 'https://react-ecommerce-git-main-hamza-sheikhs-projects-bf301159.vercel.app/',
      },
      {
        title: 'Flying Superman Game',
        description:
          'I developed a fun and interactive Flying Superman Game using HTML, CSS, and JavaScript. The game features smooth animations and responsive controls, providing an engaging user experience.',
        tech: ['HTML', 'CSS', 'Javascript'],
        image: './src/assets/Images/flying-superman.png',
        github: 'https://github.com/HamzaMsheikh/Javascript-Projects/tree/main/Flying-Superman-Game',
        live: 'https://flyingsuperman-1stgame-hamzasheikh.netlify.app/',
      },
      {
        title: 'Calculator',
        description:
          'I created a simple and fully functional calculator using HTML, CSS, and JavaScript. It performs basic arithmetic operations with a clean and user-friendly interface.',
        tech: ['HTML', 'CSS', 'Javascript'],
        image: './src/assets/Images/calculator.png',
        github: 'https://github.com/HamzaMsheikh/Javascript-Projects/tree/main/Calculator',
        live: 'https://calculator-js-hamzasheikh.netlify.app/',
      },
    ];
  
    return (
      <section className="bg-purple-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">
            My Projects
          </h1>
  
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-purple-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:bg-purple-200 transition-all"
              >
                {/* Project Image */}
                <div className="w-full h-48 bg-purple-200 flex items-center justify-center">
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
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {project.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{project.description}</p>
  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-purple-200 text-purple-800 text-sm font-medium px-2 py-1 rounded"
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
                      className="text-purple-600 hover:text-purple-800 font-medium"
                    >
                      GitHub
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800 font-medium"
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