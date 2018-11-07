import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';

import CheckoutModule from '../Modules/CheckoutModule/CheckoutModule';
import {NativeModules} from 'react-native';
export default {

    async beforeOrder(io_data) {
      try{
        const data = await CheckoutModule.beforeOrder(io_data);
        console.log(data);
        if (data.ev_error==0) data.goCheckout=1; else alert('error');
        dispatch({
             actionType: AppConstants.CHECKOUT_INFORMATION,data
         })
      }catch(error){
        console.log(error)
        throw error;
      }
    },
    async getCard() {
      try{
        const io_data={
          token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NDA3ODU5NDUsImV4cCI6MTU3MjMyMTk0NSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInVpZCI6IjEifQ.RIk_KgD_Oq31NkB6FSL0_PsRhmRWA3DwOLz2Fj4bjhI',
        }
        const data = await CheckoutModule.getCard(io_data);
        // console.log(data);
        dispatch({
             actionType: AppConstants.CARD_NUMBER,data
         })
      }catch(error){
        console.log(error)
        throw error;
      }
    },
    async getDeliveryTime(date,time,wash_time) {
      try{
        const io_data={
          date:date,
          wash_time:wash_time,
        }
        const data = await CheckoutModule.getDeliveryTime(io_data);
        data.selectedPickUpDate=date;
        data.selectedPickUpTime=time;
        // console.log(data);
        dispatch({
             actionType: AppConstants.DELIVERY_TIME,data
         })
      }catch(error){
        console.log(error)
        throw error;
      }
    },
    async placeOrder(io_data) {
      try{
        const data = await CheckoutModule.placeOrder(io_data);
        // console.log(data);
        dispatch({
             actionType: AppConstants.PLACE_INFO,data
         })
      }catch(error){
        console.log(error)
        throw error;
      }
    },
    selectDeliveryTime(date,time) {
      try{
        const io_data={
          selectedDeliveryDate:date,
          selectedDeliveryTime:time,
        }
        console.log(io_data);
        dispatch({
             actionType: AppConstants.SELECTED_DELIVERY_TIME,io_data
         })
      }catch(error){
        console.log(error)
        throw error;
      }
    },
}
