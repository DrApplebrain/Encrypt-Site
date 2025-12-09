import './App.css';
import { Navigate, Route, Routes } from "react-router-dom"
import Home from './page/Home';
import AsciiPage from './page/AsciiPage.jsx';
import QRPage from './page/QRPage.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/"/>
      <Route index element={<Home />} />
      <Route path="ascii" element={<AsciiPage />} />
      <Route path="qr" element={<QRPage />} />
      </Routes>
    </div>
  );
}

export default App;
