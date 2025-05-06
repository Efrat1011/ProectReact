import React from "react";
import Gemini from "../components/Gemini";

const Home = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 py-10">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-8">
        Басты бет
      </h1>
      <div className="w-full max-w-3xl p-4 bg-white shadow-lg rounded-lg">
        <Gemini />
      </div>
    </div>
  );
};

export default Home;
