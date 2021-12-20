# sanPay
扫码支付小程序

## 一、创建小程序项目

## 二、实现tabBar以及创建对应的tabBar页面

### 2.1 创建对应的tabBar页面

```
"pages": [
    "pages/shopping/shopping",
    "pages/product/product",
    "pages/personal/personal"
],
```

### 2.2 创建tabBar

```
"tabBar" : {
    "color" : "#333",
    "selectedColor" : "#f60",
    "backgroundColor" : "#fff",
    "list" : [
      {
        "pagePath" : "pages/shopping/shopping",
        "text" : "扫码购物",
        "iconPath" : "/assets/images/index02.png",
        "selectedIconPath" : "/assets/images/index01.png"
      },
      {
        "pagePath" : "pages/product/product",
        "text" : "每日优选",
        "iconPath" : "/assets/images/product02.png",
        "selectedIconPath" : "/assets/images/product01.png"
      },
      {
        "pagePath" : "pages/personal/personal",
        "text" : "个人中心",
        "iconPath" : "/assets/images/user02.png",
        "selectedIconPath" : "/assets/images/user01.png"
      }
    ]
  }
```

## 三、封装wx.request

### 3.1 抽离请求的公共接口地址与公共的参数

```
/**
 * 封装请求的公共接口地址以及公共的参数
 * @type {{order_no: string, baseURL: string, i_code: string}}
 */
const ApiConfig = {
    baseURL : "https://qinchenju.com/homemaking",
    i_code : "733154FCB0EF61F8",
    order_no : "2107091110479009"
}

export default  ApiConfig
```

### 3.2 将wx.request对象转化为promise对象

```
/**
 * 方法的作用： 将wx.request转化为promise对象
 * @param method  "request"
 * @param options  "{}"
 * @returns {Promise<unknown>}
 */
function wxToPromise(method,options){
    return new Promise((resolve, reject)=>{
        options.success = resolve
        options.fail = err=>{
            reject(err)
        }
        wx[method](options)
    })
}

export default wxToPromise
```

### 3.3 对请求成功的结果以及请求失败的结果进行处理

#### 3.3.1 成功的返回结果处理

```
if(res.statusCode < 400){
   return res.data.data
}
```

#### 3.3.2 状态码为401的返回结果处理



#### 3.3.3 状态码小于400 并且 不等于 401 的返回结果处理

```
HTTP.showError(res.data.error_code,res.data.message)

static showError(errorCode,message = ""){
        let title = ""
        title = exceptionMessage[errorCode] || message || "未知异常"
        wx.showToast({
            title : title,
            icon : "none",
            duration : 3000
        })
}

```

## 四、封装api(model层)

```
import Http from "../utils/http"
import ApiConfig from "../config/config";

class UserModel extends Http{
   static getAuthToken(){
        return Http.request({
            url : "/v1/token",
            method : "POST",
            data : {
                i_code : ApiConfig.i_code,
                order_no : ApiConfig.order_no
            }
        })
    }
}

export default  UserModel
```

## 五、封装本地存储方方案