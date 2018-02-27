import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import {EventEmitter} from 'events';

import CartAPI from '../Modules/OrderModule/CartApi'
const CHANGE_EVENT = 'change';

const ERRROR_TITLE = AppConstants.ERRROR_TITLE;
let la_menu = [];
let la_category = [];
let name;
let open;
let loaded = false;
const MenuStore = Object.assign({},EventEmitter.prototype,{
	emitChange(){
			this.emit( CHANGE_EVENT)
	},
	addChangeListener(callback){
			this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener(callback){
			this.removeListener(CHANGE_EVENT, callback)
	},
  menuState(){
		const menu = CartAPI.getMenu();
		const cartTotals = MenuStore.getCartTotals()
		const categoryList = la_category;
    const state = {menu,cartTotals,loaded,name,open,categoryList}
    return state
  },
	initMenu(){
		la_menu = [];
		name = '';
		loaded = false;
		CartAPI.initMenu();
	},
	saveMenu(menuData){
		name = menuData.name;
		open = menuData.open;
		la_menu = [];
		la_category = [];
		let dishTotal = 0;
		menuData.menu.map(category => {
          const id = category.name;
					const category_name = category.name;
					const dishAmount = category.dishes.length + 1;
					const category_position = 320+la_category.length*63 + dishTotal*80;
					dishTotal += category.dishes.length;
          const index = la_menu.length;
          const item = {id,category_name,dishAmount,category_position,index}
					la_menu = [...la_menu, item];
					la_category = [...la_category,item];

					category.dishes.map(dish => {
						const id 	= dish.ds_id;
						const ds_name = dish.ds_name;
						const int_no 	= dish.int_no;
						const price 	= dish.price;
						const status 	= dish.status;
						const item 		= {id,ds_name,int_no,price,status}
						if (id == 24292) {
							la_menu = [...la_menu, {
													"id": 24292,
													"int_no": "A01",
													"ds_name": "原味奶茶",
													"status": 0,
													"price": "18.99",
													"tpgs": [
															{
																	"tpg_id": 2,
																	"tpg_name": "冰量",
																	"tpg_limit": 4,
																	"tps": [
																			{
																					"tp_id": 4,
																					"tp_name": "少冰",
																					"tp_price": "0.00"
																			},
																			{
																					"tp_id": 5,
																					"tp_name": "多冰",
																					"tp_price": "0.00"
																			},
																			{
																					"tp_id": 6,
																					"tp_name": "不要冰",
																					"tp_price": "0.00"
																			},
																			{
																					"tp_id": 15,
																					"tp_name": "给老子加到满",
																					"tp_price": "1.00"
																			}
																	]
															},
															{
																	"tpg_id": 17,
																	"tpg_name": "Size",
																	"tpg_limit": 1,
																	"tps": [
																			{
																					"tp_id": 34,
																					"tp_name": "大杯",
																					"tp_price": "2.00"
																			},
																			{
																					"tp_id": 35,
																					"tp_name": "中杯",
																					"tp_price": "1.00"
																			}
																	]
															}
													]
											}]
						}else {
							la_menu 			= [...la_menu, item];
						}
					});
		})
		console.log(la_menu);
		// la_menu = [{
		// 						"id": 68998,
		// 						"int_no": "123",
		// 						"rid": 5,
		// 						"dt_id": 2,
		// 						"ds_name": "原味奶茶",
		// 						"ds_desc": "",
		// 						"price": "18.99",
		// 						"tpgs": [
		// 								{
		// 										"tpg_id": 2,
		// 										"tpg_name": "冰量",
		// 										"tpg_limit": 1,
		// 										"tps": [
		// 												{
		// 														"tp_id": 4,
		// 														"tp_name": "少冰",
		// 														"tp_price": "0.00"
		// 												},
		// 												{
		// 														"tp_id": 5,
		// 														"tp_name": "多冰",
		// 														"tp_price": "0.00"
		// 												},
		// 												{
		// 														"tp_id": 6,
		// 														"tp_name": "不要冰",
		// 														"tp_price": "0.00"
		// 												},
		// 												{
		// 														"tp_id": 15,
		// 														"tp_name": "给老子加到满",
		// 														"tp_price": "1.00"
		// 												}
		// 										]
		// 								},
		// 								{
		// 										"tpg_id": 17,
		// 										"tpg_name": "Size",
		// 										"tpg_limit": 1,
		// 										"tps": [
		// 												{
		// 														"tp_id": 34,
		// 														"tp_name": "大杯",
		// 														"tp_price": "2.00"
		// 												},
		// 												{
		// 														"tp_id": 34,
		// 														"tp_name": "中杯",
		// 														"tp_price": "1.00"
		// 												}
		// 										]
		// 								}
		// 						]
		// 				},
		// 				{
		// 						"id": 68997,
		// 						"int_no": "123456",
		// 						"rid": 6,
		// 						"dt_id": 3,
		// 						"ds_name": "固定奶茶",
		// 						"ds_desc": "",
		// 						"price": "18.99"}];
		CartAPI.saveMenu(la_menu)
	},
	getCart(){
		return CartAPI.la_cartItems;
	},
	getMenu(){
			return CartAPI.getMenu();
	},
	getFilteredMenu(filteredMenu){
		return CartAPI.getFilteredMenu(filteredMenu);
	},
	getCartTotals(){
			return CartAPI.cartTotals();
	},
	reorder(items){
		items.map(item => {
				CartAPI.addItem(item);
		})
		// MenuStore.emitChange();
	},
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				case AppConstants.GET_MENU_SUCCESS:
							MenuStore.saveMenu(action.menuData);
							MenuStore.emitChange();
					break;
					case AppConstants.ADD_ITEM:
							CartAPI.addItem(action.item);
								MenuStore.emitChange();
							break;
					case AppConstants.REMOVE_ITEM:
							CartAPI.removeItem(action.item);
								MenuStore.emitChange();
							break;
					case AppConstants.INCREASE_ITEM:
							CartAPI.increaseItem(action.item);
								MenuStore.emitChange();
							break;
					case AppConstants.DECREASE_ITEM:
							CartAPI.decreaseItem(action.item);
								MenuStore.emitChange();
							break;
					case AppConstants.REORDER:
								MenuStore.reorder(action.items);
								MenuStore.emitChange();
						  break;
		  }

	})

});
module.exports = MenuStore;
