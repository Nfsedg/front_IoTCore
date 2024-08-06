import { Messages } from "./views/Messages";
import { Login } from "./views/Login";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import { UserContext } from "./context/userContext";
import { useContext } from "react";
import Restrincted from "./views/Restrincted";

function App() {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/messages"
          element={user ? <Messages /> : <Restrincted />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
