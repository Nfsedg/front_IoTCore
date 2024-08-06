import { Messages } from "./views/Messages";
import { Login } from "./views/Login";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { UserContext } from "./context/userContext";
import { useContext } from "react";
import Restrincted from "./views/Restrincted";

function App() {
  const { user } = useContext(UserContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/messages"
          element={user ? <Messages /> : <Restrincted />}
        />
      </Routes>
    </Router>
  );
}

export default App;
