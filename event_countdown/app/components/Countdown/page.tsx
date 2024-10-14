import React, { useState, useEffect } from "react";

interface Props {
  date: number;
}

const Countdown: React.FC<Props> = ({ date }) => {
  const [timeLeft, setTimeLeft] = useState(date - new Date().getTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(date - new Date().getTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [date]);
  if (timeLeft <= 0) {
    return (
      <div className="flex flex-row gap-3 items-center">Event has started</div>
    );
  }
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="flex flex-row gap-3 items-center">
      <div className="flex flex-col text-3xl items-center">
        {days}
        <p className="text-sm">DAYS</p>
      </div>
      <div className="text-3xl">:</div>
      <div className="flex flex-col text-3xl items-center">
        {hours.toString().padStart(2, "0")}
        <p className="text-sm">HRS</p>
      </div>
      <div className="text-3xl">:</div>
      <div className="flex flex-col text-3xl items-center">
        {minutes.toString().padStart(2, "0")}
        <p className="text-sm">MINS</p>
      </div>
      <div className="text-3xl">:</div>

      <div className="flex flex-col text-3xl items-center">
        {seconds.toString().padStart(2, "0")}
        <p className="text-sm">SECS</p>
      </div>
    </div>
  );
};

export default Countdown;
