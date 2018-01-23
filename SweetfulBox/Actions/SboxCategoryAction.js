import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import SboxCategoryModule from '../Modules/SboxCategoryModule/SboxCategoryModule';
export default {
  async addSearchKeyword(io_data) {
      try{
        // Save to local history
        const ea_searchKeyword = SboxCategoryModule.addSearchKeyword(io_data);
        // Go search
        //const data = await SboxCategoryModule.defaultFunc(io_data);
        // const data = await SboxCategoryModule.getLocalHistory();

        dispatch({
            actionType: SboxConstants.ADD_SEARCH_KEYWORD
        })
      }catch(error){
        console.log(error)
      }
    },
  async iniSearchKeyword() {
    try{
      // init search keyword
      SboxCategoryModule.iniSearchKeyword();
      dispatch({
          actionType: SboxConstants.INIT_SEARCH_KEYWORD
      })
    }catch(error){
      console.log(error)
    }
  },
  async getSearchKeyword() {
    try{
      // init search keyword
      const ea_searchKeyword = SboxCategoryModule.getSearchKeyword();
      const data = {ea_searchKeyword}
      dispatch({
          actionType: SboxConstants.GET_SEARCH_KEYWORD,data
      })
    }catch(error){
      console.log(error)
    }
  }
}
