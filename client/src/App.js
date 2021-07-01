import axios from "axios";
//lodash isNIl was removed
import React, { useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Navigation from "./components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signUp";
import Admin from "./pages/admin";
import NewOrder from "./pages/newOrder";
import Profile from "./pages/profile";
import { LOADING, SET_USER, UNSET_USER } from "./store/actions";
import { useStoreContext } from "./store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import Splash from "./pages/splash";
import Container from "react-bootstrap/Container";

const App = () => {
  const history = useHistory();
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    dispatch({ type: LOADING });

    axios.get("/api/users").then((response) => {
      if (response.data.user) {
        dispatch({ type: SET_USER, user: response.data.user });
      } else {
        dispatch({ type: UNSET_USER });
      }
    });
  }, []);

  return (
    <div>
      <Container>
      {state.user ? (
        <div>
          <Navigation />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/admin'>
              <Admin />
            </Route>
            <Route exact path='/newOrder'>
              <NewOrder />
            </Route>
            <Route exact path='/profile'>
              <Profile />
            </Route>
          </Switch>
        </div>
      ) : (
        <div>
          <Splash></Splash>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
          </Switch>
        </div>
      )}
      </Container>
    </div>
  );
};

export default App;
