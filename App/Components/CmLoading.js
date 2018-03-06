'use strict';
import React, {
	Component,
} from 'react';
import {
  Animated,
  Dimensions,
  Image,
	InteractionManager,
	StyleSheet,
  Text,
	TouchableOpacity,
  View,
} from 'react-native';

const {width,height} = Dimensions.get('window');
export default class LogoAnimationView extends Component {
  constructor() {
    super();
    this.state = {
      firstTime:true,
      stage: 0,
      timeout:1500,
			showLogoView:true,
      logoOpacity:new Animated.Value(1),
			viewOpacity:new Animated.Value(1),
    }
  }
  async componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
      Animated.timing(
        this.state.viewOpacity,
            {
                delay: 500,
                toValue: 1,
                duration: 1000,
              }
      ).start();
    })
  	this._startLongAnimation();
  }
  _startLongAnimation(){
    const chageStage = () => {
      if(this.state.stage == 2){
        clearInterval(interval);
      }
      this.setState({
        stage:this.state.stage+1,
      })
    }
    const interval = setInterval(function () {
      chageStage()
    }, this.state.timeout);

    // fade out LogoAnimationView
    setTimeout( () => {
      InteractionManager.runAfterInteractions(() => {
        Animated.timing(
        this.state.viewOpacity,
            {
                toValue: 0,
                duration: 1000,
            }
        ).start();
      });
    },6500);
    setTimeout(() =>{
      InteractionManager.runAfterInteractions(() => {
        this.props.navigator.dismissModal();
      })
    },7600)
    // fade out LogoAnimationView end

  }
	_renderAnimation(){
      switch (this.state.stage) {
        case 1:
          return(<Image style={{
                         width:300,
                         height:300,
                         position:'absolute',
                         bottom:0,
                         right:0,
                        }}
                 source={require('./Img/1.gif')} />)
          break;
          case 2:
            return(<Image style={{
                           width:300,
                           height:300,
                           position:'absolute',
                           bottom:0,
                           left:0,}}
                   source={require('./Img/2.gif')} />)
            break;
          case 3:
            return(<Image style={{
                           width:300,
                           height:300,
                           position:'absolute',
                           top:0,
                           right:0,}}
                   source={require('./Img/3.gif')} />)
            break;
        default:

      }
    }
	render(){
      return(
				<Animated.View style={{
                            width:width,
                            height:height,
                            top:0,left:0,right:0,bottom:0,
                            backgroundColor:'white',
													  opacity:this.state.viewOpacity,}}>
					{this._renderAnimation()}
				</Animated.View>


      )
    }
}
const styles = StyleSheet.create({
  mainContainer: {
    position:'absolute',
    top:0,left:0,right:0,bottom:0,
  },
});
