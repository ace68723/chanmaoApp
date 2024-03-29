import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import AuthModule from '../../App/Modules/AuthModule/Auth';
import LocationModule from '../Modules/System/LocationModule';
import RestaurantModule from '../Modules/RestaurantModule/RestaurantModule';
import AddressModule from '../Modules/AddressModule/AddressModule';
import CheckoutModule from '../Modules/CheckoutModule/CheckoutModule';
import {
  GetUserInfo,
  cme_getSelectedAddress
} from '../../App/Modules/Database';

import {NativeModules} from 'react-native';
export default {
    // async beforCheckout(rid,pretax,startAmount){
    //   try{
    //       const token = await AuthModule.getToken();
    //       const reqData = {rid,pretax,token,startAmount}
    //       const result = await RestaurantModule.beforCheckout(reqData)
    //       const data = {result,rid}
    //       dispatch({
    //           actionType: AppConstants.BEFORE_CHECKOUT, data
    //       })
    //   }catch (e){
    //   }
    // },
    async beforeCheckoutInit({rid}) {
      try{
          const selectedAddress = cme_getSelectedAddress();
          let uaid = 0;
          if (selectedAddress.hasOwnProperty('uaid')) {
            uaid = parseInt(selectedAddress.uaid);
          }
          const reqData = {rid, uaid};

          let data = {};
          data.selectedAddress = selectedAddress;
          const result = await CheckoutModule.beforeCheckoutInit(reqData);
          if (result.ev_error == 0) {
            data.result = result;
            dispatch({
                actionType: AppConstants.BEFORE_CHECKOUT_INIT, data
            })
          }
      }catch (e){
      }
    },
    async beforeCheckoutUpdateItems({ticket_id}) {
      try{
          let data = {};
          let reqData = {
            ticket_id,
          };

          const result = await CheckoutModule.beforeCheckoutUpdateItems(reqData);
          if (result.ev_error == 0) {
            data.result = result;
            dispatch({
                actionType: AppConstants.BEFORE_CHECKOUT_INIT, data
            })
          }
      }catch (e){
      }
    },
    async beforeCheckoutUpdateAddress({ticket_id, address}) {
      try{
          let data = {};
          let reqData = {
            ticket_id,
            uaid: parseInt(address.uaid)
          };
          data.selectedAddress = address;

          const result = await CheckoutModule.beforeCheckoutUpdateAddress(reqData);
          if (result.ev_error == 0) {
            data.result = result;
            dispatch({
                actionType: AppConstants.BEFORE_CHECKOUT_INIT, data
            })
          }
      }catch (e){
      }
    },
    async beforeCheckoutUpdateCard({ticket_id, update_field}) {
      try{
          let data = {};
          const reqData = {
            ticket_id,
            update_field
          };
          data.selectedPaymentChannel = 1;

          const result = await CheckoutModule.beforeCheckoutUpdateCard(reqData);
          if (result.ev_error == 0) {
            data.result = result;
            dispatch({
                actionType: AppConstants.BEFORE_CHECKOUT_INIT, data
            })
          }
      }catch (e){
      }
    },
    async beforeCheckoutUpdateComment({ticket_id, comment}) {
      try{
          let data = {};
          let reqData = {
            ticket_id,
            comment
          };
          const result = await CheckoutModule.beforeCheckoutUpdateCard(reqData);

          if (result.ev_error == 0) {
            data.result = result;
            dispatch({
                actionType: AppConstants.BEFORE_CHECKOUT_INIT, data
            })
          }
      }catch (e){
      }
    },
    async beforeCheckoutUpdateCoupon({ticket_id, coupon_code}) {
      try{
          let data = {};
          let reqData = {
            ticket_id,
            coupon_code
          };
          const result = await CheckoutModule.beforeCheckoutUpdateCoupon(reqData);

          if (result.ev_error == 0) {
            data.result = result;
            dispatch({
                actionType: AppConstants.BEFORE_CHECKOUT_INIT, data
            })
          }
      }catch (e){
      }
    },
    async checkout({ticket_id, sign, dltype, payment_channel, charge_total, rid}){
      try{
        const reqData = {ticket_id,
                         sign,
                         dltype: parseInt(dltype),
                         payment_channel: parseInt(payment_channel),
                         charge_total,
                         rid};
        const data = {
          result: 1
        };
        const result = await CheckoutModule.checkout(reqData);
        if (result.ev_error == 0) {
          data.result = 0;
          data.oidFromUrl = result.oid;
          dispatch({
              actionType: AppConstants.CHECKOUT, data
          })
        }
        else {
          if (result.ev_context && result.ev_context.length > 0) {
            data.ev_message = result.ev_context;
          } else {
            data.ev_message = "下单失败";  
          }
          dispatch({
              actionType: AppConstants.API_ALERT, data
          })
        }
      }catch (e){
      }
    },
    updateDltype(type){
      const data = {type};
      dispatch({
          actionType: AppConstants.UPDATE_DLTYPE,data
      })
    },
    // async calculateDeliveryFee(){
    //   try{
    //     const token = await AuthModule.getToken();
    //     const reqData = {token};
    //     const data = await RestaurantModule.calculateDeliveryFee(reqData);
    //     dispatch({
    //         actionType: AppConstants.CALCULATE_DELIVERY_FEE, data
    //     })
    //   }catch (e){
    //   }
    // },
    async stripeChargeAndUpdate({amount, oid, checkoutFrom}){
      try{
          const token = await AuthModule.getToken();
          const reqData = {amount: parseInt(amount * 100),
                           oid: parseInt(oid),
                           token};
          const data = await CheckoutModule.stripeChargeAndUpdate(reqData);
          if (checkoutFrom == 'checkout') {
            dispatch({
                actionType: AppConstants.CHECKOUT_GO_TO_HISTORY, data
            });
          }
      }catch (e){
      }
    },

    afterPayGoToHistory() {
      try{
          const data = {
            ev_error: 0
          };
          dispatch({
              actionType: AppConstants.CHECKOUT_GO_TO_HISTORY, data
          })
      }catch (e){
        console.log(e)
      }
    },

		async _payByApple({subtotal,shipping,tax,tips,amount, discount},callback){

			let paymentData = {
				subtotal: subtotal.toString(),
        shipping: shipping.toString(),
				tax: tax.toString(),
        tips: tips.toString(),
        total: amount.toString(),
        discount: discount.toString()
			}
      //Apple Pay cancelled
      NativeModules.cmApplePay.cancelcallback(callback);
      let token = await NativeModules.cmApplePay.createPayment(paymentData);
      return token;
    },
    async _repayByApple({tips,total},callback){
      let paymentData = {
				total: total.toString(),
				tips: tips.toString(),
      }

      NativeModules.cmApplePay.cancelcallback(callback);
      let token = await NativeModules.cmApplePay.reCreatePayment(paymentData);
      return token;
    },
    async recheckoutByApplepay({subtotal, shipping, tax, amount, oid, tips, discount},callback){
      let token = await this._payByApple({subtotal, shipping, tax, amount, oid, tips, discount},()=>callback());
      if(token){
        let payResult = await CheckoutModule.oneTimeCharge({
          amount:total,
          token:token,
          oid:oid,
          tips:tips,
        })

        NativeModules.cmApplePay.complete(payResult,()=>{
          console.log("Payment Finished.");
        });
      }
    },
    async checkoutByApplepay({subtotal, shipping, tax, amount, oid, tips, discount},callback){
      let token = await this._payByApple({subtotal, shipping, tax, tips, oid, amount, discount},()=>callback());
      if(token){
        let payResult = await CheckoutModule.oneTimeCharge({
          amount:amount,
          token:token,
          oid:oid,
          tips:tips,
        });

        NativeModules.cmApplePay.complete(payResult,()=>{
          // cmApplePay complete
        });
      }

    },
    // async checkout(comment, payment_channel, tips){
    // async checkout(comment, payment_channel, tips, visa_fee){
    //   try{
    //     const token = await AuthModule.getToken();
    //     // const reqData = {token,comment, payment_channel, tips};
    //     if(payment_channel == 1) {
    //       if(comment) {
    //         comment = '刷卡|' + comment;
    //       }
    //       else{
    //         comment = "刷卡|";
    //       }
    //     }
    //     else if(payment_channel == 10) {
    //       if(comment) {
    //         comment = '支付宝|' + comment;
    //       }
    //       else{
    //         comment = "支付宝|";
    //       }
    //     }
    //     else if(payment_channel == 30) {
    //
    //       if(comment) {
    //         comment = 'ApplePay|' + comment;
    //       }
    //       else{
    //         comment = "ApplePay|";
    //       }
    //
    //     }
    //     const reqData = {token,comment, payment_channel, tips, visa_fee};
    //     let data = await RestaurantModule.checkout(reqData);
    //     data.payment_channel = payment_channel;
    //     dispatch({
    //         actionType: AppConstants.CHECKOUT, data,
    //     })
    //   }catch (e){
    //   }
    // },
    updateAdderss(){
      dispatch({
          actionType: AppConstants.UPDATE_ADDRESS
      })
    },
    updateShouldAddAddress(flag) {
      try{
        const data = {shouldAddAddress: flag}
        dispatch({
            actionType: AppConstants.SHOULD_ADD_ADDRESS, data,
        })
      }catch (e){
      }
    },
    updatePaymentStatus(payment_channel){
      const data = {payment_channel: payment_channel}
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
    async checkCouponCode(coupon) {
      try{
        const token = await AuthModule.getToken();
        const reqData = {coupon: coupon, token};
        const data = await CheckoutModule.checkCouponCode(reqData);
        dispatch({
             actionType: AppConstants.CHECK_COUPON_CODE,data
         })
      }catch(error){
        console.log(error)
        throw 'no cardToken'
      }
    },

}
