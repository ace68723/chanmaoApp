import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change4422';
const SboxOrderStore = Object.assign({},EventEmitter.prototype,{
  state:{
    cusid:"",
    last4:"",
    oos:"",
    prod:[],
    addr:{},
    shouldAddCard:false,
    shouldAddAddress:false,
    checkoutSuccessful:false,
    productList: [],
  },
	emitChange(){
			this.emit( CHANGE_EVENT)
	},
	addChangeListener(callback){
			this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener(callback){
			this.removeListener(CHANGE_EVENT, callback)
	},
  updateOrderBeforeListState(lo_data){


    this.state.shouldDoAuth = lo_data.shouldDoAuth;

    if(this.state.shouldDoAuth)return
    this.state.shouldAddAddress = Boolean(!lo_data.eo_addr.addr);
    this.state.shouldAddCard = Boolean(!lo_data.ev_cusid);
    this.state.cusid = lo_data.ev_cusid;
    this.state.last4 = lo_data.ev_last4;
    this.state.deliTime = lo_data.ev_deliTime;
    this.state.deliFee = lo_data.ev_deliFee;
    this.state.pretax = lo_data.ev_pretax;
    this.state.total = lo_data.ev_total;
    this.state.oos = lo_data.oos;
    this.state.prod = lo_data.prod;
    this.state.addr = lo_data.eo_addr;
    this.state.addr = lo_data.eo_addr;
    this.state.startCheckout = true;
    const address = lo_data.eo_addr;
    this.state.userInfo = {
      name:address.name,
      phoneNumber: address.tel,
      unitNumber: address.unit,
      addressObject: {
        abid: address.abid,
        name:address.name,
        phoneNumber: address.tel,
        unitNumber: address.unit,
        addr: address.addr,
      }
    }
    this.state.showCheckoutLoading = false;

  },
  checkoutSuccessful(){
    this.state = {
      cusid:"",
      last4:"",
      oos:"",
      prod:[],
      addr:{},
      shouldAddCard:false,
      shouldAddAddress:false,
      checkoutSuccessful:true,
      showCheckoutLoading:false,
      productList:[],
      box:{},
    }
    setTimeout(() => {
      this.state = {
        cusid:"",
        last4:"",
        oos:"",
        prod:[],
        addr:{},
        shouldAddCard:false,
        shouldAddAddress:false,
        checkoutSuccessful:false,
      }
    }, 1000);
  },
  checkoutFail(){
    this.state.checkoutSuccessful = false;
    this.state.showCheckoutLoading = false;
  },
  getProductList(data) {
    this.state.productList = data;
    // [
    //   {
    //     spu_id:5,
    //     sku_id:22,
    //     spu_name:"与美懒人大厨四川冒菜",
    //     sku_name:"豚骨菌菇(小包装)",
    //     sku_status:0,
    //     sku_amount:182,
    //     sku_original_price:"7.53",
    //     sku_price:"5.22",
    //     sku_quantity:2,
    //     sku_image_url:"https://chanmao.us/storage/image/sb_app/image/1_20170828.png"
    //   },
    //   {
    //       spu_id:5,
    //       sku_id:22,
    //       spu_name:"与美懒人大厨四川",
    //       sku_name:"豚骨菌菇(大包装)",
    //       sku_status:0,
    //       sku_amount:182,
    //       sku_original_price:"7.53",
    //       sku_price:"15.22",
    //       sku_quantity:1,
    //       sku_image_url:"https://chanmao.us/storage/image/sb_app/image/1_20170828.png"
    //   }
    // ];
  },
  checkProductStatus() {

  },
  getState(){
    return this.state
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
        case SboxConstants.GET_PRODUCT_LIST:
          SboxOrderStore.getProductList(action.data);
          SboxOrderStore.emitChange();
          break;
        case SboxConstants.CHECK_PRODUCT_STATUS:
          SboxOrderStore.checkProductStatus();
          SboxOrderStore.emitChange();
          break;
				case SboxConstants.GET_ORDER_BEFORE:
          SboxOrderStore.updateOrderBeforeListState(action.data)
          SboxOrderStore.emitChange()
					break;
        case SboxConstants.CHECKOUT:
          SboxOrderStore.checkoutSuccessful()
          SboxOrderStore.emitChange()
					break;
        case SboxConstants.CHECKOUT_FAIL:
          SboxOrderStore.checkoutFail()
          SboxOrderStore.emitChange()
					break;

        default:
         // do nothing
		  }

	})

});
module.exports = SboxOrderStore;
