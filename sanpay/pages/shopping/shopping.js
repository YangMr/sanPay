// pages/shopping/shopping.js
import ProductionModel from "../../model/production";
import {navigateTo} from "../../utils/wxApi"
Page({
  /**
   * 点击按钮开启扫描条形码
   */
  async handleQrcode(){
    //获取到所扫码商品的条形码
    let {result} = await this.scanCodePromise()

    //如果所扫码商品的条形码不存在或者有问题我门则不继续往下执行
    if(!result) return;

    //通过扫码商品的条形码获取到对应商品的信息
    let res = await ProductionModel.getProduction(result)

    //判断如果通过条形码获取到了商品信息，则跳转到购物车页面
    if(res.result && res.result.length > 0){
      navigateTo("/pages/cart/cart")
    }

  },

  /**
   * 将扫码方法进行promise化
   * @returns {Promise<unknown>}
   */
  scanCodePromise(){
    return new Promise((resolve, reject)=>{
      wx.scanCode({
        success : (res)=> {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },



  /**
   * 页面的初始数据
   */
  data: {
    avatar : [
      {
        id : 1,
        url : "https://huaxinwendeng.oss-cn-hangzhou.aliyuncs.com/uploads/image/2020t2vrszZ5ib1586332927.jpg?x-oss-process=image/resize,w_1920,h_575"
      },
      {
        id : 2,
        url : "https://huaxinwendeng.oss-cn-hangzhou.aliyuncs.com/uploads/image/2020lLJK0jy89y1586333534.jpg?x-oss-process=image/resize,w_1920,h_575"
      },
      {
        id : 3,
        url : "https://huaxinwendeng.oss-cn-hangzhou.aliyuncs.com/uploads/image/2020d4n2XkWbQ41586332943.jpg?x-oss-process=image/resize,w_1920,h_575"
      }
    ]
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