'use strict';
const Realm               = require('realm');
//=============================
//              new
//=============================
const cm_system_scheam = {
  name: 'cm_system',
  primaryKey: 'type',
  properties: {
    type:'string',
    value:'string',
  }
}

//馋猫订餐
const cme_address_schema = {
  name: 'cme_address',
  primaryKey: 'type',
  properties: {
      addr:"string",
      apt_no:"string",
      buzz:"string",
      city:"string",
      del:"string",
      loc_la:"string",
      loc_lo:"string",
      name:"string",
      postal:"string",
      province:"string",
      status:"string",
      tel:"string",
      type:"string",
      uaid:"string",
      uid:"string",
      selected:"bool"
  }
};
const cme_cart_schema = {
  name: 'cme_cart',
  primaryKey: 'type',
  properties: {
      type:"string",
      value:"string",
  }
};
const cme_restaurant_scheam = {
  name: 'cme_restaurant',
  primaryKey: 'rid',
  properties: {
      rid:"int",
      area:"int",
      desc:"string",
      end_time:"string",
      mob_banner:"string",
      name:"string",
      start_amount:"string",
      start_time:"string"
  }
}

//甜满箱
const sbox_cart_product_scheam = {
    name: 'sbox_cart_product',
    primaryKey: 'pboxid',
    properties: {
      amount: 'int',
      description: 'string',
      facts: 'string',
      image:'string',
      fullname: 'string',
      pboxid:'string',
      pbid: 'int',
      price: 'string',
      unikey: 'string',
      weights: 'int',
      selectedAmount: 'int',
      boxId:'int',
    }

}
const sbox_box_scheam = {
  name: 'sbox_box',
  primaryKey: 'boxId',
  properties: {
    boxId:'int',
    boxWeights:'int',
    product:{type: 'list', objectType: 'sbox_cart_product'}
  }
}
const card_info = {
  name: 'card_info',
  primaryKey: 'card_id',
  properties: {
    card_id:'string',
    brand:'string',
    last4:'string',
    exp_month:'int',
    exp_year:'int',
  }
}
const SboxSearchKeywordHistory = {
  name: 'sbox_search_keyword_history',
  primaryKey: 'keyword',
  properties: {
    keyword:'string',
    timestamp:'int',
  }
}
const sbox_cache_scheam = {
  name: 'sbox_cache',
  primaryKey: 'cache_key',
  properties: {
    cache_key:'string',
    json:'string',
  }
}

let realm
export function DatabaseInit() {
  realm = new Realm({
      path: 'cm_2.8.1.realm',
      schema: [
                cme_address_schema,
                cme_cart_schema,
                cme_restaurant_scheam,
                cm_system_scheam,
                sbox_cart_product_scheam,
                sbox_box_scheam,
                card_info,
                SboxSearchKeywordHistory,
                sbox_cache_scheam,
              ],
      schemaVersion: 1,
  })
  realm.write(() => {
    if(realm.objects('cme_address').length == 0){
      let init_cme_address = {
        addr:"",
        apt_no:"",
        buzz:"",
        city:"",
        del:"",
        loc_la:"",
        loc_lo:"",
        name:"",
        postal:"",
        province:"",
        status:"",
        tel:"",
        uaid:"",
        uid:"",
        selected:false
      }
      realm.create('cme_address',Object.assign({},init_cme_address,{type:'H'}), true );
      realm.create('cme_address',Object.assign({},init_cme_address,{type:'W'}), true );
      realm.create('cme_address',Object.assign({},init_cme_address,{type:'O'}), true );
    }
    let init_cme_cart = realm.objects('cme_cart');
    realm.delete(init_cme_cart);
    if(!realm.objectForPrimaryKey('cm_system','cme_intro_count')){
        realm.create('cm_system',{type:"cme_intro_count",value:"0"}, true );
    }
    if(!realm.objectForPrimaryKey('cm_system','cme_comment_count')){
        realm.create('cm_system',{type:"cme_comment_count",value:"0"}, true );
    }
    realm.create('cm_system',{type: 'version', value: '2.8.3'}, true );
  })
  console.log(realm.path)
}
export function SaveUserInfo({uid,token}) {
  realm.write(() => {
    realm.create('cm_system',{type: 'uid', value: uid}, true);
    realm.create('cm_system',{type: 'token', value: token}, true);
  })
}
export function InitUserInfo() {
  realm.write(() => {
    realm.create('cm_system',{type: 'uid', value: ''}, true);
    realm.create('cm_system',{type: 'token', value: ''}, true);
  })
}
export function GetUserInfo() {
  try {
    const uid = realm.objectForPrimaryKey('cm_system','uid').value;
    const token = realm.objectForPrimaryKey('cm_system','token').value;
    const version = realm.objectForPrimaryKey('cm_system','version').value;
    return {uid,token,version}
  } catch (e) {
    console.log(e)
    return "e"
  }

}
export function LogOut() {
  realm.write(() => {
    realm.create('cm_system',{type: 'uid', value: ''}, true);
    realm.create('cm_system',{type: 'token', value: ''}, true);
  })
}

