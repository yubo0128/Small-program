
var postData=require("../../tasrdata.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
        "/img/banner/1.jpg",
        "/img/banner/2.jpg",
        "/img/banner/3.jpg",
        "/img/banner/4.jpg",
    ]
  },
  onPostTap:function(event){
      let postid=event.currentTarget.dataset.postid;
      wx.navigateTo({
          url: 'posts-list/posts-list?id=' + postid,
      })
  },
  onTap:function(){
      //有返回安检
      wx.navigateTo({
          url: '../wrlcome/wrlcome',
      })
      //没有返回按键
    //   wx.redirectTo({
    //       url: '../wrlcome/wrlcome',
    //   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log("onLoad");
      this.setData({
          posts_key: postData.postList
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      console.log("onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      console.log("onShow");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
      console.log("onHide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
      console.log("onUnload");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  oncks:function(event){
      console.log(event);
  }
})