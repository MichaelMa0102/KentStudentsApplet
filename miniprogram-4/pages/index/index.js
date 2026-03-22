const userUtil = require('../../utils/user.js');

Page({
  data: {
    userName: '游客',
    userAvatar: '',
    isLoggedIn: false,
    
    // 轮播图数据
    swiperImages: [
      {
        url: '/images/banners/banner1.jpg',
        title: '肯特学校大门'
      },
      {
        url: '/images/banners/banner2.jpg',
        title: '图书馆全景'
      },
      {
        url: '/images/banners/banner3.jpg',
        title: '体育场航拍'
      }
    ],
    currentSwiper: 0,
    
    // 服务图标数据
    serviceItems: [
      { id: 1, name: '艺术榜', icon: '🎨', color: '#e3f2fd' },
      { id: 2, name: '转学榜', icon: '🔄', color: '#fff3e0' },
      { id: 3, name: '研究生榜', icon: '📚', color: '#fff9c4' },
      { id: 4, name: '美高榜', icon: '🇺🇸', color: '#fce4ec' },
      { id: 5, name: '找机构', icon: '🔍', color: '#e8f5e9' },
      { id: 6, name: '语培榜', icon: '📖', color: '#ffebee' },
      { id: 7, name: '机构榜', icon: '⚙️', color: '#e1f5fe' },
      { id: 8, name: '榜单大全', icon: '📋', color: '#fff8e1' },
      { id: 9, name: '机构大全', icon: '⭐', color: '#e3f2fd' },
      { id: 10, name: '资讯信息', icon: 'ℹ️', color: '#f3e5f5' }
    ],
    
    // 排行榜数据
    rankings: [
      { id: 1, name: '用户A', score: 1000 },
      { id: 2, name: '用户B', score: 950 },
      { id: 3, name: '用户C', score: 900 },
      { id: 4, name: '用户D', score: 850 },
      { id: 5, name: '用户E', score: 800 }
    ],
    
    // 活动/OFFER数据
    activities: [
      {
        id: 1,
        title: '港科技',
        description: '香港科技大学',
        image: '/images/activity1.jpg',
        content: '这是活动1的详细内容...',
        count: 165
      },
      {
        id: 2,
        title: '港中文',
        description: '香港中文大学',
        image: '/images/activity2.jpg',
        content: '这是活动2的详细内容...',
        count: 3
      },
      {
        id: 3,
        title: '香港城市大',
        description: '香港城市大学',
        image: '/images/activity3.jpg',
        content: '这是活动3的详细内容...',
        count: 11
      }
    ]
  },

  // 轮播图切换
  onSwiperChange: function(e) {
    this.setData({
      currentSwiper: e.detail.current
    });
  },

  // 上一张
  prevImage: function() {
    let current = this.data.currentSwiper;
    let total = this.data.swiperImages.length;
    this.setData({
      currentSwiper: (current - 1 + total) % total
    });
  },

  // 下一张
  nextImage: function() {
    let current = this.data.currentSwiper;
    let total = this.data.swiperImages.length;
    this.setData({
      currentSwiper: (current + 1) % total
    });
  },

  // 预览图片
  previewImage: function(e) {
    const currentUrl = e.currentTarget.dataset.url;
    const allUrls = this.data.swiperImages.map(item => item.url);
    
    wx.previewImage({
      current: currentUrl,
      urls: allUrls
    });
  },

  // 点击图片导航到详情页
  navigateToDetail: function(e) {
    const index = e.currentTarget.dataset.index;
    const image = this.data.swiperImages[index];
    
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + (index + 1) + 
           '&type=banner&title=' + encodeURIComponent(image.title) + 
           '&image=' + encodeURIComponent(image.url)
    });
  },

  // 点击分类按钮
  onCategoryTap: function(e) {
    const type = e.currentTarget.dataset.type;
    console.log('点击分类:', type);
    // 可以在这里添加跳转逻辑
  },

  // 点击服务图标
  onServiceTap: function(e) {
    const item = e.currentTarget.dataset.item;
    console.log('点击服务:', item);
    // 可以在这里添加跳转逻辑
  },

  // 点击活动/OFFER时的处理函数
  onActivityTap: function(e) {
    const activityId = e.currentTarget.dataset.id;
    const activity = e.currentTarget.dataset.item;
    
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + activity.id + 
           '&type=activity&title=' + encodeURIComponent(activity.title) + 
           '&description=' + encodeURIComponent(activity.description) + 
           '&image=' + encodeURIComponent(activity.image) +
           '&content=' + encodeURIComponent(activity.content)
    });
  },

  onLoad: function() {
    console.log('页面初始化完成');
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
      userName: userInfo ? userInfo.nickName : '游客',
      userAvatar: userInfo ? userInfo.avatarUrl : ''
    });
  },

  // 点击用户信息区域 - 跳转到登录页
  onUserTap: function() {
    if (!this.data.isLoggedIn) {
      wx.navigateTo({
        url: '/pages/login/login'
      });
    } else {
      // 已登录，可以跳转到个人中心
      wx.showToast({
        title: '个人中心功能开发中',
        icon: 'none'
      });
    }
  },

  // 显示退出登录菜单
  showLogoutMenu: function() {
    const that = this;
    wx.showActionSheet({
      itemList: ['退出登录'],
      success: function(res) {
        if (res.tapIndex === 0) {
          // 点击了退出登录
          that.handleLogout();
        }
      }
    });
  },

  // 退出登录
  handleLogout: function() {
    const userUtil = require('../../utils/user.js');
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          userUtil.clearUserInfo();
          this.setData({
            isLoggedIn: false,
            userName: '游客',
            userAvatar: ''
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
