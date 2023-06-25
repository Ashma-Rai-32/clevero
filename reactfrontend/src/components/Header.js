import React from "react";
import { useLocation } from "react-router-dom";
import { Nav, NavItem, NavLink, Navbar, NavbarBrand } from "reactstrap";

const Header = () => {
  const location = useLocation();
  console.log(location.pathname);

  const activeCheckArtwork = location.pathname == "/artwork" ? true : false;
  const activeCheckArtist = location.pathname == "/artist" ? true : false;

  return (
    <div className="mt-3">
      <Navbar>
        <NavbarBrand href="/"></NavbarBrand>
        <Nav tabs justified pills>
          <NavItem>
            <NavLink active={activeCheckArtwork} href="/artwork">
              Artworks
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={activeCheckArtist} href="/artist">
              Artists
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
