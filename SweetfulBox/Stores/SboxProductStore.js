import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change4422';

const SboxProductStore = Object.assign({},EventEmitter.prototype,{
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
  updateThemeList(la_themeList){

    this.state.themeList = la_themeList;
  },
  updateHomedata(data){

    this.state.homeData = data;
  },
  updateSingleProduct(data){

    this.state.singleProduct = data;
  },
  getSboxProductDetialState(){
    const state = this.state.singleProduct
    return state;
  },
  getState(){
    return this.state;
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				case SboxConstants.GET_CATEGORY_LIST:
          SboxProductStore.updateCategoryListState(action.data.categoryList)
          SboxProductStore.emitChange()
					break;
        case SboxConstants.SEARCH_CATEGORY_LIST:
          SboxProductStore.updateSearchCategoryState(action.data.searchCategoryList)
          SboxProductStore.emitChange()
          break;
        case SboxConstants.SEARCH_THEME_LIST:
          SboxProductStore.updateThemeList(action.data.themeList)
          SboxProductStore.emitChange()
          break;
        case SboxConstants.GET_HOME_DATA:
          SboxProductStore.updateHomedata(action.data)
          SboxProductStore.emitChange()
          break;
        case SboxConstants.GET_SINGLE_PRODUCT:
          SboxProductStore.updateSingleProduct(action.data)
          SboxProductStore.emitChange()
        default:
         // do nothing
		  }

	})

});
module.exports = SboxProductStore;
