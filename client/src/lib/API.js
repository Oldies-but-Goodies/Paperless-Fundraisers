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
    },

    getAdminAllForFundraiser: function (fundraiserId) {
      return axios.get('/api/product/fundraiser/adminall/' + fundraiserId);
    },

    getOne: function (productId) {
      return axios.get('/api/product/' + productId);
    },

    addOne: function (productObj) {
      return axios.post('/api/product/', productObj);
    },
  },

  Fundraisers: {
    getFundraisers: function () {
      return axios.get('/api/fundraiser/');
    },
  },

  FundraisersID: {
    getCurrentFundraiser: function (fundraiserId) {
      return axios.get('/api/fundraiser/' + fundraiserId);
    },
  },

  Orders: {
    getAllOrders: function (fundraiserId) {
      return axios.get('/api/order/fundraiser/all/' + fundraiserId);
    },
  },
};
