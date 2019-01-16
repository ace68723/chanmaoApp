/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  NativeModules,
  TextInput,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';

import Marker from './marker';
import KeyboardView from './keyboardView';

const {height, width} = Dimensions.get('window');

import SboxOrderAction from '../../Actions/SboxOrderAction';
import SboxHeader from '../../../App/Components/General/SboxHeader';

export default class MyComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
        //keyboard state
        isNumOpen:false,
        isDateOpen:false,
        isCVVOpen:false,

        //card Number
        cardNumber:"",
        expMonth:"MM",
        expYear:"YYYY",
        cvv:"",
        focus:'cardNumber',
        //判断是否全部填满信息
        infoFilled:false,

        bounceValueDateTop: new Animated.Value(0.05*height),
        bounceValueDateFontSize: new Animated.Value(20),

        bounceValueCVVTop: new Animated.Value(0.05*height),
        bounceValueCVVFontSize: new Animated.Value(20),

        cardNumAnimated: new Animated.Value(0),
        CVVAnimated:  new Animated.Value(0),
        dateAnimated:  new Animated.Value(0),

        showLoading:false,
      }
      this._showKeyboard = this._showKeyboard.bind(this);
      this._inputNumber = this._inputNumber.bind(this);
      this._inputCVV = this._inputCVV.bind(this);
      this._inputDate = this._inputDate.bind(this);
      this._goBack = this._goBack.bind(this);
      this._handleSubmitPress = this._handleSubmitPress.bind(this);

  }
  _AnimatedValue
  _currentType
  _showKeyboard(type) {
    // 选中输入后进行提示字动画效果
    // let _AnimatedValue
    switch (type) {
      case 'cardNum':
          if(this._AnimatedValue) this._blur(this._AnimatedValue,this._currentType)
          this._currentType = type;
          this._AnimatedValue = this.state.cardNumAnimated;
          this.setState({isNumOpen:true,isDateOpen:false,isCVVOpen:false},()=>{
            this.refs._KeyboardView.scrollTo('number');
          });
        break;
      case 'CVV':
        if(this._AnimatedValue) this._blur(this._AnimatedValue,this._currentType)
          this._currentType = type;
          this._AnimatedValue = this.state.CVVAnimated;
          this.setState({isNumOpen:false,isDateOpen:false,isCVVOpen:true},()=>{
            this.refs._KeyboardView.scrollTo('number');
          });
        break;
      case 'date':
        if(this._AnimatedValue) this._blur(this._AnimatedValue,this._currentType)
          this._currentType = type;
          this._AnimatedValue = this.state.dateAnimated
          this.setState({isNumOpen:false,isDateOpen:true,isCVVOpen:false},()=>{
            setTimeout(() => {
                this.refs._KeyboardView.scrollTo('date');
            }, 10);

          });
        break;
    }

    Animated.timing(
      this._AnimatedValue,
    {
      toValue: 1,
      friction: 1,
      duration:300
    }).start()

  }
  _blur(AnimatedValue,currentType) {
    // .log(currentValue)
    // if(currentValue !== '' ) return
    //
    switch (currentType) {
      case 'cardNum':
            if(this.state.cardNumber == '') {
              Animated.timing(
                AnimatedValue,
              {
                toValue: 0,
                friction: 1,
                duration:300
              }).start()
            }
        break;
      case 'CVV':
          if(this.state.cvv == '') {
            Animated.timing(
              AnimatedValue,
            {
              toValue: 0,
              friction: 1,
              duration:300
            }).start()
          }
        break;
      case 'date':
            if(this.state.expMonth === 'MM'&& this.state.expYear == 'YYYY') {
              Animated.timing(
                AnimatedValue,
              {
                toValue: 0,
                friction: 1,
                duration:300
              }).start()
            }
        break;
    }

  }

  _valid(){
    if(this.state.cardNumber.length == 19 && this.state.cvv.length == 3 && this.state.expYear != "YYYY" && this.state.expMonth !="MM"){
      this.setState({infoFilled:true})
    }else{
      this.setState({infoFilled:false})
    }
  }
  _inputNumber(input:number){
    if(this.state.cardNumber.length < 19){
        if(this.state.cardNumber.length == 4 || this.state.cardNumber.length == 9 || this.state.cardNumber.length == 14){
            var num = input.toString();
            this.setState({cardNumber:this.state.cardNumber+ " " + num});
          }else{
            var num = input.toString();
            this.setState({cardNumber:this.state.cardNumber+num},()=>{
              this._valid();
            });
          }
    }
  }
  _inputCVV(input:number){
      if(this.state.cvv.length < 3){
         var inputCVV = input.toString();
         this.setState({cvv:this.state.cvv+inputCVV},()=>{
             this._valid();
         });

       }
  }
  _inputDate(input:object){
      this.setState({
        expMonth:input.month,
        expYear:input.year,
      }, ()=>{
          this._valid();
      })
  }

  _deleteNumber(){
      if(this.state.cardNumber.length > 0){
        if(this.state.cardNumber.charAt(this.state.cardNumber.length-1) == " "){
          let newStr = this.state.cardNumber.substring(0, this.state.cardNumber.length-2);
          this.setState({cardNumber:newStr,infoFilled:false});
        }else{
          let newStr = this.state.cardNumber.substring(0, this.state.cardNumber.length-1);
          this.setState({cardNumber:newStr,infoFilled:false});
        }
      }else{
        this.setState({infoFilled:false});
      }
  }
  _deleteCVV(){
      if(this.state.cvv.length > 0){
        let newStr = this.state.cvv.substring(0, this.state.cvv.length-1);
        this.setState({cvv:newStr,infoFilled:false});
      }else{
        this.setState({infoFilled:false});
      }
  }

  async _handleSubmitPress() {
    if(!this.state.infoFilled) return;
    try {
      this.setState({showLoading:true})
      const cardNumber = this.state.cardNumber;
      const expMonth = this.state.expMonth;
      const expYear = this.state.expYear;
      const cvv = this.state.cvv;
      const reqData = {cardNumber,expMonth,expYear,cvv};
      const result = await SboxOrderAction.addCard(reqData);
      this.setState({showLoading:false});
      this.props.navigator.dismissModal({
        animationType: 'slide-down'
      });
    } catch (e) {
      this.setState({showLoading:false});
      this.props.navigator.showInAppNotification({
       screen: "Notification",
       passProps: {
         backgroundColor:'#ff768b',
         title:'甜满箱',
         content:'您输入的支付信息输入有误',
       },
       autoDismissTimerSec: 3
      });

    }

  }
  _goBack() {
    this.props.navigator.pop();
    // // dismissAllModals bug

    // setTimeout( () => {
    //   this.props.navigator.dismissModal({
    //     animationType: 'none'
    //   });
    // }, 600);
  }
  _renderNumMarker(){
      if(this.state.isNumOpen){
        return(<Marker/>)
      }
  }
  _renderKeyboard(isOpenObj){
    let isOpen = isOpenObj.isNumOpen || isOpenObj.isCVVOpen || isOpenObj.isDateOpen;
    if(isOpen){
      return(
        <KeyboardView ref="_KeyboardView"
                    isOpen={isOpen}
                    inputNumber={(num)=>{this.state.isNumOpen?this._inputNumber(num):this._inputCVV(num)}}
                    inputDate={(date)=>this._inputDate(date)}
                    deleteNumber={()=>{this.state.isNumOpen?this._deleteNumber():this._deleteCVV()}}
                    isInfoFilled={this.state.infoFilled}
                    submitButtonDefaultColor='#d9d9d9'
                    submitButtonFinishedColor='#ff768b'
                    handleSubmitPress={this._handleSubmitPress}
                    showLoading={this.state.showLoading}
        />
      )
    }

  }
  _renderCVVMarker(){
      if(this.state.isCVVOpen){
        return(<Marker/>)
      }
  }
  _renderCardNo() {
    const bounceValueCardNumbottom =  this.state.cardNumAnimated.interpolate({
      inputRange: [0,1],
      outputRange:[13,40],
    })
    const bounceValueCardNumLeft =  this.state.cardNumAnimated.interpolate({
      inputRange: [0,1],
      outputRange:[50,0],
    })
    const bounceValueCardNumFontSize =  this.state.cardNumAnimated.interpolate({
      inputRange: [0,1],
      outputRange:[20,15],
    })

    return (
      <View style={styles.cardNo}>
        <TouchableWithoutFeedback onPress={this._showKeyboard.bind(null,"cardNum")} >
          <View style={styles.input}>
              <Animated.Text style={{
                  position:'absolute',
                  bottom:bounceValueCardNumbottom,
                  left:bounceValueCardNumLeft,
                  fontSize:bounceValueCardNumFontSize,
                  fontSize:16,
                  color:'#6d6e71',
                }}
                allowFontScaling={false}
                >
                  卡号
              </Animated.Text>

              <View style={{position:'absolute',
                            height:25,
                            width:36,
                            bottom:10}}>
                <Image source={require('./Img/icon_creditcard.png')}
                       style={{ height:25,
                                width:36,
                                opacity:0.5}}/>
              </View>

              <View style={{position:'absolute',
                            height:40 ,
                            width:300,
                            bottom:0,
                            marginLeft:40,
                            flexDirection:'row'}} >
                    <Text style={{fontSize:24,
                                  backgroundColor:'transparent'}}
                          allowFontScaling={false}>
                          {this.state.cardNumber}
                    </Text>
                    {this._renderNumMarker()}
              </View>

          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
  _renderCardDate() {
    const bounceValueDateTop =  this.state.dateAnimated.interpolate({
      inputRange: [0,1],
      outputRange:[0.05*height,0],
    })
    const bounceValueDateFontSize =  this.state.dateAnimated.interpolate({
      inputRange: [0,1],
      outputRange:[20,15],
    })
    const opacityDate =  this.state.dateAnimated.interpolate({
      inputRange: [0,1],
      outputRange:[0,1],
    })
    return(
      <View style={styles.otherInfo}>
          <Animated.Text style={{
              backgroundColor:'white',
              position:'absolute',
              top:bounceValueDateTop,
              left:0,
              fontSize:bounceValueDateFontSize,
              fontSize:16,color:'#6d6e71',
            }}
            allowFontScaling={false}
            >
            有效期至
          </Animated.Text>

          <TouchableWithoutFeedback onPress={this._showKeyboard.bind(null,"date")} >
              <View style={styles.input}>
                  <Animated.View style={{flex:0.9,
                                marginTop:25,
                                opacity:opacityDate,
                              }}>
                        <Text style={{fontSize:23}}
                          allowFontScaling={false}>
                          {this.state.expMonth}/{this.state.expYear}
                        </Text>
                  </Animated.View>
              </View>
          </TouchableWithoutFeedback>


      </View>
    )
  }
  _renderCardCVV() {
    const bounceValueCVVTop =  this.state.CVVAnimated.interpolate({
      inputRange: [0,1],
      outputRange:[0.05*height,0],
    })
    const bounceValueCVVFontSize =  this.state.CVVAnimated.interpolate({
      inputRange: [0,1],
      outputRange:[20,15],
    })
    const opacityCVV =  this.state.CVVAnimated.interpolate({
      inputRange: [0,1],
      outputRange:[0,1],
    })
    return(
      <TouchableWithoutFeedback onPress={this._showKeyboard.bind(null,"CVV")} >
          <View style={styles.otherInfo}>

                <Animated.Text style={{
                    position:'absolute',
                    left:0,
                    fontSize:bounceValueCVVFontSize,
                    top:bounceValueCVVTop,
                    fontSize:16,color:'#6d6e71'
                    }}
                    allowFontScaling={false}
                  >
                  CVV
                </Animated.Text>

                <View style={[styles.input,{backgroundColor:'rgba(0,0,0,0)'}]}>
                  <View style={{flex:0.9, marginTop:10}}>
                    <Animated.View style={{
                                    opacity:opacityCVV,
                                    marginTop:15,
                                    height:40,
                                    width:100,
                                    flexDirection:'row' }} >
                      <Text style={{fontSize:23,backgroundColor:'transparent'}}
                            allowFontScaling={false}>
                            {this.state.cvv}
                      </Text>
                      {this._renderCVVMarker()}
                    </Animated.View>

                  </View>

                  <View style={{flex:0.1,paddingTop:15}}>
                  </View>
                </View>



          </View>
      </TouchableWithoutFeedback>
    )
  }
  _rednerCardDetails() {
    return(
      <View style={styles.cardDetails}>
        {this._renderCardDate()}
        {this._renderCardCVV()}
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <SboxHeader title={this.props.title}
                goBack={this._goBack}
                leftButtonText={'<'}/>
          <View style={styles.infoContainer}>
            {this._renderCardNo()}
            {this._rednerCardDetails()}
          </View>
          {this._renderKeyboard({
                        isNumOpen:this.state.isNumOpen,
                        isDateOpen:this.state.isDateOpen,
                        isCVVOpen:this.state.isCVVOpen,
                      })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#ffffff",
  },
  infoContainer:{
    height:180,
    marginTop:0,
    width:width,
  },
  cardNo:{
    height:90,
    borderBottomWidth:1,
    borderColor:'#d9d9d9',
    marginLeft:20,
    marginRight:20,
  },
  input:{
    flex:1,//0.6
    flexDirection:'row',
    paddingBottom:10,
    marginBottom:5,
  },
  cardDetails:{
    height:90,
    paddingTop:20,
    flexDirection:'row',
  },
  otherInfo:{
    flex:1,
    borderBottomWidth:1,
    borderColor:'#d9d9d9',
    marginLeft:20,
    marginRight:20,
  },
});
