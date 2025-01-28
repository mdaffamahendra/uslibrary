import React from "react";
import getEvents from "../../services/events";
import CardEvent from "./CardEvent";

const EventLibrary = () => {
  const events = getEvents() || [];

  return (
    <div className="flex-1 p-6 w-full h-screen overflow-y-auto">
      <header className="bg-blue-600 text-white py-10 text-center shadow-md rounded-lg">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Event Perpustakaan
        </h1>
        <p className="text-xs sm:text-base lg:text-lg mt-2">
          Ikuti berbagai event menarik di perpustakaan kami.
        </p>
      </header>

      <main className="container mx-auto py-10 px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <CardEvent key={event.id} event={event}>
              <CardEvent.HeaderCard event={event} />
              <CardEvent.BodyCard event={event} />
              <CardEvent.FooterCard event={event} />
            </CardEvent>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EventLibrary;
