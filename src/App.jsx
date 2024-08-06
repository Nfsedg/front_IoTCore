import { Messages } from "./views/Messages";
import { Login } from "./views/Login";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { UserContextProvider } from "./context/userContext";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
