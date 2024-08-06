import { Route, Routes, HashRouter, Navigate } from "react-router-dom";
import { Messages } from "./views/Messages";
import { Login } from "./views/Login";
import { UserContextProvider } from "./context/userContext";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </UserContextProvider>
    </HashRouter>
  );
}

export default App;
