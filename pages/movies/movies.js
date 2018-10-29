// pages/movies/movies.js
let util = require('../../utils/util.js');
let app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      inTHeaters:{},
      comingSoon:{},
      top250:{},
      searchResult:{},
      containerShow:true,
      searchPannelShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.showLoading({ title: '拼命加载中...' });
      let inTheatersUrl = app.globalData.doubanBase +"/v2/movie/in_theaters?start=0&count=3";
      let comingSoonUrl = app.globalData.doubanBase +"/v2/movie/coming_soon?start=0&count=3";
      let topUrl = app.globalData.doubanBase +"/v2/movie/top250?start=0&count=3";
      
      this.getMovieListData(inTheatersUrl,"inTHeaters",'正在热映');
      this.getMovieListData(comingSoonUrl,'comingSoon','即将上映');
      this.getMovieListData(topUrl,'top250',"豆瓣Top50");
      wx.hideLoading();
  },
    onbindconfirm:function(event){
        console.log(event);
        let text = event.detail.value;
        if (text!==""){
            let searUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
            this.getMovieListData(searUrl, 'searchResult', "");
        }
        //console.log(searUrl);
    },
    onBindFocus:function(event){
      this.setData({
          containerShow:false,
          searchPannelShow:true
      }) 
    },
    onCancelImgTap:function(){

        this.setData({
            containerShow: true,
            searchPannelShow: false,
            searchResult:{}
        })  
    },
    onMoreTap: function (event) {
        let cate = event.currentTarget.dataset.category;
      wx.navigateTo({
          url: 'more-movie/more-movie?id='+cate,
      })
    },
    onMovieTop:function(event){
        let movieId = event.currentTarget.dataset.movieid;
      wx.navigateTo({
          url: 'movie-detail/movie-detail?id=' + movieId,
      })
    },
    getMovieListData: function (url, settedkey, cateortitle){
    let that=this;
    wx.request({
        url: url,
       // data: {},
        method: 'GET',
        header: {
            'Content-Type': 'application/json'
        },
        success: function (res) {
            console.log(res); 
            that.processDouban(res.data, settedkey,cateortitle);
        },
        fail: function (err) {
            console.log(err);
        },
        complete: function () {

        }
    })
},
processDouban: function (moviData, settedkey,cateortitle){
  let mov=[];
    for (let idx in moviData.subjects){
        let subject = moviData.subjects[idx];
        let title = subject.title;
        if (title.length >=6){
            title = title.substring(0,6)+'...';
        }
    let temp={
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        covetageUrl: subject.images.large,
        movieId:subject.id,
    }
        mov.push(temp);
  }
  let readyData={};
   readyData[settedkey] ={
       categoryTotle: cateortitle,
       movies: mov
   };
        this.setData(readyData)
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

  }
})