import axios from 'axios';
import https from 'https';
import { SERVER_URL } from 'src/Functions/common.js';

const request = (function() {
  axios.defaults.withCredentials = true;
  axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false
  });
  axios.defaults.baseURL = SERVER_URL;
  axios.defaults.headers = {
    "Content-Type": "application/x-www-form-urlencoded;multipart/form-data;text/plain;application/json;"
  }
  axios.create();

  return axios;
})();

export { axios, request };