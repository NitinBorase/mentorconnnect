import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="w-full min-h-screen bg-gray-100">
          {/* Navbar */}
          <nav className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">Mentor Connect</h1>
            <div className="space-x-6">
              <Link to="/login" className="text-gray-700 hover:text-blue-500">Login</Link>
              <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Sign Up
              </Link>
            </div>
          </nav>
          
          <section className="text-center py-16 px-6 bg-blue-50">
            <h2 className="text-4xl font-bold text-gray-800">Find Your Perfect Mentor</h2>
            <p className="text-lg text-gray-600 mt-3">Connect with industry experts and accelerate your career growth.</p>
            <div className="mt-6">
              <Link to="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                Get Started
              </Link>
            </div>
          </section>
    
          <section className="py-16 px-6">
            <h3 className="text-3xl font-bold text-gray-800 text-center">Why Choose Mentor Connect?</h3>
            <div className="flex flex-wrap justify-center mt-8">
              <div className="w-full md:w-1/3 p-4">
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold">Automated Booking</h4>
                  <p className="text-gray-600 mt-2">Easily schedule mentorship sessions with our smart calendar system.</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 p-4">
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold">Video Call Support</h4>
                  <p className="text-gray-600 mt-2">Connect with mentors through built-in secure video calls.</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 p-4">
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold">Industry Experts</h4>
                  <p className="text-gray-600 mt-2">Get guidance from professionals who have years of experience.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="text-center py-12 bg-blue-600 text-white">
            <h3 className="text-3xl font-bold">Start Your Mentorship Journey Today!</h3>
            <p className="text-lg mt-3">Join now and take the next step in your career.</p>
            <div className="mt-6">
              <Link to="/signup" className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-200">
                Sign Up Now
              </Link>
            </div>
          </section>
    
          {/* Footer */}
          <footer className="text-center py-6 bg-gray-200 text-gray-600">
            © 2025 Mentor Connect. All Rights Reserved.
          </footer>
        </div>
      );
};

export default LandingPage;