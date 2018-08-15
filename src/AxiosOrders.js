import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burgerbuilder-302a5.firebaseio.com/'
});

export default instance;
