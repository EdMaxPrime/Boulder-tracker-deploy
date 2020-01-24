import axios from "axios";
import * as StatusCode from "./index.js";

/********************************* ACTIONS ***********************************/

const FETCH_SESSIONS = "FETCH_SESSIONS";
const CREATE_SESSION = "CREATE_SESSION";
const SET_ERROR = "SET_ERROR";

/** 
 * This will make an action that will update the store with a list of workout 
 * sessions.
*/
function fetchAction(data) {
  return {
    type: FETCH_SESSIONS,
    payload: data.map(function(element) {
      return {
        location: element.location,
        date: element.date,
        comments: element.comments,
        id: element.id
      };
    })
  };
}

/**
 * This will make an action that can add a session to the list of sessions.
 * Each session should have the following properties:
 *    int id, string location, string date, string comments 
*/
function createAction(data) {
  return {
    type: CREATE_SESSION,
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
  console.log("setting status");
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
export function fetchSessionsThunk() {
  return function(dispatch) {
    dispatch(setStatus(StatusCode.LOADING, "Loading past sessions..."));
    axios
      .get("/api/sessions")
      .then(function(response) {
        dispatch(fetchAction(response.data));
        dispatch(setStatus(StatusCode.SUCCESS, "Fetched data."));
      })
      .catch(function(response) {
        console.log("Error from axios:", response);
        dispatch(setStatus(StatusCode.ERROR, "Could not load user data. Please make sure you are logged in."))
      });
  };
}

/**
 * @param session  an object with two strings: location and comments.
 */
export function createSessionThunk(session) {
  return function(dispatch) {
    dispatch(setStatus(StatusCode.LOADING, "Saving new session..."));
    axios
      .post("/api/sessions/add", session)
      .then(function(response) {
        console.log("added", response);
        dispatch(createAction(response.data));
        dispatch(setStatus(StatusCode.SUCCESS, "Saved"));
      })
      .catch(function(response) {
        console.log("Error from axios:", response);
        dispatch(setStatus(StatusCode.ERROR, "Could not save new bouldering session. Please make sure you are logged in."))
      });
  };
}

/********************************* REDUCER ***********************************/
const initialState = {status: "", message: "", list: []};

export default function sessionsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SESSIONS:
      return Object.assign({}, state, {
        list: action.payload
      });
    case CREATE_SESSION:
      return Object.assign({}, state, {
        list: state.list.concat(action.payload)
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
