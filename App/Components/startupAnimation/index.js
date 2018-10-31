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
import { cme_getLanguage } from '../../Modules/Database';
const {width,height} = Dimensions.get('window');
if(height == 812){
  iconMargin = 50
}else{
  iconMargin = 0
}
const sizeScale = width / 375;
let isDaytime = true;
let intervalIndicator;
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
      const language = cme_getLanguage();
      this._fadeOut = this._fadeOut.bind(this);

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
            duration:1800
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

      this.intervalIndicator = setInterval(()=>{
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
    }
    render() {
      return (
        <Animated.View style={[styles.container,{opacity: this.state.opacity}]}>
          <Image style={{
              position:'absolute',
              width:width,
              height:height,
            }} 
            source={isDaytime ? require('./image/背景/启动页-多伦多-白天背景.png') : require('./image/背景/启动页-多伦多-夜晚背景.png')} />
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
            }} source={ isDaytime ? require('./image/天气/sun.png') : require('./image/天气/moon.png')}/>
          <View style={{ 
            position:'absolute',
            top:30 * sizeScale,
            right:20* sizeScale}} >
            <Image style={{height: 70*0.619*sizeScale, width: 70*sizeScale}}  source={isDaytime?require('./image/天气/cloud-day.png') : require('./image/天气/cloud-night.png')} />
          </View>
          
        </View>
      )
    }
    renderTopLeftIcon(){
      let jump = this.state.topRightIconTop.interpolate({
        inputRange:[0, 80, 90, 95 , 97.5 ,100],
        outputRange: [ -300*sizeScale, -30*sizeScale, -40*sizeScale, -30*sizeScale, -35*sizeScale , -30*sizeScale]
      })

      let pressedIcon = this.language === 'chinese_simple' ? require('./image/建筑-中文/启动页-施工中-按下.png') : require('./image/建筑-英文/启动页-施工中-按下.png');
      let unpressedIcon = this.language === 'chinese_simple' ? require('./image/建筑-中文/启动页-施工中.png') : require('./image/建筑-英文/启动页-施工中.png');
      return(
        <Animated.View style={{ 
          backgroundColor:'transparent', 
          position:'absolute',
          marginTop:iconMargin,
          top: jump,
          left:-35* sizeScale}}>
          <Image style={{
            height:310 * sizeScale, 
            width:310 * sizeScale,
            }}
            source={this.state.isTopLeftButtonPressed ? pressedIcon : unpressedIcon} />
        </Animated.View>
      );
    }
    renderTopLeftButton(){
      
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
              top:-50* sizeScale,
              left:-20* sizeScale}}>
            </View>
          </TouchableWithoutFeedback>
      );
    }

    renderTopRightIcon(){
      let jump = this.state.topRightIconTop.interpolate({
        inputRange:[0, 80, 90, 95 , 97.5 ,100],
        outputRange: [ -300*sizeScale, 155*sizeScale, 145*sizeScale, 155*sizeScale, 150*sizeScale , 155*sizeScale]
      })

      let pressedIcon = this.language === 'chinese_simple' ? require('./image/建筑-中文/启动页-馋猫订餐-按下.png') : require('./image/建筑-英文/启动页-馋猫订餐-按下.png');
      let unpressedIcon = this.language === 'chinese_simple' ? require('./image/建筑-中文/启动页-馋猫订餐.png') : require('./image/建筑-英文/启动页-馋猫订餐.png');
      return(
        <Animated.View style={{
          backgroundColor:'transparent',
          position:'absolute',
          top: jump,
          marginTop:iconMargin,
          right:-40* sizeScale}}>
            <Image style={{
              height:310 * sizeScale, 
              width:310 * sizeScale,
              }}
              source={this.state.isTopRightButtonPressed ? pressedIcon : unpressedIcon} />
        </Animated.View>
      );
    }
    renderTopRightButton(){
      return (
        <TouchableWithoutFeedback 
          onPressIn={()=>this.setState({isTopRightButtonPressed:true})}
          onPressOut={()=>this.setState({isTopRightButtonPressed:false})}
          onPress={()=>{
            this._fadeOut();
            clearInterval(this.intervalIndicator)
            this.props.onPressCMFoodDelivery();
          }}
          disabled={this.state.isAnimationRunning}
        > 
          <View style={{ 
              transform:[{rotate:'58deg'}],
              backgroundColor:'transparent', 
              position:'absolute', 
              height:310 * sizeScale, 
              width:210 * sizeScale,
              top:120 * sizeScale,
              marginTop:iconMargin,
              right:-5 * sizeScale}}>
            </View>
        </TouchableWithoutFeedback>
      );
    }

    renderBottomLeftIcon(){
      let jump = this.state.bottomLeftIconBottom.interpolate({
        inputRange:[0, 80, 90, 95 , 97.5 ,100],
        outputRange: [(height +100) * sizeScale, 50*sizeScale, 60*sizeScale, 50*sizeScale, 55*sizeScale , 50*sizeScale]
      })

      let pressedIcon = this.language === 'chinese_simple' ?  require('./image/建筑-中文/启动页-馋猫电商-按下.png') : require('./image/建筑-英文/启动页-馋猫电商-按下.png');
      let unpressedIcon = this.language === 'chinese_simple' ? require('./image/建筑-中文/启动页-馋猫电商.png') : require('./image/建筑-英文/启动页-馋猫电商.png');
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
            clearInterval(this.intervalIndicator)
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
            left:-100 * sizeScale
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
      let pressedIcon = this.language === 'chinese_simple' ? require('./image/建筑-中文/启动页-馋猫生活-按下.png') : require('./image/建筑-英文/启动页-馋猫生活-按下.png');
      let unpressedIcon = this.language === 'chinese_simple' ? require('./image/建筑-中文/启动页-馋猫生活.png') : require('./image/建筑-英文/启动页-馋猫生活.png');
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
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  