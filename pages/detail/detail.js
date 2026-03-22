Page({
  data: {
    id: '',
    type: '',  // 'banner' 或 'activity'
    title: '',
    description: '',
    imageUrl: '',
    content: '',
    typeText: ''
  },

  onLoad: function(options) {
    // 从上一页传递的参数中获取数据
    const { id, type, title, description, image, content } = options;
    
    // 设置页面数据
    this.setData({
      id: id || '',
      type: type || '',
      title: decodeURIComponent(title || ''),
      description: decodeURIComponent(description || ''),
      imageUrl: decodeURIComponent(image || ''),
      content: decodeURIComponent(content || ''),
      typeText: type === 'banner' ? '轮播图' : type === 'activity' ? '活动' : ''
    });

    // 设置导航栏标题
    wx.setNavigationBarTitle({
      title: this.data.title
    });

    console.log('详情页加载，参数:', options);
  },

  // 返回首页
  goBack: function() {
    wx.navigateBack({
      delta: 1  // 返回上一页
    });
  },

  onReady: function() {
    // 页面渲染完成
  },

  onShow: function() {
    // 页面显示
  },

  onHide: function() {
    // 页面隐藏
  },

  onUnload: function() {
    // 页面卸载
  }
})
