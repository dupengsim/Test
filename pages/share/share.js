

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow: 0,
    tempFilePaths: '',
    tempImageUrl: '',
    ispreview: 0,
    text: 'myCanvas',
    ison: 1,
    content: ''
  },
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '在亲戚的眼里，我的专业是这样的',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  showHide: function () {
    this.setData({
      isshow: 1
    })
  },
  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        console.log(res.tempFilePaths);
        _this.setData({
          tempFilePaths: res.tempFilePaths,
          ispreview: 1
        })
      }
    })
  },
  exportImage: function () { // TODO：导出绘制出来的图文海报
    let that = this;
    console.log(that.data.tempImageUrl);
    wx.saveImageToPhotosAlbum({
      filePath: that.data.tempImageUrl,
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
        console.log('fail')
      }
    })
  },
  onSavePicClick: function () { // 生成海报
    let that = this;
    var imgUrl = that.data.tempFilePaths[0];
    console.log(imgUrl);
    var _content = that.data.content;
    console.log(that.data.content);
    var arr = _content.split(/[\n,]/g);
    console.log(arr);
    // return;
    var context = wx.createCanvasContext('myCanvas');
    context.stroke();
    context.drawImage(imgUrl, 0, 0, 360, 400);

    context.setFillStyle('black');
    context.setFontSize(16);
    context.fillText('#在亲戚的眼里，你是干啥的#', 40, 50);

    var _top = 75;
    for (var i = 0; i < arr.length; i++) {
      that.drawText(arr[i], 40, _top, 160, context);
      _top += 20;
    }
    // that.drawText(_content, 40, 75, 160, context);

    // context.setFillStyle('black');
    // context.setFontSize(16);
    // context.fillText(_content, 40, 50);

    //绘制图片
    context.draw();
    //输出最终图片的路径
    setTimeout(() => {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          console.log(tempFilePath);
          that.setData({
            tempImageUrl: tempFilePath
          });
        },
        fail: function (res) {
          console.log(res);
        }
      }, that)
    }, 1000)

    that.setData({
      ison: 0
    })
  },
  textAreaBlur: function (evt) {
    this.setData({
      content: evt.detail.value
    })
  },
  textAreaInput: function (evt) {
    this.setData({
      content: evt.detail.value
    })
  },
  drawText: function (t, x, y, w, context) { // 设置文本自动换行
    var chr = t.split("");
    var temp = "";
    var row = [];
    context.font = "16px";
    context.fillStyle = "black";
    context.textBaseline = "middle";
    for (var a = 0; a < chr.length; a++) {
      if (context.measureText(temp).width < w) {
        ;
      }
      else {
        row.push(temp);
        temp = "";
      }
      temp += chr[a];
    }
    row.push(temp);
    for (var b = 0; b < row.length; b++) {
      context.fillText(row[b], x, y + (b + 1) * 20);
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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