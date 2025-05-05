
import React from "react";
import { useEnroll } from "../context/EnrollContext";

const MyCourses = () => {
  const { enrolledCourses, dispatch } = useEnroll();

  const handleUnenroll = (id) => {
    dispatch({ type: "UNENROLL", id });
  };

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-4">Менің курстарым</h2>
      {enrolledCourses.length > 0 ? (
        <ul className="space-y-3">
          {enrolledCourses.map((course) => (
            <li
              key={course.id}
              className="p-3 bg-green-100 rounded flex justify-between items-center"
            >
              <span>{course.title}</span>
              <button
                onClick={() => handleUnenroll(course.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Бас тарту
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Сіз әлі ешқандай курсқа тіркелген жоқсыз.</p>
      )}
    </section>
  );
};

export default MyCourses;