import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./page/Home";
import AsciiPage from "./page/AsciiPage.jsx";
import QRPage from "./page/QRPage.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path="/" />
          <Route index element={<Home />} />
          <Route path="ascii" element={<AsciiPage />} />
          <Route path="qr" element={<QRPage />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
