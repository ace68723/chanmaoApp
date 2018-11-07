import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change';


const HomeStore = Object.assign({},EventEmitter.prototype,{
  state:{
    productList:[],
    cartProducts:[],
  },
  initState(){
    this.state = {
      productList:[],
      cartProducts:[],
    };
  },
  getProductItem(sku_id) {
    let products = this.state.productList;
    for (i = 0; i < products.length; i++) {
      if (products[i].sku_id == sku_id) {
        return products[i];
      }
    }
    return null;
  },
  updateCartItem(sku_id, delta) {
    let currentAmount = this.getItemAmount(sku_id);
    let cart = this.state.cartProducts;
    let targetProduct = Object.assign({}, this.getProductItem(sku_id));
    if (!targetProduct) return;

    // If adding it the first time
    if (currentAmount == 0 && delta == 1){
      targetProduct.amount = 1
      cart.push(targetProduct);
      return;
    }

    // update new amount
    let newAmount = currentAmount + delta;
    if (newAmount < 0){
      newAmount = 0;
    }

    for (i = 0; i < cart.length; i++) {
      if (cart[i].sku_id == sku_id) {
        cart[i].amount = newAmount;
        if (newAmount == 0){
          // If delete it for good
          cart.splice(i, 1);
          break;
        }
      }
    }
    this.state.cartProducts=cart;
  },
  getItem()
  {
    return this.state.cartProducts;
  },
  getItemAmount(sku_id)
  {
    let cart=this.state.cartProducts;
    for (i=0;i<cart.length;i++)
    {
      if (cart[i].sku_id == sku_id)
      {
        return cart[i].amount;
      }
    }
    return 0;
  },
	emitChange(){
			this.emit(CHANGE_EVENT)
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

	initOrderState(){
		this.state ={}
	},
  getState(){
    return this.state
  },
  getCartProducts(){
    return this.state.cartProducts;
  },
  updateProductList(data){
    const productList = data.ea_products;
    this.state = Object.assign(this.state,{productList});
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				case AppConstants.PRODUCT_LIST:
								HomeStore.updateProductList(action.data);
								HomeStore.emitChange();
                break;
        default:
                break;

		  }

	})

});
module.exports = HomeStore;
