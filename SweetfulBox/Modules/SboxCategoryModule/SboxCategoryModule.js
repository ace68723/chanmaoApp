import {sbox_addSearchKeyword,
        sbox_initSearchKeyword,
        sbox_getSearchKeyword} from '../../../App/Modules/Database';
import moment from "moment";

export default  {
  init(){
    this.searchHistory = [];
  },
  async defaultFunc(io_data) {
    try {
      const lo_data = {}
      const res = await SboxCategoryAPI.getDefaultData(lo_data);
      return res;
    } catch (e) {
      throw e;
    }
  },
  getLocalHistory(){
    if (this.searchHistory) {
      return this.searchHistory;
    }
    return [];
  },
  addSearchKeyword(iv_keyword) {
    const timestamp = moment().valueOf();
    const keyword = iv_keyword;
    const lo_newKeyword = { timestamp, keyword };
    sbox_addSearchKeyword(lo_newKeyword);

    // this.searchHistory.push(new_history);
    // console.log(this.searchHistory);
  },
  clearLocalHistory(keyword) {
    this.searchHistory.length = 0;
  },
  iniSearchKeyword() {
    sbox_initSearchKeyword();
  },
  getSearchKeyword() {
    const ea_searchKeyword = sbox_getSearchKeyword();
    return ea_searchKeyword
  }
}
