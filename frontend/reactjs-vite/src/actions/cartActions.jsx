import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_METHOD } from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`http://127.0.0.1:8000/api/product/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  // Save to localStorage
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}



export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_METHOD,
    payload: data,
  });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};

// ------------------start, november 2, 2025-------------------
// import {
//   ORDER_CREATE_REQUEST,
//   ORDER_CREATE_SUCCESS,
//   ORDER_CREATE_FAIL,
// } from "../constants/orderConstants";
// import { CART_CLEAR_ITEMS } from "../constants/cartConstants";

// export const createOrder = (order) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: ORDER_CREATE_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.post(`/api/orders/add/`, order, config);

//     dispatch({
//       type: ORDER_CREATE_SUCCESS,
//       payload: data,
//     });

//     dispatch({
//       type: CART_CLEAR_ITEMS,
//       payload: data,
//     });

//     localStorage.removeItem("cartItems");
//   } catch (error) {
//     dispatch({
//       type: ORDER_CREATE_FAIL,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };

// ------------------start, november 2, 2025-------------------