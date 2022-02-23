import axios from 'axios'
// axios.defaults.headers.common = {'Authorization': `bearer ${sessionStorage.getItem('crtsBEWToken')}`}

// Development backend service url
// axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1'

// Proudction backend service url
axios.defaults.baseURL = 'https://projectdental.nl/crts-backend/api/v1'