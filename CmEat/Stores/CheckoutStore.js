import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import {EventEmitter} from 'events';
import CheckoutAction from '../Actions/CheckoutAction';
import MenuStore from './MenuStore';
const CHANGE_EVENT = 'change';
import {
  cme_getRestaurantData,
  cme_getSelectedAddress,
  cme_updateDltype,
  cme_updateCheckoutDltype,
} from '../../App/Modules/Database';


const RestaurantStore = Object.assign({},EventEmitter.prototype,{
  state:{
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
    shouldAddAddress:false,
    payment_channel: 0,
    visa_fee: 0,
    goToHistory: false,
    paymentFail: false,
    jumpToChoosePayment: false
  },
  initState(){
    this.state = {
        checkoutSuccessful:false,
    		addressList:[],
        dltype:1,
        pretax:0,
        available_payment_channels: [{channel: 0, visa_fee: 0}],
        code:'',
        dltypeList:[
          {dltype:-1,
           description:'请先选择地址信息'
          }],
    		showBanner:true,
        shouldAddAddress:false,
        payment_channel: 0,
        visa_fee: 0,
        goToHistory: false,
        paymentFail: false,
        jumpToChoosePayment: false,
        selectedCase: {fees: {},
                       payment_channel: 0,
                       dltype: 1},
        pendingCoupon: null,
        currentCoupon: null,
      };
  },
	emitChange(){
			this.emit( CHANGE_EVENT)
	},
	addChangeListener(callback){
			this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener(callback){
			this.removeListener(CHANGE_EVENT, callback)
      // this.state = {
      //   checkoutSuccessful:false,
    	// 	addressList:[],
      //   dltype:1,
      //   pretax:0,
      //   payment_channel: 0,
      //   available_payment_channels: [{channel: 0, visa_fee: 0}],
      //   code:'',
      //   dltypeList:[
      //     {dltype:-1,
      //      description:'请先选择地址信息'
      //     }],
    	// 	showBanner:true,
      //   shouldAddAddress:false,
      //   visa_fee: 0,
      //   goToHistory: false,
      //   paymentFail: false,
      //   jumpToChoosePayment: false,
      // }
      this.initState();
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
  		this.state = Object.assign({},this.state,
  										{dlexp,dltype,message,pretax,pretax_ori,result,total,dltypeList,selectedAddress});
  	},
  updateDltype(data){
  		// const dltype = data.type;
      this.state.dltype = data.type;
      this.state.payment_channel = 0;
  		// cme_updateDltype(dltype);
  		// CheckoutAction.calculateDeliveryFee()
      this._updateSelectedCase();
  },
  updatePaymentStatus(data){
    // if (data.payment_channel == 0) {
    //   this.state.payment_channel = data.payment_channel;
    // }
    // else if (data.payment_channel == 1) {
    //   this.state.payment_channel = 1;
    // }
    // else if (data.payment_channel == 10) {
    //   this.state.payment_channel = 10;
    // }
    // else if (data.payment_channel == 30) {
    //   this.state.payment_channel = 30;
    // }
    this.state.payment_channel = data.payment_channel;
    this._updateSelectedCase();
    // for (let _channel of this.state.available_payment_channels) {
    //   if (_channel.channel == data.payment_channel) {
    //     this.state.visa_fee = _channel.visa_fee;
    //   }
    // }
  },
  _updateSelectedCase() {
      for (let _case of this.state.cases) {
        if (_case.dltype == this.state.dltype && _case.payment_channel == this.state.payment_channel) {
          this.state.selectedCase = _case;
        }
      }
  },
  beforeCheckoutInit(data) {
      // data.result =
      // {
      //     "ev_error": 0,
      //     "ev_message": "",
      //     "ticket_id": "19994:5:1:1538664707:sy",
      //     "updated_at": 1538664707,
      //     "cases": {
      //         "case_0_0": {
      //             "fees": {
      //                 "ori_pretax": 57.96,
      //                 "dlexp": 14,
      //                 "tax_rate": 0.13,
      //                 "service_fee_rate": 0.1,
      //                 "payment_channel_fee": 0,
      //                 "pretax_percent_left": 1,
      //                 "instant_off": 10,
      //                 "ori_tax": 9.35,
      //                 "ori_service_fee": 8.13,
      //                 "ori_total": 89.45,
      //                 "pretax": 57.96,
      //                 "tax": 9.35,
      //                 "service_fee": 8.13,
      //                 "total": 89.45,
      //                 "charge_total": 79.45,
      //                 "total_off": 10
      //             },
      //             "active_discounts": [
      //                 {
      //                     "rule_id": 1,
      //                     "name": "满50减10"
      //                 }
      //             ],
      //             "coupon_valid": false,
      //             "dltype": 0,
      //             "payment_channel": 0,
      //             "custom_dlexp": false,
      //             "proceedable": true,
      //             "sign": "U6rOyszODIq56ZHgWggH91Jaw4f1bH8d"
      //         },
      //         "case_1_0": {
      //             "fees": {
      //                 "ori_pretax": 57.96,
      //                 "dlexp": 14,
      //                 "tax_rate": 0.13,
      //                 "service_fee_rate": 0.1,
      //                 "payment_channel_fee": 0,
      //                 "pretax_percent_left": 1,
      //                 "instant_off": 10,
      //                 "ori_tax": 9.35,
      //                 "ori_service_fee": 8.13,
      //                 "ori_total": 89.45,
      //                 "pretax": 57.96,
      //                 "tax": 9.35,
      //                 "service_fee": 8.13,
      //                 "total": 89.45,
      //                 "charge_total": 79.45,
      //                 "total_off": 10
      //             },
      //             "active_discounts": [
      //                 {
      //                     "rule_id": 1,
      //                     "name": "满50减10"
      //                 }
      //             ],
      //             "coupon_valid": false,
      //             "dltype": 1,
      //             "payment_channel": 0,
      //             "custom_dlexp": false,
      //             "proceedable": true,
      //             "sign": "0yfNc529R7xWv61jYQovFKrIp7RCvKkG"
      //         },
      //         "case_1_1": {
      //             "fees": {
      //                 "ori_pretax": 57.96,
      //                 "dlexp": 14,
      //                 "tax_rate": 0.13,
      //                 "service_fee_rate": 0.1,
      //                 "payment_channel_fee": 1.5,
      //                 "pretax_percent_left": 1,
      //                 "instant_off": 10,
      //                 "ori_tax": 9.35,
      //                 "ori_service_fee": 9.63,
      //                 "ori_total": 90.95,
      //                 "pretax": 57.96,
      //                 "tax": 9.35,
      //                 "service_fee": 9.63,
      //                 "total": 90.95,
      //                 "charge_total": 80.95,
      //                 "total_off": 10
      //             },
      //             "active_discounts": [
      //                 {
      //                     "rule_id": 1,
      //                     "name": "满50减10"
      //                 }
      //             ],
      //             "coupon_valid": false,
      //             "dltype": 1,
      //             "payment_channel": 1,
      //             "custom_dlexp": false,
      //             "proceedable": true,
      //             "sign": "6fyQJCu6g5xzDeasDiZkYqlyG6QjoaD4"
      //         },
      //         "case_1_10": {
      //             "fees": {
      //                 "ori_pretax": 57.96,
      //                 "dlexp": 14,
      //                 "tax_rate": 0.13,
      //                 "service_fee_rate": 0.1,
      //                 "payment_channel_fee": 1.5,
      //                 "pretax_percent_left": 1,
      //                 "instant_off": 10,
      //                 "ori_tax": 9.35,
      //                 "ori_service_fee": 9.63,
      //                 "ori_total": 90.95,
      //                 "pretax": 57.96,
      //                 "tax": 9.35,
      //                 "service_fee": 9.63,
      //                 "total": 90.95,
      //                 "charge_total": 80.95,
      //                 "total_off": 10
      //             },
      //             "active_discounts": [
      //                 {
      //                     "rule_id": 1,
      //                     "name": "满50减10"
      //                 }
      //             ],
      //             "coupon_valid": false,
      //             "dltype": 1,
      //             "payment_channel": 10,
      //             "custom_dlexp": false,
      //             "proceedable": true,
      //             "sign": "nQXZUAcBif8CHr0a9pqROMLt0aPK4gDd"
      //         },
      //         "case_1_30": {
      //             "fees": {
      //                 "ori_pretax": 57.96,
      //                 "dlexp": 14,
      //                 "tax_rate": 0.13,
      //                 "service_fee_rate": 0.1,
      //                 "payment_channel_fee": 1.5,
      //                 "pretax_percent_left": 1,
      //                 "instant_off": 10,
      //                 "ori_tax": 9.35,
      //                 "ori_service_fee": 9.63,
      //                 "ori_total": 90.95,
      //                 "pretax": 57.96,
      //                 "tax": 9.35,
      //                 "service_fee": 9.63,
      //                 "total": 90.95,
      //                 "charge_total": 80.95,
      //                 "total_off": 10
      //             },
      //             "active_discounts": [
      //                 {
      //                     "rule_id": 1,
      //                     "name": "满50减10"
      //                 }
      //             ],
      //             "coupon_valid": false,
      //             "dltype": 1,
      //             "payment_channel": 30,
      //             "custom_dlexp": false,
      //             "proceedable": true,
      //             "sign": "yDDJn8jNuyKABJz27x2I9mJpZii8WDHK"
      //         },
      //         "case_1_40": {
      //             "fees": {
      //                 "ori_pretax": 57.96,
      //                 "dlexp": 14,
      //                 "tax_rate": 0.13,
      //                 "service_fee_rate": 0.1,
      //                 "payment_channel_fee": 1.5,
      //                 "pretax_percent_left": 1,
      //                 "instant_off": 10,
      //                 "ori_tax": 9.35,
      //                 "ori_service_fee": 9.63,
      //                 "ori_total": 90.95,
      //                 "pretax": 57.96,
      //                 "tax": 9.35,
      //                 "service_fee": 9.63,
      //                 "total": 90.95,
      //                 "charge_total": 80.95,
      //                 "total_off": 10
      //             },
      //             "active_discounts": [
      //                 {
      //                     "rule_id": 1,
      //                     "name": "满50减10"
      //                 }
      //             ],
      //             "coupon_valid": false,
      //             "dltype": 1,
      //             "payment_channel": 40,
      //             "custom_dlexp": false,
      //             "proceedable": true,
      //             "sign": "2MYIZJddwZBcqHIRf6VnTk5yChLAsSts"
      //         }
      //     },
      //     "items": [
      //         {
      //             "qty": null,
      //             "cid": 1,
      //             "id": 8817,
      //             "ds_name": "豆角茄条(辣)",
      //             "int_no": "700",
      //             "price": "12.99",
      //             "tpgs": null,
      //             "amount": 3,
      //             "ds_id": 8817
      //         },
      //         {
      //             "qty": null,
      //             "cid": 2,
      //             "id": 8752,
      //             "ds_name": "香辣鸡脆骨(辣)",
      //             "int_no": "533",
      //             "price": "16.99",
      //             "tpgs": null,
      //             "amount": 1,
      //             "ds_id": 8752
      //         },
      //         {
      //             "qty": null,
      //             "cid": 3,
      //             "id": 8697,
      //             "ds_name": "米饭",
      //             "int_no": "800",
      //             "price": "2.00",
      //             "tpgs": null,
      //             "amount": 1,
      //             "ds_id": 8697
      //         }
      //     ],
      //     "uaid": 104774,
      //     "comment": "",
      //     "coupon_code": "",
      //     "has_soldout": false,
      //     "user_message": "",
      //     "last_payment": {
      //         "payment_channel": 0,
      //         "stripe_last4": "xxxx",
      //         "stripe_brand": "TODO",
      //         "unionpay_last4": "TODO"
      //     },
      //     "channel": 1,
      //     "version": "2.8.3"
      // // };
      // this.state.items = data.result.items;
      if (data.selectedAddress) {
        this.state.selectedAddress = data.selectedAddress;
      }
      this.state.cases = Object.values(data.result.cases);
      this.state.ticket_id = data.result.ticket_id;
      this.state.last_payment = data.result.last_payment;
      this.state.payment_channel = data.result.last_payment.payment_channel;this.state.payment_channel = data.result.last_payment.payment_channel;
      this.state.pendingCoupon = null;
      this.state.loading = false;
      this._updateSelectedCase();
  },
  beforCheckout(data){
  		const pretax = parseFloat(data.result.pretax);
  		const pretax_ori = parseFloat(data.result.pretax_ori);
  		const promoted = data.result.promoted;
  		const total = parseFloat(data.result.total);
      const available_payment_channels = data.result.available_payment_channels;
      const last_payment_channel = data.result.last_payment_channel;
      let jumpToChoosePayment = false;
      if(last_payment_channel == 0) {
        jumpToChoosePayment = true;
      }
      let payment_channel;
      let visa_fee = 0;
      if (last_payment_channel != 0) {
        payment_channel = last_payment_channel;
      }
      else{
        payment_channel = this.state.payment_channel;
      }
      for (let _channel of available_payment_channels) {
        if (_channel.channel == payment_channel) {
          visa_fee = _channel.visa_fee;
        }
      }
      let cusid = data.result.cusid;
      let last4 = data.result.last4;
      let brand = data.result.brand;

  		const loading = false;
  		const selectedAddress = cme_getSelectedAddress();
  		if(selectedAddress){
  			const dltype = "1";
  			const rid = data.rid;
  			const uaid = selectedAddress.uaid;
  			cme_updateCheckoutDltype({dltype,uaid})
  			CheckoutAction.calculateDeliveryFee()
  		}else{
        this.state.shouldAddAddress = true;
      }
  		this.state = Object.assign({},this.state,
  																		{pretax,
  																			pretax_ori,
  																			promoted,
  																			total,
  																			loading,
                                        selectedAddress,
                                        available_payment_channels,
                                        cusid,
                                        last4,
                                        brand,
                                        jumpToChoosePayment,
                                        payment_channel,
                                        visa_fee
  																		 });
	},
	updateAddress(){
		const selectedAddress = cme_getSelectedAddress();
		this.state = Object.assign(this.state,{selectedAddress});
	},
	checkout(data){
		let checkoutSuccessful = false;
    let oidFromUrl;
		if(data.result == 0){
			 checkoutSuccessful = true;
       oidFromUrl = data.oidFromUrl;
       MenuStore.initMenu();
		}
		this.state = Object.assign({},this.state,{checkoutSuccessful, oidFromUrl});

  },
  updateGoToHistory(data){
    if (data.ev_error == 0) {
      this.state = Object.assign({},this.state,{goToHistory: true, paymentFail: false});
    } else {
      this.state = Object.assign({},this.state,{goToHistory: true, paymentFail: true});
    }
    setTimeout(() => {
      this.state = Object.assign({},this.state,{goToHistory: false, paymentFail: false});
    }, 2000);
  },
  updateShouldAddAddress(data){
    this.state.shouldAddAddress = data.shouldAddAddress;
  },
  updateCardStatus(data){
    if (data.length > 0) {
      this.state.cardStatus = true;
    }
  },
  updatePendingCoupon(data){
    this.state = Object.assign({}, this.state, {pendingCoupon: data});
  },
	getDltype(){
		return this.state.dltype;
	},
	initCheckoutState(){
		this.state ={}
	},
  getState(){
    return this.state
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
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
                RestaurantStore.emitChange();
                break;
        case AppConstants.BEFORE_CHECKOUT_INIT:
                RestaurantStore.beforeCheckoutInit(action.data);
                RestaurantStore.emitChange();
                break;
				case AppConstants.CHECKOUT:
								RestaurantStore.checkout(action.data);
								RestaurantStore.emitChange();
								setTimeout(()=>{
									RestaurantStore.initState()
								},10000)
                break;
        case AppConstants.CHECKOUT_GO_TO_HISTORY:
                RestaurantStore.updateGoToHistory(action.data);
                RestaurantStore.emitChange();
                break;
        case AppConstants.SHOULD_ADD_ADDRESS:
                RestaurantStore.updateShouldAddAddress(action.data);
                RestaurantStore.emitChange();
                break;
        case AppConstants.UPDATE_PAYMENT_STATUS:
                RestaurantStore.updatePaymentStatus(action.data);
                RestaurantStore.emitChange();
                break;
        case AppConstants.ADD_CARD:
                RestaurantStore.updateCardStatus(action.data);
                RestaurantStore.emitChange();
                break;
        case AppConstants.CHECK_COUPON_CODE:
                RestaurantStore.updatePendingCoupon(action.data);
                RestaurantStore.emitChange();
                break;

        default:
                break;

		  }

	})

});
module.exports = RestaurantStore;
