import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/img/pokemon-logo.png';

import { Container, Header, Button } from './styles';

function ErrorAuth() {
  return (
    <Container>
      <Header>
        <img src={logo} alt="logo" />
        <h2>ERROR 404 Page not found!</h2>
      </Header>

      <Button>
        <Link to="/">Back</Link>
      </Button>
    </Container>
  );
}

export default ErrorAuth;
