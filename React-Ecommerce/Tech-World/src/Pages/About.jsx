export default function About() {
    return (
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About Tech-World</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to Tech-World, your one-stop shop for the latest tech gadgets and accessories. We are passionate about bringing innovation to your fingertips.
          </p>
        </section>
  
        {/* Mission Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">My-Mission</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-center">
            At Tech-World, our mission is to provide high-quality tech products at affordable prices while ensuring a seamless shopping experience. We aim to empower our customers with the latest technology to enhance their lives.
          </p>
        </section>
  
        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">About-Me</h2>
          <div className="flex justify-center items-center">
            {/* Team Member 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-60">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-2xl text-gray-600">HS</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Hamza Sheikh</h3>
              <p className="text-gray-600">Founder & CEO</p>
              <p className="text-gray-600">Head of Marketing</p>
              <p className="text-gray-600">Lead Developer</p>
            </div>
          </div>
        </section>
  
        {/* History Section */}
        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">My-Journey</h2>
          <div className="max-w-3xl mx-auto">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-4">2020</span>
                <p className="text-gray-600">Tech-World was founded with a vision to make technology accessible to everyone.</p>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-4">2021</span>
                <p className="text-gray-600">Launched our first online store, offering a wide range of gadgets.</p>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-4">2023</span>
                <p className="text-gray-600">Expanded our team and introduced new product categories.</p>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-4">2025</span>
                <p className="text-gray-600">Celebrating 5 years of serving tech enthusiasts worldwide!</p>
              </li>
            </ul>
          </div>
        </section>
      </div>
    );
  }