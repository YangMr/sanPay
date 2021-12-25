/**
 * @author YangLing
 * @date 2021/12/25 10:05 AM
 */
import md5 from "./md5"
export const sign = (json)=>{
    //生成签名信息 (openid uid salt)
    console.log(json)
    var arr = [];
    for (var i in json) {
        arr.push(i);
    }


    // arr = ['cpenid', 'did','alt']


    //如果这个参数被省略，那么元素将按照 ASCII 字符顺序进行升序排列（也就是所谓的自然顺序）
    arr = arr.sort();

    // arr = ['alt', 'cpenid','did']



    var str = '';
    for (let i = 0; i < arr.length; i++) {
        str += arr[i] + json[arr[i]]
    }


    // str = alt + alt值 + cpenid + cpenid值 + did + did值

    return md5(str);
}