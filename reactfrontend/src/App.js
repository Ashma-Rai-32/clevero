import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Artist from "./Pages/Artist";
import ArtistForm from "./Form/ArtistForm";
import Artwork from "./Pages/Artwork";
import ArtworkForm from "./Form/ArtworkForm";
import ArtworkView from "./View/ArtworkView";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/artwork" />} />
          <Route path="/artist" element={<Artist />} />
          <Route path="/artistForm" element={<ArtistForm />} />
          <Route path="/artwork" element={<Artwork />} />
          <Route path="/artworkForm" element={<ArtworkForm />} />
          <Route path="/artworkView" element={<ArtworkView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
