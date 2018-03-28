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
		areaList:[],
		showAnimatedView:false,
    showIntroduction: true,
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
    		areaList:[],
    		showAnimatedView:false,
      }
			this.removeListener(CHANGE_EVENT, callback)
	},
  saveHomeData(res){
     const showIntroduction = res.showIntroduction;
		 const bannerList = res.homeData.zone1;
		 const advertisement = res.homeData.zone2;
		 const areaList = [];
     let index = 0;
     while (index < res.areaList.length) {
       areaList.push({...res.areaList[index], image: './Image/area_' + index.toString() + '.png'});
       index++;
     }
		 this.state = Object.assign({},this.state,{bannerList,advertisement,areaList,showIntroduction})
  },
  getRestaurantWithRid(rid){
  		const restaurantData = _find(this.state.areaList[0].restaurantList, {rid:rid});
  		return restaurantData
  },
  getHomeState(){
    return this.state
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				case AppConstants.GET_HOME_DATA:
					   HomeStore.saveHomeData(action.res)
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
