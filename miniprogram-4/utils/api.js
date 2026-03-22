// API工具类 - 用于与后端服务器通信

// TODO: 替换为你的实际后端API地址
const BASE_URL = 'https://your-backend-api.com/api';

/**
 * 发送请求到后端
 */
function request(url, method = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    // 获取token
    const token = wx.getStorageSync('token') || '';

    wx.request({
      url: BASE_URL + url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/json',
        'Authorization': token ? 'Bearer ' + token : ''
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error('请求失败: ' + res.statusCode));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

/**
 * 用户登录API
 * @param {string} code - 微信登录code
 * @param {object} userInfo - 用户信息
 */
function login(code, userInfo) {
  return request('/user/login', 'POST', {
    code: code,
    userInfo: userInfo
  });
}

/**
 * 获取用户信息API
 */
function getUserInfo() {
  return request('/user/info', 'GET');
}

/**
 * 更新用户信息API
 */
function updateUserInfo(userInfo) {
  return request('/user/update', 'POST', userInfo);
}

module.exports = {
  request,
  login,
  getUserInfo,
  updateUserInfo
};
