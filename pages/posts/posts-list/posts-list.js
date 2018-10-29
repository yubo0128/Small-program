var postData = require("../../../tasrdata.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let postid = options.id;
      let psod = postData.postList[postid];
      console.log(psod);
      this.setData({
          postdata: psod
      });
        //异步 设置缓存
      wx.setStorageSync('key', '2222');
  },
    onsjian:function(){
        //获取缓存
        let geth=wx.getStorageSync("key");
        console.log(geth);
        //清楚缓存
        //wx.removeStorageSync("key");
        //清楚所有缓存
        //wx.clearStorageSync();
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
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
  onshoreTap:function(){
      let itemList=[
          "分享给微信好友",
          "分享到朋友圈",
          "分享到 QQ",
          "分享到微博"
      ]
      wx.showActionSheet({
          itemList: itemList,
          itemColor:'#405f80',
          success:function(res){
              console.log("点击了列表项：" + that[res.tapIndex])
          }
      })
  },
  onMusicTap:function(){
      const backgroundAudioManager = wx.getBackgroundAudioManager()
      backgroundAudioManager.title = '此时此刻';
      backgroundAudioManager.epname = '此时此刻';
      backgroundAudioManager.singer = '许巍';
      backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000';
      // 设置了 src 之后会自动播放
      backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46';
      backgroundAudioManager.play();
      backgroundAudioManager.onPlay(() => {
            console.log("音乐播放开始");
        })
      backgroundAudioManager.onEnded(() => {
            console.log("音乐播放结束");
        })
    }
})