import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';
import { cme_getLanguage, cme_getRegion } from '../../Modules/Database';
const {width,height} = Dimensions.get('window');
if(height == 812){
  iconMargin = 50
}else{
  iconMargin = 0
}
const sizeScale = width / 375;
let isDaytime = true;
let intervalIndicator;
let language;
let region;
export default class StartupAnimation extends Component {
    constructor(props){
      super(props);
      this.state = {
        isTopLeftButtonPressed: false,
        isTopRightButtonPressed: false,
        isBottomLeftButtonPressed: false,
        isBottomRightButtonPressed: false,
        isAnimationRunning:true,
        topLeftIconTop: new Animated.Value(0),
        topRightIconTop: new Animated.Value(0),
        bottomLeftIconBottom: new Animated.Value(0),
        bottomRightIconBottom: new Animated.Value(0),//* sizeScale),

        dayIndicatorSize: new Animated.Value(0),
        dayIndicatorMoveTop:new Animated.Value(0),
        dayIndicatorHorizontalMove: new Animated.Value(10),
        dayIndicatorRotation: new Animated.Value('0deg'),

        opacity: new Animated.Value(0),

      }
      language = cme_getLanguage();
      region = cme_getRegion();
      this._fadeOut = this._fadeOut.bind(this);
      this.startDayIndicatorAnim = this.startDayIndicatorAnim.bind(this);

      const currentTime = new Date();
      if(currentTime.getHours() >= 18 || currentTime.getHours() <= 6)
        isDaytime = false;

    }
    componentDidMount() {
      Animated.sequence([
        Animated.timing(
          this.state.opacity,
          {
            toValue:1,
            duration:2000
          }
        ),
        Animated.parallel([
          Animated.timing(                  // Animate over time
            this.state.topLeftIconTop,            // The animated value to drive
            {
              toValue: 100,
              duration: 600,
              delay: 900
            }
          ),
          Animated.timing(                  // Animate over time
            this.state.topRightIconTop,            // The animated value to drive
            {
              toValue: 100,
              duration: 800,
              delay:600
            }
          ),
          Animated.timing(                  // Animate over time
            this.state.bottomLeftIconBottom,            // The animated value to drive
            {
              toValue: 100,
              duration: 1100,
              delay: 300
            }
          ),
          Animated.timing(                  // Animate over time
            this.state.bottomRightIconBottom,            // The animated value to drive
            {
              toValue: 100,
              duration: 1300,
              delay:0
            }
          ),
          Animated.timing(                  // Animate over time
            this.state.dayIndicatorSize,            // The animated value to drive
            {
              toValue: 60 * sizeScale,
              delay: 1500
            }
          ),
        ])
      ]).start();

      setTimeout(()=>{this.setState({isAnimationRunning:false})},3300)
      this.startDayIndicatorAnim();
    }
    startDayIndicatorAnim(){
      intervalIndicator = setInterval(()=>{
        Animated.sequence([
          Animated.timing(
            this.state.dayIndicatorHorizontalMove,
            {
              toValue: 60* sizeScale,
              duration:1800
            }
          ),
          Animated.timing(
            this.state.dayIndicatorHorizontalMove,
            {
              toValue: 0,
              duration:1800
            }
          ),
        ]).start()
      },3800)
    }
    _fadeOut(){
      Animated.timing(
        this.state.opacity,
        {
          toValue: 0,
          duration: 1000
        }
      ).start();
    }
    fadeIn(){  //fade in after model shown
        Animated.timing(
          this.state.opacity,
          {
            toValue: 1,
            duration: 500
          }
        ).start();
        this.startDayIndicatorAnim();
    }
    render() {
      const region = cme_getRegion();
      if(region === '1'){
        return (
          <Animated.View style={[styles.container,{opacity: this.state.opacity}]}>
            <Image style={{
                position:'absolute',
                width:width,
                height:height,
              }}
              source={isDaytime ? require('./image/background/trtDaytime.png') : require('./image/background/trtNighttime.png')} />
            {this.renderDayIndicator()}
            {this.renderTopLeftIcon()}
            {this.renderTopRightIcon()}
            {this.renderBottomLeftIcon()}
            {this.renderBottomRightIcon()}

            {this.renderTopLeftButton()}
            {this.renderTopRightButton()}
            {this.renderBottomLeftButton()}
            {this.renderBottomRightButton()}
          </Animated.View>
        );
      }else{
        return (
          <Animated.View style={[styles.container,{opacity: this.state.opacity}]}>
            <Image style={{
                position:'absolute',
                width:width,
                height:height,
              }}
              source={isDaytime ? require('./image/background/otherDaytime.png') : require('./image/background/otherNighttime.png')} />
            {this.renderDayIndicator()}

            {this.renderTopLeftIcon()}
            {this.renderTopRightIcon()}

            {this.renderTopLeftButton()}
            {this.renderTopRightButton()}

          </Animated.View>
        );
      }

    }
    renderDayIndicator(){
      const spin = this.state.dayIndicatorHorizontalMove.interpolate(
        {
          inputRange:  [0, 60],
          outputRange: ['0deg', '-45deg'],
        }
      )
      const moveUp = this.state.dayIndicatorHorizontalMove.interpolate(
        {
          inputRange:  [0, 15, 30, 45 ,60],
          outputRange: [ 0, -3, -6, -3, 0],
        }
      )
      return(
        <View style={{
          position:'absolute',
          top:parseInt(20 * sizeScale),
          right:parseInt(20 * sizeScale),
          marginTop:iconMargin,
        }}>
          <Animated.Image style={{
            height:this.state.dayIndicatorSize,
            width:this.state.dayIndicatorSize,
            transform:[{rotate: spin}],
            top: moveUp,
            right:this.state.dayIndicatorHorizontalMove
            }} source={ isDaytime ? require('./image/weather/sun.png') : require('./image/weather/moon.png')}/>
          <View style={{
            position:'absolute',
            top:parseInt(30 * sizeScale),
            right:parseInt(20* sizeScale)}} >
            <Image style={{height: 70*0.619*sizeScale, width: 70*sizeScale}}  source={isDaytime?require('./image/weather/cloud-day.png') : require('./image/weather/cloud-night.png')} />
          </View>

        </View>
      )
    }
    renderTopLeftIcon(){
      let jump,picSize,left;
      if(region === '1'){
        left = parseInt(-35* sizeScale);
        picSize = parseInt(310 * sizeScale);
        jump = this.state.topRightIconTop.interpolate({
          inputRange:[0, 80, 90, 95 , 97.5 ,100],
          outputRange: [ -300*sizeScale, -30*sizeScale, -40*sizeScale, -30*sizeScale, -35*sizeScale , -30*sizeScale]
        })
      }else{
        left = parseInt(-50* sizeScale);
        picSize = parseInt(310 * sizeScale);
        jump = this.state.topRightIconTop.interpolate({
          inputRange:[0, 80, 90, 95 , 97.5 ,100],
          outputRange: [ -300*sizeScale, 20*sizeScale, 10 *sizeScale, 20*sizeScale, 15*sizeScale , 20*sizeScale]
        })
      }


      let pressedIcon = language === 'chinese_simple' ? require('./image/houseChinese/constructingPressed.png') : require('./image/houseEnglish/constructingPressed.png');
      let unpressedIcon = language === 'chinese_simple' ? require('./image/houseChinese/constructingUnpressed.png') : require('./image/houseEnglish/constructingUnpressed.png');
      return(
        <Animated.View style={{
          backgroundColor:'transparent',
          position:'absolute',
          marginTop:iconMargin,
          top: jump,
          left: left}}>
          <Image style={{
            height:picSize,
            width:picSize,
            }}
            source={pressedIcon} />
        </Animated.View>
      );
    }
    renderTopLeftButton(){
      let top = region === '1' ? parseInt(-50*sizeScale) : parseInt(-15*sizeScale);
      return (
          <TouchableWithoutFeedback
            onPressIn={()=>this.setState({isTopLeftButtonPressed:true})}
            onPressOut={()=>this.setState({isTopLeftButtonPressed:false})}
            disabled={this.state.isAnimationRunning}
          >
            <View style={{
              transform:[{rotate:'55deg'}],
              backgroundColor:'transparent',
              position:'absolute',
              height:parseInt(300 * sizeScale),
              width:parseInt(250 * sizeScale),
              marginTop:iconMargin,
              top: top,
              left:parseInt(-20* sizeScale)}}>
            </View>
          </TouchableWithoutFeedback>
      );
    }

