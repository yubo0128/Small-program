// pages/movies/more-movie/more-movie.js
let util = require('../../../utils/util.js');
let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
      movies:{},
      navigateTitle:"",
      rquerstUrl:'',
      totalCount:0,
      isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.showLoading({ title: '拼命加载中...' });
      let category=options.id;
      this.data.navigateTitle = category;
      let dataUrl="";
      switch (category){
          case "正在热映":
         dataUrl= app.globalData.doubanBase + "/v2/movie/in_theaters";
             break;
          case "即将上映":
              dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
              break;
          case "豆瓣Top50":
              dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
              break;
      }
      this.data.rquerstUrl = dataUrl;
      util.http(dataUrl, this.processDouban);
      wx.hideLoading();
  },
    onMovieTop: function (event) {
        let movieId = event.currentTarget.dataset.movieid;
        wx.navigateTo({
            url: '../movie-detail/movie-detail?id=' + movieId,
        })
    },
    processDouban: function (moviData){
        let movies = [];
        for (let idx in moviData.subjects) {
            let subject = moviData.subjects[idx];
            let title = subject.title;
            if (title.length >= 6) {
                title = title.substring(0, 6) + '...';
            }
            let temp = {
                stars: util.convertToStarsArray(subject.rating.stars),
                title: title,
                average: subject.rating.average,
                covetageUrl: subject.images.large,
                movieId: subject.id,
            }
            movies.push(temp);
        }
        let totalMovies={};
        if (!this.data.isEmpty){
            totalMovies = this.data.movies.concat(movies);
        }else{
            totalMovies = movies;
            this.data.isEmpty=false;
        }
        this.setData({
            movies: totalMovies
        });
        wx.hideNavigationBarLoading();//关闭正在加载
        this.data.totalCount += 20;
        wx.stopPullDownRefresh();
    },
    onScrollLower:function(event){
        //加载更多
       let nextUrl=this.data.rquerstUrl+"?start="+this.data.totalCount+"&count=20";
        util.http(nextUrl, this.processDouban);
        wx.showNavigationBarLoading();//开启正在加载
        console.log(nextUrl);
    },
    onPullDownRefresh:function(){
        console.log("下拉刷新了");
        var refreshUrl = this.data.rquerstUrl+"?start=0&count=20";
        this.data.movies={};
        this.data.isEmpty = true;
        this.data.totalCount=0;
        util.http(refreshUrl, this.processDouban);
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (event) {
      wx.setNavigationBarTitle({
          title: this.data.navigateTitle,
      })
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