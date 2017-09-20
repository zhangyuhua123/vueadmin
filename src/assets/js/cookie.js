// //1.cookie的封装HJJ100001// 对cookie的封装，采取getter、setter方式// 
// (function (global) {
//     //获取cookie对象，以对象表示  
//     function getCookiesObj() {
//         var cookies = {};
//         if (document.cookie) {
//             var objs = document.cookie.split('; ');
//             for (var i in objs) {
//                 var index = objs[i].indexOf('='),
//                     name = objs[i].substr(0, index),
//                     value = objs[i].substr(index + 1, objs[i].length);
//                 cookies[name] = value;
//             }
//         }
//         return cookies;
//     }
//     //设置cookie    
//     function set(name, value, opts) {
//         //opts maxAge, path, domain, secure  max-age用秒来设置cookie的生存期    
//         if (name && value) {
//             var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
//             //可选参数       
//             if (opts) {
//                 if (opts.maxAge) {
//                     cookie += '; max-age=' + opts.maxAge;
//                 }
//                 if (opts.path) {
//                     cookie += '; path=' + opts.path;
//                 }
//                 if (opts.domain) {
//                     cookie += '; domain=' + opts.domain;
//                 }
//                 if (opts.secure) {
//                     cookie += '; secure';
//                 }
//             }
//             document.cookie = cookie;
//             return cookie;
//         } else {
//             return '';
//         }
//     }
//     //获取cookie    function get(name) {        return decodeURIComponent(getCookiesObj()[name]) || null;    }   
//     //清除某个cookie  
//     function remove(name) {
//         if (getCookiesObj()[name]) {
//             document.cookie = name + '=; max-age=0';
//         }
//     }
//     //清除所有cookie 
//     function clear() {
//         var cookies = getCookiesObj();
//         for (var key in cookies) {
//             document.cookie = key + '=; max-age=0';
//         }
//     }
//     //获取所有cookies  
//     function getCookies(name) {
//         return getCookiesObj();
//     }
//     //解决冲突   
//     function noConflict(name) {
//         if (name && typeof name === 'string') {
//             if (name && window['cookie']) {
//                 window[name] = window['cookie'];
//                 delete window['cookie'];
//                 return window[name];
//             }
//         } else {
//             return window['cookie'];
//             delete window['cookie'];
//         }
//     }
//     global['cookie'] = {
//         'getCookies': getCookies,
//         'set': set,
//         'get': get,
//         'remove': remove,
//         'clear': clear,
//         'noConflict': noConflict
//     };
// })(window);
export function removeCookie(name){
    // 将cookie的过期时间指定为过去的一个事件
    setCookie(name, "", -1);
}

// 查询cookie : 根据cookie的名称, 获得cookie的value值
export function getCookie(name){
    // document.cookie : "name1=value1; name2=value2; name3=value3";
    // 获取到所有的cookie所组成的字符串
    var cookieStr = document.cookie;

    // 将name和value对都取出来
    var cookies = cookieStr.split('; '); // alue["name1=v1", "name2=value2", "name3=value3"]
    // 遍历所有的nv对
    for(var i = 0; i < cookies.length; i++){
        var detail = cookies[i].split('='); // ["name1", "value1"]
        if(detail[0] == name){
            return decodeURIComponent(detail[1]);
        }
    }
    // return "";
}

export function setCookie(name, value, expires, path){
    // document.cookie = "name=value;expires=GMTString";
    // 以当前时间为准, 创建事件对象
    var exp = new Date();
    // 将时间对象中的时间设置到指定天数之后的
    exp.setDate(exp.getDate() + expires);
    // 获取gmt字符串
    var gmtStr = exp.toGMTString();

    if(!path){
        path = "/";
    }

    // 设置cookie
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + gmtStr + ";path=" + path;
}