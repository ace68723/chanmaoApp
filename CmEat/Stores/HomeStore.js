import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change';
import _find from 'lodash/find';

const HomeStore = Object.assign({},EventEmitter.prototype,{
  state:{
    updatePosition:false,
		currentTab:1,
		bannerList:[],
		showAnimatedView:false,
    showIntroduction: true,
		restaurantList: [],
		filteredList: [],
		zones: [],
		tags:[],
  },
	emitChange(){
			this.emit(CHANGE_EVENT)
	},
	addChangeListener(callback){
			this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener(callback){
      this.state = {
        updatePosition:false,
    		currentTab:1,
    		bannerList:[],
        restaurantList: [],
    		filteredList: [],
    		zones: [],
    		tags:[],
    		showAnimatedView:false,
      }
			this.removeListener(CHANGE_EVENT, callback)
	},
  saveHomeData(res){
     const showIntroduction = res.showIntroduction;
		 const bannerList = res.homeData.zone1;
		 const advertisement = res.homeData.zone2;
     const restaurantList = res.restaurantList;
		 const zones = res.zones;
		 const tags = res.categories;
		 this.state = Object.assign({},this.state,{bannerList,advertisement,showIntroduction, restaurantList, zones, tags})
  },
  getRestaurantWithRid(rid){
  		const restaurantData = _find(this.state.restaurantList, {rid:parseInt(rid)});
  		return restaurantData;
  },
  getHomeState(){
    return this.state
	},
	saveTags(tags){
		this.state.tags = tags;
	},
	setRestaurantListByTag(res){
			this.state.filteredList = res;
	},
	getTags(){
			return this.state.tags;
	},
	getRestaurantListByTag(){
			return this.state.filteredList;
	},
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				case AppConstants.GET_HOME_DATA:
					  HomeStore.saveHomeData(action.res)
             HomeStore.emitChange()
				break;
				case AppConstants.GET_TAG:
						HomeStore.saveTags(action.menuData.ea_category_list)
						HomeStore.emitChange()
                break;
        case AppConstants.GET_RESTAURANT_BY_TAG:
						HomeStore.setRestaurantListByTag(action.menuData)
						HomeStore.emitChange()
				break;
				// case AppConstants.CHECKOUT:
				// 				HomeStore.closeMenu();
				// 				setTimeout( () => {
				// 					HomeStore.emitChange();
				// 				}, 1000);
				break;

		  }

	})

});
module.exports = HomeStore;
