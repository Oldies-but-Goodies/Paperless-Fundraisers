import axios from 'axios';

export default {
  Users: {
    updatePassword: function (password, newPassword, email) {
      return axios.put('/api/users/updatePassword', {
        email,
        password,
        newPassword,
      });
    },
  },

  Products: {
    getAllForFundraiser: function (fundraiserId) {
      return axios.get('/api/product/fundraiser/all/' + fundraiserId);
    }
  },

  Fundraisers: {
    getFundraisers: function () {
      return axios.get('/api/fundraiser/');
    }
  },

  FundraisersID: {
    getCurrentFundraiser: function (fundraiserId) {
      return axios.get('/api/fundraiser/' + fundraiserId);
    }
  },

  Orders: {
    getAllOrders: function (fundraiserId) {
      return axios.get('/api/order/fundraiser/all/' + fundraiserId);
    }
  },
};
