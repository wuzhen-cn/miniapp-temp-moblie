import CryptoJS from 'crypto-js'
import constant from '@/config/const.js'

let util = {}
export default util

util.constant = constant

util.md5 = function (content) {
    return CryptoJS.MD5(content).toString()
}

/**
 * AES 加密
 */
util.encrypt = function (content, secret) {
    let key = CryptoJS.enc.Utf8.parse(secret)
    let encryptResult = CryptoJS.AES.encrypt(content, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    })
    return encryptResult.toString()
}

/**
 * AES 解密
 */
util.decrypt = function (content, secret) {
    let key = CryptoJS.enc.Utf8.parse(secret)
    let encryptResult = CryptoJS.AES.decrypt(content, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    })
    return CryptoJS.enc.Utf8.stringify(encryptResult).toString()
}

/**
 * AES加密 ：字符串 key iv  返回base64
 */
util.encryptCbc = function (word, keyStr, ivStr) {
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let iv = CryptoJS.enc.Utf8.parse(ivStr);

    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

/**
 * AES 解密 ：字符串 key iv  base64
 *
 */
util.decryptCbc = function (word, keyStr, ivStr) {
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let iv = CryptoJS.enc.Utf8.parse(ivStr);

    let base64 = CryptoJS.enc.Base64.parse(word);
    let src = CryptoJS.enc.Base64.stringify(base64);

    let decrypt = CryptoJS.AES.decrypt(src, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

/**
 * 从window.location.href 中获取查询参数并以对象形式返回
 * input: string like http://127.0.0.1:9999/?abc=32423&def=333/#/move-car/index?query=9898&name=3234dsfsd&age=231
 * return: object sorted like {age: "231", name: "3234dsfsd", query: "9898"}
*/
util.getUrlParams = function (url = window.location.href) {
    let params = url.split('?').pop().split("&")
    if (params.length == 1) {
        if (!params[0]) {
            return ''
        }
        if (params[0].indexOf('=') < 0) {
            return params[0] || ''
        }
    }
    let data = {}
    let len = params.length
    for (let i = 0; i < len; i++) {
        let map = params[i].split('=')
        data[map[0]] = map[1]
    }
    return data
}

/**
 * 检查一个变量是不是JSON对象
 * input： any
 * return: true or false
*/
util.isJson = function (data) {
    try {
        JSON.parse(data)
        return true
    } catch (err) {
        return false
    }
}

/**
 * JSON对象反序列化
 * input： string
 * return: object or null
*/
util.parse = function (data) {
    if (data && util.isJson(data)) return JSON.parse(data)
    return data
}

/**
 * JSON对象序列化
 * input： json
 * return: string
*/
util.stringify = function (data) {
    if (!data) return ''
    if (data && util.isJson(data)) return data
    return JSON.stringify(data)
}

/**
 * 参数序列化后存入
 * input： key => String, value => any
 * return: undefined
*/
util.setSessionStorage = (key, value) => {
    return sessionStorage.setItem(key, util.stringify(value))
    // return localStorage.setItem(key, util.stringify(value))
}

/**
 * 参数反序列化后取出
 * input： key => String
 * return: object or ''
*/
util.getSessionStorage = (key) => {
    return util.parse(sessionStorage.getItem(key))
    // return util.parse(localStorage.getItem(key))
}

/**
 * 从本地存储中取出数据(一般化)
 * input： string
 * return: any
*/
util.getObjectFromLocal = function (key) {
    let data = localStorage.getItem(key) || ''
    return util.parse(data)
}

/**
 * 向本地存储中设置数据(一般化)
 * input： [any, string]
 * return: any
*/
util.setObjectToLocal = function (data, key) {
    if (!Array.isArray(data) && typeof data != 'object') {
        return localStorage.setItem(key, data)
    } else {
        return localStorage.setItem(key, util.stringify(data))
    }
}

/**
 * 判断传入的数据是否非空
 * input： any
 * return： Boolean 非空： true， 包含空值： false
 */
util.VerifyValues = function (item) {
    //处理字符串
    if (typeof item == 'string') return !!item
    //处理数组
    if (Array.isArray(item)) return item.length > 0
    //处理对象
    let result = true
    if (typeof item == 'object') {
        let keys = Object.keys(item)
        let len = keys.length

        for (let i = 0; i < len; i++) {
            if (!item[keys[i]] || item[keys[i]] == '') {
                result = false
                break
            }
        }
    }
    return result
}

/**
 * 格式化日期
 * input： String， Date
 * return： String 'yyyy-MM-dd' => '2019-09-04'
*/
util.formatDate = function (date = new Date(), fmt = 'yyyy-MM-dd') {
    let o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
    return fmt
}
