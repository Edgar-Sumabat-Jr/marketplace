import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from '../constants/productConstants';

const initialState = {
  loading: false,
  products: [],
  error: null,
};

export const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true }; // Loading is true during the request
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload, error: null }; // Clear error if the request is successful
    case PRODUCT_LIST_FAIL:
      return { loading: false, products: [], error: action.payload }; // Set error if the request fails
    default:
      return state;
  }
};
