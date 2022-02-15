import { AppRouter } from "./router/AppRouter";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

function CalendarApp() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default CalendarApp;
