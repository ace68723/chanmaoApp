'use strict'
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';

import KeyboardView from './keyboardView'
const {height, width} = Dimensions.get('window');
const deviceWidth = width;
const deviceHeight = height;
import Marker from './marker'
var that;
export default class CMKeyBoard extends Component {
    constructor(props){
      super(props);
      that=this;

      this.state = {
          isNumOpen:false,
          isDateOpen:false,
          isCVVOpen:false,
          text:"",
          expMonth:"MM",
          expYear:"YYYY",
          cvv:"",
          infoFilled:false,

          InputSelected:false,

          opacityExpWord:new Animated.Value(0),
          opacityCVVWord:new Animated.Value(0),

          bounceValueCardNumTop: new Animated.Value(0.05*height),
          bounceValueCardNumLeft: new Animated.Value(50),
          bounceValueCardNumFontSize: new Animated.Value(20),
          bounceValueDateTop: new Animated.Value(0.05*height),
          bounceValueDateFontSize: new Animated.Value(20),

          bounceValueCVVTop: new Animated.Value(0.05*height),
          bounceValueCVVFontSize: new Animated.Value(20),
        }
    }


    _showKeyboard(type){

        this._BlurDateKeyboard();
        if(type == "cardNum"){
          if(this.refs._KeyboardView){
              this.refs._KeyboardView.scrollTo('number');
          }
          this.setState({isNumOpen:true,isDateOpen:false,isCVVOpen:false},()=>{
            this.refs._KeyboardView.scrollTo('number');
          });
          this._BlurCVV();
          Animated.parallel([
            Animated.timing(
            this.state.bounceValueCardNumTop,
            {
              toValue: 0,
              friction: 1,
              duration:300
            }),
            Animated.timing(
            this.state.bounceValueCardNumLeft,
            {
              toValue: 0,
              friction: 1,
              duration:300
            }),
            Animated.timing(
            this.state.bounceValueCardNumFontSize,
            {
              toValue: 15,
              friction: 1,
              duration:300
            }),
          ]).start();


        }else{
          this.setState({isNumOpen:false,isDateOpen:false,isCVVOpen:true});
          this._BlurCardNumber();
          if(this.refs._KeyboardView){
              this.refs._KeyboardView.scrollTo('number');
          }
          Animated.parallel([
            Animated.timing(
            this.state.bounceValueCVVTop,
            {
              toValue: 0,
              friction: 1,
              duration:300
            }),
            Animated.timing(
            this.state.bounceValueCVVFontSize,
            {
              toValue: 15,
              friction: 1,
              duration:300
            }),
            Animated.timing(
            this.state.opacityCVVWord,
            {
              toValue: 1,
              friction: 1,
              duration:300
            }),
          ]).start();
        }

    }
    _BlurCardNumber() {

      this.setState({isNumOpen:false});
      if(this.state.text ==""){
            Animated.parallel([
              Animated.timing(
              this.state.bounceValueCardNumTop,
              {
                toValue: 0.05*height,
                friction: 1,
                duration:300
              }),
              Animated.timing(
              this.state.bounceValueCardNumLeft,
              {
                toValue: 50,
                friction: 1,
                duration:300
              }),
              Animated.timing(
              this.state.bounceValueCardNumFontSize,
              {
                toValue: 20,
                friction: 1,
                duration:300
              }),
            ]).start();
      }
    }
    _showDateKeyboard(){
        this.setState({isNumOpen:false,isDateOpen:true,isCVVOpen:false});
        this._BlurCVV();
        this._BlurCardNumber();
        setTimeout( ()=> {
          if(this.refs._KeyboardView){
              this.refs._KeyboardView.scrollTo('date');;
          }
        }, 300);

        Animated.parallel([
          Animated.timing(
          this.state.bounceValueDateTop,
          {
            toValue: 0,
            friction: 1,
            duration:300,

          }),
          Animated.timing(
          this.state.bounceValueDateFontSize,
          {
            toValue: 15,
            friction: 1,
            duration:300
          }),
          Animated.timing(
          this.state.opacityExpWord,
          {
            toValue: 1,
            friction: 1,
            duration:300
          }),

        ]).start();
    }
    _BlurDateKeyboard(){

      this.setState({isDateOpen:false});
      if(this.state.expMonth =="MM" && this.state.expYear =="YYYY"){
            Animated.parallel([
              Animated.timing(
              this.state.bounceValueDateTop,
              {
                toValue: 0.05*height,
                friction: 1,
                duration:300
              }),
              Animated.timing(
              this.state.bounceValueDateFontSize,
              {
                toValue: 20,
                friction: 1,
                duration:300
              }),
              Animated.timing(
              this.state.opacityExpWord,
              {
                toValue: 0,
                friction: 1,
                duration:300
              }),
            ]).start();
      }
    }
    _BlurCVV(){
      this.setState({isCVVOpen:false});
      if(this.state.cvv == ""){
          Animated.parallel([
            Animated.timing(
            this.state.bounceValueCVVTop,
            {
              toValue: 0.05*height,
              friction: 1,
              duration:300
            }),
            Animated.timing(
            this.state.bounceValueCVVFontSize,
            {
              toValue: 20,
              friction: 1,
              duration:300
            }),
            Animated.timing(
            this.state.opacityCVVWord,
            {
              toValue: 0,
              friction: 1,
              duration:300
            }),
          ]).start();
      }
    }

