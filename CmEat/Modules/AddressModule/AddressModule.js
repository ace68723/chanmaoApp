'use strict';
const  AddressApi         = require( './AddressApi');
import {
  cme_getSelectedAddress,
  cme_saveAddress,
  cme_addAddress,
  cme_updateSelectedAddress,
  cme_updateCartUaid,
  cme_deletAddress,
  selectAddress,
} from '../../../App/Modules/Database';
const AddressModule = {
  getAddress(token){
      return new Promise((resolve, reject) => {
        AddressApi.getAddress(token)
          .then(data =>{
            if(data.result == 0){
							const ea_address = data.address;
              console.log(ea_address)
              cme_saveAddress(ea_address);
              resolve(ea_address);
            }else{
              reject(data)
            }
          })
          .catch(error =>{
            console.log(error)
            reject(error)
          })
      })
  },
  searchAddress(input){
    return new Promise((resolve, reject) => {
      AddressApi.searchAddress(input)
        .then(autocompleteData =>{
          resolve(autocompleteData)
        })
        .catch(error =>{
          reject()
        })
    })
  },
	submitAddress(userInfo){
		return new Promise((resolve, reject) => {
		  const addr 		= userInfo.formattedAddress.address;
			const lat  		= userInfo.formattedAddress.latitude;
			const lng 		= userInfo.formattedAddress.longitude;
			const city 		= userInfo.formattedAddress.city;
			const postal 	= userInfo.formattedAddress.postalCode;
			const name 		= userInfo.name;
			const tel 		= userInfo.phoneNumber;
			const apt_no 	= userInfo.apartmentNumber;
			const buzz 		= userInfo.buzzCode;
      const type    = userInfo.type;
			const eo_userInfo = {addr,lat,lng,city,postal,name,tel,apt_no,buzz,type};
			AddressApi.submitAddress(eo_userInfo,userInfo.token)
				.then(res =>{
					if(res.result == 0){
            let address = res.addr;
              cme_addAddress(address);
						resolve(res);
					}else{
						reject(res);
					}

				})
				.catch(error =>{
          console.log(error)
					reject(error)
				})
		})
	},
	async deleteAddress(token,address){

    const uaid = address.uaid;
	  const res = await AddressApi.deleteAddress(token,uaid);
    cme_deletAddress(address);

		return res
	},
  selectAddress(address){
    cme_updateSelectedAddress(address);
  }

}

module.exports = AddressModule;
