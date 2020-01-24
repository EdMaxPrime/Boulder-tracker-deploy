import axios from "axios";
import * as StatusCode from "./index.js";

/********************************* ACTIONS ***********************************/

const FETCH_DATA = "FETCH_DATA";
const SET_ERROR = "SET_ERROR";

/**
 * This will make an action that will update the store with a list of
 * data points
 */
function fetchAction(data) {
  return {
    type: FETCH_DATA,
    payload: data
  };
}

/**
 * This will make an action that can update the status of this "slice" of the
 * Redux store.
 * @param status   one of the constants from StatusCode (index.js)
 * @param message  a string describing the error, presented to the user
 */
function setStatus(status, message) {
  return {
    type: SET_ERROR,
    status: status,
    message: message
  };
}

/********************************* THUNKS ***********************************/

/**
 * This will be used by frontend components to update the list of sessions
 * in the store. Does not take any parameters because it just accesses database
 * Will dispatch a FETCH_SESSIONS action.
 */
export function fetchGraphThunk() {
  return function(dispatch) {
    dispatch(setStatus(StatusCode.LOADING, "Loading past sessions..."));
    axios
      .get("/api/graph")
      .then(function(response) {
        dispatch(fetchAction(response.data));
        dispatch(setStatus(StatusCode.SUCCESS, "Fetched data."));
      })
      .catch(function(response) {
        console.log("Error from axios:", response);
        dispatch(
          setStatus(
            StatusCode.ERROR,
            "Could not load user data. Please make sure you are logged in."
          )
        );
      });
  };
}

/********************************* REDUCER ***********************************/
const initialState = { status: "", message: "", data: [] };

export default function graphReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA:
      return Object.assign({}, state, {
        data: action.payload
      });
    case SET_ERROR:
      return Object.assign({}, state, {
        status: action.status,
        message: action.message
      });
    default:
      return state;
  }
}
