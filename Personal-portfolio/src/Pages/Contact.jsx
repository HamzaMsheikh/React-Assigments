function Contact() {
  return (
    <section className="bg-purple-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">
          Get in Touch
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Contact Form */}
          <div className="flex-1 bg-purple-100 p-6 rounded-lg shadow-md hover:bg-purple-200 transition-colors">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Send a Message
            </h2>
            <form
              action="https://formspree.io/f/your-form-id"
              method="POST"
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-600"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-600 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info & Social Links */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Contact Information
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                <span className="font-medium">Email:</span>{' '}
                hamzasheikh7745@gmail.com
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span>{' '}
                03092075995
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Location:</span> Karachi, Pakistan
              </p>
              <p className="text-gray-600">
                Feel free to reach out for collaborations, inquiries, or just to
                say hi!
              </p>
            </div>

            {/* Social Media Links */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Follow Me
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/HamzaMsheikh?tab=overview&from=2025-05-01&to=2025-05-05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800"
                  aria-label="GitHub"
                >
                  <img
                    src="./src/assets/Images/github.webp"
                    alt="GitHub"
                    className="w-7 h-7 rounded-2xl"
                  />
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800"
                  aria-label="LinkedIn"
                >
                  <img
                    src="./src/assets/Images/linkedin.webp"
                    alt="LinkedIn"
                    className="w-7 h-7 rounded-2xl"
                  />
                </a>
                <a
                  href="https://www.facebook.com/share/16ZcFkrVKq/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800"
                  aria-label="Facebook"
                >
                  <img
                    src="https://cdn.iconscout.com/icon/free/png-256/free-facebook-logo-icon-download-in-svg-png-gif-file-formats--fb-new-color-social-media-logos-icons-1350125.png?f=webp"
                    alt="Facebook"
                    className="w-7 h-7 rounded-2xl"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;