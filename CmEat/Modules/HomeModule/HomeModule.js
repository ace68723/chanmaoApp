'use strict';
const   HomeApi        = require( './HomeApi');
import orderBy from 'lodash/orderBy';
const  HomeMoule = {

// ===================================================
// getHomeData API INTERFACE
// API             Module        Notes
// sequence        sequence
// navitype        navitype      {1:display,2:url,3:rid,4:{"team": "R"\"A"},5:uid author_id,    6:link}
// naviurl         naviurl
// image           image
// size            size          {S:small,L:large,}
// title           title
// description     description
// price           price
// ori_price       ori_price
// naviparam       naviparam     {"rid": "5"} {"team": "R"\"A"} {uid:author_id} {pid:1}
// ===================================================

  async getHomeData(token){
        const HomeData = await HomeApi.getHomeData(token);
        if(HomeData.result === 0){
            HomeData.zone1.forEach((banner) => {
                const naviparam = banner.naviparam;
                if(naviparam.team){
                    if(naviparam.team === 'R'){
                      naviparam.category = 'radio';
                    }
                    if(naviparam.team === 'A'){
                      naviparam.category = 'article';
                    }
                    delete naviparam["team"];
                }
                if(naviparam.uid){
                  naviparam.author_id = naviparam.uid;
                  delete naviparam["uid"];
                }
            })
            return HomeData

        }else{
          throw HomeData
        }
  },

  // ===================================================
  // getAreaList API INTERFACE
  // API             Module        Notes
  //
  // ===================================================

  async getAreaList(reqData){
      try {
        const res = await HomeApi.getAreaList(reqData);
        let areaList={};
        if(res.result == 0){
          areaList = res.area;
          areaList.map(area=>{
            let newRestaurantList;

            area.restaurantList = orderBy(area.restaurantList, ['open', 'rank', 'distance'], ['desc', 'desc', 'asc']);
            // console.log(newRestaurantList)
          })
        }
        return areaList
      } catch (e) {
        console.log(e)
      }

    },
    async getRestaurantList(reqData){
        try {
          const res = await HomeApi.getRestaurantList(reqData);
          let restaurantList = [];
          let zones = [];
          let categories  = [];
          if (res.ev_error == 0) {
            restaurantList = res.ea_restaurant_list;
            zones = res.ea_zone;
            categories = res.ea_category_list;
          }
          // if(res.result == 0){
          //   areaList = res.area;
          //   areaList.map(area=>{
          //     let newRestaurantList;
          //
          //     area.restaurantList = orderBy(area.restaurantList, ['open', 'rank', 'distance'], ['desc', 'desc', 'asc']);
          //     // console.log(newRestaurantList)
          //   })
          // }
          return {restaurantList, zones, categories};
        } catch (e) {
          console.log(e)
        }

      },
}
module.exports = HomeMoule;
