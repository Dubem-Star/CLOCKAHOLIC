import "./assets/css/App.css";
import "./assets/css/App2.css";
import Home from "@/CLOCKAHOLIC/Home.jsx";
import ProductDetails from "@/CLOCKAHOLIC/ProductDetails.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
