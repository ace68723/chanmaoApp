import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  Alert
} from 'react-native';
import { cme_getLanguage, cme_getRegion, cme_getHomeIntroCount } from '../../Modules/Database';
import CodePush from "react-native-code-push";
const {width,height} = Dimensions.get('window');
let iconMargin, headerHeight;
if(height == 812){
  iconMargin = 50;
  headerHeight = 75;
}else{
  iconMargin = 0;
  headerHeight = 0;
}
const sizeScale = (width / 375).toFixed(2);
const heightScale = (height / 667).toFixed(2);
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

      setTimeout(()=>{

        CodePush.checkForUpdate().then((update)=>{
            this.setState({isAnimationRunning:false});
            if(!update){
              const introCount = cme_getHomeIntroCount();
              if(introCount == 0){
                  this.props.navigator.showLightBox({
                    screen:'IntroPage',
                    navigatorStyle: {
                      navBarHidden: true
                    },
                    animationType:'none',
                    style: {
                      tapBackgroundToDismiss: false,
                    },
                    passProps:{
                      dismissIntro:()=>this.props.navigator.dismissLightBox({animationType:'none'})
                    }
                  })


              }
            }
          })
          .catch((error) => {
            this.setState({isAnimationRunning:false});
          })


      },3300)
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
          top:20 * sizeScale,
          right:20 * sizeScale,
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
            top:30 * sizeScale,
            right:20* sizeScale}} >
            <Image style={{height: 70*0.619*sizeScale, width: 70*sizeScale}}  source={isDaytime?require('./image/weather/cloud-day.png') : require('./image/weather/cloud-night.png')} />
          </View>

        </View>
      )
    }
    renderTopLeftIcon(){
      let jump,picSize,left;
      if(region === '1'){
        left = -35* sizeScale;
        picSize = 310 * sizeScale;
        jump = this.state.topRightIconTop.interpolate({
          inputRange:[0, 80, 90, 95 , 97.5 ,100],
          outputRange: [  -300*sizeScale,  -picSize/5, -picSize/5-10,  -picSize/5,  -picSize/5-5 ,  -picSize/5]
        })
      }else{
        left = -50* sizeScale;
        picSize = 310 * sizeScale;
        jump = this.state.topRightIconTop.interpolate({
          inputRange:[0, 80, 90, 95 , 97.5 ,100],
          outputRange: [  -300*sizeScale,  20*sizeScale,  10*sizeScale,  20*sizeScale,  15*sizeScale ,  20*sizeScale]
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
      let top = region === '1' ? -50*sizeScale : -15*sizeScale;
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
              height:300 * sizeScale,
              width:250 * sizeScale,
              marginTop:iconMargin,
              top: top,
              left:-20* sizeScale}}>
            </View>
          </TouchableWithoutFeedback>
      );
    }

    renderTopRightIcon(){

      let jump,picSize,right;
      const iconTop = 200*heightScale + headerHeight;
      if(region === '1'){
        picSize = 310 * sizeScale;
        right = -40* sizeScale;
        jump = this.state.topRightIconTop.interpolate({
          inputRange:[0, 80, 90, 95 , 97.5 ,100],
          outputRange: [(height +100) * sizeScale, iconTop , iconTop+10 , iconTop, iconTop+5 , iconTop]
        })
      }else{
        picSize = 330 * sizeScale;
        right = -50* sizeScale;
        jump = this.state.topRightIconTop.interpolate({
          inputRange:[0, 80, 90, 95 , 97.5 ,100],
          outputRange: [ (height +100) * sizeScale, 275*sizeScale, 285*sizeScale, 275*sizeScale, 280*sizeScale , 275*sizeScale]
        })
      }

      let pressedIcon = language === 'chinese_simple' ? require('./image/houseChinese/chanmaoPressed.png') : require('./image/houseEnglish/chanmaoPressed.png');
      let unpressedIcon = language === 'chinese_simple' ? require('./image/houseChinese/chanmaoUnpressed.png') : require('./image/houseEnglish/chanmaoUnpressed.png');
      return(
        <Animated.View style={{
          backgroundColor:'transparent',
          position:'absolute',
          bottom: jump,
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
      let buttonHeight,bottom;
      if(region === '1'){
        buttonHeight = 245 * sizeScale;
        bottom =  230*heightScale + headerHeight;
      }else{
        buttonHeight = 260 * sizeScale;
        bottom =  105*heightScale + headerHeight;
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
            backgroundColor:'transparent',
            height:buttonHeight,
            width:buttonHeight+20,
            right: 0,//-70* sizeScale)
            bottom:bottom,
            marginTop:iconMargin,
            position:'absolute'
            }}
          ></View>
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
            left:-90 * sizeScale}}>
            <Image style={{
                height:310 * sizeScale,
                width:310 * sizeScale,
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
            height:310* sizeScale,
            width:220* sizeScale,
            bottom:37* sizeScale,
            marginBottom:iconMargin,
            left:-100 * sizeScale,
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
      let unpressedIcon = language === 'chinese_simple' ? require('./image/houseChinese/lifeUnpressed.png') : require('./image/houseEnglish/lifeUnpressed.png');
      return (
          <Animated.View style={{
            backgroundColor:'transparent',
            position:'absolute',
            bottom:jump,
            marginBottom:iconMargin,
            right:-120 * sizeScale}}>
            <Image style={{
                height:310* sizeScale,
                width:310* sizeScale,
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
          disabled={this.state.isAnimationRunning}
          onPress={()=>{
            clearInterval(intervalIndicator)
            this.props.onPressCMLife();
          }}
        >
          <View style={{
              height:220* sizeScale,
              width:180* sizeScale,
              position:'absolute',
              backgroundColor:'transparent',
              bottom:0 * sizeScale,
              marginBottom:iconMargin,
              right:0 * sizeScale}}>
          </View>
        </TouchableWithoutFeedback>
      );
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

            {this.renderTopRightButton()}
            {this.renderTopLeftButton()}
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
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
