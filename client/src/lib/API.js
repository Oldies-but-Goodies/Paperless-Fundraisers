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

    updateOne: function (productObj, productId) {
      return axios.put('/api/product/' + productId, productObj);
    },
  },

  Fundraisers: {
    getFundraisers: function () {
      return axios.get('/api/fundraiser/');
    },
    getMyFundraisers: function () {
      return axios.get('/api/fundraiser/my');
    },
    getCurrentFundraiser: function (fundraiserId) {
      return axios.get('/api/fundraiser/' + fundraiserId);
    },
    addFundraiser: function (obj) {
      return axios.post('/api/fundraiser', obj);
    },
    updateFundraiser: function (obj) {
      console.log(obj);
      return axios.put('/api/fundraiser/' + obj.id, obj);
    },
  },

  Orders: {
    getAllOrders: function (fundraiserId) {
      return axios.get('/api/order/fundraiser/all/' + fundraiserId);
    },
    createOrder: function (obj) {
      return axios.post('/api/order/', obj);
    },
    loggedInOrders: function (userId) {
      return axios.get('api/order/allOrdersforUser/' + userId);
    },
    userOrderTotalSales: function (fundraiserId, userId) {
      console.log('in API.js', fundraiserId, userId);
      return axios.get(
        'api/userFundraiser/' + fundraiserId + '/users/' + userId
      );
    },
    updateOrder: function (orderId, updateBodyObj) {
      return axios.put('/api/order/' + orderId, updateBodyObj);
    },
  },

  OrderDetails: {
    orderDetails: function (orderId) {
      return axios.get('api/orderDetails/allOrderDetailsForOrder/' + orderId);
    },
    updateOrderDetails: function (orderId, updateBodyObj) {
      return axios.put('/api/orderDetails/' + orderId, updateBodyObj)
    }
  },

  InviteEmail: {
    sendEmail: function (emailObj) {
      console.log(emailObj);
      return axios.post('api/emailRoutes/', emailObj);
    },
  },

  UserFundraiser: {
    // return all fundraisers for the currently logged in user
    getPossibleFundraisers: function (obj) {
      return axios.get('api/userFundraiser/myfundraisers/');
    },
  },
};
