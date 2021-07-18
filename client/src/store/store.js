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
      let currentFundraiserId = state.currentFundraiser.id;
      let currentFundraiserAdminLevel = state.currentFundraiser.adminLevel;
      let currentFundraiserName = state.currentFundraiser.name;
      // check to see if the currentFundraiser is not set
      console.log(state.currentFundraiser);
      console.log(currentFundraiserId, currentFundraiserAdminLevel);

      if (!state.currentFundraiser.id) {
        // if it is not set, then set it to the first one in the
        // list only if there are fundraisers associated with this user

        if (action.user.Fundraisers.length > 0) {
          currentFundraiserId = action.user.Fundraisers[0].id;
          currentFundraiserAdminLevel =
            action.user.Fundraisers[0].userFundraiser.admin_level;
          currentFundraiserName = action.user.Fundraisers[0].name
        }
      }

      return {
        ...state,
        user: action.user,
        loading: false,
        currentFundraiser: {
          id: currentFundraiserId,
          adminLevel: currentFundraiserAdminLevel,
          name: currentFundraiserName,
        },
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
    currentFundraiser: {
      id: null,
      adminLevel: null,
    },
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
