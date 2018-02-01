/* @flow */

import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import SboxCart from '../SboxCart/SboxCart';

const {height, width} = Dimensions.get('window');
const AnimatedImageBackground  = Animated.createAnimatedComponent(ImageBackground);
export default class MyComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      totalQuantity:props.total,
      currentBox:{boxWeights:0},
      boxLeft: new Animated.Value(width*0.8),
      boxPosition: new Animated.Value(0),
    }
  }
  componentWillReceiveProps(nextProps, nextState){
		if(nextProps.total !== this.state.totalQuantity){
			return true;
		}else{
			return false;
		}
  }

  _renderBox() {
      return(
        <View style={{
                  height:20,
                  backgroundColor:'#ff768b',
                  borderColor:'#000000',
                  borderTopWidth:3,
                  position:'absolute',
                  bottom:0,
                  width:width,
                }}>
            <TouchableOpacity onPress={this.props.goToSboxCart}>
              <AnimatedImageBackground
                    style={{
                      width:50,
                      height:50,
                      top:-42,
                      alignItems:'center',
                      justifyContent:'center',
                      transform:[
                        {translateX: this.state.boxLeft},
                        {translateY: this.state.boxPosition},
                      ]
                    }}
                    source={require('./Image/box.png')}>
                <Text style={{backgroundColor:'rgba(0,0,0,0)',fontFamily:'FZZhunYuan-M02S',}}>
                   {this.props.total}
                </Text>
              </AnimatedImageBackground>
          </TouchableOpacity>
        </View>
      )
  }
  render() {
    return (
      <View >
          {this._renderBox()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position:'absolute'
  },
});
