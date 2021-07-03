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

    getOne: function (productId) {
      return axios.get('/api/product/' + productId);
    },
  },

  Fundraisers: {
    getFundraisers: function () {
      return axios.get('/api/fundraiser/');
    },
    getCurrentFundraiser: function (fundraiserId) {
      return axios.get('/api/fundraiser/' + fundraiserId);
    },
    addFundraiser: function (obj) {
      return axios.post('/api/fundraiser', obj);
    }
  },

    Orders: {
    getAllOrders: function (fundraiserId) {
      return axios.get('/api/order/fundraiser/all/' + fundraiserId);
    },
    createOrder: function(obj) {
      return axios.post('/api/order/', obj)
    }
  }
  
};
