import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change4422';

const SboxSearchStore = Object.assign({},EventEmitter.prototype,{
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
  updateCategoryListState(la_categoryList){

      this.state.categoryList = la_categoryList;
  },
  updateSearchCategoryState(la_searchCategoryList){

      this.state.searchCategoryList = la_searchCategoryList;
  },
  getState(){
    return this.state
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				case SboxConstants.GET_CATEGORY_LIST:
          SboxSearchStore.updateCategoryListState(action.data.categoryList)
          SboxSearchStore.emitChange()
					break;
        case SboxConstants.SEARCH_CATEGORY_LIST:
          SboxSearchStore.updateSearchCategoryState(action.data.searchCategoryList)
          SboxSearchStore.emitChange()
          break;
        default:
         // do nothing
		  }

	})

});
module.exports = SboxSearchStore;
