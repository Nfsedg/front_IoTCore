import { useEffect, useState } from "react";
import alertLogo from "../assets/alert.svg";
import { useDevices } from "../hooks/useDevices";

function formatDateTime(timestamp = "") {
  const date = new Date(timestamp);
  let day = date.getDate().toString().padStart(2, "0");
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "Julio",
    "Agosto",
    "Septiembre",
    "October",
    "November",
    "December",
  ];
  let month = monthNames[date.getMonth()];
  let year = date.getFullYear().toString().slice(-2);
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let seconds = date.getSeconds().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

function msToTime(milliseconds) {
  let totalSeconds = Math.floor(milliseconds / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = (totalSeconds % 3600) % 60;

  let formattedHours = hours.toString().padStart(2, "0");
  let formattedMinutes = minutes.toString().padStart(2, "0");
  let formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function MessagesDasboard() {
  const { messageDetector } = useDevices();
  const [queueMessage, setQueueMessage] = useState([]);

  useEffect(() => {
    if (
      messageDetector &&
      !queueMessage.some((m) => messageDetector.timestamp === m.timestamp)
    ) {
      setQueueMessage((prev) => [
        ...prev,
        { ...messageDetector, clientTimestamp: new Date().getTime() },
      ]);
    }
  }, [messageDetector]);

  return (
    <div className="appContainer">
      {queueMessage.length === 0 ? (
        <h2>No se han recibido mensajes</h2>
      ) : (
        <>
          {queueMessage.map((msg, i) => (
            <div className="message__container" key={i}>
              <img src={alertLogo} />
              <div>
                <p>MAC ID del dispositivo: {msg.macAddress}</p>
                <p>
                  Tiempo activo del dispositivo:{" "}
                  {msToTime(Number(msg.timestamp))}
                </p>
                <p>Hora: {formatDateTime(msg.clientTimestamp)}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
