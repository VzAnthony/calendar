import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Navbar } from "../ui/Navbar";
import { messages } from "../../helpers/calendar-messages-es";
import { CalendarEvent } from "./CalendarEvent";
import { useState } from "react";
import { CalendarModal } from "./CalendarModal";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";

moment.locale("es");

export const CalendarScreen = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const localizer = momentLocalizer(moment);

  const onDoubleClick = (ev) => {
    console.log(ev);
  };
  const onSelectEvent = (ev) => {
    console.log(ev);
  };
  const onViewChange = (ev) => {
    setLastView(ev);
    localStorage.setItem("lastView", ev);
  };

  const eventStyleGetter = (ev, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367CF7",
      botderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };

    return {
      style,
    };
  };

  const events = [
    {
      title: "Lunita Birthday",
      start: moment().toDate(),
      end: moment().add(2, "hours").toDate(),
      bgColor: "#fafafa",
      notes: "Te extraño",
      user: {
        _id: "123",
        name: "Anthony",
      },
    },
  ];

  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={lastView}
        components={{ event: CalendarEvent }}
      />
      <CalendarModal />
    </div>
  );
};
