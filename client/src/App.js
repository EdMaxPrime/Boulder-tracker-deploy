import React from "react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Home from "./components/views/home";
import SingleSessionPage from "./components/containers/singleSessionPage";
import UserHomePage from "./components/containers/userHomePage";
import GraphPage from "./components/containers/graphPage";
import AddSessionPage from "./components/containers/addSessionPage";
import { Login, Signup } from "./components/containers/authFormContainer";
import Logout from "./components/containers/logout.js";
import Navbar from "./components/containers/navbar.js";

const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        return loggedIn ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                prevLocation: path,
                loginStatus: "error",
                loginMessage: "You need to login first!"
              }
            }}
          />
        );
      }}
    />
  );
};

function App(props) {
  const HomeComponent = () => <Home />;
  const UserHomeComponent = () => <UserHomePage />;
  const GraphComponent = () => <GraphPage />;

  console.log("app's props", props);

  return (
    <div className="app">
      <Switch>
        <ProtectedRoute
          path="/home"
          component={UserHomePage}
          loggedIn={props.isLoggedIn}
        />
        <ProtectedRoute
          exact
          path="/session/add"
          component={AddSessionPage}
          loggedIn={props.isLoggedIn}
        />
        <ProtectedRoute
          exact
          path="/graphs"
          component={GraphPage}
          loggedIn={props.isLoggedIn}
        />
        <ProtectedRoute
          path="/session/:id"
          component={SingleSessionPage}
          loggedIn={props.isLoggedIn}
        />
        <ProtectedRoute
          path="/logout"
          component={Logout}
          loggedIn={props.isLoggedIn}
        />
        <Route exact path="/" render={HomeComponent} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route render={() => <h1>Unknown location</h1>} />
      </Switch>
    </div>
  );
}

function mapUserToProps(appState) {
  return {
    isLoggedIn: appState.user.isLoggedIn
  };
}

export default withRouter(connect(mapUserToProps)(App));
