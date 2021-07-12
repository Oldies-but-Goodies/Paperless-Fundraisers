import axios from 'axios';
import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Navigation from './components/navbar';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signUp';
import Admin from './pages/admin';
import NewOrder from './pages/newOrder';
import Profile from './pages/profile';
import ChangeFundraiser from './pages/changeFundraiser';
import { LOADING, SET_USER, UNSET_USER } from './store/actions';
import { useStoreContext } from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import Splash from './pages/splash';
import Container from 'react-bootstrap/Container';

const App = () => {
  const history = useHistory();
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    dispatch({ type: LOADING });

    axios.get('/api/users').then((response) => {
      if (response.data.user) {
        console.log('app setUser');
        dispatch({ type: SET_USER, user: response.data.user });
      } else {
        dispatch({ type: UNSET_USER });
      }
    });
  }, []);

  return (
    <div>
      {/* <Container> */}
      {state.user ? (
        <div className='appContainer'>
          <Navigation />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/newOrder'>
              <NewOrder />
            </Route>
            <Route exact path='/profile'>
              <Profile />
            </Route>
            <Route exact path='/changeFundraiser'>
              <ChangeFundraiser />
            </Route>
            <Route exact path='/admin'>
              {state.currentFundraiser.adminLevel === 'admin' ? (
                <Admin />
              ) : (
                <Home />
              )}
            </Route>
          </Switch>
        </div>
      ) : (
<<<<<<< HEAD
        <div>
=======
        <div className='appContainer'>
>>>>>>> 8e02727dfdbe0ef16be9c8911394cd8f5c9d406d
          {/* <Splash></Splash> */}
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route
              exact
              path='/changeFundraiser'
              component={ChangeFundraiser}
            />
          </Switch>
        </div>
      )}
      {/* </Container> */}
    </div>
  );
};

export default App;
