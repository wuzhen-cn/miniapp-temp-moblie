import axios from 'axios'
import util from '@/utils/util'
import router from '@/router/index'
import constant from '@/config/const.js'

axios.defaults.baseURL = constant.BASE_URL

axios.interceptors.request.use(
    con => {
        return con
    },
    error => {
        return Promise.reject(error)
    }
)
axios.interceptors.response.use(
    res => {
        return res
    },
    error => {
        return Promise.resolve(error)
    }
)

//返回状态判断
function checkStatus(response) {
    if(!response.status){
        return {
            code: '501',
            status: false,
            error: response.statusText
        }
    }

    if (response.status === 200 || response.status === 304) {
        if (util.isJson(response.data)) return JSON.parse(response.data)
        let result = response.data
        if (result.data && util.isJson(result.data)) {
            result.data = JSON.parse(result.data)
            let keys = Object.keys(result.data)
            if (keys.length) {
                for (let i = 0, len = keys.length; i < len; i++) {
                    if (!Number.isInteger(Number(result.data[keys[i]])) && util.isJson(result.data[keys[i]])) {
                        result.data[keys[i]] =  JSON.parse(result.data[keys[i]])
                    }
                }
            }
        }
        if (result.code && result.code == 401) {
            router.push({
                path: '/401'
            })
        }
        return result;
    }

    return {
        status: false,
        data: response.statusText
    }
}

export default {
    post(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: axios.defaults.baseURL + url,
                data: data,
                timeout: 30000,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json',
                    'Auth-Token': util.getSessionStorage(util.constant.AUTH_TOKEN)
                }
            })
            .then(res => checkStatus(res))
            // 最后一个then 启用 resolve,reject
            .then(res => resolve(res))
            .catch(err => {reject(err)})
        })
    },
    get(url, params) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: axios.defaults.baseURL + url,
                params,
                timeout: 30000,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json',
                    'Auth-Token': util.getSessionStorage(util.constant.AUTH_TOKEN)
                }
            })
            .then(res => checkStatus(res))
            .then(res => resolve(res))
            .catch(err => {reject(err)})
        })
    }
}
