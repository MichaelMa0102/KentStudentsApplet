const userUtil = require('../../utils/user.js');

Page({
  data: {
    isLoggedIn: false,
    userInfo: null
  },

  onLoad: function(options) {
    // 检查登录状态
    this.checkLoginStatus();
  },

  onShow: function() {
    // 每次显示页面时检查登录状态
    this.checkLoginStatus();
  },

  // 检查登录状态
  checkLoginStatus: function() {
    const { isLoggedIn, userInfo } = userUtil.checkLoginStatus();
    this.setData({
      isLoggedIn,
      userInfo
    });
  },

  // 微信登录
  handleWechatLogin: function() {
    wx.showLoading({
      title: '登录中...',
      mask: true
    });

    // 1. 获取微信登录code
    userUtil.wechatLogin()
      .then((loginRes) => {
        // 2. 获取用户信息（需要用户授权）
        return userUtil.getUserProfile().catch((err) => {
          // 如果授权失败，使用测试数据（仅用于开发测试）
          console.warn('授权失败，使用测试数据:', err);
          if (err.errMsg && err.errMsg.includes('getUserProfile')) {
            // 返回模拟用户数据用于测试
            return {
              nickName: '测试用户',
              avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
            };
          }
          throw err;
        });
      })
      .then((userInfo) => {
        // 3. 保存用户信息
        // 方式1: 使用模拟数据（当前）
        const token = 'mock_token_' + Date.now();
        
        // 添加角色信息（2为超级管理员，1为普通管理员，0为普通用户）
        // 为了测试，暂时设置为超级管理员
        const userInfoWithRole = {
          ...userInfo,
          role: 2 // 2 = 超级管理员
        };
        
        userUtil.saveUserInfo(userInfoWithRole, token);
        
        // 方式2: 调用后端API（取消注释以使用）
        // const api = require('../../utils/api.js');
        // return api.login(loginRes.code, userInfo).then((res) => {
        //   userUtil.saveUserInfo(userInfo, res.data.token);
        //   return userInfo;
        // });

        wx.hideLoading();
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        });

        // 更新页面状态
        this.setData({
          isLoggedIn: true,
          userInfo: userInfoWithRole
        });

        // 延迟返回上一页
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      })
      .catch((err) => {
        wx.hideLoading();
        console.error('登录失败:', err);
        wx.showToast({
          title: '登录失败，请重试',
          icon: 'none',
          duration: 2000
        });
      });
  },

  // 退出登录
  handleLogout: function() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          userUtil.clearUserInfo();
          this.setData({
            isLoggedIn: false,
            userInfo: null
          });
          wx.showToast({
            title: '已退出登录',
            icon: 'success'
          });
        }
      }
    });
  }
});

