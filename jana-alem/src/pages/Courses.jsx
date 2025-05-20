import React, { useState } from "react";
import useCourses from "../hooks/useCourses";  

const Courses = () => {
  const { courses, loading } = useCourses();  
  const [selectedCategory, setSelectedCategory] = useState("Барлық курстар");
  const [searchTerm, setSearchTerm] = useState("");

 
  const handleEnroll = (course) => {
    const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
   
    if (!enrolledCourses.some((enrolledCourse) => enrolledCourse.id === course.id)) {
      enrolledCourses.push(course);
      localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === "Барлық курстар" ||
      course.category === selectedCategory;
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) return <p>Жүктелуде...</p>;

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Курстар</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Курс іздеу..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded mr-4"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option>Барлық курстар</option>
          <option>Бағдарламалау</option>
          <option>Жеке даму</option>
          <option>Қауіпсіздік</option>
        </select>
      </div>

      <ul className="space-y-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <li key={course.id} className="p-4 bg-white shadow rounded flex justify-between items-center">
              <span>{course.title}</span>
            
              <button
                onClick={() => handleEnroll(course)}
                className="bg-[#2D9CDB] text-white px-4 py-1 rounded"
              >
                Тіркелу
              </button>
            </li>
          ))
        ) : (
          <p>Бұл категорияда курс жоқ.</p>
        )}
      </ul>
    </section>
  );
};

export default Courses;
