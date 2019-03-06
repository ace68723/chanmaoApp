import AppConstants from '../Constants/AppConstants';
import {
  dispatch,
  register
} from '../Dispatchers/AppDispatcher';
import _forEach from 'lodash/forEach'
import AddressModule from '../Modules/AddressModule/AddressModule';
import AuthModule from '../../App/Modules/AuthModule/Auth';
import RestaurantAction from './RestaurantAction';
export default {
  async getAddress() {
    try {
      const token = await AuthModule.getToken();
      const addressList = await AddressModule.getAddress(token);
      dispatch({
        actionType: AppConstants.GET_ADDRESSES,
        addressList
      })
    } catch (error) {
      console.log(error)
    }
  },
  async getPlaceIdFromAddress(address) {
    try {
      const url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/" +
        "json?input=" + address + "&inputtype=textquery" +
        "&key=" + AppConstants.GOOGLE_API_KEY
      return fetch(url)
        .then((res) => res.json())
        .then((res) => {
          if (res.status == 'OK' && res.candidates.length > 0) {
            return res.candidates[0].place_id
          }
        })
        .catch((error) => {
          throw error
        })
    } catch (error) {
      console.log(error);
    }
  },

  async formatAddress(description) {
    try {
      const placeId = await this.getPlaceIdFromAddress(description);
      const url = "https://maps.googleapis.com/maps/api/place/details/" +
        "json?placeid=" + placeId +
        "&key=" + AppConstants.GOOGLE_API_KEY
      let options = {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          if (res.status == "OK") {
            const placeDetails = res.result;

            let addrInfo = {};
            addrInfo.latitude = placeDetails.geometry.location.lat;
            addrInfo.longitude = placeDetails.geometry.location.lng;
            _forEach(placeDetails.address_components, function(component, key) {
              _forEach(component.types, function(type, key) {
                switch (type) {
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
            if (!addrInfo.city) {
              addrInfo.city = 'GTA';
            }
            if (placeDetails.formatted_address.split(',')[0] != description.split(',')[0]) {
              addrInfo.address = description;
            } else {
              addrInfo.address = placeDetails.formatted_address;
            }
            dispatch({
              actionType: AppConstants.FORMAT_ADDRESS,
              addrInfo
            })
          } else {
            throw 'error'
          }
        })
        .catch((error) => {
          throw error
        })
    } catch (error) {
      console.log(error);
    }
  },
  async submitAddress(userInfo) {
    try {
      const token = await AuthModule.getToken();
      userInfo.token = token;
      const res = await AddressModule.submitAddress(userInfo)
      const selectedUaid = res.addr.uaid;
      dispatch({
        actionType: AppConstants.SUBMIT_ADDRESS,
        selectedUaid
      })
    } catch (e) {
      console.log(e)
    }
  },
  async deleteAddress(address) {
    const token = await AuthModule.getToken();
    const result = await AddressModule.deleteAddress(token, address);
    dispatch({
      actionType: AppConstants.UPDATA_ADDRESSLIST
    })
  },
  selectAddress(address) {
    AddressModule.selectAddress(address);
    dispatch({
      actionType: AppConstants.UPDATA_ADDRESSLIST
    })
  },
  updateSelectedUaid(uaid) {
    const data = {
      uaid: uaid
    }
    dispatch({
      actionType: AppConstants.UPDATA_SELECTED_UAID,
      data
    })
  },
  updateAddressStatus(status) {
    const data = {
      status: status
    }
    dispatch({
      actionType: AppConstants.UPDATA_ADDRESS_STATUS,
      data
    })
  },
  updateCurrentLocation(location) {
    const data = {
      currentLocation: location
    }
    dispatch({
      actionType: AppConstants.UPDATA_CURRENT_LOCATION,
      data
    })
  },
  clearAddressInput() {
    dispatch({
      actionType: AppConstants.CLEAR_ADDRESS_INPUT
    })
  },
  dismissAddressPromptView() {
    dispatch({
      actionType: AppConstants.DISMISS_ADDRESS_PROMPT
    })
  },
  setCurrentEdittingAddress(address) {
    const data = {
      address: address
    }
    dispatch({
      actionType: AppConstants.SET_EDITTING_ADDRESS,
      data
    })
  },
  resetCurrentEdittingAddress() {
    dispatch({
      actionType: AppConstants.RESET_EDITTING_ADDRESS
    })
  },
}