    renderTopRightIcon(){

      let jump;
      let picSize;
      let right;
      if(region === '1'){
        picSize = parseInt(310 * sizeScale);
        right = parseInt(-40* sizeScale);
        jump = this.state.topRightIconTop.interpolate({
          inputRange:[0, 80, 90, 95 , 97.5 ,100],
          outputRange: [ -300*sizeScale, 155*sizeScale, 145*sizeScale, 155*sizeScale, 150*sizeScale , 155*sizeScale]
        })
      }else{
        picSize = parseInt(330 * sizeScale);
        right = parseInt(-50* sizeScale);
        jump = this.state.topRightIconTop.interpolate({
          inputRange:[0, 80, 90, 95 , 97.5 ,100],
          outputRange: [ -300*sizeScale, 275*sizeScale, 265*sizeScale, 275*sizeScale, 270*sizeScale , 275*sizeScale]
        })
      }

      let pressedIcon = language === 'chinese_simple' ? require('./image/houseChinese/chanmaoPressed.png') : require('./image/houseEnglish/chanmaoPressed.png');
      let unpressedIcon = language === 'chinese_simple' ? require('./image/houseChinese/chanmaoUnpressed.png') : require('./image/houseEnglish/chanmaoUnpressed.png');
      return(
        <Animated.View style={{
          backgroundColor:'transparent',
          position:'absolute',
          top: jump,
          marginTop:iconMargin,
          right: right }}>
            <Image style={{
              height: picSize,
              width: picSize,
              }}
              source={this.state.isTopRightButtonPressed ? pressedIcon : unpressedIcon} />
        </Animated.View>
      );
    }
    renderTopRightButton(){
      let buttonWidth,top;
      if(region === '1'){
        buttonWidth = parseInt(210 * sizeScale);
        top = parseInt(120 * sizeScale);
      }else{
        buttonWidth = parseInt(260 * sizeScale);
        top = parseInt(250 * sizeScale);
      }
      return (
        <TouchableWithoutFeedback
          onPressIn={()=>this.setState({isTopRightButtonPressed:true})}
          onPressOut={()=>this.setState({isTopRightButtonPressed:false})}
          onPress={()=>{
            // this._fadeOut();
            clearInterval(intervalIndicator)
            this.props.onPressCMFoodDelivery();
          }}
          disabled={this.state.isAnimationRunning}
        >
          <View style={{
              transform:[{rotate:'58deg'}],
              backgroundColor:'transparent',
              position:'absolute',
              height:parseInt(310 * sizeScale),
              width:buttonWidth,
              top:top,
              marginTop:iconMargin,
              right:parseInt(-5 * sizeScale)}}>
            </View>
        </TouchableWithoutFeedback>
      );
    }

