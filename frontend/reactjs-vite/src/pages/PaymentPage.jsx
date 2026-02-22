import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

import { Col } from 'react-bootstrap';


function PaymentPage() {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('Paypal');

    if (!shippingAddress.address) {
    navigate('/shipping');
    }

    const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod))
    // console.log(paymentMethod)
    navigate('/placeorder')
    };


  return (
  <FormContainer>
    <CheckoutSteps step1 step2 step3 />
    <Form onSubmit={submitHandler}>
      <Form.Label as="legend">Select Method</Form.Label>
      <Col>
        <Form.Check
          type='radio'
          label='PayPal or Credit Card'
          id='PayPal'
          name='paymentMethod'
          checked
          value='PayPal'
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <Button type='submit' variant='dark'>
            Continue
        </Button>

      </Col>
    </Form>
  </FormContainer>
);

}

export default PaymentPage