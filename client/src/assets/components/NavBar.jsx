import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { logout } from '../actions/auth'

function NavBar({auth: {isAuthenticated, loading}, logout}) {


  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Comedores</Navbar.Brand>
        { !loading && isAuthenticated ? 
        <><Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link onClick={logout}>Salir</Nav.Link>
            </Nav>
          </Navbar.Collapse></>
        : <></> }
      </Container>
    </Navbar>
  );
}

NavBar.propTypes = {
  logout : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
}) 

export default connect(mapStateToProps, {logout})(NavBar)