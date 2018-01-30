import ProductAPI from './ProductAPI';
import {sbox_addAPICache,sbox_getAPICache} from '../../../App/Modules/Database';

import {
  sbox_getAllBoxes,
  sbox_updateAllBoxes,
  sbox_getBox,
  sbox_updateBox,
} from '../../../App/Modules/Database';

export default  {
  async getCategoryList(io_data){
    io_data = {
      showpm: 1,
    }
    try {
      const lo_data ={
        uuid: 1,
        iv_showpm: io_data.showpm,
      }
      const categoryListResult = await ProductAPI.getCategoryList(lo_data);

      if(categoryListResult.ev_error === 0 ){
        const eo_data ={
          categoryList:categoryListResult.ea_prod_category,
        }
        return eo_data
      }else{
        const errorMessage = categoryListResult.ev_message;
        throw errorMessage
      }
    } catch (e) {
      const errorMessage = 'error';
      throw errorMessage
    }

  },
  async searchCategoryList(io_data){
    io_data = {
      iv_number: 1,
      iv_lastid: 1,
      iv_cmid:1,
    }
    try {
      const lo_data ={
        uuid: 1,
        iv_cmid: io_data.iv_cmid,
        iv_lastid: io_data.iv_lastid,
        iv_number: io_data.iv_number,
      }
      const searchCategoryResult = await ProductAPI.searchCategoryList(lo_data);

      if(searchCategoryResult.ev_error === 0 ){
        const eo_data ={
          searchCategoryList:searchCategoryResult.ea_prod,
        }
        return testData
      }else{
        const errorMessage = searchCategoryResult.ev_message;
        throw errorMessage
      }
    } catch (e) {
      const errorMessage = 'error';
      throw errorMessage
    }

  },
  async searchThemeList(io_data){
    io_data = {
      iv_number: 1,
      iv_lastid: 1,
      iv_tmid:1,
    }
    try {
      const lo_data ={
        uuid: 1,
        iv_tmid: io_data.iv_tmid,
        iv_lastid: io_data.iv_lastid,
        iv_number: io_data.iv_number,
      }
      const themeListResult = await ProductAPI.searchThemeList(lo_data);

      if(themeListResult.ev_error === 0 ){
        const eo_data ={
          categoryList:themeListResult.ea_prod,
        }
        return eo_data
      }else{
        const errorMessage = themeListResult.ev_message;
        throw errorMessage
      }
    } catch (e) {
      const errorMessage = 'error';
      throw errorMessage
    }

  },
  async getHomeData(io_data){
    // console.log(testData)
    // const returnData = {
    //   banner: testData.ea_banner,
    //   theme: testData.ea_theme,
    //   ev_error: testData.ev_error,
    //   ev_message:testData.ev_message
    // }
    // return returnData
    try {
      const lo_data ={
        uuid: 1,
      }
      const homeDataResult = await ProductAPI.getHomeData(lo_data);
      console.log('xxxx', homeDataResult.ea_theme);
      if(homeDataResult.ev_error === 0 ){
        const eo_data ={
          bannerList:homeDataResult.ea_banner,
          themeList: homeDataResult.ea_theme,
        }
        this.updateAPICache(eo_data);
        return eo_data
      }else{

        const errorMessage = homeDataResult.ev_message;
        throw errorMessage
      }
    } catch (e) {
      console.log(e)
      const errorMessage = 'error';
      throw errorMessage
    }

  },
  updateAPICache(iv_json) {
      const cache_key = 'home_cache';
      const json = JSON.stringify(iv_json);
      const lo_result = { cache_key, json };
      sbox_addAPICache(lo_result);
  },
  getAPICache(){
      let ea_APICache = sbox_getAPICache('home_cache');
      return ea_APICache;
  },
  async getSingleProduct(spu_id){
    try {
      const lo_data ={
        iv_spu_id: spu_id,
        authortoken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE0ODkwODk2MDAsImxhc3Rsb2dpbiI6MTQ4MzA0NzU4OH0.EPjeu-klo-ygKwUvdyVspIWeaHoosCNPdaa1pO4_RsY',
      }
      const singleProductResult = await ProductAPI.getSingleProduct(lo_data);
      console.log(singleProductResult)
      if(singleProductResult.ev_error === 0 ){
        return singleProductResult.eo_spu_base
      }else{
        const errorMessage = singleProductResult.ev_message;
        throw errorMessage
      }
    } catch (e) {
      const errorMessage = 'error';
      throw errorMessage
    }

  },

  addToCart({selectedProduct}) {
    if(selectedProduct.quantity <= 0) {
      return
    }  else {
      sbox_updateBox(selectedProduct);
       }
  }
}
