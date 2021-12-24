// pages/order/order.js
import storage from "../../utils/storage";
import production from "../../model/production";
import carts from "../../common/carts";
Page({
  /**
   * 获取checked的值
   */
  getChecked(event){
    let value = event ? event.detail.value : true
    let status = value
    if(status){
      let resultPrice = this.data.result - this.data.balance
      this.setData({resultPrice,moneyStatus : true})
    }else{
      this.setData({resultPrice :this.data.result,moneyStatus : false })
    }

  },


  /**
   * 商品列表的展开与收起
   */
  handleToggle(){
    let productStatus = this.data.productStatus
    if(!productStatus){
      //展开
      this.setData({
        carts : this.data.allCarts,
        productStatus : true
      })
    }else{
      //收起
      this.setData({
        carts : this.data.oneCarts,
        productStatus : false
      })
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    carts : [],
    allCarts: [],
    oneCarts : [],
    productStatus : false,
    balance : 4,
    result : 0,
    totalNum : 0,
    moneyStatus : true,
    resultPrice : 0
  },

  totalResult : carts.totalResult,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options){
    let carts = storage.get("carts")
    let allCarts = JSON.parse(JSON.stringify(carts))
    let oneCarts =  JSON.parse(JSON.stringify(carts.splice(0,1)))

    if(!carts) return

    if(!this.data.productStatus){
      this.setData({
        carts : oneCarts,
        oneCarts,
        allCarts
      })
    }

    this.totalResult(allCarts)

    this.getChecked()

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