import axios from 'axios';

const isDevelopment = import.meta.env.DEV;
const apiBaseUrl = isDevelopment
    ? new URL(
          import.meta.env.VITE_API_URL ||
              'http://localhost:3000/api/v1'
      )
    : '/api/v1';

if (isDevelopment) {
    // Keep the API on the same host as the page so the refresh
    // cookie works on both localhost and LAN development URLs.
    apiBaseUrl.hostname = window.location.hostname;
    apiBaseUrl.protocol = window.location.protocol;
}

const api = axios.create({
    baseURL: isDevelopment
        ? apiBaseUrl.toString()
        : apiBaseUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
