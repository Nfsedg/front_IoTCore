import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { Navigate } from "react-router-dom";

export function Login() {
  const { setUser, user } = useContext(UserContext);
  const [userData, setUserData] = useState({
    user: "",
    password: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (userData.password === import.meta.env.VITE_TEMPORARY_PASSWORD) {
      setUser(userData.user);
    } else {
      window.alert("Contraseña incorrecta");
    }
  };

  const handleChangeForm = (e) => {
    const data = e.target;
    setUserData((prev) => ({
      ...prev,
      [data.name]: data.value,
    }));
  };

  if (user) return <Navigate to="/messages" />;

  return (
    <div className="login">
      <p>Iniciar sesión</p>
      <form onSubmit={submitHandler}>
        <input
          onChange={handleChangeForm}
          name="user"
          type="text"
          placeholder="Usuario"
        />
        <input
          onChange={handleChangeForm}
          name="password"
          type="password"
          placeholder="Contraseña"
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
