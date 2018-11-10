'use strict'
import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modalbox';
import DateKey from './dateKey'
import NumKey from './numKey'
const {height, width} = Dimensions.get('window');
const deviceWidth = width;
const deviceHeight = height;
var that;
export default class KeyboardView extends Component{


    constructor(props){
      super(props)
      this.state = {
          text:""
      }
      that = this;

    }
    _rednerBtn() {
      const submitButtonColor = this.props.isInfoFilled? this.props.submitButtonFinishedColor: this.props.submitButtonDefaultColor;
      if(this.props.showLoading){
        return(
          <View style={[styles.submitButton,
                {backgroundColor:submitButtonColor}]}>
                <Image source={require('./Img/Loading_dots_white.gif')}  style={{width:45,height:15}}/>
          </View>
        )
      }else{
        return(
          <TouchableWithoutFeedback onPress={this.props.handleSubmitPress}>
            <View style={[styles.submitButton,
                  {backgroundColor:submitButtonColor}]}>
                  <Text style={{color:'white', fontSize:27}}
                        allowFontScaling={false}>
                        SAVE
                  </Text>
            </View>
          </TouchableWithoutFeedback>
        )
      }
    }
    render(){


        return(
          <Modal style={styles.modal}
                  position={"bottom"}
                  backdrop={this.props.backDrop}
                  isOpen={this.props.isOpen}
                  swipeToClose={this.props.swipeToClose}>
                {this._rednerBtn()}
              <ScrollView style={styles.modalScroll}
                          scrollEnabled={false}
                          horizontal={true}
                          ref={(ref)=>that.scrollRef = ref}
              >
                <View style={{flexDirection:'row',flex:1}}>
                          <View style={styles.modalContainer}>
                            <NumKey isCVVOpen = {this.props.isCVVOpen}
                                    inputFunc = {(num)=>{this.props.inputNumber(num)}}
                                    deleteFunc = {()=>{this.props.deleteNumber()}}/>
                          </View>
                          <View style={styles.modalContainer}>
                            <DateKey inputFunc = {(date)=>{this.props.inputDate(date)}}/>
                          </View>
                  </View>
              </ScrollView>
          </Modal>

        )
    }
    scrollTo(type){
      if(type == 'number'){
          that.scrollRef.scrollTo({x: 0, y: 0, animated: true});
      }
      else if(type == 'date'){
        that.scrollRef.scrollToEnd({animated: true});
      }
    }
}


KeyboardView.defaultProps = {
  submitButtonDefaultColor: '#d9d9d9',
  submitButtonFinishedColor: '#ff768b',
  backDrop:false,
  isOpenL:true,
  swipeToClose:false,
};

const styles = StyleSheet.create({
  modal: {
    height: 300,
    width: deviceWidth,

  },
  modalScroll:{
    flex:1,
  },
  modalContainer:{
    width:deviceWidth,
    height:300,
  },
  submitButton: {
    height:60,
    alignItems:'center',
    justifyContent:'center',
  }
});
