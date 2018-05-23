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
  },
  initState(){
    this.state = {
        checkoutSuccessful:false,
    		addressList:[],
        dltype:1,
        pretax:0,
        available_payment_channels: [0],
        code:'',
        dltypeList:[
          {dltype:-1,
           description:'请先选择地址信息'
          }],
    		showBanner:true,
        shouldAddAddress:false,
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
        available_payment_channels: [0],
        code:'',
        dltypeList:[
          {dltype:-1,
           description:'请先选择地址信息'
          }],
    		showBanner:true,
        shouldAddAddress:false,
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
  		const pretax = data.result.pretax;
  		const pretax_ori = data.result.pretax_ori;
  		const promoted = data.result.promoted;
  		const total = data.result.total;
      // const available_payment_channels = data.result.available_payment_channels;
      const available_payment_channels = [10, 0];
      let paymentStatus = '现金';
      let tipInfoStatus = false;
      let payment_channel = 0;
      // 在线支付
      // let paymentStatus = '添加支付方式';
      // let tipInfoStatus = false;
      // let payment_channel;
      // if (this.state.payment_channel == null || this.state.payment_channel == 1) {
      //   paymentStatus = data.result.brand + ' xxxx xxxx xxxx ' + data.result.last4;
      //   tipInfoStatus = true;
      //   payment_channel = 1;
      // }

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
                                        paymentStatus,
                                        tipInfoStatus,
  																			loading,
                                        selectedAddress,
                                        payment_channel,
                                        available_payment_channels
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
  updateShouldAddAddress(data){
    this.state.shouldAddAddress = data.shouldAddAddress;
  },
  updatePaymentStatus(data){
    if (data.payment_channel == 0) {
      this.state.tipInfoStatus = false;
      this.state.paymentStatus = 'Cash';
      this.state.payment_channel = 0;
    }
    else if (data.payment_channel == 10) {
      this.state.tipInfoStatus = false;
      this.state.paymentStatus = '支付宝';
      this.state.payment_channel = 10;
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
