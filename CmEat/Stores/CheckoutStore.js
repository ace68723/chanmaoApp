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
        tips: 0
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
      this.state = {
        checkoutSuccessful:false,
    		addressList:[],
        dltype:1,
        pretax:0,
        payment_channel: 0,
        available_payment_channels: [{channel: 0, visa_fee: 0}],
        code:'',
        dltypeList:[
          {dltype:-1,
           description:'请先选择地址信息'
          }],
    		showBanner:true,
        shouldAddAddress:false,
        visa_fee: 0,
        goToHistory: false,
        paymentFail: false,
        jumpToChoosePayment: false,
        tips: 0
      }
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
  		const dltype = data.type;
  		cme_updateDltype(dltype);
  		CheckoutAction.calculateDeliveryFee()
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
		let checkoutSuccessful;
    let oidFromUrl;
		if(data.result == 0){
			 checkoutSuccessful = true;
       oidFromUrl = data.oid;
       MenuStore.initMenu();
		}else{
			checkoutSuccessful = false;
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
  updatePaymentStatus(data){
    if (data.payment_channel == 0) {
      this.state.payment_channel = 0;
    }
    else if (data.payment_channel == 1) {
      this.state.payment_channel = 1;
    }
    else if (data.payment_channel == 10) {
      this.state.payment_channel = 10;
    }
    else if (data.payment_channel == 30) {
      this.state.payment_channel = 30;
    }
    for (let _channel of this.state.available_payment_channels) {
      if (_channel.channel == data.payment_channel) {
        this.state.visa_fee = _channel.visa_fee;
      }
    }
  },
  updateCardStatus(data){
    if (data.length > 0) {
      this.state.cardStatus = true;
    }
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
                break;
        case AppConstants.BEFORE_CHECKOUT:
                RestaurantStore.beforCheckout(action.data);
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
        default:
                break;

		  }

	})

});
module.exports = RestaurantStore;
