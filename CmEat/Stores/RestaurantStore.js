import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import {EventEmitter} from 'events';
import RestaurantAction from '../Actions/RestaurantAction';
import TabsAction from '../Actions/TabsAction';
import TabsStore from './TabsStore';
const CHANGE_EVENT = 'change';
import {
  cme_getRestaurantData,
  cme_getSelectedAddress,
  cme_updateDltype,
  cme_updateCheckoutDltype,
  cme_GetRestaurantWithRid,
} from '../../App/Modules/Database';
const ERRROR_TITLE = AppConstants.ERRROR_TITLE;
let restaurantData;
let menuData;
let loaded = false;
let checkoutState;
let restaurantState;

const initState = ()=>{
	restaurantState = {
			open:[],
			close:[],
			isRefreshing:false,
	}
	checkoutState = {
		checkoutSuccessful:false,
		addressList:[],
    dltype:1,
    pretax:0,
    code:'',
    dltypeList:[
      {dltype:-1,
       description:'请先选择地址信息'
      }],
		showBanner:true,
	}
}
initState();

const RestaurantStore = Object.assign({},EventEmitter.prototype,{
	emitChange(){
			this.emit( CHANGE_EVENT)
	},
	addChangeListener(callback){
			this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener(callback){
			this.removeListener(CHANGE_EVENT, callback)
	},
	getRestaurantSuccess(data){
		restaurantData = Object.assign({},data,{isRefreshing: false})
	},
  getRestaurantData(area){
		cme_getRestaurantData(area)
    // return restaurantData
  },
	getRestaurantWithRid(rid){
		rid = Number(rid);
		const restaurantData = cme_GetRestaurantWithRid(rid);
		return restaurantData
	},
	getMenu (){
		loaded = false;
		return menuData
	},
	removeMenu(){
		menuData = null;
	},
	getLoadState(){
		return loaded
	},
	beforCheckout(data){
		const pretax = data.result.pretax;
		const pretax_ori = data.result.pretax_ori;
		const promoted = data.result.promoted;
		const total = data.result.total;

		const isLoading = false;
		const selectedAddress = cme_getSelectedAddress();
		if(selectedAddress){
			const dltype = "1";
			const rid = data.rid;
			const uaid = selectedAddress.uaid;

			cme_updateCheckoutDltype({dltype,uaid})
			RestaurantAction.calculateDeliveryFee()
		}else{
			data.navigator.push({
        id: 'AddressList',
      });
		}
		checkoutState = Object.assign({},checkoutState,
																		{pretax,
																			pretax_ori,
																			promoted,
																			total,
																			isLoading,
																			selectedAddress
																		 }
																		);

	},
	updateAddress(){
		const selectedAddress = cme_getSelectedAddress();
		checkoutState = Object.assign(checkoutState,{selectedAddress});
	},
	updateDltype(data){
		const dltype = data.type;
		cme_updateDltype(dltype);
		RestaurantAction.calculateDeliveryFee()
	},
	calculateDeliveryFee(data){
		const dlexp = data.dlexp;
		const dltype = data.dltype;
		const message = data.message;
		const pretax = data.pretax;
		const pretax_ori = data.pretax_ori;
		const result = data.result;
		const total = data.total;
		const startAmount = data.startAmount;
		// const loading = false;
		let dltypeList;
		if(pretax<startAmount){
				dltypeList=[
					{dltype:0,
					 description:'自取'
					}
				]
		}else if(dltype != 2){
				dltypeList=[
						{dltype:1,
						 description:'送餐'
						},
						{dltype:0,
						 description:'自取'
						}
					]
		}else if(dltype == 2){
					dltypeList=[
							{dltype:2,
							 description:'定制运费'
						 },
							{dltype:0,
							 description:'自取'
							}
					]
		}
		const selectedAddress = cme_getSelectedAddress();
		checkoutState = Object.assign({},checkoutState,
										{dlexp,dltype,message,pretax,pretax_ori,result,total,dltypeList,selectedAddress});
	},
	checkout(data){
		let checkoutSuccessful;
		if(data.result == 0){
			 checkoutSuccessful = true;
			//  TabsAction.goToHistory();
		}else{
			checkoutSuccessful = false;
		}
		checkoutState = Object.assign({},checkoutState,{checkoutSuccessful});

	},
	getDltype(){
		return checkoutState.dltype;
	},
	initCheckoutState(){
		checkoutState ={}
	},
	getRestaurantState(){
		return restaurantState;
	},
	getCheckoutSate(){
		const selectedAddress = cme_getSelectedAddress();
		 checkoutState = Object.assign({},checkoutState,{selectedAddress});;
		return checkoutState;
	},
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				case AppConstants.GET_RESTAURANT_SUCCESS:
						   RestaurantStore.getRestaurantSuccess(action.data);
							 RestaurantStore.emitChange();
					break;
				case AppConstants.BEFORE_CHECKOUT:
					   		RestaurantStore.beforCheckout(action.data);
								RestaurantStore.emitChange();
					break;
				case AppConstants.CALCULATE_DELIVERY_FEE:
								RestaurantStore.calculateDeliveryFee(action.data);
								RestaurantStore.emitChange();
				break;
				case AppConstants.UPDATE_ADDRESS:
								RestaurantStore.updateAddress();
								RestaurantStore.emitChange();
				break;
				case AppConstants.UPDATE_DLTYPE:
								RestaurantStore.updateDltype(action.data);
				break;
				case AppConstants.CHECKOUT:
								RestaurantStore.checkout(action.data);
								setTimeout( () => {
									RestaurantStore.emitChange();
								}, 200);
								setTimeout(()=>{
									initState()
								},10000)
				break;


		  }

	})

});
module.exports = RestaurantStore;