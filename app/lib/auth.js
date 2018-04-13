'use strict';

const axios = require('axios');

const submitLogin = (params, setMessage) => {
  if (!params.username || !params.password) {
    setMessage('All fields are required');
    return;
  }

  const URI = 'https://85yfxbqh90.execute-api.eu-central-1.amazonaws.com/dev/auth/login';

  axios.post(URI, params)
    .then((response) => {
      if (!response.status === 200) {
        console.log('Authentication of terminal failed. Status is ', response.status);
        return setMessage('Could not login. Try again.');
      }
    }).catch((err) => {
      console.log(err.response);
      const errMessage = err.response.data.message || 'Could not perform login';
      setMessage(errMessage);
    });
};

const submitRegistration = (params, setMessage) => {
  if (!params.username || !params.password || !params.name) {
    setMessage('All fields are required');
    return;
  }

  const URI = 'https://85yfxbqh90.execute-api.eu-central-1.amazonaws.com/dev/auth/signup';

  axios.post(URI, params)
    .then((response) => {
      if (!response.status === 200) {
        console.log('Authentication of terminal failed. Status is ', response.status);
        return setMessage('Could not login. Try again.');
      }

      this.submitLogin(params);
    }).catch((err) => {
      console.log(err.response);
      const errMessage = err.response.data.message || 'Could not perform login';
      setMessage(errMessage);
    });
};

module.exports = {
  submitLogin,
  submitRegistration,
};
