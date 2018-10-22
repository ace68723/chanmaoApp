import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import HistoryModule from '../Modules/HistoryModule/HistoryModule';
import AuthModule from '../../App/Modules/AuthModule/Auth';
export default {
    getHistorySuccess(data){
      dispatch({
          actionType: AppConstants.GET_HISTORY_SUCCESS, data
      })
    },
    async getOrderData(){
      try{
        const token = await AuthModule.getToken();
        const orderData = await HistoryModule.getOrderData(token);
        dispatch({
            actionType: AppConstants.GET_ORDERS, orderData
        })
      }catch (e){
        console.log(e);
      }
    },
    async getLast4(){
      try{
        const token = await AuthModule.getToken();
        const res = await HistoryModule.getLast4(token);
        if (res.ev_error == 0) {
          const data = {
            cusid: res.ev_cusid,
            last4: res.ev_last4,
            brand: res.ev_brand
          };
          dispatch({
              actionType: AppConstants.GET_LAST4, data
          });
        }
      }catch (e){
        console.log(e);
      }
    },
    async getVerifyCode(oid){
      try{
        const token = await AuthModule.getToken();
        const data = {oid,token};
        HistoryModule.getVerifyCode(data)
      }catch (e){
        console.log(e);
      }
    },
    async getHistoryDetail(oid){
      try{
        const token = await AuthModule.getToken();
        const io_data = {oid,token};
        const data = await HistoryModule.getHistoryDetail(io_data)
        dispatch({
            actionType: AppConstants.GET_HISTORY_DETAIL, data
        })
      }catch (e){
        console.log(e);
      }
    },
    async verifyPhone(code,oid){
      try{
        const token = await AuthModule.getToken();
        const io_data = {code,oid,token};
        const data = await HistoryModule.verifyPhone(io_data)
        dispatch({
            actionType: AppConstants.VERIFY_PHONE, data
        })
      }catch (e){
        console.log(e);
      }
    },
    async addReview(io_data){
      try{
        const token = await AuthModule.getToken();
        const lo_data = {io_data,token};
        const data = await HistoryModule.addReview(lo_data);
        dispatch({
            actionType: AppConstants.REVIEW_ADDED, data
        })
      }catch (e){
        console.log(e);
      }
    },

    async changePaymentToCash(io_data){
      try{
        const token = await AuthModule.getToken();
        const lo_data = {io_data,token};
        const data = await HistoryModule.changePaymentToCash(lo_data);
      }catch (e){
        console.log(e);
      }
    },

    async viewOrderCase({oid, dltype, payment_channel}) {
      try{
        const token = await AuthModule.getToken();
        const lo_data = {oid, dltype, payment_channel,token};
        const data = await HistoryModule.viewOrderCase(lo_data);
        if (data.ev_error == 0) {
          data.oid = oid;
          data.payment_channel = payment_channel;
          dispatch({
              actionType: AppConstants.SHOW_PRICE_DETAIL_FOR_REPAY, data
          })
        }
        // alert('123');
      }catch (e){
        console.log(e);
      }
    },

    async changeOrderCase({oid, dltype, payment_channel}) {
      try{
        const token = await AuthModule.getToken();
        const lo_data = {oid, dltype, payment_channel,token};
        const data = await HistoryModule.changeOrderCase(lo_data);
        if (data.ev_error == 0) {
          data.oid = oid;
          data.payment_channel = payment_channel;
          dispatch({
              actionType: AppConstants.CHANGE_ORDER_CASE, data
          })
        }
        // alert('123');
      }catch (e){
        console.log(e);
      }
    }


}
