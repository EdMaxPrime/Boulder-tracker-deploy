import axios from "axios";
import * as StatusCode from "./index.js";

/********************************* ACTIONS ***********************************/

const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";
const SET_ERROR = "SET_ERROR";

// ACTION CREATORS
/**
 * Makes an action that will let the frontend know that a user has logged in.
 * This should only be called after the backend has authenticated this user
 * and created a session.
 * @param user  (string) the username
 */
const login = user => {
  return {
    type: GET_USER,
    username: user
  };
};

const logout = () => {
  return {
    type: REMOVE_USER
  };
};

/**
 * Makes an action that will update the status code and message of this slice
 * of the Redux store. Please use it to indicate the progress of some process.
 * Call it before and after an asynchronous action. This will let subscribed
 * components change their state when the status is right.
 * @param statusCode  a constant from StatusCode (index.js)
 * @param message     a string to show the user
 */
function setStatus(statusCode, message) {
  return {
    type: SET_ERROR,
    status: statusCode,
    message: message
  };
}

/********************************* THUNKS ***********************************/

/**
 * This will attempt to create a session for the user with the supplied
 * credentials. If succesful, a cookie will be created that identifies this
 * user and will automatically be sent in all requests where withCredentials
 * is true.
 * @param username  (string) the username of the user
 * @param password  (string) the password of the user
 * @post            the status will be updated to either success or error
 */
export function loginThunk(username, password, method, history) {
  return function(dispatch) {
    dispatch(setStatus(StatusCode.LOADING, "Logging in..."));
    axios
      .post(
        "/auth/" + method + "/",
        { username, password },
        { withCredentials: true }
      )
      .then(res => {
        axios
          .get("/auth/me", { withCredentials: true })
          .then(res => {
            dispatch(login(username));
            dispatch(setStatus(StatusCode.SUCCESS, "Welcome Back!"));
            history.push("/home");
          })
          .catch(error => {
            dispatch(setStatus(StatusCode.ERROR, "Failed to login. Please try again later."));
          });
      })
      .catch(authError => {
        dispatch(setStatus(StatusCode.ERROR, authError.response.data));
      });
  };
}

/**
 * This will attempt to destroy the session of the user logged in.
 * @param history  the virtual history from react router.
 * @post           redirect to home page
 */
export function logoutThunk(history) {
  return function(dispatch) {
    dispatch(setStatus(StatusCode.LOADING, "Logging out..."));
    axios.delete("/auth/logout")
    .then(res => {
      dispatch(logout());
      dispatch(setStatus(StatusCode.SUCCESS, "Logged out"));
      history.push("/");
    })
    .catch(error => {
      dispatch(setStatus(StatusCode.ERROR, "Could not logout."));
    });
  }
}

/********************************* REDUCER ***********************************/
const initialState = {
  username: "",
  isLoggedIn: false,
  status: "",
  message: ""
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ERROR:
      return Object.assign({}, state, {
        status: action.status,
        message: action.message
      });
    case GET_USER:
      return Object.assign({}, state, {
        isLoggedIn: true,
        username: action.username
      });
    case REMOVE_USER:
      return Object.assign({}, state, {
        isLoggedIn: false,
        username: ""
      });
    default:
      return state;
  }
}
