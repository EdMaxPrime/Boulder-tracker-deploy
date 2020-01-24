import axios from "axios";
import * as StatusCode from "./index.js";

/********************************* ACTIONS ***********************************/

const SELECT_SESSION = "SELECT_SESSION";
const GET_PROBLEMS = "GET_PROBLEMS";
const ADD_CLIMB = "ADD_CLIMB";
const SET_ERROR = "SET_ERROR";
const SET_GRAPH_ERROR = "set_graph_error";

/**
 * Expects an object with the following shape:
 *		string location, string date, string comments, boolean exists, int id,
 *		array climbs[]
 */
function selectAction(data) {
  return {
    type: SELECT_SESSION,
    payload: data
  };
}

function getProblems(data) {
  return {
    type: GET_PROBLEMS,
    payload: data
  };
}

function addProblem(problem) {
  return {
    type: ADD_CLIMB,
    payload: problem
  };
}

function setStatus(status, message) {
  return {
    type: SET_ERROR,
    status: status,
    message: message
  };
}

function setGraphStatus(status, message) {
  return {
    type: SET_GRAPH_ERROR,
    status: status,
    message: message
  };
}

/********************************* THUNKS ***********************************/

const nonexistantSession = {
  id: 1,
  location: "",
  date: "",
  comments: "",
  climbs: [],
  exists: false
};

const nonexistantProblem = {
  id: 1,
  name: "",
  grade: 0,
  attempts: 0,
  sends: 0,
  comments: "",
  exists: false
};

/**
 * Will fetch detailed information about a session from the API.
 * @pre       the session should exist
 * @param id  the numerical ID of the requested session.
 * @post      the selectAction() creator will be called with the data from
 *            response if the operation was succesful. Otherwise, it will
 *            be given an object with the expected shape but empty fields
 *            and the exists flag will be false on the object.
 */
export function getSessionThunk(id) {
  return function(dispatch) {
    dispatch(setStatus(StatusCode.LOADING, "Loading..."));
    axios
      .get("/api/sessions/" + id)
      .then(function(response) {
        dispatch(selectAction(response.data));
        dispatch(setStatus(StatusCode.SUCCESS, "Received session"));
      })
      .catch(function() {
        dispatch(
          setStatus(
            StatusCode.ERROR,
            "This session was not found. Perhaps it was deleted, or you followed a broken link."
          )
        );
      });
  };
}

export function getProblemsThunk(id) {
  return function(dispatch) {
    dispatch(setGraphStatus(StatusCode.LOADING, "Loading chart..."));
    axios
      .get("/api/sessions/graph/" + id)
      .then(function(response) {
        console.log("DATAAAA", response.data);
        dispatch(getProblems(response.data));
        dispatch(setGraphStatus(StatusCode.SUCCESS, "Received statistics"));
      })
      .catch(function() {
        dispatch(
          setGraphStatus(
            StatusCode.ERROR,
            "Failed to create chart. Perhaps this workout session was deleted?"
          )
        );
      });
  };
}

export function addClimbThunk(climbInfo) {
  return function(dispatch) {
    axios
      .post("/api/problems/add", climbInfo)
      .then(function(response) {
        console.log("added climb: ", response);
        dispatch(addProblem(response.data));
      })
      .catch(function(error) {
        console.log("axios error: ", error);
      });
  };
}

/********************************* REDUCER ***********************************/
const initialState = {};

export default function singleSessionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROBLEMS:
      return Object.assign({}, state, { data: action.payload });
    case SELECT_SESSION:
      return Object.assign({}, state, action.payload);
    case ADD_CLIMB:
      return Object.assign({}, state, {
        problems: state.problems.concat(action.payload),
        data: state.data.map(e => {
          if (e.model_name == action.payload.grade) {
            return Object.assign({}, e, {
              field1: e.field1 + action.payload.sends,
              field2: e.field2 + action.payload.attempts
            });
          } else {
            return e;
          }
        })
      });
    case SET_ERROR:
      return Object.assign({}, state, {
        status: action.status,
        message: action.message
      });
    case SET_GRAPH_ERROR:
      return Object.assign({}, state, {
        graph_status: action.status,
        graph_message: action.message
      });
    default:
      return state;
  }
}
