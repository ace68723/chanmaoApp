import CardAPI from './CardAPI';
import {
  NativeModules,
} from 'react-native';
const StripeBridge = NativeModules.StripeBridge;

// import {GetUserInfo} from '../../../App/Modules/Database';
// import { sbox_getAllItemsFromCart, sbox_updateCartStock, sbox_deleteCart } from '../../Modules/Database';
// import AuthAction from '../../../App/Actions/AuthAction';
export default  {

  async addCard({cardNumber,expMonth,expYear,cvv,postal,name}){
    try {
       cardNumber = cardNumber.replace(/ /g,'');
       expMonth = Number(expMonth);
       expYear = Number(expYear);
       cvv = cvv;
      const cardToken = await StripeBridge.pay( cardNumber,
                                                expMonth,
                                                expYear,
                                                cvv,
                                                postal,
                                                name);

      if(!cardToken) {throw 'no cardToken'}
      // console.log(cardToken);
      // alert(cardToken);
      // const {uid,token,version} = GetUserInfo();
      const lo_data = {
        authortoken:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NDA3ODU5NDUsImV4cCI6MTU3MjMyMTk0NSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInVpZCI6IjEifQ.RIk_KgD_Oq31NkB6FSL0_PsRhmRWA3DwOLz2Fj4bjhI',
        iv_token: cardToken
      }
      const res = await CardAPI.addCard(lo_data);
      console.log(res);
      if(res.ev_error === 1) { throw 'add card fail'}
      const eo_data = res.ea_card_info;
      return eo_data
    } catch (e) {
      throw e
    }
  },

}
