import React, { useContext } from "react";
import CourseContext from "../context/CourseContext";

const Profile = () => {
  const { state } = useContext(CourseContext);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Менің профилім</h2>
      <p className="text-gray-700 mb-4">Атыңыз: Efrat</p>
      <h3 className="text-xl font-medium mb-2">Тіркелген курстар:</h3>
      {state.enrolledCourses.length === 0 ? (
        <p>Сіз ешқандай курсқа тіркелмегенсіз.</p>
      ) : (
        <ul className="list-disc list-inside">
          {state.enrolledCourses.map((course) => (
            <li key={course.id}>{course.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Profile;