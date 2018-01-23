import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change4422';

const SboxProductDetailStore = Object.assign({},EventEmitter.prototype,{
  state:{
    categoryList:[],
    searchCategoryList:{},
    themeList:[],
    homeData:{},
    singleProduct:{},
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
  updateSingleProduct(data){

    this.state.singleProduct = data;
  },
  getState(){
    return this.state
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
        case SboxConstants.GET_SINGLE_PRODUCT:
          SboxProductDetailStore.updateSingleProduct(action.data)
          SboxProductDetailStore.emitChange()
        default:
         // do nothing
		  }

	})

});
module.exports = SboxProductDetailStore;
