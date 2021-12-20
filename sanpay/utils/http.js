/**
 * @author YangLing
 * @date 2021/12/20 2:46 PM
 */
import ApiConfig from "../config/config";
import wxToPromise from "./wx";
import exceptionMessage from "../config/exception-message";

class Http{
   static async request({url,method = 'GET', data = {}}){
       let res = await wxToPromise("request",{
            url :ApiConfig.baseURL + url,
            method,
            data
        })
        if(res.statusCode < 400){
            return res.data.data
        }
        if(res.statusCode === 401){
            //TODO
        }
        HTTP.showError(res.data.error_code,res.data.message)
    }
    static showError(errorCode,message = ""){
        let title = ""
        title = exceptionMessage[errorCode] || message || "未知异常"
        wx.showToast({
            title : title,
            icon : "none",
            duration : 3000
        })
    }
}

export default Http