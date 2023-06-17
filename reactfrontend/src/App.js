import logo from "./logo.svg";
import "./App.css";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArtistForm from "./Form/ArtistForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addArtist" element={<ArtistForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
