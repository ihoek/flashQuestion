import "./App.module.scss";

// router
import { Routes, Route, Navigate } from "react-router-dom";

// pages
import PreviewPage from "./pages/PreviewPage/PreviewPage";
import MainPage from "./pages/MainPage/MainPage";
import LobbyPage from "./pages/LobbyPage/LobbyPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/preview" replace />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/lobby" element={<LobbyPage />} />
      </Routes>
    </>
  );
}

export default App;
