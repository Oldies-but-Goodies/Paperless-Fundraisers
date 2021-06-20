import axios from "axios";
import { isNil } from "lodash";
import React, { useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Navigation from "./components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signUp";
import Admin from "./pages/admin";
import NewOrder from "./pages/newOrder";
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
      if (!isNil(response.data.user)) {
        dispatch({ type: SET_USER, user: response.data.user });
      } else {
        dispatch({ type: UNSET_USER });
      }
    });
  }, []);
  
  return (
    <Container>
      <Navigation />

      {state.user ? (
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/admin' >
            <Admin />
          </Route>
          <Route exact path='/newOrder' >
            <NewOrder />    
          </Route>
        </Switch>
      ) : (
        <div>
          <Splash></Splash>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            {/* <Redirect to='/login' /> */}
          </Switch>
        </div>
      )}
    </Container>
  );
};

export default App;
