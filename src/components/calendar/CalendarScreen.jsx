import { Calendar, momentLocalizer } from "react-big-calendar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Navbar } from "../ui/Navbar";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";
import { messages } from "../../helpers/calendar-messages-es";
import { CalendarEvent } from "./CalendarEvent";
import { useEffect, useState } from "react";
import { CalendarModal } from "./CalendarModal";
import { uiOpenModal } from "../../actions/ui";
import { eventSetActive, eventClearActiveEvent, eventStartLoading } from "../../actions/events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";



moment.locale("es");

export const CalendarScreen = () => {

  const {events, activeEvent} = useSelector(state => state.calendar)
  const {uid} = useSelector(state => state.auth)


  const dispatch = useDispatch()

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const localizer = momentLocalizer(moment);

  const onDoubleClick = () => {
    dispatch( uiOpenModal())
  };

  const onSelectEvent = (ev) => {
    dispatch( eventSetActive(ev) )
  };

  const onSelectSlot = () => {
    dispatch( eventClearActiveEvent() )

  }

  const onViewChange = (ev) => {
    setLastView(ev);
    localStorage.setItem("lastView", ev);
  };

  const eventStyleGetter = (ev, start, end, isSelected) => {
    const style = {
      backgroundColor: (uid === ev.user._id) ? "#367CF7" : '#465660',
      botderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };

    return {
      style,
    };
  };

  useEffect(() => {
    dispatch(eventStartLoading())
  }, [dispatch])
  

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
        onSelectSlot={ onSelectSlot}
        selectable={ true }
        view={lastView}
        components={{ event: CalendarEvent }}
      />
      <AddNewFab />
      {activeEvent && <DeleteEventFab /> }
      <CalendarModal />
    </div>
  );
};
