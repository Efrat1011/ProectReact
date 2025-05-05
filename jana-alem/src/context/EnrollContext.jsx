// context/EnrollContext.jsx
import { createContext, useContext, useEffect, useReducer } from "react";

const EnrollContext = createContext();

const initialState = JSON.parse(localStorage.getItem("enrolledCourses")) || [];

function reducer(state, action) {
  switch (action.type) {
    case "ENROLL": {
      const updated = [...state, action.course];
      localStorage.setItem("enrolledCourses", JSON.stringify(updated));
      return updated;
    }
    case "UNENROLL": {
      const filtered = state.filter((c) => c.id !== action.id);
      localStorage.setItem("enrolledCourses", JSON.stringify(filtered));
      return filtered;
    }
    default:
      return state;
  }
}

export const EnrollProvider = ({ children }) => {
  const [enrolledCourses, dispatch] = useReducer(reducer, initialState);

  return (
    <EnrollContext.Provider value={{ enrolledCourses, dispatch }}>
      {children}
    </EnrollContext.Provider>
  );
};

export const useEnroll = () => useContext(EnrollContext);
