// 用户工具类 - 管理用户登录状态和信息

/**
 * 获取用户信息
 */
function getUserInfo() {
  try {
    const userInfo = wx.getStorageSync('userInfo');
    const token = wx.getStorageSync('token');
    return {
      userInfo: userInfo || null,
      token: token || null,
      isLoggedIn: !!(userInfo && token)
    };
  } catch (e) {
    console.error('获取用户信息失败:', e);
    return {
      userInfo: null,
      token: null,
      isLoggedIn: false
    };
  }
}

/**
 * 保存用户信息
 */
function saveUserInfo(userInfo, token) {
  try {
    wx.setStorageSync('userInfo', userInfo);
    wx.setStorageSync('token', token);
    return true;
  } catch (e) {
    console.error('保存用户信息失败:', e);
    return false;
  }
}

/**
 * 清除用户信息（登出）
 */
function clearUserInfo() {
  try {
    wx.removeStorageSync('userInfo');
    wx.removeStorageSync('token');
    return true;
  } catch (e) {
    console.error('清除用户信息失败:', e);
    return false;
  }
}

/**
 * WeChat登录
 */
function wechatLogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        if (res.code) {
          // 这里应该发送code到后端服务器
          // 后端用code换取openid和session_key
          console.log('登录code:', res.code);
          
          // 模拟登录成功（实际应该调用后端API）
          // TODO: 替换为真实的API调用
          // fetchUserInfoFromServer(res.code).then(resolve).catch(reject);
          
          // 临时模拟数据
          resolve({
            code: res.code,
            success: true
          });
        } else {
          reject(new Error('获取code失败'));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

/**
 * 获取用户信息（需要用户授权）
 */
function getUserProfile() {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        resolve(res.userInfo);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

/**
 * 检查登录状态
 */
function checkLoginStatus() {
  const { isLoggedIn, userInfo } = getUserInfo();
  return {
    isLoggedIn,
    userInfo
  };
}

module.exports = {
  getUserInfo,
  saveUserInfo,
  clearUserInfo,
  wechatLogin,
  getUserProfile,
  checkLoginStatus
};
