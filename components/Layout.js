import MainNav from './MainNav';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

function Layout(props) {
  return (
    <>
      <MainNav />
      <Container id="mainPage">{props.children}</Container>
      <br />
    </>
  );
}

export default Layout;