import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import AuthModule from '../../App/Modules/AuthModule/Auth';
import LocationModule from '../Modules/System/LocationModule';
import RestaurantModule from '../Modules/RestaurantModule/RestaurantModule';
import AddressModule from '../Modules/AddressModule/AddressModule';
import CheckoutModule from '../Modules/CheckoutModule/CheckoutModule';
import {NativeModules} from 'react-native';
export default {
    async beforCheckout(rid,pretax,startAmount){
      try{
          const token = await AuthModule.getToken();
          const reqData = {rid,pretax,token,startAmount}
          const result = await RestaurantModule.beforCheckout(reqData)
          const data = {result,rid}
          dispatch({
              actionType: AppConstants.BEFORE_CHECKOUT, data
          })
      }catch (e){
      }
    },
    updateDltype(type){
      const data = {type};
      dispatch({
          actionType: AppConstants.UPDATE_DLTYPE,data
      })
    },
    async calculateDeliveryFee(){
      try{
        const token = await AuthModule.getToken();
        const reqData = {token};
        const data = await RestaurantModule.calculateDeliveryFee(reqData);
        dispatch({
            actionType: AppConstants.CALCULATE_DELIVERY_FEE, data
        })
      }catch (e){
      }
    },
    	
		async _payByApple({subtotal,shipping,tax,tips},callback){
			let paymentData = {
				subtotal:'' + subtotal,
        shipping:'' + shipping,
				tax:'' + tax,
				tips:'' + tips,
			}
      NativeModules.cmApplePay.cancelcallback(callback);
      let token = await NativeModules.cmApplePay.createPayment(paymentData);
      return token;
		},
    // async checkout(comment, payment_channel, tips){
    async checkoutByApplepay({subtotal,shipping,tax, amount, oid,tips},callback){
     
      let token = await this._payByApple({subtotal,shipping,tax,tips,oid},()=>callback());
     
      if(token){
        let payResult = await CheckoutModule.oneTimeCharge({
          amount:amount*100,
          token:token,
          oid:oid,
          tips:tips,
        })
        
        NativeModules.cmApplePay.complete(payResult,()=>{
          console.log("Payment Finished.");
        });
      }
 
    },
    async checkout(comment, payment_channel, tips){
      try{
        const token = await AuthModule.getToken();
        // const reqData = {token,comment, payment_channel, tips};
        if(payment_channel == 10) {
          if(comment) {
            comment = '支付宝|' + comment;
          }
          else{
            comment = "支付宝|";
          }
        } 
        else if(payment_channel == 20) {
        
          if(comment) {
            comment = 'ApplePay|' + comment;
          }
          else{
            comment = "ApplePay|";
          }
          
        }
        const reqData = {token,comment, payment_channel, tips};
        const data = await RestaurantModule.checkout(reqData);

        dispatch({
            actionType: AppConstants.CHECKOUT, data,
        })
      }catch (e){
      }
    },
    updateAdderss(){
      dispatch({
          actionType: AppConstants.UPDATE_ADDRESS
      })
    },
    updateShouldAddAddress(flag) {
      try{
        data = {shouldAddAddress: flag}
        dispatch({
            actionType: AppConstants.SHOULD_ADD_ADDRESS, data,
        })
      }catch (e){
      }
    },
    updatePaymentStatus(payment_channel){
      data = {payment_channel: payment_channel}
      dispatch({
          actionType: AppConstants.UPDATE_PAYMENT_STATUS, data,
      })
    },
    async addCard(io_data) {
      try{
        const data = await CheckoutModule.addCard(io_data);
        dispatch({
             actionType: AppConstants.ADD_CARD,data
         })
      }catch(error){
        console.log(error)
        throw 'no cardToken'
      }
    },
}
