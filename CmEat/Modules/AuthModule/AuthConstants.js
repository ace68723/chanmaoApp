'use strict';
// const TestServer = 'http://cmtest.littlesailing.com/index.php?r=';
const productServer = 'https://www.chanmao.ca/index.php?r=';
const APIProductServer = 'https://chanmao.us/api/';

const APIServer= APIProductServer;
const Server = productServer;
const AppConstants ={
    //chanmao login api,{username: , password: }
    // MobAddress10Test
    API_LOGIN:Server + 'MobLogin10/login',
    API_AUTH: Server + 'MobLogin10/loginwc',

    API_AREALIST: Server + 'MobOrder10/RrAreaNew',
    API_RESTAURANTLIST: Server + 'MobOrder10/Rrlist',
    API_MENU: APIServer + 'cmapp/v2/get_menu',
    // API_MENU: Server + 'MobOrder10/Rrmenu',
    // API_HISTORYLIST: Server + 'MobOrder10/historylist',
    // API_HISTORYORDER: Server + 'MobOrder10/HistoryOrder',
    API_HISTORYORDER: APIServer + 'cmapp/v3/get_history_list',
    // API_HISTORYORDER: 'https://norgta.com/api/cmapp/v2/get_history_list',
    // API_GETHISTORYDETAIL : Server + 'MobOrder10/OrderHistory',
    API_GETHISTORYDETAIL: APIServer + 'cmapp/v2/get_history_order_detail',
    API_GET_LAST4: APIServer + "payment/v2/get_last4",
    API_CHANGE_ORDER_TO_CASH: APIServer + "cmapp/v2/change_payment_to_cash",
    //restaurant
    API_CATEGORY_LIST: APIServer + 'cmapp/v2/get_category_list',
    API_RESTAURANT_LIST: APIServer + 'cmapp/v2/get_restaurant_list',

    API_ADDRESS: Server + 'MobAddress10/addresslist',
    API_CREATE_ADDRESS: Server + 'MobAddress10/Addresscreate',
    API_DELET_ADDRESS: Server + 'MobAddress10/Addressupdate',

    // API_BEFOR_CHECKOUT: Server + 'MobOrder10/BeforeCO',
    API_BEFOR_CHECKOUT: APIServer + "cmapp/v2/before_checkout",
    API_CALCULATE_DELIVERY_FEE: Server + 'MobOrder10/CalcFee',
    API_CHECKOUT:Server + 'MobOrder10/checkout',
    API_GETVERIFYCODE: Server + 'MobOrder10/sendcode',
    API_VERIFYCODE: Server + 'MobOrder10/verifysms',
    API_ADDREVIEW: APIServer + 'cmapp/v2/set_order_review',

    GET_ATICLE_LIST: Server + 'MobContent10/PostList',
    GET_ARTICLE_AUTHOR: Server + 'MobContent10/ArticleOV',
    GET_BROADCAST_AUTHOR: Server + 'MobContent10/RadioOV',
    GET_ACTIVITY_AUTHOR: Server + 'MobContent10/ActivityOV',
    SUBMIT_APPLICATION: Server + 'MobContent10/ApplySubmit',
    SUBMIT_COMMENT: Server + 'MobContent10/CommentSubmit',
    GET_COMMENT_LIST: Server + 'MobContent10/CommentList',
    API_CHECK_UPDATE: Server + 'MobContent10/CheckUpdate',

    API_HOME: Server + 'MobAd10/AppHome',

    ERROR_PASSWORD:'ERROR_PASSWORD',
    ERROR_PASSWORD_MESSAGE:'密码不正确',
    ERROR_NETWORK:'ERROR_NETWORK',
    ERROR_NETWORK_MESSAGE:'请检查您的网络',
    ERROR_STORE:'CAN NOT SAVE DATA',
    ERROR_STORE_MESSAGE:'error code: 301 请重新登录',
    SUCCESS_STORE:'SAVE SUCCESSFUL',
    ERROR_AUTH:'验证过期',
    ERROR_AUTH_MESSAGE:'验证过期,请重新登录',
    SUCCESS_LOGIN:'登录成功',
    //wecaht
    WECHAT_SCOPE: 'snsapi_userinfo',
    WECHAT_STATE: 'wechat_sdk_test',
    WECHAT_APPID: 'wx20fd1aeb9b6fcf82',
    //auth
    SUCCESS: 0,
    FAIL: 1,
    TOKEN: 'userToken',
    UID: 'sv_uid',
    // auth
    DO_LOGIN:'DO_LOGIN',
    //alert
    ALERT_TITLE:'馋猫订餐',
    STARTED:'正在执行中',
    getOptiopns : {
        method: 'GET',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    },
    postOptiopns :{
        method: 'POST',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

}
module.exports = AppConstants;
