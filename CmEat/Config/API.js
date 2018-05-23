'use strict';
const TestServer = 'https://norgta.com/api/sb/v2/';
const proructServer = 'https://chanmao.us/api/payment/v2/';
const Server = proructServer;
const APIConstants ={

    //Address
    API_CONDO_LIST: Server + 'condo_list',
    API_CONDO_FUZZY: Server + 'condo_fuzzy',
    API_CAN_DELIVER: Server + 'can_deliver',

    //Order
    API_ORDER_BEFORE: Server + 'order_before',
    API_ADD_CARD: Server + 'stripe_card',
    API_ADD_ORDER: Server + 'add_order',

    // Payment
    API_SIGN_ALIPAY_ORDER: 'https://norgta.com/api/alipay/v2/test_sign_order',

    //Product
    API_CATEGORY: Server + 'category',
    API_CATEGORY_QUERY: Server + 'category_query',
    API_THEME_QUERY: Server + 'theme_query',
    API_HOME_DATA: Server + 'home_data',
    API_SINGLE_PRODUCT: Server + 'prod_base',

    //HISTORY
    API_ORDER_HISTORY: Server + 'order_history',

    //PaymentHistory
    API_GET_BILLING: Server + 'billing',
    API_GET_SUMMARY: Server + 'summary',

    //Google
    GOOGLE_API_KEY: 'AIzaSyDpms3QxNnZNxDq5aqkalcRkYn16Kfqix8',

    //sbox realm path
    SBOX_REALM_PATH:'sbox_1.1.0.realm',
}
module.exports = APIConstants;
