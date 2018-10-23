Page({

  /**
   * 页面的初始数据
   */
  data: {
   aruiteId:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    console.log('--logos onLoad--');
    this.setData({aruiteId:options.id});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('--logos onReady--');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('--logos onShow---');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('---logos onHide--');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('--logos onUnload---');
  },
 

})