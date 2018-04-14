'use strict';

const axios = require('axios');
const storage = require('./storage');

const submitLogin = (params, logIn, setMessage) => {
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
      storage.save({
        key: 'jwt',
        data: response.data.token,
        expires: null,
      });
      console.log('JWT fetched: ', response.data.token);
      logIn();
    }).catch((err) => {
      console.log('Could not perform login: ', err);
      const errMessage = err.response.data.message || 'Could not perform login';
      setMessage(errMessage);
    });
};

const submitRegistration = (params, logIn, setMessage) => {
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

      submitLogin(params, logIn, setMessage);
    }).catch((err) => {
      console.log('Could not submit registration: ', err);
      const errMessage = err.response.data.message || 'Could not perform login';
      setMessage(errMessage);
    });
};

const logOut = () => {
  storage.remove({
    key: 'jwt',
  });
};

module.exports = {
  submitLogin,
  submitRegistration,
  logOut,
};
