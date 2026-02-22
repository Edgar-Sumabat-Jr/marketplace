import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { productListReducer } from './reducers/productsReducers';
import { userDetailsReducer, userLoginReducer, userUpdateProfileReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer } from './reducers/orderReducers';

const reducer = combineReducers({
  productList: productListReducer,
  // productDetails: productDetailsreducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,

  // --------start, november 6, 2025----------
  // userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderListMy: orderListMyReducer,
// --------end, november 6, 2025----------


// --------start, november 7, 2025----------
  orderPay: orderPayReducer,
// --------end, november 7, 2025----------

});

// ----------------------start, october 19, 2025---------------------------
const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];
// ----------------------end, october 19, 2025---------------------------



// --------------------start, october 20, 2025----------------------

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

// --------------------end, october 20, 2025----------------------


const initialState = {
    cart: { 
      cartItems: cartItemsFromStorage,
      shippingAddress: shippingAddressFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage }
}


const store = configureStore({
  reducer,
  preloadedState: initialState,
  // No need to manually add redux-thunk. It’s included by default.
});

export default store;
