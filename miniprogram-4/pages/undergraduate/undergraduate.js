Page({
  data: {
    mainTabs: [
      { id: 'undergraduate', name: '本科榜', active: true },
      { id: 'domestic', name: '国内中学', active: false },
      { id: 'overseas', name: '海外中学', active: false },
      { id: 'agency', name: '申请机构', active: false }
    ],
    filterYear: '2026榜',
    filterStudent: '中国学生榜',
    filterSort: '排名排序',
    regionTabs: [
      { id: 'all', name: '不限', active: true },
      { id: 'us', name: '美国', active: false },
      { id: 'uk', name: '英国', active: false },
      { id: 'ca', name: '加拿大', active: false },
      { id: 'au', name: '澳大利亚', active: false },
      { id: 'sg', name: '新加坡', active: false },
      { id: 'hk', name: '香港', active: false }
    ],
    categoryTabs: [
      { id: 'all', name: '不限', active: true },
      { id: 'hypsm', name: '哈耶普斯麻', active: false },
      { id: 'ivy10', name: '藤校+T10综合', active: false },
      { id: 't30', name: 'T30综合', active: false },
      { id: 't30lib', name: 'T30文', active: false }
    ],
    searchKeyword: '',
    rankingList: [
      {
        id: 'princeton',
        rank: 1,
        nameZh: '普林斯顿大学',
        nameEn: 'Princeton University',
        count: 6,
        logo: '/images/logo/Princeton.png'
      },
      {
        id: 'mit',
        rank: 2,
        nameZh: '麻省理工学院',
        nameEn: 'Massachusetts Institute of Technology',
        count: 3,
        logo: '/images/logo/MIT.png'
      },
      {
        id: 'harvard',
        rank: 3,
        nameZh: '哈佛大学',
        nameEn: 'Harvard University',
        count: 3,
        logo: '/images/logo/Harvard.png'
      },
      {
        id: 'stanford',
        rank: 4,
        nameZh: '斯坦福大学',
        nameEn: 'Stanford University',
        count: 23,
        logo: '/images/logo/Stanford.png'
      },
      {
        id: 'yale',
        rank: 5,
        nameZh: '耶鲁大学',
        nameEn: 'Yale University',
        count: 14,
        logo: ''
      },
      {
        id: 'uchicago',
        rank: 6,
        nameZh: '芝加哥大学',
        nameEn: 'University of Chicago',
        count: 47,
        logo: ''
      },
      {
        id: 'duke',
        rank: 7,
        nameZh: '杜克大学',
        nameEn: 'Duke University',
        count: 14,
        logo: ''
      }
    ]
  },

  onMainTabTap(e) {
    const id = e.currentTarget.dataset.id;
    const mainTabs = this.data.mainTabs.map((t) => ({
      ...t,
      active: t.id === id
    }));
    this.setData({ mainTabs });
    if (id !== 'undergraduate') {
      wx.showToast({ title: '功能开发中', icon: 'none' });
    }
  },

  onRegionTap(e) {
    const id = e.currentTarget.dataset.id;
    const regionTabs = this.data.regionTabs.map((t) => ({
      ...t,
      active: t.id === id
    }));
    this.setData({ regionTabs });
  },

  onCategoryTap(e) {
    const id = e.currentTarget.dataset.id;
    const categoryTabs = this.data.categoryTabs.map((t) => ({
      ...t,
      active: t.id === id
    }));
    this.setData({ categoryTabs });
  },

  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value });
  },

  onSearchConfirm() {
    wx.showToast({ title: '搜索功能开发中', icon: 'none' });
  },

  onRankingItemTap(e) {
    const id = e.currentTarget.dataset.id;
    const item = this.data.rankingList.find((r) => r.id === id);
    if (!item) return;
    wx.navigateTo({
      url:
        '/pages/detail/detail?id=' +
        encodeURIComponent(item.id) +
        '&type=ranking&title=' +
        encodeURIComponent(item.nameZh) +
        '&description=' +
        encodeURIComponent(item.nameEn) +
        '&content=' +
        encodeURIComponent('录取数量：' + item.count)
    });
  }
});
