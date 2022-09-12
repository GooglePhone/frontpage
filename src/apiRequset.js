import axios from "axios";

axios.defaults.timeout = 5000;
// axios.defaults.baseURL = process.env.API_ROOT; // 域名

axios.defaults.baseURL = "https://system-to-order.herokuapp.com" // 域名

const cros = "https://system-to-order.herokuapp.com"

// http request 欄截
axios.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data);
    config.headers = { // 如果沒有cors的問題則可以都不加
      "Access-Control-Allow-Origin": cros,
      "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
      "Access-Control-Max-Age": "3600",
      'Content-Type': 'application/json',
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 異常處理
axios.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 404:
          console.log("找不到該頁面");
          break;
        case 500:
          console.log("伺服器出錯");
          break;
        case 503:
          console.log("服務失效");
          break;
        default:
          console.log(`連接錯誤${err.response.status}`);
      }
    } else {
      console.log("連接到服務器失敗");
    }
    return Promise.resolve(err.response);
  }
);

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    // console.log(url)
    axios
      .get(url, {
        params: params
      })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => {
        resolve(response);
      },
      err => {
        reject(err);
      }
    );
  });
}

export function remove(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}
// 將封裝的方法打包起來
export const api = {
  fetch: function(paramObj) {
    return fetch("api/users", paramObj);
  },
  post: function(paramObj) {
    return post("api/users", paramObj);
  },
  put: function(paramObj) {
    return put("api/users", paramObj);
  },
  delete: function(paramObj) {
    return remove("api/users", paramObj);
  },
  getMenu: async function(paramObj) {
    return await fetch("/order/menu", paramObj);
  },
  submitPayment: async function(orderId) {
    return await post("/order/payment", {'orderId':orderId});
  },
};
