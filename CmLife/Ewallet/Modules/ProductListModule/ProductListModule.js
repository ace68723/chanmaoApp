
import ProductListAPI from './ProductListAPI';
export default  {
  async getProductList(){
    try {
      const result = await ProductListAPI.getProductList();
      if(result.ev_error === 0 ){
        console.log(result);
        return result.product_list;
      }else{
        const errorMessage = result.ev_message;
        throw errorMessage;
        console.log(errorMessage)
      }
    } catch (error) {
      throw error;
      console.log(error)
    }
  }
}
