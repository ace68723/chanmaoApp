import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import _forEach from 'lodash/forEach'
import AddressModule from '../Modules/AddressModule/AddressModule';
import AuthModule from '../../App/Modules/AuthModule/Auth';
import RestaurantAction from './RestaurantAction';
export default {
    async getAddress(){
      try{
        const token = await AuthModule.getToken();
        const addressList = await AddressModule.getAddress(token);
        dispatch({
            actionType: AppConstants.GET_ADDRESSES, addressList
        })
      }catch(error){
        console.log(error)
      }
    },
    formatAddress(placeId){
        const url = "https://maps.googleapis.com/maps/api/place/details/" +
        "json?placeid="+ placeId +
        "&key="+AppConstants.GOOGLE_API_KEY
        let options = {
            method: 'GET',
            mode:'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        fetch(url,options)
          .then((res) => res.json())
          .then((res)=>{
            if(res.status == "OK"){
              const placeDetails = res.result;

              let addrInfo = {};
              addrInfo.latitude 	= placeDetails.geometry.location.lat;
							addrInfo.longitude 	= placeDetails.geometry.location.lng;
              _forEach(placeDetails.address_components, function(component, key) {
                  _forEach(component.types, function(type, key) {
                    switch(type) {
                      case "postal_code":
                        addrInfo.postalCode = component.long_name;
                        break;
                      case "locality":
                        addrInfo.city = component.long_name;
                        break;
                      case "sublocality":
                        addrInfo.city = component.long_name;
                        break;
                      case "neighborhood":
                        addrInfo.city = component.long_name;
                      break;
                    }
                  });
              });
              if(!addrInfo.city){
                addrInfo.city = 'GTA';
              }
              addrInfo.address = placeDetails.formatted_address
              dispatch({
                  actionType: AppConstants.FORMAT_ADDRESS, addrInfo
              })
            }else{
              throw 'error'
            }
          })
          .catch((error) => {throw error})
    },
    async submitAddress(userInfo){
      try {
        const token = await AuthModule.getToken();
        userInfo.token = token;
        const res = await AddressModule.submitAddress(userInfo)
        const selectedUaid = res.addr.uaid;
        dispatch({
            actionType: AppConstants.SUBMIT_ADDRESS, selectedUaid
        })
      } catch (e) {
        console.log(e)
      }
    },
    async deleteAddress(address){
      const token = await AuthModule.getToken();
      const result = await AddressModule.deleteAddress(token,address);
      dispatch({
          actionType: AppConstants.UPDATA_ADDRESSLIST
      })
    },
    selectAddress(address){
      AddressModule.selectAddress(address);
      dispatch({
          actionType: AppConstants.UPDATA_ADDRESSLIST
      })
    },
    updateSelectedUaid(uaid) {
      const data = {uaid: uaid}
      dispatch({
          actionType: AppConstants.UPDATA_SELECTED_UAID, data
      })
    },
}
