/**
 * @author YangLing
 * @date 2021/12/20 3:32 PM
 */
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