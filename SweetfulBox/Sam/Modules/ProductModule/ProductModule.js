import ProductAPI from './ProductAPI';

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
        return eo_data
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

      if(homeDataResult.ev_error === 0 ){
        const eo_data ={
          banner:homeDataResult.ea_banner,
          theme: homeDataResult.ea_theme,
        }
        return eo_data
      }else{
        const errorMessage = homeDataResult.ev_message;
        throw errorMessage
      }
    } catch (e) {
      const errorMessage = 'error';
      throw errorMessage
    }

  },
  async getSingleProduct(io_data){

    try {
      const lo_data ={
        authortoken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE0ODkwODk2MDAsImxhc3Rsb2dpbiI6MTQ4MzA0NzU4OH0.EPjeu-klo-ygKwUvdyVspIWeaHoosCNPdaa1pO4_RsY',
        iv_pmid: 1,
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
}
