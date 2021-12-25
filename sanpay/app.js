// app.js
import PayModel from "./model/pay"
import storage from "./utils/storage";
App({
  async onLaunch() {
      //1.当小程序启动的时候,调用wx.login获取小程序的code码
      let code = await this.getCode()
      // 2. 获取到小程序的code码之后,调用获取openid接口,获取到openid
      let res = await PayModel.getOpenid(code)
      console.log(res)
      //如果获取不到openid等参数，则不继续往下执行
      if(!res.success) return
      //3.将获取到的openid以及其他信息保存到本地
      storage.set("userinfo",res.userinfo)
  },
  getCode(){
      return new Promise((resolve, reject)=>{
          wx.login({
              success : (res)=>{
                  if(!res.code) return
                  resolve(res.code)
              },
              fail:(err)=> {
                  reject(err)
              }
          })
      })
  },
  globalData: {
    userInfo: null
  }
})
