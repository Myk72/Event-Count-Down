"use client";
import React from "react";
import AddEvent from "../components/AddEvent/page";
import { useState, useEffect } from "react";
import { PlusCircle, CircleDotDashed, XCircle } from "lucide-react";
import Countdown from "../components/Countdown/page";
interface Event {
  title: string;
  date: string;
  time: string;
  description: string;
}

const PageLayout = () => {
  const [showAddEvent, setShowAddEvent] = useState(false);
  const handleAddEvent = () => {
    setShowAddEvent(true);
    console.log("Add Event", showAddEvent);
  };
  const [events, setEvents] = useState<Event[]>([]);
  const handleClose = () => {
    setShowAddEvent(false);
  };
  const handleAddedEvent = (event: Event) => {
    setEvents([...events, event]);
    handleClose();
  };
  const handleDeleteEvent = (index: number) => {
    setEvents(events.filter((e, i) => i !== index));
  };

  return (
    <div>
      <div className="flex flex-col justify-between items-center gap-5">
        <div className="flex flex-wrap text-2xl font-serif font-black">
          Event Count Down
        </div>
        <div className="flex flex-wrap gap-5 p-2 max-w-screen-lg justify-center">
          {events.length > 0 ? (
            events.map((event: any, index: number) => {
              const eventDate = new Date(event.date);
              const formattedDate = new Intl.DateTimeFormat("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              }).format(eventDate);

              const tmpcountDate = new Date(event.date);
              tmpcountDate.setHours(0, 0, 0, 0);

              const curr_time = event.time.split(":");
              const timeDate = new Date(0, 0, 0, curr_time[0], curr_time[1]);
              tmpcountDate.setHours(timeDate.getHours(), timeDate.getMinutes());

              const countdownDate = tmpcountDate.getTime();

              return (
                <div>
                  <div className="flex flex-col text-sm font-serif w-64 border p-2 rounded-xl">
                    <div className="flex flex-row justify-between">
                      <div className="text-2xl font-medium w-48 truncate">
                        {event.title}
                      </div>
                      <button
                        className="flex"
                        onClick={() => handleDeleteEvent(index)}
                      >
                        <XCircle size="16" />
                      </button>
                    </div>
                    <div>
                      {formattedDate}
                      {" at "}
                      {event.time}
                    </div>
                    <div className="flex flex-row gap-2">
                      <CircleDotDashed size="20" />
                      {event.description}
                    </div>
                    <div>
                      <Countdown date={countdownDate} />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-xl font-serif">No Event</div>
          )}
        </div>
        <button className="" onClick={handleAddEvent}>
          <PlusCircle
            className="text-white bg-orange-400 rounded-full"
            size="60"
          />
        </button>
        {showAddEvent && (
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/6 h-3/5 max-h-screen overflow-y-auto bg-white p-4 shadow-md z-10 border border-black rounded-xl"
            role="dialog"
            aria-modal="true"
          >
            <AddEvent onClose={handleClose} onSubmit={handleAddedEvent} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PageLayout;
