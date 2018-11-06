import { NativeModules} from 'react-native';
import CheckoutModule from '../CmEat/Modules/CheckoutModule/CheckoutModule';

const { Alipay } = NativeModules;

export default  {
  async constructAlipayOrder(data){
    let order = {
      partner: "2088031360615403",
      seller_id: "api@rotating.ca",
      out_trade_no: data.oid,
      subject: "小明配送",
      body: "订单号：#" + data.oid,
      total_fee: data.total,
      currency: "CAD",
      forex_biz: "FP",
      notify_url: "https://chanmao.us/api/alipay/v2/alipay_notify_url",
      service: "mobile.securitypay.pay",
      payment_type: "1",
      _input_charset: "utf-8",
      it_b_pay: "300m",
      show_url: "m.alipay.com",
      product_code: "NEW_WAP_OVERSEAS_SELLER"
    }
    let signed_data = await CheckoutModule.signAlipayOrder(order);
    // check if successfully signed
    if (signed_data.ev_error == 0){
      // add addtional parameter
      let sign_str = signed_data.sign_str + '&sign="' + signed_data.sign + '"&sign_type="RSA"'
      // use native method to redirect alipay
      let response = await Alipay.pay(sign_str)

    }
    else{
      alert("该订单已成功支付, 请刷新页面");
    }
  }
}

// export default Alipay;
