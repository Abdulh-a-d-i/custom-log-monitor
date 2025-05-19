import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogViewer from "./components/LogViewer";
//import SystemHealth from "./components/SystemHealth";
import VisualizationPage from "./pages/VisualizationPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logs" element={<LogViewer />} />
        <Route path="/visualization" element={<VisualizationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