export function UpdateAllRestaurants(data) {
  console.log('getRestaurant4')
  // realm.write(() => {
  //   let allRestaurants = realm.objects('cme_restaurant');
  //     realm.delete(allRestaurants);
  //     if(data.open.length>0 ){
  //         data.open.forEach((restaurant,id)=>{
  //           /**
  //            * Restaurant Data
  //            * @type {Object}
  //            *
  //            * rid:         "int",
  //            * area:        "int",
  //            * desc:        "string",
  //            * distance:    "int",
  //            * end_time:    "string",
  //            * mob_banner:  "string",
  //            * name:        "string",
  //            * open:        "int",
  //            * start_mount: "string",
  //            * start_time:  "string",
  //            * watermark:   "int"
  //            */
  //           const rid = Number(restaurant.rid);
  //           const area = Number(restaurant.area);
  //           const desc = restaurant.desc;
  //           const end_time = restaurant.end_time;
  //           const mob_banner = restaurant.mob_banner;
  //           const name = restaurant.name;
  //           const start_amount = restaurant.start_amount;
  //           const start_time = restaurant.start_time;
  //           const restaurantData = {rid,area,desc,end_time,mob_banner,name,start_amount,start_time}
  //           realm.create('cme_restaurant',restaurantData,true);
  //           console.log('getRestaurant5')
  //         })
  //     }
  //     // console.log(data)
  //     if(data.close.length>0){
  //       data.close.forEach((restaurant, id)=>{
  //         const rid = Number(restaurant.rid);
  //         const area = Number(restaurant.area);
  //         const desc = restaurant.desc;
  //         const end_time = restaurant.end_time;
  //         const mob_banner = restaurant.mob_banner;
  //         const name = restaurant.name;
  //         const start_amount = restaurant.start_amount;
  //         const start_time = restaurant.start_time;
  //         const restaurantData = {rid,area,desc,end_time,mob_banner,name,start_amount,start_time}
  //         realm.create('cme_restaurant',restaurantData,true);
  //       })
  //     }
  //     console.log('getRestaurant5.5')
  //     //
  //
  // });
}
export function cme_beforCheckout({pretax,total,rid,startAmount}) {
  realm.write(() => {
      realm.create('cme_cart',{type:"pretax",value:pretax}, true );
      realm.create('cme_cart',{type:"total",value:total}, true );
      realm.create('cme_cart',{type:"rid",value:rid}, true );
      realm.create('cme_cart',{type:"startAmount",value:startAmount}, true );
  });

}
export function cme_getCalculateDeliveryFee() {
  const pretax = realm.objectForPrimaryKey('cme_cart','pretax').value;
  const rid = realm.objectForPrimaryKey('cme_cart','rid').value;
  const uaid = realm.objectForPrimaryKey('cme_cart','uaid').value;
  const startAmount = realm.objectForPrimaryKey('cme_cart','startAmount').value;
  const dltypeObj = realm.objectForPrimaryKey('cme_cart','dltype');
  return {pretax,rid,uaid,startAmount,dltypeObj}
}
export function cme_updateCalculateDeliveryFee({dltype,dlexp}) {
  realm.write(() => {
      realm.create('cme_cart',{type:"dltype",value:dltype}, true );
      realm.create('cme_cart',{type:"dlexp",value:dlexp}, true );
  });
}
export function cme_getCheckout() {
  const dltype  = realm.objectForPrimaryKey('cme_cart','dltype').value;
  const pretax  = realm.objectForPrimaryKey('cme_cart','pretax').value;
  const rid     = realm.objectForPrimaryKey('cme_cart','rid').value;
  const uaid    = realm.objectForPrimaryKey('cme_cart','uaid').value;
  const dlexp   = realm.objectForPrimaryKey('cme_cart','dlexp').value;
  return {dltype,pretax,rid,uaid,dlexp}
}
export function cme_GetRestaurantWithRid(rid) {
  return realm.objectForPrimaryKey('cme_restaurant',rid)
}
export function cme_getRestaurantData(area) {
  if(area == undefined){
    const restaurantDataAll = realm.objects('cme_restaurant').filtered('zone == 0 OR zone == 99').sorted([['rank',true],['open',true],['distance',false]]);
    return restaurantDataAll
  }else{
    const restaurantDataAll = realm.objects('cme_restaurant').filtered('area = '+area +' AND zone != 0').sorted([['rank',true],['open',true],['distance',false]]);
    return restaurantDataAll
  }
}
export function cme_getSelectedAddress() {
  if (!realm.objects('cme_address').filtered('selected == true' )[0]) return "";
  const selectedAddress = realm.objects('cme_address').filtered('selected == true' )[0]
  return selectedAddress
}
export function cme_getAllAddress() {
  const allAddress = realm.objects('cme_address');
  return allAddress
}
export function cme_addAddress(address) {
  realm.write(() => {
      const selectedAddress = realm.objects('cme_address').filtered('selected == true' );
      if(selectedAddress[0]){
          selectedAddress[0].selected = false;
      }
      address.selected = true;
      realm.create('cme_address',address, true );
      realm.create('cme_cart',{type:"uaid",value:address.uaid}, true );
  });
}
export function cme_updateDltype(dltype) {
  realm.write(() => {
      realm.create('cme_cart',{type:"dltype",value:dltype}, true );
  });
}
export function cme_updateCartUaid(uaid) {
  realm.write(() => {
    realm.create('cme_cart',{type:"uaid",value:uaid}, true );
  });
}
export function cme_deletAddress(address) {
  realm.write(() => {
    if(address.selected){
      realm.create('cme_cart',{type:"uaid",value:""}, true );
    }
    let initAddress = {
      addr:"",
      apt_no:"",
      buzz:"",
      city:"",
      del:"",
      loc_la:"",
      loc_lo:"",
      name:"",
      postal:"",
      province:"",
      status:"",
      tel:"",
      uaid:"",
      uid:"",
      selected:false
    }
    address =  Object.assign(address,initAddress)
    console.log(address)
  });
}
export function cme_updateSelectedAddress(address) {
  realm.write(() => {

    const selectedAddress = realm.objects('cme_address').filtered('selected = true' )[0];
    if (address.uaid === selectedAddress.uaid) return;
    if(selectedAddress){
        selectedAddress.selected = false;
    }
    const condication = `uaid = '${address.uaid}'`
    const updateAddress = realm.objects('cme_address').filtered(condication)[0];
    updateAddress.selected=true;
    realm.create('cme_cart',{type:"uaid",value:address.uaid}, true );
  })
}
export function cme_saveAddress(ia_address) {
  realm.write(() => {
    ia_address.forEach((address,key)=>{
      if(address.type){
        const selectedAddress = realm.objects('cme_address').filtered('selected == true' );
          if(!selectedAddress[0]){
              address.selected = true;
          }
        address = Object.assign({},address)
        realm.create('cme_address',address, true );
      }
    })
  })
}
export function cme_updateCheckoutDltype({dltype,uaid}) {
  realm.write(() => {
      realm.create('cme_cart',{type:"dltype",value:dltype}, true );
      realm.create('cme_cart',{type:"uaid",value:uaid}, true );
  });
}
export function cme_updateHomeIntroCount() {
  const _introCount = (parseInt(realm.objectForPrimaryKey('cm_system','cme_intro_count').value) + 1).toString();
  realm.write(() => {
      realm.create('cm_system',{type:"cme_intro_count",value:_introCount}, true );
  });
}
export function cme_getHomeIntroCount() {
  return realm.objectForPrimaryKey('cm_system','cme_intro_count').value;
}
export function cme_updateCommentCount() {
  const _introCount = (parseInt(realm.objectForPrimaryKey('cm_system','cme_comment_count').value) + 1).toString();
  realm.write(() => {
      realm.create('cm_system',{type:"cme_comment_count",value:_introCount}, true );
  });
}
export function cme_getCommentCount() {
  return realm.objectForPrimaryKey('cm_system','cme_comment_count').value;
}

