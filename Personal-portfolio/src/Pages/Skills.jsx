function Skills() {
    const technicalSkills = [
      { name: 'React', icon: '⚛️' },
      { name: 'JavaScript', icon: '📜' },
      { name: 'Tailwind CSS', icon: '🎨' },
      { name: 'Node.js', icon: '🟢' },
      { name: 'Git', icon: '🔀' },
      { name: 'HTML', icon: '📄' },
      { name: 'CSS', icon: '🖌️' },
      { name: 'Firebase', icon: '🔥' },
      { name: 'Shadcn', icon: '🛠️' },
      { name: 'Bootstrap', icon: '📱' },
    ];
  
    const softSkills = [
      { name: 'Problem Solving', icon: '🧠' },
      { name: 'Team Collaboration', icon: '🤝' },
      { name: 'Communication', icon: '🗣️' },
      { name: 'Time Management', icon: '⏰' },
    ];
  
    return (
      <section className="bg-purple-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">
            My Skills
          </h1>
  
          {/* Technical Skills */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
              Technical Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {technicalSkills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-purple-100 p-4 rounded-lg shadow-md flex items-center justify-center space-x-2 hover:bg-purple-200 transition-colors"
                >
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="text-gray-700 font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
  
          {/* Soft Skills */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
              Soft Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {softSkills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-purple-100 p-4 rounded-lg shadow-md flex items-center justify-center space-x-2 hover:bg-purple-200 transition-colors"
                >
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="text-gray-700 font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default Skills;