import React, { createContext, useReducer, useEffect } from "react";

const CourseContext = createContext();

const initialState = {
  enrolledCourses: JSON.parse(localStorage.getItem("enrolledCourses")) || [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ENROLL_COURSE":
      const updatedCourses = [...state.enrolledCourses, action.payload];
      return { ...state, enrolledCourses: updatedCourses };
    default:
      return state;
  }
}

export const CourseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("enrolledCourses", JSON.stringify(state.enrolledCourses));
  }, [state.enrolledCourses]);

  return (
    <CourseContext.Provider value={{ state, dispatch }}>
      {children}
    </CourseContext.Provider>
  );
};

export default CourseContext;
