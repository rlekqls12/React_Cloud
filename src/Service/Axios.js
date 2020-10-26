import axios from 'axios';
import https from 'https';
import { SERVER_URL } from 'src/Functions/common.js';

const request = axios.create({
  withCredentials: true,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  }),
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;multipart/form-data;text/plain;application/json;"
  }
});

export { axios, request };
