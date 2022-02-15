import { Routes, Route } from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";

export const AppRouter = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<h1>Soy el home</h1>} /> */}
      <Route path="/" element={<CalendarScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="*" element={<p>Page not found</p>} />
    </Routes>
  );
};