    _valid(){
      if(this.state.text.length == 19 && this.state.cvv.length == 3 && this.state.expYear != "YYYY" && this.state.expMonth !="MM"){
        this.setState({infoFilled:true})
      }else{
        this.setState({infoFilled:false})
      }
    }
    _renderKeyboard(isOpenObj){
      let isOpen = isOpenObj.isNumOpen || isOpenObj.isCVVOpen || isOpenObj.isDateOpen;
      if(isOpen){
        return(
          <KeyboardView ref="_KeyboardView"
                      isOpen={isOpen}
                      inputNumber={(num)=>{this.state.isNumOpen?this.inputNumber(num):this.inputCVV(num)}}
                      inputDate={(date)=>this.inputDate(date)}
                      deleteNumber={()=>{this.state.isNumOpen?this.deleteNumber():this.deleteCVV()}}
                      isInfoFilled={this.state.infoFilled}
                      submitButtonDefaultColor='#d9d9d9'
                      submitButtonFinishedColor='#ff768b'
          />
        )
      }

    }

    inputNumber(input:number){
      if(this.state.text.length < 19){
          if(this.state.text.length == 4 || this.state.text.length == 9 || this.state.text.length == 14){
              var num = input.toString();
              this.setState({text:this.state.text+ " " + num});
            }else{
              var num = input.toString();
              this.setState({text:this.state.text+num},()=>{that._valid()});
            }
      }
    }
    inputCVV(input:number){
        if(this.state.cvv.length < 3){
           var inputCVV = input.toString();
           this.setState({cvv:this.state.cvv+inputCVV},()=>{that._valid()});

         }
    }
    inputDate(input:object){
        this.setState({
          expMonth:input.month,
          expYear:input.year,
        }, ()=>{that._valid()})
    }

    deleteNumber(){
        if(this.state.text.length > 0){
          if(this.state.text.charAt(this.state.text.length-1) == " "){
            let newStr = this.state.text.substring(0, this.state.text.length-2);
            this.setState({text:newStr,infoFilled:false});
          }else{
            let newStr = this.state.text.substring(0, this.state.text.length-1);
            this.setState({text:newStr,infoFilled:false});
          }
        }else{
          this.setState({isNumOpen:false,infoFilled:false});
          {this._BlurCardNumber()};
        }
    }
    deleteCVV(){
        if(this.state.cvv.length > 0){
          let newStr = this.state.cvv.substring(0, this.state.cvv.length-1);
          this.setState({cvv:newStr,infoFilled:false});
        }else{
          this.setState({isCVVOpen:false,infoFilled:false});
          {this._BlurCVV()};
        }
    }

