import CardAPI from './CardAPI';
import {
  NativeModules,
} from 'react-native';
import { GetUserInfo} from '../../../../App/Modules/Database';
const StripeBridge = NativeModules.StripeBridge;

// import {GetUserInfo} from '../../../App/Modules/Database';
// import { sbox_getAllItemsFromCart, sbox_updateCartStock, sbox_deleteCart } from '../../Modules/Database';
// import AuthAction from '../../../App/Actions/AuthAction';
export default  {

  async addCard({cardNumber,expMonth,expYear,cvv}){
    try {
       cardNumber = cardNumber.replace(/ /g,'');
       expMonth = Number(expMonth);
       expYear = Number(expYear);
       cvv = cvv;
       // console.log(cardNumber);
       // console.log(expMonth);
       // console.log(expYear);
       // console.log(cvv);
      const cardToken = await StripeBridge.pay( cardNumber,
                                                expMonth,
                                                expYear,
                                                cvv);
      // console.log(cardToken);
      // if(!cardToken) {throw 'no cardToken'}
      // console.log(cardToken);
      // alert(cardToken);
      const {uid,token,version} = GetUserInfo();
      const lo_data = {
        authortoken:token,
        iv_token: cardToken
      }
      const res = await CardAPI.addCard(lo_data);
      if(res.ev_error === 1) { throw 'add card fail'}
      const eo_data ={
        ev_error:res.ev_error,
        eo_last4:res.eo_last4,
      }
      return eo_data
    } catch (e) {
      console.log(e);
      throw e
    }
  },

}
