import { useNavigate } from "react-router-dom";

const VideoCalls = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl">Video Calls</h1>
        <button 
          onClick={() => navigate("/dashboard")}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg ml-4 hover:bg-blue-100"
        >
          Back to Dashboard
        </button>
      </header>

      <main className="container mx-auto p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Start or Join a Video Call</h2>

          <div className="flex space-x-4">
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">
              Start a New Call
            </button>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
              Join Existing Call
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoCalls;
