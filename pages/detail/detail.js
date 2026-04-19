Page({
  data: {
    id: '',
    type: '',
    title: '',
    description: '',
    imageUrl: '',
    content: '',
    typeText: '',
    placeholderMain: '',
    placeholderSub: '内容待完善',
    studentCases: []
  },

  onLoad: function(options) {
    const { id, type, title, description, image, content } = options;
    const safeDecode = (v) => {
      try {
        return decodeURIComponent(v || '');
      } catch (e) {
        return v || '';
      }
    };

    const decodedTitle = safeDecode(title);
    const decodedDesc = safeDecode(description);
    const imageUrl = safeDecode(image);
    const decodedContent = safeDecode(content);

    let typeText = '';
    if (type === 'banner') typeText = '轮播图';
    else if (type === 'activity') typeText = '活动';
    else if (type === 'ranking') typeText = 'OFFER学校';
    else if (type === 'schoolIntro') typeText = '学校介绍';
    else if (type === 'studentCases') typeText = '录取案例';

    let placeholderMain = '';
    if (!imageUrl) {
      if (type === 'schoolIntro') placeholderMain = '学校介绍';
      else if (type === 'studentCases') placeholderMain = '录取学生案例';
      else if (type === 'ranking') placeholderMain = '学校详情';
      else placeholderMain = '详情';
    }

    let studentCases = [];
    if (type === 'studentCases') {
      const schoolData = {
        princeton: { count: 6 },
        mit: { count: 3 },
        harvard: { count: 3 },
        stanford: { count: 23 },
        yale: { count: 14 },
        uchicago: { count: 47 },
        duke: { count: 14 }
      };
      const count = schoolData[id] ? schoolData[id].count : 4;
      
      for (let i = 1; i<= count; i++) {
        const tag = i % 3 === 0 ? 'RD' : 'ED';
        studentCases.push({
          id: i,
          name: '某同学',
          tag: tag,
          offer: '本科OFFER',
          year: '2026',
          class: '1201'
        });
      }
    }

    this.setData({
      id: id || '',
      type: type || '',
      title: decodedTitle,
      description: decodedDesc,
      imageUrl: imageUrl,
      content: decodedContent,
      typeText: typeText,
      placeholderMain: placeholderMain,
      placeholderSub: '内容待完善',
      studentCases: studentCases
    });

    wx.setNavigationBarTitle({
      title: decodedTitle || '详情'
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