    renderBottomLeftIcon(){
      let jump = this.state.bottomLeftIconBottom.interpolate({
        inputRange:[0, 80, 90, 95 , 97.5 ,100],
        outputRange: [(height +100) * sizeScale, 50*sizeScale, 60*sizeScale, 50*sizeScale, 55*sizeScale , 50*sizeScale]
      })

      let pressedIcon = language === 'chinese_simple' ?  require('./image/houseChinese/eCommercePressed.png') : require('./image/houseEnglish/eCommercePressed.png');
      let unpressedIcon = language === 'chinese_simple' ? require('./image/houseChinese/eCommerceUnpressed.png') : require('./image/houseEnglish/eCommerceUnpressed.png');
      return (
          <Animated.View style={{
            position:'absolute',
            backgroundColor:'transparent',
            bottom: jump,
            marginBottom:iconMargin,
            left:parseInt(-90 * sizeScale)}}>
            <Image style={{
                height:parseInt(310 * sizeScale),
                width:parseInt(310 * sizeScale),
              }}
                source={this.state.isBottomLeftButtonPressed ? pressedIcon : unpressedIcon} />
          </Animated.View>

      );
    }
    renderBottomLeftButton(){
      return(
        <TouchableWithoutFeedback
          onPressIn={()=>this.setState({isBottomLeftButtonPressed:true})}
          onPressOut={()=>this.setState({isBottomLeftButtonPressed:false})}
          onPress={()=>{
            clearInterval(intervalIndicator)
            this.props.onPressCMECommerce();
          }}
          disabled={this.state.isAnimationRunning}
        >
          <View style={{
            position:'absolute',
            transform:[{rotate:'58deg'}],
            backgroundColor:'transparent',
            height:parseInt(310* sizeScale),
            width:parseInt(220* sizeScale),
            bottom:parseInt(37* sizeScale),
            marginBottom:iconMargin,
            left:parseInt(-100 * sizeScale),
          }}>
          </View>
        </TouchableWithoutFeedback>
      );
    }


    renderBottomRightIcon(){
      let jump = this.state.bottomRightIconBottom.interpolate({
        inputRange:[0, 80, 90, 95 , 97.5 ,100],
        outputRange: [((height+100)* sizeScale), -40*sizeScale, -30*sizeScale, -40*sizeScale, -35*sizeScale ,-40*sizeScale]
      })
      let pressedIcon = language === 'chinese_simple' ? require('./image/houseChinese/lifePressed.png') : require('./image/houseEnglish/lifePressed.png');
      let unpressedIcon = language === 'chinese_simple' ? require('./image/houseChinese/lifeConstruction.png') : require('./image/houseEnglish/lifeConstruction.png');
      return (
          <Animated.View style={{
            backgroundColor:'transparent',
            position:'absolute',
            bottom:jump,
            marginBottom:iconMargin,
            right:parseInt(-120 * sizeScale)}}>
            <Image style={{
                height:parseInt(310* sizeScale),
                width:parseInt(310* sizeScale),
              }}
                source={this.state.isBottomRightButtonPressed ? pressedIcon : unpressedIcon} />
          </Animated.View>
      );
    }
    renderBottomRightButton(){
      return(
        <TouchableWithoutFeedback
          onPressIn={()=>this.setState({isBottomRightButtonPressed:true})}
          onPressOut={()=>this.setState({isBottomRightButtonPressed:false})}
          disabled={true}
          onPress={()=>{
            clearInterval(intervalIndicator)
            this.props.onPressCMLife();
          }}
        >
          <View style={{
              height:parseInt(220* sizeScale),
              width:parseInt(180* sizeScale),
              position:'absolute',
              backgroundColor:'transparent',
              bottom:0 * sizeScale,
              marginBottom:iconMargin,
              right:0 * sizeScale}}>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });