import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import AddressModule from '../Modules/AddressModule/AddressModule'
export default {
    async getCondoList(lastid){
        try{
          const io_data = {
            lastid:lastid
          }
          const data = await AddressModule.getCondoList(io_data);
          dispatch({
              actionType: SboxConstants.GET_CONDO_LIST, data
          })
        }catch(error){
          console.log(error)
        }
      },
    async getCondoFuzzy(keyword){
        try{
          const io_data = {
            keyword: keyword
          }
          const data = await AddressModule.getCondoFuzzy(io_data);
          dispatch({
              actionType: SboxConstants.GET_CONDO_FUZZY, data
          })
        }catch(error){
          console.log(error);
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
    },
    showAddressAlert(msg) {
      const data = {
        message: msg
      }
      dispatch({
        actionType: SboxConstants.NOT_IN_RANGE, data
      })
    }
}
