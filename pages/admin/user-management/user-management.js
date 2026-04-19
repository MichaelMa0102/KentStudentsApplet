const userUtil = require('../../../utils/user.js');

Page({
  data: {
    userList: [],
    searchKeyword: '',
    roleOptions: ['普通用户', '管理员', '超级管理员'],
    showDetailModal: false,
    selectedUser: {},
    isSuperAdmin: false
  },

  onLoad: function() {
    this.checkAdminPermission();
    this.checkSuperAdminStatus();
    this.loadUserList();
  },

  // 检查超级管理员状态
  checkSuperAdminStatus: function() {
    const isSuperAdmin = userUtil.isSuperAdmin();
    this.setData({
      isSuperAdmin: isSuperAdmin
    });
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

  // 加载用户列表
  loadUserList: function() {
    // 模拟数据 - 实际应该从后端API获取
    const mockData = [
      {
        id: '1',
        nickName: '超级管理员',
        avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
        role: 2,
        openid: 'super_admin_openid',
        registerTime: '2026-04-01',
        lastLogin: '2026-04-19'
      },
      {
        id: '2',
        nickName: '普通管理员',
        avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
        role: 1,
        openid: 'admin_openid',
        registerTime: '2026-04-02',
        lastLogin: '2026-04-18'
      },
      {
        id: '3',
        nickName: '张老师',
        avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
        role: 0,
        openid: 'teacher1_openid',
        registerTime: '2026-04-05',
        lastLogin: '2026-04-17'
      },
      {
        id: '4',
        nickName: '李老师',
        avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
        role: 0,
        openid: 'teacher2_openid',
        registerTime: '2026-04-10',
        lastLogin: '2026-04-16'
      },
      {
        id: '5',
        nickName: '王老师',
        avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
        role: 0,
        openid: 'teacher3_openid',
        registerTime: '2026-04-15',
        lastLogin: '2026-04-15'
      }
    ];
    
    this.setData({
      userList: mockData
    });
  },

  // 返回上一页
  onBack: function() {
    wx.navigateBack();
  },

  // 搜索输入
  onSearchInput: function(e) {
    this.setData({
      searchKeyword: e.detail.value
    });
  },

  // 搜索
  onSearch: function() {
    const keyword = this.data.searchKeyword.toLowerCase();
    const originalList = [
      {
        id: '1',
        nickName: '管理员',
        avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
        role: 1,
        openid: 'admin_openid',
        registerTime: '2026-04-01',
        lastLogin: '2026-04-19'
      },
      {
        id: '2',
        nickName: '张老师',
        avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
        role: 0,
        openid: 'teacher1_openid',
        registerTime: '2026-04-05',
        lastLogin: '2026-04-18'
      },
      {
        id: '3',
        nickName: '李老师',
        avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
        role: 0,
        openid: 'teacher2_openid',
        registerTime: '2026-04-10',
        lastLogin: '2026-04-17'
      },
      {
        id: '4',
        nickName: '王老师',
        avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
        role: 0,
        openid: 'teacher3_openid',
        registerTime: '2026-04-15',
        lastLogin: '2026-04-16'
      }
    ];
    
    const filteredList = originalList.filter(item => 
      item.nickName.toLowerCase().includes(keyword) ||
      (item.openid && item.openid.toLowerCase().includes(keyword)) ||
      item.id.includes(keyword)
    );
    
    this.setData({
      userList: filteredList
    });
  },

  // 角色变更
  onRoleChange: function(e) {
    const userId = e.currentTarget.dataset.id;
    const newRole = e.detail.value;
    
    const updatedList = this.data.userList.map(item => {
      if (item.id === userId) {
        return { ...item, role: newRole };
      }
      return item;
    });
    
    this.setData({
      userList: updatedList
    });
    
    wx.showToast({
      title: '角色修改成功',
      icon: 'success'
    });
  },

  // 查看用户详情
  viewUserDetail: function(e) {
    const user = e.currentTarget.dataset.item;
    this.setData({
      showDetailModal: true,
      selectedUser: user
    });
  },

  // 隐藏详情弹窗
  hideDetailModal: function() {
    this.setData({
      showDetailModal: false
    });
  },

  // 阻止冒泡
  stopPropagation: function() {}
});