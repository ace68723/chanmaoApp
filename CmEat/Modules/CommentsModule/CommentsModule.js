'use strict';
const   CommentsApi        = require( './CommentsApi');
const  Alert          = require('../System/Alert');
const  CommentsModule = {
  async addReview(io_data){
    const addReviewResult = await CommentsApi.addReview(io_data);
    const res = addReviewResult;
    if(res.ev_error != 0){
      Alert.errorAlert(res.ev_message)
    }
    return addReviewResult;
  },
}
module.exports = CommentsModule;