export function sbox_addToCart(product){
  const amount = product.amount;
  const description = product.description;
  const facts = product.facts;
  const fullname = product.fullname;
  const pbid = product.pbid;
  const price = product.price;
  const unikey = product.unikey;
  const weights = product.weights;
  const selectedAmount = product.selectedAmount;
  const boxId = product.boxId;
  const data ={
    amount,
    description,
    facts,
    fullname,
    pbid,
    price,
    unikey,
    weights,
    selectedAmount,
    boxId,
    data
  }
  realm.write(() => {
    realm.create('sbox_cart_product',Object.assign({},data),true);
  })
}
export function sbox_getProductFormCart(pbid){
    return realm.objectForPrimaryKey('sbox_cart_product',pbid);
}
export function sbox_getAllProductsFormCart(){
    return realm.objects('sbox_cart_product');
}
export function sbox_getAllBoxes() {
  return realm.objects('sbox_box');
}
export function sbox_getBox() {
  return realm.objectForPrimaryKey('sbox_box',1);
}
export function sbox_updateAllBoxes(allBoxes) {
  realm.write(() => {
    for (var i = 0; i < allBoxes.length; i++) {
      const box = allBoxes[i];
      const boxId = box.boxId;
      const boxWeights = box.boxWeights;
      const data = {boxId,boxWeights};
      realm.create('sbox_box',Object.assign({},data),true);

      const product = box.product;
      if(!product) continue; //不往当前箱子里面添加时，product值为空
      const pbid = product.pbid;
      const pboxid = String(boxId) + '_' + String(pbid)
      const selectedAmount = product.selectedAmount;

      const find_product = realm.objectForPrimaryKey('sbox_cart_product',pboxid);

      if(find_product){

        find_product.selectedAmount += selectedAmount;

      } else {

        const amount = product.amount;
        const description = product.description;
        const facts = product.facts;
        const fullname = product.fullname;
        const price = product.price;
        const unikey = product.unikey;
        const weights = product.weights;
        const image = product.image;
        const _product = {
                      pboxid,
                      pbid,
                      boxId,
                      amount,
                      description,
                      facts,
                      fullname,
                      price,
                      unikey,
                      weights,
                      selectedAmount,
                      image,
                    }
        let _box = realm.objectForPrimaryKey('sbox_box',boxId);
        _box.product.push(realm.create('sbox_cart_product', _product, true))

      }
    }

  })
}
export function sbox_updateBox(box) {
  realm.write(() => {
    const boxId = box.boxId;
    const boxWeights = box.boxWeights;
    const data = {boxId,boxWeights};
    realm.create('sbox_box',Object.assign({},data),true);

    const product = box.product;
    const pbid = product.pbid;
    const pboxid = String(boxId) + '_' + String(pbid)
    const selectedAmount = product.selectedAmount;
    const find_product = realm.objectForPrimaryKey('sbox_cart_product',pboxid);

    if(find_product){
      find_product.selectedAmount += selectedAmount;
    } else {
      const amount = product.amount;
      const description = product.description;
      const facts = product.facts;
      const fullname = product.fullname;
      const price = product.price;
      const unikey = product.unikey;
      const weights = product.weights;
      const image = product.image;
      const _product = {
                    pboxid,
                    pbid,
                    boxId,
                    amount,
                    description,
                    facts,
                    fullname,
                    price,
                    unikey,
                    weights,
                    selectedAmount,
                    image,
                  }
      let _box = realm.objectForPrimaryKey('sbox_box',boxId);
      _box.product.push(realm.create('sbox_cart_product', _product, true))
    }
  });

}
export function updateCardInfo(cardInfoList) {
  realm.write(() => {
    for (var i = 0; i < cardInfoList.length; i++) {
      const cardInfo = cardInfoList[i];

        const card_id = cardInfo.card_id;
        const brand = cardInfo.brand;
        const last4 = cardInfo.last4;
        const exp_month = cardInfo.exp_month;
        const exp_year = cardInfo.exp_year;
        const _cardInfo = {card_id,brand,last4,exp_month,exp_year}
      realm.create('card_info',_cardInfo, true);
    }
  })
}
export function init_sbox() {
  setTimeout(() => {
    realm.write(() => {
        // let box = realm.objectForPrimaryKey('sbox_box',1);
        // box.boxWeights = 0;
        // box.product = [];
        let allBoxes = realm.objects('sbox_box');
        let allPorduct = realm.objects('sbox_cart_product');
        realm.delete(allBoxes);
        realm.delete(allPorduct);
    });
  }, 1000);
}
export function sbox_addSearchKeyword(io_keyword) {
    const { keyword, timestamp } = io_keyword;
    const lo_keyword = { keyword, timestamp };
    realm.write(() => {
      realm.create('sbox_search_keyword_history',lo_keyword,true);
    })
}
export function sbox_initSearchKeyword() {
    realm.write(() => {
      let sboxAllSearchKeyword = realm.objects('sbox_search_keyword_history');
      realm.delete(sboxAllSearchKeyword);
    });
}
export function sbox_getSearchKeyword() {
  return realm.objects('sbox_search_keyword_history').sorted('timestamp',true);
}
export function sbox_addAPICache(io_data) {
    const { cache_key, json } = io_data;
    const lo_data= { cache_key, json };
    realm.write(() => {
      realm.create('sbox_cache' ,lo_data, true);
    })
}
export function sbox_getAPICache(io_key) {
  return realm.objectForPrimaryKey('sbox_cache',io_key).json;
}
export function realm () {
  return realm
}
