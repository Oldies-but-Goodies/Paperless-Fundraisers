import React, { createContext, useContext, useReducer } from 'react';
import {
  LOGIN,
  LOGOUT,
  SET_USER,
  UNSET_USER,
  SET_FUNDRAISERS,
} from './actions';

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
    case LOGOUT:
      return {
        ...state,
        loading: true,
      };

    case SET_USER:
      let currentFundraiserId = state.currentFundraiser;

      // check to see if the currentFundraiser is not set

      if (!state.currentFundraiser) {
        // if it is not set, then set it to the first one in the
        // list only if there are fundraisers associated with this user

        if (action.user.Fundraisers.length > 0) {
          currentFundraiserId = action.user.Fundraisers[0].id;
        }
      }

      return {
        ...state,
        user: action.user,
        loading: false,
        currentFundraiser: currentFundraiserId,
      };

    case SET_FUNDRAISERS:
      return {
        ...state,
        currentFundraiser: action.fundraiser,
      };

    case UNSET_USER:
      return {
        ...state,
        user: null,
        loading: false,
      };

    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    loading: false,
    currentFundraiser: null,
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
