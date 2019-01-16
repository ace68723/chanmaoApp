import Constants from '../Constants/Constants';
import {dispatch, register} from '../Dispatchers/Dispatcher';
// import AddressModule from '../Modules/AddressModule/AddressModule'
export default {
    // async checkCanDeliver(addrInfo){
    //     try{
    //       const data = await AddressModule.checkCanDeliver(addrInfo.lat,addrInfo.lng);
    //       const io_data = {
    //         geolocation: data,
    //         addrInfo: addrInfo,
    //       }
    //       dispatch({
    //           actionType: Constants.CHECK_CAN_DELIVER, io_data
    //       })
    //     }catch(error){
    //       console.log(error);
    //     }
    //   },
    updateSelectedAddress(selectedAddress){
      // const selectedAddress = Object.assign({}, io_address);
      const data = Object.assign({},{selectedAddress:selectedAddress})
      dispatch({
          actionType: Constants.UPDATE_SELECTED_ADDRESS, data
      })
    },
    updatedTextInput(text) {
      const data = {
        textInput: text
      }
      dispatch({
        actionType: Constants.UPDATE_TEXTINPUT, data
      })
    },
    showAddressAlert(msg) {
      const data = {
        message: msg
      }
      dispatch({
        actionType: Constants.NOT_IN_RANGE, data
      })
    }
}
