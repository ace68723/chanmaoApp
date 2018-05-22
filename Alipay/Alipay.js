import { NativeModules } from 'react-native';
import CheckoutModule from '../CmEat/Modules/CheckoutModule/CheckoutModule';

const { Alipay } = NativeModules;
export default  {
  async constructAlipayOrder(data){
    let order = {
      partner: "2088031360615403",
      seller_id: "api@rotating.ca",
      // out_trade_no: data.order_oid,
      out_trade_no: "321321",
      subject: "馋猫订餐",
      body: "订单号：#", //+ data.order_oid,
      total_fee: "0.01",
      // total_fee: data.order_total,
      // return_url: "http://www.xxx.com",
      currency: "CAD",
      forex_biz: "FP",
      notify_url: "https://norgta.com/api/cmapp/v2/alipay_notify_url",
      service: "mobile.securitypay.pay",
      payment_type: "1",
      _input_charset: "utf-8",
      it_b_pay: "10m",
      show_url: "m.alipay.com",
      product_code: "NEW_WAP_OVERSEAS_SELLER"
    }
    let signed_data = await CheckoutModule.signAlipayOrder(order);
    console.log('kkk', signed_data);
    // add addtional parameter
    let sign_str = signed_data.sign_str + '&sign="' + signed_data.sign + '"&sign_type="RSA"'

    // use native method to redirect alipay
    let response = await Alipay.pay(sign_str);

    // console.log("aaa", response.resultStatus);
  }
}

// export default Alipay;
