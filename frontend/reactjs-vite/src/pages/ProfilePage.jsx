import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/useConstants";

import { getMyOrders } from "../actions/orderActions";

function ProfilePage() {
  const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [message, setMessage] = useState("");
const [name, setName] = useState("");
const [email, setEmail] = useState("");

const userDetails = useSelector((state) => state.userDetails);
const { error, loading, user } = userDetails;

const userLogin = useSelector((state) => state.userLogin);
const { userInfo } = userLogin;

const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
const { success } = userUpdateProfile;

const orderListMy = useSelector((state) => state.orderListMy);
const { loading: loadingOrder, error: errorOrder, orders } = orderListMy;

const navigate = useNavigate();
const dispatch = useDispatch();


useEffect(() => {
    if (!userInfo) {
        navigate('/login');
    } else {
        if (!user || !user.name || success || userInfo._id !== user._id) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            dispatch(getUserDetails('profile'));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
        dispatch(getMyOrders())
    }
}, [navigate, userInfo, dispatch, success, user]);


const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        setMessage("Passwords do not match");
    } else {
        dispatch(
            updateUserProfile({
                id: user._id,
                name: name,
                email: email,
                password: password,
            })
        );
        setMessage("");
    }
};




  return (
    <>
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}

                <Form onSubmit={submitHandler}>
                    {/* Name Field */}
                    <Form.Group controlId="name" className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    {/* Email Field */}
                    <Form.Group controlId="email" className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    {/* Password Field */}
                    <Form.Group controlId="password" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    {/* Confirm Password Field */}
                    <Form.Group controlId="confirmPassword" className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button type="submit" variant="primary">
                        Update
                    </Button>
                </Form>
            </Col>

            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrder ? (
                    <Loader />
                ) : errorOrder ? (
                    <Message variant="danger">{errorOrder}</Message>
                ) : (
                    <Table striped responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
  {orders && orders.length > 0 ? (
    orders.map((order) => {
      // Create a copy to avoid mutating state
      const updatedOrder = { ...order };

      // Calculate itemsPrice safely if orderItems exist
      const itemsPrice = order.orderItems
        ? order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        : 0;

      // Calculate shipping and tax if your backend doesn’t provide them
      const shippingPrice = order.shippingPrice || (itemsPrice > 100 ? 0 : 10);
      const taxPrice = order.taxPrice || Number(0.12 * itemsPrice);

      // Total = items + shipping + tax
      const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

      return (
        <tr key={order._id}>
          <td>{order._id}</td>
          <td>{order.createdAt.substring(0, 10)}</td>
          <td>${totalPrice}</td>
          <td>
            {order.isPaid ? (
              order.paidAt.substring(0, 10)
            ) : (
              <i className="fas fa-times" style={{ color: "red" }}></i>
            )}
          </td>
          <td>
            {order.isDelivered ? (
              order.deliveredAt.substring(0, 10)
            ) : (
              <i className="fas fa-times" style={{ color: "red" }}></i>
            )}
          </td>
          <td>
            <LinkContainer to={`/order/${order._id}`}>
              <Button className="btn-sm" variant="light">
                Details
              </Button>
            </LinkContainer>
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="6">No orders found</td>
    </tr>
  )}
</tbody>


                    </Table>
                )}
            </Col>
        </Row>
    </>
);



}

export default ProfilePage