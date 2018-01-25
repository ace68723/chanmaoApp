import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import AddressModule from '../Modules/AddressModule/AddressModule'
export default {
    async checkCanDeliver(lat,lng){
        try{
          const data = await AddressModule.checkCanDeliver(lat,lng);
          dispatch({
              actionType: SboxConstants.CHECK_CAN_DELIVER, data
          })
        }catch(error){
          console.log(error)
        }
      },
    updateSelectedAddress(selectedAddress){
      // const selectedAddress = Object.assign({}, io_address);
      const data = Object.assign({},{selectedAddress:selectedAddress})
      dispatch({
          actionType: SboxConstants.UPDATE_SELECTED_ADDRESS, data
      })
    },
    updatedTextInput(text) {
      const data = {
        textInput: text
      }
      dispatch({
        actionType: SboxConstants.UPDATE_TEXTINPUT, data
      })
    }
}
