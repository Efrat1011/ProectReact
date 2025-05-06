import React, { useEffect, useState } from "react";

const MyCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    setEnrolledCourses(savedCourses);
  }, []);

  const handleRemove = (id) => {
    const updatedCourses = enrolledCourses.filter(course => course.id !== id);
    setEnrolledCourses(updatedCourses);
    localStorage.setItem("enrolledCourses", JSON.stringify(updatedCourses));
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Менің курстарым</h2>

      {enrolledCourses.length > 0 ? (
        <ul className="space-y-4">
          {enrolledCourses.map((course) => (
            <li
              key={course.id}
              className="p-4 bg-white shadow rounded flex justify-between items-center"
            >
              <span>{course.title}</span>
              <button
                onClick={() => handleRemove(course.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Өшіру
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Сіз тіркелген курстар жоқ.</p>
      )}
    </section>
  );
};

export default MyCourses;
