import { useContext } from "react";
import { MessagesDasboard } from "./MessagesDashboard";
import { UserContext } from "../context/userContext";

export function Messages() {
  const { user } = useContext(UserContext);

  return <div>{user ? <MessagesDasboard /> : <p>No tienes permisos</p>}</div>;
}
