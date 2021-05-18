import React , {Component} from 'react';
import classnames from 'classnames';
import AddCategoryForm from "./addCategory";
import AddBookForm from "./addBook";
import Cookies from 'universal-cookie';
import '../assets/css/adminDashboard.css';
import { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

function logOut() {
    const cookies = new Cookies();
    cookies.remove('token', { domain: "localhost", path: "/" });
    window.location = "http://localhost:3000/";
}

const MyNavbar = (props) => {
  return (
    <div>
      <Navbar color="light" light expand="md">
        {/* <NavbarBrand >Home</NavbarBrand> */}
        <NavbarToggler />
        <Collapse navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/home/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/books/">Books</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/categories/">Categories</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/authors/">Authors</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        <div>
            <Button onClick={logOut} color="secondary">Logout</Button>
        </div>
      </Navbar>
    </div>
  );
}

export default MyNavbar;