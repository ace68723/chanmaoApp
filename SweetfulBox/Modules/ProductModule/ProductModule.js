import ProductAPI from './ProductAPI';
import {sbox_addAPICache,sbox_getAPICache} from '../../../App/Modules/Database';
import {sbox_getItemById} from '../Database';
import {
  sbox_getAllBoxes,
  sbox_updateAllBoxes,
  sbox_getBox,
  sbox_addItemToCart,
  sbox_getCartQuantity,
  sbox_getAllItemsFromCart,
  sbox_rewriteCartListStock
} from '../Database';

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

      if(singleProductResult.ev_error === 0 ){
        singleProductResult.eo_spu_base.sku_list.forEach((sku) => {
          sku.sku_quantity = 1;
        })
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

  addToCart(selectedProduct) {
    const {sku_quantity, sku_id, sku_amount} = selectedProduct;
    let db_sku_quantity = 0;
    if(sbox_getItemById(sku_id)){
        db_sku_quantity = sbox_getItemById(sku_id).sku_quantity;
    }

    if(sku_quantity <= 0 ||
       sku_quantity + db_sku_quantity > sku_amount
    ) {
      throw "库存不足"
    }  else {
      sbox_addItemToCart(selectedProduct);
      return
    }
  },
  async checkStock() {
    try {
      const cart_list = sbox_getAllItemsFromCart();
      console.log(cart_list)
      if(cart_list.length === 0) {
        console.log('cart empty')
        return
      } else {
        const lo_data ={
          ia_prod: cart_list,
          authortoken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE0ODkwODk2MDAsImxhc3Rsb2dpbiI6MTQ4MzA0NzU4OH0.EPjeu-klo-ygKwUvdyVspIWeaHoosCNPdaa1pO4_RsY',
        }
        const productStock = await ProductAPI.checkStock(lo_data);
        sbox_rewriteCartListStock(productStock.ea_prod);
        if(productStock.ev_error === 0 ){
  
          return productStock
        }else{
          const errorMessage = productStock.ev_message;
          throw errorMessage
        }
      }
    } catch (e) {
      const errorMessage = 'error';
      throw errorMessage
    }
  }
}
