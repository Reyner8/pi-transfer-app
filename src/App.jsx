import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

function App() {
  useEffect(() => {
    if (window.Pi) {
      window.Pi.init({ version: "2.0" }) // Pastikan SDK diinisialisasi
        .then(() => console.log("Pi SDK initialized"))
        .catch((err) => console.error("Pi SDK init failed:", err));
    } else {
      console.error(
        "Pi SDK not found. Make sure the script is loaded in index.html"
      );
    }
  }, []);

  return (
    <Router>
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
