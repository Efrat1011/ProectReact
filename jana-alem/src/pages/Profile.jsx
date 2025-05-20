import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [username, setUsername] = useState(""); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isRegistering, setIsRegistering] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(""); 

  const navigate = useNavigate(); 

  
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

 
  const handleRegister = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem("username", username);
      setIsLoggedIn(true);
      setErrorMessage("");
      navigate("/my-courses"); 
    } else {
      setErrorMessage("Атыңызды енгізіңіз.");
    }
  };

 
  const handleLogin = (e) => {
    e.preventDefault();
    const storedUsername = localStorage.getItem("username");
    if (storedUsername === username) {
      setIsLoggedIn(true);
      setErrorMessage("");
      navigate("/my-courses"); 
    } else {
      setErrorMessage("Қолданушы аты дұрыс емес.");
    }
  };


  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/"); 
  };


  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-10 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">
          Профильге кіріңіз
        </h1>
        <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
          {isRegistering ? (
            <form onSubmit={handleRegister}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded border border-blue-400 mb-4"
                placeholder="Аты-жөніңіз"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Тіркелу
              </button>
              {errorMessage && (
                <p className="text-red-600 mt-2 text-center">{errorMessage}</p>
              )}
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded border border-blue-400 mb-4"
                placeholder="Қолданушы аты"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Кіру
              </button>
              {errorMessage && (
                <p className="text-red-600 mt-2 text-center">{errorMessage}</p>
              )}
            </form>
          )}
          <div className="mt-4 text-center">
            {isRegistering ? (
              <p>
                Алдын ала тіркелдіңіз бе?{" "}
                <button
                  onClick={() => setIsRegistering(false)}
                  className="text-blue-600"
                >
                  Кіру
                </button>
              </p>
            ) : (
              <p>
                Жаңа пайдаланушысыз ба?{" "}
                <button
                  onClick={() => setIsRegistering(true)}
                  className="text-blue-600"
                >
                  Тіркелу
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">
        Профиль
      </h1>
      <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <p><strong>Аты:</strong> {username}</p>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg"
        >
          Шығу
        </button>
        <button
          onClick={() => navigate("/my-courses")}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Менің курстарым
        </button>
      </div>
    </div>
  );
};

export default Profile;
