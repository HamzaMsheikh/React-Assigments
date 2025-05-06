import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="bg-gradient-to-r from-purple-100 to-purple-200 min-h-screen flex items-center justify-center py-12">
      <div className="container mx-auto px-4 text-center">
        {/* Hero Content */}
        <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4 animate-fade-in">
          Welcome, I'm Hamza Sheikh
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in delay-100">
          A passionate Web Developer crafting responsive, user-friendly, and innovative digital solutions.
        </p>
        <Link
          to="/projects"
          className="inline-block bg-purple-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-purple-600 transition-colors transform hover:scale-105 animate-fade-in delay-200"
        >
          Explore My Projects
        </Link>

        {/* Decorative Element */}
        <div className="mt-12">
          <svg
            className="w-12 h-12 mx-auto text-purple-500 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Home;