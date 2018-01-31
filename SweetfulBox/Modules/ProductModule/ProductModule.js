import ProductAPI from './ProductAPI';
import {sbox_addAPICache,sbox_getAPICache} from '../../../App/Modules/Database';

import {
  sbox_getAllBoxes,
  sbox_updateAllBoxes,
  sbox_getBox,
  sbox_updateBox,
} from '../../../App/Modules/Database';

const testData =
  {
    ev_error: 0,
    ev_message: "",
    ea_banner: [
      {
          id: 3,
          image: "https://chanmao.us/storage/image/sb_app/home_banner/3_20170828.png",
          type: 3,
          param: "param3"
      },
      {
          id: 1,
          image: "https://chanmao.us/storage/image/sb_app/home_banner/1_20170828.png",
          type: 1,
          param: "param"
      },
      {
          id: 2,
          image: "https://chanmao.us/storage/image/sb_app/home_banner/2_20170828.png",
          type: 2,
          param: "param2"
      }
  ],
    ea_theme: [
        {
            tmid: 6,
            name: "全部产品",
            icon_active: "https://chanmao.us/storage/image/sb_app/theme_icon/5_active_20170828.png",
            icon_inactive: "https://chanmao.us/storage/image/sb_app/theme_icon/5_inactive_20170828.png",
            section_list:[
              {
                section_name: "新品速递",
                section_icon: "https://chanmao.us/storage/image/sb_app/theme_icon/5_active_20170828.png",
                section_id:1
              },
              {
                section_name: "好货热卖",
                section_icon: "https://chanmao.us/storage/image/sb_app/theme_icon/5_active_20170828.png",
                section_id:2
              },
              {
                section_name: "超值特价",
                section_icon: "https://chanmao.us/storage/image/sb_app/theme_icon/5_active_20170828.png",
                section_id:3
              }
            ],
            prod_list: [
              {
                type:'section_left',
                section_id:1
              },
              {
                type:'section',
                section_name: "新品速递",
                section_id:1
              },
              {
                type:'section_right',
                section_id:1
              },
              {
                section_id:1,
                type:'spu',
                spu_id: 54,
                name: "卫龙馋魔芋卫龙馋魔芋卫龙馋魔芋卫龙馋魔芋卫龙馋魔芋卫龙馋魔芋卫龙馋魔芋卫龙馋魔芋卫龙馋魔芋",
                image: "https://chanmao.us/storage/image/sb_app/image/11_20170828.png",
                retail_price: "3.59",
                status:0,
              }, {
                section_id:1,
                type:'spu',
                spu_id: 54,
                name: "卫龙馋魔芋卫龙馋魔芋卫龙馋魔芋卫龙馋魔芋卫龙馋魔芋卫龙馋魔芋卫龙馋魔芋卫龙馋魔芋卫龙馋魔芋",
                image: "https://chanmao.us/storage/image/sb_app/image/31_20170828.png",
                retail_price: "3.59",
                status:0,
              }, {
                section_id:1,
                type:'spu',
                spu_id: 54,
                name: "卫龙馋魔芋",
                image: "https://chanmao.us/storage/image/sb_app/image/13_20170828.png",
                retail_price: "3.59",
                status:2,
              }, {
                type:'section_left',
                section_id:2
              },
              {
                type:'section',
                section_name: "好货热卖",
                section_id:2
              },
              {
                type:'section_right',
                section_id:2
              },
              {
                section_id:2,
                type:'spu',
                spu_id: 54,
                name: "卫龙馋魔芋",
                image: "https://chanmao.us/storage/image/sb_app/image/1_20170828.png",
                retail_price: "3.59",
                status:0,
              }, {
                section_id:2,
                type:'spu',
                spu_id: 54,
                name: "卫龙馋魔芋",
                image: "https://chanmao.us/storage/image/sb_app/image/20_20170828.png",
                retail_price: "3.59",
                status:0,
              }, {
                section_id:2,
                type:'spu',
                spu_id: 54,
                name: "卫龙馋魔芋",
                image: "https://chanmao.us/storage/image/sb_app/image/22_20170828.png",
                retail_price: "3.59",
                status:2,
              }, {
                type:'section_left',
                section_id:3
              },
              {
                type:'section',
                section_name: "超值特价",
                section_id:3
              },
              {
                type:'section_right',
                section_id:3
              },
              {
                section_id:3,
                type:'sku',
                spu_id: 54,
                sku_id: 54,
                name: "卫龙馋魔芋",
                image: "https://chanmao.us/storage/image/sb_app/image/4_20170828.png",
                retail_price: "3.59",
                wholesale_price:"1.52",
                status:0,
              }, {
                section_id:3,
                type:'sku',
                spu_id: 54,
                sku_id: 54,
                name: "卫龙馋魔芋",
                image: "https://chanmao.us/storage/image/sb_app/image/45_20170828.png",
                retail_price: "3.59",
                wholesale_price:"1.52",
                status:0,
              }, {
                section_id:3,
                type:'sku',
                spu_id: 54,
                sku_id: 54,
                name: "卫龙馋魔芋",
                image: "https://chanmao.us/storage/image/sb_app/image/32_20170828.png",
                retail_price: "3.59",
                wholesale_price:"1.52",
                status:2,
              },
            ]
        }
    ]
}

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
      console.log(json)
      const lo_result = { cache_key, json };
      sbox_addAPICache(lo_result);
  },
  getAPICache(){
      let ea_APICache = sbox_getAPICache('home_cache');
      return ea_APICache;
  },
  async getSingleProduct(io_data){

    try {
      const lo_data ={
        authortoken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE0ODkwODk2MDAsImxhc3Rsb2dpbiI6MTQ4MzA0NzU4OH0.EPjeu-klo-ygKwUvdyVspIWeaHoosCNPdaa1pO4_RsY',
        iv_pmid: io_data.pmid,
      }
      const singleProductResult = await ProductAPI.getSingleProduct(lo_data);
      if(singleProductResult.ev_error === 0 ){
        const eo_data ={
          prod_master:singleProductResult.eo_prod_master,
          prod_base: singleProductResult.ea_prod_base,
        }
        return eo_data
      }else{
        const errorMessage = singleProductResult.ev_message;
        throw errorMessage
      }
    } catch (e) {

      const errorMessage = 'error';
      throw errorMessage
    }

  },
  oldAddToCart({selectedProduct,selectedAmount}){
    // const pbid = selectedProduct.pbid;
    // const findProduct = sbox_getProductFormCart(pbid);
    // if(findProduct){
    //   //更新选择的数量
    //   selectedAmount += findProduct.selectedAmount;
    // }
    // //如果更新后的选择数量大于库存 return
    //
    // if(selectedAmount > selectedProduct.amount ) return '数量超出'
    // const boxId = 1;
    //计算当前箱子总共 total Weights
    // const allProductsFormCart = sbox_getAllProductsFormCart();
    // let totalWeights = 0;
    // for (var i = 0; i < allProductsFormCart.length; i++) {
    //
    //   const boxWeights = allProductsFormCart[i].boxWeights;
    //   const selectedAmount = allProductsFormCart[i].selectedAmount;
    //   totalWeights += boxWeights*selectedAmount;
    // }
    if(selectedAmount === 0) return
    let allBoxes = sbox_getAllBoxes()
    let _allBoxes = [];
    for (var i = 0; i < allBoxes.length; i++) {
        const box = allBoxes[i];
        const boxId = box.boxId;
        const boxWeights = box.boxWeights;
        _allBoxes.push({boxId,boxWeights});
    }
      var items = selectedAmount;

      for (var i=0; i<_allBoxes.length; i++)
      {
        var rest = 99 - _allBoxes[i].boxWeights;
        var count = Math.floor( rest/selectedProduct.weights );

        if ( count > items ) count = items;

        if (count>0){
          items = items - count;
          _allBoxes[i].boxWeights = _allBoxes[i].boxWeights + count * selectedProduct.weights;
          const _selectedProduct = Object.assign({},selectedProduct,{selectedAmount:count});
          _allBoxes[i].product = _selectedProduct;
        }
      }

      if (items>0){

        var maximum = Math.floor(99/selectedProduct.weights);
        var addBox = Math.floor(items/maximum);
        if ( items-maximum*addBox>0 ) addBox++;
        for (var i=1;i<=addBox;i++)
        {
         if (items>maximum){
           items = items - maximum;
           const _selectedProduct = Object.assign({},selectedProduct,{selectedAmount:maximum});
           _allBoxes.push({
                            boxId:_allBoxes.length+1,
                            boxWeights:selectedProduct.weights*maximum,
                            product:_selectedProduct,
                          })
         }
          else {
          const _selectedProduct = Object.assign({},selectedProduct,{selectedAmount:items});
           _allBoxes.push({
                            boxId:_allBoxes.length+1,
                            boxWeights:selectedProduct.weights*items,
                            product:_selectedProduct,
                          });
          items=0;
          }
        }
      }
      sbox_updateAllBoxes(_allBoxes);
    //   for (var i=0;i<_allBoxes.length;i++)
    //   {
    //
    //   }
    //   return;
    //
    //
  },
  addToCart({selectedProduct,selectedAmount}) {
    if(selectedAmount <= 0) return
    const box = sbox_getBox();
    let _box = {};
    if(!box){
      _box.boxId = 1;
      _box.boxWeights = 0;
    }else{
      _box.boxWeights = box.boxWeights;
      _box.boxId = box.boxId;
    }


    const boxRoom = 99 - _box.boxWeights;
    if(selectedProduct.weights * selectedAmount >  boxRoom) {
      return('箱子空间满啦')
    }else{
      _box.boxWeights += selectedProduct.weights * selectedAmount;
      const _selectedProduct = Object.assign({},selectedProduct,{selectedAmount:selectedAmount});
      _box.product = _selectedProduct;
      sbox_updateBox(_box);
    }

  }

}
