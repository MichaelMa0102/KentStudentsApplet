const userUtil = require('../../../utils/user.js');

Page({
  data: {
    bannerList: [],
    showModal: false,
    isEdit: false,
    formData: {
      id: '',
      title: '',
      url: ''
    }
  },

  onLoad: function() {
    this.checkSuperAdminPermission();
    this.loadBannerData();
  },

  // 检查超级管理员权限
  checkSuperAdminPermission: function() {
    const isSuperAdmin = userUtil.isSuperAdmin();
    if (!isSuperAdmin) {
      wx.showToast({
        title: '权限不足',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1000);
    }
  },

  // 加载轮播图数据
  loadBannerData: function() {
    // 模拟数据 - 实际应该从后端API获取
    const mockData = [
      {
        id: '1',
        title: '肯特学校大门',
        url: '/images/banners/banner1.jpg'
      },
      {
        id: '2',
        title: '图书馆全景',
        url: '/images/banners/banner2.jpg'
      },
      {
        id: '3',
        title: '体育场航拍',
        url: '/images/banners/banner3.jpg'
      }
    ];
    
    this.setData({
      bannerList: mockData
    });
  },

  // 返回上一页
  onBack: function() {
    wx.navigateBack();
  },

  // 显示添加弹窗
  showAddModal: function() {
    this.setData({
      showModal: true,
      isEdit: false,
      formData: {
        id: '',
        title: '',
        url: ''
      }
    });
  },

  // 显示编辑弹窗
  showEditModal: function(e) {
    const item = e.currentTarget.dataset.item;
    this.setData({
      showModal: true,
      isEdit: true,
      formData: { ...item }
    });
  },

  // 隐藏弹窗
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },

  // 阻止冒泡
  stopPropagation: function() {},

  // 表单输入
  onFormInput: function(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    
    this.setData({
      [`formData.${field}`]: value
    });
  },

  // 保存轮播图
  saveBanner: function() {
    const { formData, isEdit, bannerList } = this.data;
    
    // 验证表单
    if (!formData.title || !formData.url) {
      wx.showToast({
        title: '请填写必填字段',
        icon: 'none'
      });
      return;
    }
    
    let updatedList;
    if (isEdit) {
      // 编辑现有数据
      updatedList = bannerList.map(item => {
        if (item.id === formData.id) {
          return formData;
        }
        return item;
      });
    } else {
      // 添加新数据
      const newItem = {
        ...formData,
        id: Date.now().toString()
      };
      updatedList = [...bannerList, newItem];
    }
    
    this.setData({
      bannerList: updatedList,
      showModal: false
    });
    
    wx.showToast({
      title: isEdit ? '修改成功' : '添加成功',
      icon: 'success'
    });
  },

  // 确认删除
  confirmDelete: function(e) {
    const id = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条轮播图吗？',
      success: (res) => {
        if (res.confirm) {
          const updatedList = this.data.bannerList.filter(item => item.id !== id);
          this.setData({
            bannerList: updatedList
          });
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  }
});