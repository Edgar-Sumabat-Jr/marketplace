import React from 'react';
import { Nav } from 'react-bootstrap';

import { Link } from 'react-router-dom';

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
            <Nav.Link as={Link} to='/login' style={{ color: 'inherit', textDecoration: 'none' }}>Login</Nav.Link>
        ) : (
          <Nav.Link disabled>Login</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <Nav.Link as={Link} to='/shipping' style={{ color: 'inherit', textDecoration: 'none' }}>Shipping</Nav.Link>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <Nav.Link as={Link} to='/payment' style={{ color: 'inherit', textDecoration: 'none' }}>Payment</Nav.Link>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <Nav.Link as={Link} to='/placeorder' style={{ color: 'inherit', textDecoration: 'none' }}>Placeorder</Nav.Link>
        ) : (
          <Nav.Link disabled>Placeorder</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
}


export default CheckoutSteps