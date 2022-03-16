import {Provider} from 'react-redux'
import {store} from './store/store'
import { AppRouter } from "./router/AppRouter";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

function CalendarApp() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default CalendarApp;
