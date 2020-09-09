import axios from 'axios';
import qs from 'qs';

const baseUrl = process.env.NODE_ENV === 'production' ? 'http://localhost:8090' : 'http://localhost:8090';

const service = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  withCredentials: true,
  changeOrigin: true, //如果是跨域访问，需要配置这个参数
});

service.interceptors.request.use(
  config => {
    config.headers['API-Authorization'] = '11111111111111111111111';
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export function get(url, params) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params: params,
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function put(url, data) {
  return new Promise((resolve, reject) => {
    service
      .put(url, data)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function post(url, data) {
  return new Promise((resolve, reject) => {
    service
      .post(url, data)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        handleError(err, resolve, reject);
      });
  });
}

export function postForm(url, data) {
  const customService = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    withCredentials: true,
    changeOrigin: true, //如果是跨域访问，需要配置这个参数
    headers: {
      'API-Authorization': '11111111111111111111111',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return new Promise((resolve, reject) => {
    customService
      .post(url, qs.stringify(data))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function handleError(error, resolve, reject) {
  const response = error.response;

  const data = response ? response.data : null;
  if (data) {
    if (data.status === 400) {
      return resolve(data);
    } else if (data.status === 401) {
      // TODO Handle 401 status error
    } else if (data.status === 403) {
      // TODO handle 403 status error
    } else if (data.status === 404) {
      return resolve(data);
    } else if (data.status === 500) {
      // TODO handle 500 status error
    }
  } else {
    // TODO Server unavailable
  }

  return reject(error);
}
