// pages/order/order.js
import storage from "../../utils/storage";
import production from "../../model/production";
import carts from "../../common/carts";
import PayModel from "../../model/pay"
import {sign} from "../../utils/sign"
Page({
  /**
   * 确认支付
   */
  confirmPay(){
    this.handleDoOrder()
  },

  /**
   * 统一下单方法
   */
  async handleDoOrder(){
    //获取本地存储的用户信息
    let userinfo = storage.get("userinfo")
    let {openid,_id,salt} = userinfo
    let Sign = sign({openid,_id,salt})

    let data = {
      openid : userinfo.openid,
      uid : userinfo._id,
      sign : Sign,
      total_price : this.data.result,
      total_num : 2,
      derate_price : 0,
      real_price : this.data.resultPrice,
      order : JSON.stringify(this.data.allCarts)
    }

    let res =await PayModel.doOrder(data)
    console.log("res=>",res)
  },

  /**
   * 获取checked的值
   */
  getChecked(event){
    let value = event ? event.detail.value : true
    let status = value
    if(status){
      let resultPrice = this.data.result - this.data.balance
      if(resultPrice < 0){
        resultPrice = 0
      }
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
//
// 微信小程序支付:
// 1. 当小程序启动的时候,调用wx.login获取小程序的code码
// 2. 获取到小程序的code码之后,调用获取openid接口,获取到openid
// 3. 将获取到的openid以及其他信息保存到本地
// 4. 当点击确认支付按钮时调用统一下单接口,将对应的参数发送给后台,其中有一个签名非常重要,使用的md5进行的加密
// 5. 当统一下单接口调用成功之后,后台会给我们返回支付所需要的相关信息
// 6. 获取到支付相关的信息之后,调用封装的微信支付方法,拉起支付,把对应支付信息传进去就能够完成支付功能
//
// 注意:加密以这块我们根据后台的要求,只加密了openid uid 以及salt等属性以及属性值,用的是md5