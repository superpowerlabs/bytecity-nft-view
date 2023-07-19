/**
 * 网络请求配置
 */
import axios from "axios";
// const { getState } = store;

axios.defaults.timeout = 100000;
axios.defaults.retry = 5;

axios.defaults.retryDelay = 1000;

/**
 * http request 拦截器
 */
axios.interceptors.request.use(
    (config) => {
        config.data = JSON.stringify(config.data);
        if(config.url.indexOf('/superpower') > -1){
            config.headers = {
                "Content-Type": "application/json",
            };
        }
        else {
            config.headers = {
                "Content-Type": "application/json",
            };
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
    (response) => {
        if (response.data.errCode === 2) {
            console.log("token expire");
        }
        return response;
    },
    (err) => {
        console.log("response error: ", err);
        const config = err.config;

        if(!config || !config.retry) return Promise.reject(err);

        config.__retryCount = config.__retryCount || 0;

        if (config.__retryCount >= config.retry) {

            return Promise.reject(err);
        }
    
        config.__retryCount += 1;
    
        console.log(config.url +' retry' + config.__retryCount + ' times');
    
        var backoff = new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, config.retryDelay || 1000);
        });
    
        return backoff.then(function () {
            return axios(config);
        });
        
    }
);

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
        }).then((response) => {
            landing(url, params, response.data);
            resolve(response.data);
        })
            .catch((error) => {
                reject(error);
            });
    });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}

//统一接口处理，返回数据
export default function http(method, url, param) {
    return new Promise((resolve, reject) => {
        switch (method) {
            case "get":
                get(url, param)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
                break;
            case "post":
                post(url, param)
                    .then(function (response) {
                        const code = response?.code;
                        // if(code && code !== 0 && code > 400 && errJsonData[code]){
                        //     message.error({content:errJsonData[code][1]})
                        // }
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
                break;
            default:
                break;
        }
    });
}


/**
 * 查看返回的数据
 * @param url
 * @param params
 * @param data
 */
function landing(url, params, data) {
    if (data.code === -1) {
    }
}

