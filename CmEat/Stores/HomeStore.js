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
    adInterval: 0,
    adOffset: 0,
    discountData: [],
		showAnimatedView:false,
    showIntroduction: true,
		restaurantList: [],
		filteredList: [],
		zones: [],
		tags:[],
		homeAlert:{},
    message:[],
    newMessage:false,
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
        adInterval: 0,
        adOffset: 0,
        discountData: {},
        restaurantList: [],
    		filteredList: [],
    		zones: [],
    		tags:[],
    		showAnimatedView:false,
				homeAlert:{},
        message:[],
      }
			this.removeListener(CHANGE_EVENT, callback)
	},
  saveHomeData(res){
    const showIntroduction = res.showIntroduction;
    const bannerList = res.homeAdData.BANNER;
    const advertisement = res.homeAdData.RRLIST;
    const restaurantList = res.restaurantList;
    const adInterval = res.homeAdData.rrlist_skip;
    const adOffset = res.homeAdData.rrlist_shift;
    const discountData = res.homeAdData.THEME;
    const zones = res.zones;
    const tags = res.categories;
    const homeAlert = res.homeAlert;
    this.state = Object.assign({},this.state,{bannerList,advertisement,showIntroduction, restaurantList, zones, tags, homeAlert, adInterval, adOffset, discountData})
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
	getHomeAlert(){
		return this.state.homeAlert;
	},
  getMessageData(res){
    this.state.message=res;
  },
  getNewMessage()
  {
    this.state.newMessage=true;

    this.state.homeAlert=false;
  },
  readNewMessage()
  {
    this.state.newMessage=false;
    this.state.homeAlert=false;
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
        case AppConstants.GET_NEW_MESSAGE:
            HomeStore.getNewMessage();
            HomeStore.emitChange()
        break;
        case AppConstants.READ_NEW_MESSAGE:
            HomeStore.readNewMessage();
            HomeStore.emitChange()
        break;
        case AppConstants.GET_MESSAGE_DATA:
            HomeStore.getMessageData(action.res)
            HomeStore.emitChange()
				// case AppConstants.CHECKOUT:
				// 				HomeStore.closeMenu();
				// 				setTimeout( () => {
				// 					HomeStore.emitChange();
				// 				}, 1000);
        break;
        default:
				break;

		  }

	})

});
module.exports = HomeStore;
