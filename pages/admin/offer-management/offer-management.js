const userUtil = require('../../../utils/user.js');

Page({
  data: {
    offerList: [],
    searchKeyword: '',
    years: ['2023', '2024', '2025', '2026'],
    selectedYear: 3, // 默认2026年
    showModal: false,
    isEdit: false,
    formData: {
      id: '',
      rank: '',
      nameZh: '',
      nameEn: '',
      count: '',
      logo: ''
    }
  },

  onLoad: function() {
    this.checkAdminPermission();
    this.loadOfferData();
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

  // 加载OFFER数据
  loadOfferData: function() {
    // 模拟数据 - 实际应该从后端API获取
    const mockData = [
      {
        id: '1',
        rank: 1,
        nameZh: '哈佛大学',
        nameEn: 'Harvard University',
        count: 5,
        logo: '/images/logo/Harvard.png'
      },
      {
        id: '2',
        rank: 2,
        nameZh: '斯坦福大学',
        nameEn: 'Stanford University',
        count: 3,
        logo: '/images/logo/Stanford.png'
      },
      {
        id: '3',
        rank: 3,
        nameZh: '麻省理工学院',
        nameEn: 'Massachusetts Institute of Technology',
        count: 4,
        logo: '/images/logo/MIT.png'
      },
      {
        id: '4',
        rank: 4,
        nameZh: '普林斯顿大学',
        nameEn: 'Princeton University',
        count: 2,
        logo: '/images/logo/Princeton.png'
      },
      {
        id: '5',
        rank: 5,
        nameZh: '香港科技大学',
        nameEn: 'Hong Kong University of Science and Technology',
        count: 165,
        logo: ''
      },
      {
        id: '6',
        rank: 6,
        nameZh: '香港中文大学',
        nameEn: 'The Chinese University of Hong Kong',
        count: 3,
        logo: ''
      },
      {
        id: '7',
        rank: 7,
        nameZh: '香港城市大学',
        nameEn: 'City University of Hong Kong',
        count: 11,
        logo: ''
      }
    ];
    
    this.setData({
      offerList: mockData
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
        rank: 1,
        nameZh: '哈佛大学',
        nameEn: 'Harvard University',
        count: 5,
        logo: '/images/logo/Harvard.png'
      },
      {
        id: '2',
        rank: 2,
        nameZh: '斯坦福大学',
        nameEn: 'Stanford University',
        count: 3,
        logo: '/images/logo/Stanford.png'
      },
      {
        id: '3',
        rank: 3,
        nameZh: '麻省理工学院',
        nameEn: 'Massachusetts Institute of Technology',
        count: 4,
        logo: '/images/logo/MIT.png'
      },
      {
        id: '4',
        rank: 4,
        nameZh: '普林斯顿大学',
        nameEn: 'Princeton University',
        count: 2,
        logo: '/images/logo/Princeton.png'
      },
      {
        id: '5',
        rank: 5,
        nameZh: '香港科技大学',
        nameEn: 'Hong Kong University of Science and Technology',
        count: 165,
        logo: ''
      },
      {
        id: '6',
        rank: 6,
        nameZh: '香港中文大学',
        nameEn: 'The Chinese University of Hong Kong',
        count: 3,
        logo: ''
      },
      {
        id: '7',
        rank: 7,
        nameZh: '香港城市大学',
        nameEn: 'City University of Hong Kong',
        count: 11,
        logo: ''
      }
    ];
    
    const filteredList = originalList.filter(item => 
      item.nameZh.toLowerCase().includes(keyword) ||
      item.nameEn.toLowerCase().includes(keyword)
    );
    
    this.setData({
      offerList: filteredList
    });
  },

  // 年份选择
  onYearChange: function(e) {
    this.setData({
      selectedYear: e.detail.value
    });
    // 实际应该根据年份加载对应的数据
  },

  // 录取数量修改
  onCountChange: function(e) {
    const id = e.currentTarget.dataset.id;
    const newCount = e.detail.value;
    
    const updatedList = this.data.offerList.map(item => {
      if (item.id === id) {
        return { ...item, count: newCount };
      }
      return item;
    });
    
    this.setData({
      offerList: updatedList
    });
  },

  // 显示添加弹窗
  showAddModal: function() {
    this.setData({
      showModal: true,
      isEdit: false,
      formData: {
        id: '',
        rank: '',
        nameZh: '',
        nameEn: '',
        count: '',
        logo: ''
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

  // 保存OFFER
  saveOffer: function() {
    const { formData, isEdit, offerList } = this.data;
    
    // 验证表单
    if (!formData.rank || !formData.nameZh || !formData.count) {
      wx.showToast({
        title: '请填写必填字段',
        icon: 'none'
      });
      return;
    }
    
    let updatedList;
    if (isEdit) {
      // 编辑现有数据
      updatedList = offerList.map(item => {
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
      updatedList = [...offerList, newItem];
    }
    
    // 按排名排序
    updatedList.sort((a, b) => a.rank - b.rank);
    
    this.setData({
      offerList: updatedList,
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
      content: '确定要删除这条OFFER数据吗？',
      success: (res) => {
        if (res.confirm) {
          const updatedList = this.data.offerList.filter(item => item.id !== id);
          this.setData({
            offerList: updatedList
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