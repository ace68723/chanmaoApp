'use strict';
const TestServer = 'https://norgta.com/api/sb/v2/';
const proructServer = 'https://chanmao.us/api/sb/v2/';
const Server = proructServer;
const APIConstants ={

    //Address
    API_CAN_DELIVER: Server + 'can_deliver',
    API_USER_ADDR: Server +'user_addr',

    //Order
    API_ORDER_BEFORE: Server + 'order_before',
    API_ADD_CARD: Server + 'stripe_card',
    API_ADD_ORDER: Server + 'add_order',

    //Product
    API_CATEGORY: Server + 'category',
    API_CATEGORY_QUERY: Server + 'category_query',
    API_THEME_QUERY: Server + 'theme_query',
    API_HOME_DATA: Server + 'home_data',
    API_SINGLE_PRODUCT: Server + 'prod_base',
    API_CHECK_STOCK: Server+ 'check_stock',

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
