const userUtil = require('../../utils/user.js');

Page({
  data: {
    userInfo: null,
    isSuperAdmin: false
  },

  onLoad: function() {
    this.checkAdminPermission();
    this.loadUserInfo();
    this.checkSuperAdminStatus();
  },

  // 检查超级管理员状态
  checkSuperAdminStatus: function() {
    const isSuperAdmin = userUtil.isSuperAdmin();
    this.setData({
      isSuperAdmin: isSuperAdmin
    });
  },

  onShow: function() {
    this.checkAdminPermission();
  },

  // 检查管理员权限
  checkAdminPermission: function() {
    const isAdmin = userUtil.isAdmin();
    if (!isAdmin) {
      wx.showToast({
        title: '权限不足',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1000);
    }
  },

  // 加载用户信息
  loadUserInfo: function() {
    const { userInfo } = userUtil.getUserInfo();
    this.setData({
      userInfo: userInfo || {}
    });
  },

  // 返回上一页
  onBack: function() {
    wx.navigateBack();
  },

  // 学校数据管理
  goToSchoolManagement: function() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // OFFER数据管理
  goToOfferManagement: function() {
    wx.navigateTo({
      url: '/pages/admin/offer-management/offer-management'
    });
  },

  // 轮播图管理
  goToBannerManagement: function() {
    wx.navigateTo({
      url: '/pages/admin/banner-management/banner-management'
    });
  },

  // 用户列表管理
  goToUserManagement: function() {
    wx.navigateTo({
      url: '/pages/admin/user-management/user-management'
    });
  },

  // 权限管理
  goToRoleManagement: function() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 系统设置
  goToSystemSettings: function() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 操作日志
  goToLog: function() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 确认退出登录
  confirmLogout: function() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          userUtil.clearUserInfo();
          wx.navigateTo({
            url: '/pages/login/login'
          });
        }
      }
    });
  }
});