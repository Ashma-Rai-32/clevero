import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Artist from "./Pages/Artist";
import ArtistForm from "./Form/ArtistForm";
import Artwork from "./Pages/Artwork";
import ArtworkForm from "./Form/ArtworkForm";
import ArtworkView from "./View/ArtworkView";
import { Nav, NavItem, NavLink, Navbar, NavbarBrand } from "reactstrap";
import Header from "./components/Header";
import ArtistView from "./View/ArtistView";

function App() {
  // const location = useLocation();
  // const currentRoute = location.pathname;
  // console.log(currentRoute);
  return (
    <>
      <BrowserRouter>
        <div className="d-flex justify-content-right mx-5 pl-3">
          <Header />
        </div>
        <Routes>
          <Route path="/" element={<Navigate replace to="/artwork" />} />
          <Route path="/artist" element={<Artist />} />
          <Route path="/artistForm" element={<ArtistForm />} />
          <Route path="/artistView" element={<ArtistView />} />

          <Route path="/artwork" element={<Artwork />} />
          <Route path="/artworkForm" element={<ArtworkForm />} />
          <Route path="/artworkView" element={<ArtworkView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
