import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change4422';

import { SBOX_REALM_PATH } from '../Config/API';
const Realm               = require('realm');
let realm = new Realm({ path: SBOX_REALM_PATH });
// const _cart = realm.objects('sbox_cart');

import {
    findIndex,
} from 'lodash';


const SboxProductStore = Object.assign({},EventEmitter.prototype,{
  state:{
    selectedPage: '',
    selectedProduct:{},
    sku_image:[{}],
    sku_list:[{}],
    sku_fact:"",
    spu_name:"",
    totalQuantity:0,
    loading:true,
    outOfStock: false,
  },
	emitChange(){
			this.emit( CHANGE_EVENT)
	},
	addChangeListener(callback){
			this.on(CHANGE_EVENT, callback)
      this.updateTotalQuantity();
	},
	removeChangeListener(callback){
			this.removeListener(CHANGE_EVENT, callback)
	},

  updateSingleProduct(data){
    const { sku_fact,
            sku_image,
            sku_list,
            spu_id,
            spu_name,
            spu_service_img,
            spu_status } = data;

    const loading         = false;
    const serviceImg      = data.spu_service_img;
    const selectedProduct = data.sku_list[0];

    this.state = Object.assign(this.state,{  sku_fact,
                                             sku_image,
                                             sku_list,
                                             spu_id,
                                             spu_name,
                                             spu_service_img,
                                             spu_status,
                                             loading,
                                             serviceImg,
                                             selectedProduct
                                           });

  },
  changeSelectAttr(selectedProduct){
    const selectedPage = findIndex(this.state.sku_image,{image_id: selectedProduct.sku_image_id})
    this.state =  Object.assign(this.state,{selectedProduct,selectedPage})
  },
  addQuantity(){
    if(this.state.selectedProduct.sku_quantity>=this.state.selectedProduct.sku_amount) {
      this.state =  Object.assign({},this.state,{outOfStock: true});
      setTimeout( () => {
        this.state =  Object.assign(this.state,{outOfStock: false});
      }, 500);
    }else {
      const selectProductIndex  = findIndex(this.state.sku_list, {sku_id: this.state.selectedProduct.sku_id})
      this.state.sku_list[selectProductIndex].sku_quantity += 1;
      this.state.selectedProduct.sku_quantity = this.state.sku_list[selectProductIndex].sku_quantity;
    }
  },
  subQuantity(){
    if(this.state.selectedProduct.sku_quantity <= 1) return;
    const selectProductIndex  = findIndex(this.state.sku_list, {sku_id: this.state.selectedProduct.sku_id})
    this.state.sku_list[selectProductIndex].sku_quantity -= 1;
    this.state.selectedProduct.sku_quantity = this.state.sku_list[selectProductIndex].sku_quantity;
  },
  changeProductImage(selectedPage){
    const selectIndex = findIndex(this.state.sku_list,{sku_image_id: this.state.sku_image[selectedPage].image_id});
    const selectedProduct = this.state.sku_list[selectIndex];
    this.state =  Object.assign(this.state,{selectedProduct,selectedPage})
  },
  updateTotalQuantity() {
    this._cart = realm.objects('sbox_cart');
    let totalQuantity = 0;
    this._cart.forEach((item) => {
      totalQuantity += item.sku_quantity
    });
    this.state.totalQuantity = totalQuantity;
  },
  getTotalQuantity(){
    return this.state.totalQuantity
  },
  initState(){
    this.state = Object.assign({},{
      selectedPage: '',
      selectedProduct:{},
      selectedAmount:1,
      sku_image:[{}],
      sku_list:[{}],
      sku_fact:"",
      spu_name:"",
      totalQuantity:0,
      loading:true,
      outOfStock: false,
    });
  },
  getState(){
    return this.state;
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
        case SboxConstants.GET_SINGLE_PRODUCT:
          SboxProductStore.updateSingleProduct(action.data)
          SboxProductStore.emitChange();
          break
        case SboxConstants.CHANGE_SELECT_ATTR:
          SboxProductStore.changeSelectAttr(action.selectedProduct)
          SboxProductStore.emitChange();
          break
        case SboxConstants.ADD_QUANTITY:
          SboxProductStore.addQuantity();
          SboxProductStore.emitChange();
          break
        case SboxConstants.SUB_QUANTITY:
          SboxProductStore.subQuantity();
          SboxProductStore.emitChange();
          break
        case SboxConstants.CHANG_PRODUCT_IMAGE:
          SboxProductStore.changeProductImage(action.page)
          SboxProductStore.emitChange();
          break
        case SboxConstants.UPDATE_CART_TOTAL_QUANTITY:
          SboxProductStore.updateTotalQuantity()
          SboxProductStore.emitChange();
          break

        default:
         // do nothing
		  }

	})

});
module.exports = SboxProductStore;
