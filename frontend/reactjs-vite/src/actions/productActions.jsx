import axios from 'axios';  // Make sure you import axios if you haven't already
import { 
  PRODUCT_LIST_REQUEST, 
  PRODUCT_LIST_SUCCESS, 
  PRODUCT_LIST_FAIL 
} from '../constants/productConstants';  // Adjust the import path as needed

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    // Make the GET request to fetch products
    const { data } = await axios.get("http://127.0.0.1:8000/api/products/");

    // Dispatch success action with the fetched data
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,  // Ensure that the response is in the correct format (array of products)
    });
  } catch (error) {
    // Handle error properly: Use PRODUCT_LIST_FAIL instead of PRODUCT_DETAILS_FAIL
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: 
        error.response && error.response.data.message
          ? error.response.data.message  // Use the specific error message from the backend if available
          : error.message,  // Fall back to a generic error message
    });
  }
};
