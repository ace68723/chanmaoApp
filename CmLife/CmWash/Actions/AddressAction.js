import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import AddressModule from '../Modules/AddressModule/AddressModule'
export default {
    async checkCanDeliver(addrInfo){
         try{
           const data = await AddressModule.checkCanDeliver(addrInfo.lat,addrInfo.lng);
           const io_data = {
             geolocation: data,
             addrInfo: addrInfo,
           }
           // console.log(io_data);
           dispatch({
               actionType: AppConstants.CHECK_CAN_DELIVER, io_data
           })
         }catch(error){
           console.log(error);
         }
       },
    updateSelectedAddress(selectedAddress){
      // const selectedAddress = Object.assign({}, io_address);
      const data = Object.assign({},{selectedAddress:selectedAddress})
      dispatch({
          actionType: AppConstants.UPDATE_SELECTED_ADDRESS, data
      })
    },
    updatedTextInput(text) {
      const data = {
        textInput: text
      }
      dispatch({
        actionType: AppConstants.UPDATE_TEXTINPUT, data
      })
    },
    showAddressAlert(msg) {
      const data = {
        message: msg
      }
      dispatch({
        actionType: AppConstants.NOT_IN_RANGE, data
      })
    }
}