    _renderNumMarker(){
        if(this.state.isNumOpen){
          return(<Marker/>)
        }
    }
    _renderCVVMarker(){
        if(this.state.isCVVOpen){
          return(<Marker/>)
        }
    }
    render(){
        return(
          <View style={{flex:1,backgroundColor:"#ffffff"}}>
              <View style={styles.infoContainer}>
                <View style={styles.cardNo}>
                  <TouchableWithoutFeedback onPress={()=>{this._showKeyboard("cardNum")}} >
                      <View style={styles.input}>

                                <Animated.Text style={{
                                    position:'absolute',
                                    left:this.state.bounceValueCardNumLeft,
                                    bottom:0,
                                    fontSize:this.state.bounceValueCardNumFontSize,
                                    top:this.state.bounceValueCardNumTop,
                                  }}>

                                    <Text style={{fontSize:16,color:'#6d6e71'}}
                                          allowFontScaling={false}>信用卡号</Text>
                                </Animated.Text>

                                <View style={{height:25,width:36,marginTop:35}}>
                                  <Image source={require('./Img/icon_creditcard.png')} style={{height:25,width:36,opacity:0.5}}/>
                                </View>

                                <View style={{height:40 ,width:300,marginTop:30,marginLeft:15,flexDirection:'row'}} >
                                      <Text style={{fontSize:25,backgroundColor:'transparent'}}
                                            allowFontScaling={false}>{this.state.text}</Text>
                                      {this._renderNumMarker()}
                                </View>

                      </View>
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.cardDetails}>

                    <View style={styles.otherInfo}>
                      <View style={styles.title}>
                          <View style={{flex:1}}>
                              <Animated.Text style={{
                                backgroundColor:'white',
                                position:'absolute',
                                left:0,
                                fontSize:this.state.bounceValueDateFontSize,
                                top:this.state.bounceValueDateTop,
                              }}>
                                <Text style={{fontSize:16,color:'#6d6e71'}}
                                      allowFontScaling={false}>有效期至</Text>
                              </Animated.Text>

                          </View>

                      </View>
                      <TouchableWithoutFeedback onPress={()=>{this._showDateKeyboard()}} >
                          <View style={styles.input}>
                                <View style={{flex:0.9, marginTop:10}}>
                                    <Animated.Text style={{
                                      opacity:this.state.opacityExpWord,
                                    }}>
                                      <Text style={{fontSize:25}}
                                            allowFontScaling={false}>
                                            {this.state.expMonth}/{this.state.expYear}
                                      </Text>
                                    </Animated.Text>
                                </View>
                                <View style={{flex:0.1,paddingTop:15}}>

                                </View>
                          </View>
                      </TouchableWithoutFeedback>
                    </View>

                    <TouchableWithoutFeedback onPress={()=>{this._showKeyboard("CVV")}} >
                        <View style={styles.otherInfo}>
                              <View style={styles.title}>
                                  <View style={{flex:1}}>
                                    <Animated.Text style={{
                                      backgroundColor:'white',
                                      position:'absolute',
                                      left:0,
                                      fontSize:this.state.bounceValueCVVFontSize,
                                      top:this.state.bounceValueCVVTop,
                                    }}>
                                      <Text style={{fontSize:16,color:'#6d6e71'}} allowFontScaling={false}>CVV</Text>
                                    </Animated.Text>

                                  </View>

                              </View>

                              <View style={styles.input}>
                                <View style={{flex:0.9, marginTop:10}}>
                                  <Animated.Text style={{
                                    opacity:this.state.opacityCVVWord,
                                  }}>
                                    <View style={{height:40 ,width:100,flexDirection:'row' }} >
                                      <Text style={{fontSize:25,backgroundColor:'transparent'}}
                                            allowFontScaling={false}>
                                                  {this.state.cvv}</Text>
                                        {this._renderCVVMarker()}
                                    </View>
                                  </Animated.Text>
                                </View>
                                <View style={{flex:0.1,paddingTop:15}}>
                                </View>
                              </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
              </View>
              <View style={{flex:0.7}}>

              </View>
              {this._renderKeyboard({
                            isNumOpen:this.state.isNumOpen,
                            isDateOpen:this.state.isDateOpen,
                            isCVVOpen:this.state.isCVVOpen,
                          })}
          </View>
        )
    }
  }
