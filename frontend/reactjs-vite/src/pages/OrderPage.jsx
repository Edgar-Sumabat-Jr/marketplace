import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'

// import { ORDER_CREATE_RESET } from '../constants/orderConstants'

import Loader from '../components/Loader'

import { getOrderDetails, payOrder, createOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'


import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


function OrderPage() {
//   const cart = useSelector(state => state.cart)
const { id: orderId } = useParams();


//   const itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price* item.qty, 0).toFixed(2);


  const dispatch = useDispatch()
  const navigate = useNavigate()


  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, error, loading } = orderDetails;


// ----------start, november 7, 2025---------------
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  const [sdkReady, setSdkReady] = useState(false)

  // ----------end, november 7, 2025---------------


const itemsPrice = !loading && !error && order?.orderItems
  ? order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
  : 0;
const shippingPrice = (itemsPrice > 100 ? 0: 10).toFixed(2);
const taxPrice = Number(0.12* itemsPrice).toFixed(2);
const totalPrice = (Number (itemsPrice) + Number (shippingPrice) + Number(taxPrice)).toFixed(2);


  useEffect(() => {
    // if (!cart.paymentMethod) {
    //   navigate('/payment')
    // } 
    
    // if (success) {
    //   navigate(`/order/${order._id}`)
    //   dispatch({ type: ORDER_CREATE_RESET })
    // }

    if (!order || successPay || order._id !== Number(orderId)) {
        dispatch({ type: ORDER_PAY_RESET })
        dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
        if (!window.paypal) {
            addPayPalScript()
        } else {
            setSdkReady(true)
        }
    }
}, [dispatch, orderId, order, successPay]);




const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
}


const createOrderHandler = (data, actions) => {
    return actions.order.create({
        purchase_units: [
            {
                amount: {
                    value: totalPrice,
                    currency_code: "USD",
                },
            },
        ],
    })
}


//   const placeOrder = () => {
//     dispatch(
//       createOrder({
//         orderItems: cart.cartItems,
//         shippingAddress: cart.shippingAddress,
//         paymentMethod: cart.paymentMethod,
//         itemsPrice: itemsPrice,
//         shippingPrice: shippingPrice,
//         taxPrice: taxPrice,
//         totalPrice: totalPrice,
//       })
//     )
//   }


const addPayPalScript = () => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://www.paypal.com/sdk/js?client-id=AT9BZNQ6XRIbLWhRDWl-bJPPZ80WBqGcnKiDPXu4BjJtF9KOV9Bn8Vf70rYcoOBhBlpKAbhu4NeedAgq&currency=USD'
    script.async = true
    script.onload = () => {
        setSdkReady(true)
    }
    document.body.appendChild(script)
}




  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <div>
      {/* <CheckoutSteps step1 step2 step3 step4 /> */}
      <Row>

        <Col md={8}>
  <ListGroup variant='flush'>
    <ListGroup.Item>
      <h2>Shipping</h2>
      <p><strong>Name: </strong>{order?.user?.name}</p>
      <p><strong>Email: </strong>
        <a href={`mailto:${order?.user?.email}`}>{order?.user?.email}</a>
      </p>
      <p>
        <strong>Shipping: </strong>
        {order.shippingAddress?.address}, {order.shippingAddress?.city}{' '}
        {order.shippingAddress?.postalCode}, {" "} {order.shippingAddress?.country}
      </p>
      {order?.isDelivered ? (
        <Message variant='success'>Delivered on {order?.deliveredAt}</Message>
      ) : (
        <Message variant='warning'>Not Delivered</Message>
      )}
    </ListGroup.Item>



        <ListGroup.Item>
  <h2>Payment Method</h2>
  <p>
    <strong>Method: </strong>
    {order.paymentMethod}
  </p>
  {order.isPaid ? (
    <Message variant='success'>Paid on {order.paidAt}</Message>
  ) : (
    <Message variant='warning'>Not Paid</Message>
  )}
</ListGroup.Item>




<ListGroup.Item>
  <h2>Order Items</h2>
  {order?.orderItems?.length === 0 ? (
    <Message variant='info'>
      Your Cart is Empty
    </Message>
  ) : (
    <ListGroup variant='flush'>
      {order?.orderItems?.map((item, index) => (
        <ListGroup.Item key={item.product}>
          <Row>
            <Col md={1}>
              <Image src={item.image} alt={item.name} fluid rounded />
            </Col>
            <Col>
              <Link to={`/products/${item.product}`}>{item.name}</Link>
            </Col>
            <Col md={4}>
              {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )}
</ListGroup.Item>
        </ListGroup>
        </Col>



        <Col md={4}>
  <Card>
    <ListGroup variant='flush'>
      {/* Order Summary */}
      <ListGroup.Item>
        <h2>Order Summary</h2>
      </ListGroup.Item>

      <ListGroup.Item>
        <Row>
          <Col>Item:</Col>
          <Col>${itemsPrice}</Col>
        </Row>
      </ListGroup.Item>

      <ListGroup.Item>
        <Row>
          <Col>Shipping:</Col>
          <Col>${shippingPrice}</Col>
        </Row>
      </ListGroup.Item>

      <ListGroup.Item>
        <Row>
          <Col>Tax:</Col>
          <Col>${taxPrice}</Col>
        </Row>
      </ListGroup.Item>

      <ListGroup.Item>
        <Row>
          <Col>Total:</Col>
          <Col>${totalPrice}</Col>
        </Row>
      </ListGroup.Item>

      {/* --- PayPal Button Section --- */}
      {!order.isPaid && (
        <ListGroup.Item>
          {loadingPay && <Loader />}
          {!sdkReady ? (
            <Loader />
          ) : (
            <PayPalScriptProvider
              options={{
                "client-id": "AT9BZNQ6XRIbLWhRDWl-bJPPZ80WBqGcnKiDPXu4BjJtF9KOV9Bn8Vf70rYcoOBhBlpKAbhu4NeedAgq",
              }}
            >
              <PayPalButtons
                createOrder={createOrderHandler}
                style={{ layout: "vertical" }}
                onApprove={successPaymentHandler}
              />
            </PayPalScriptProvider>
          )}
        </ListGroup.Item>
      )}
    </ListGroup>
  </Card>
</Col>


      </Row>
    </div>
  )
}

export default OrderPage
