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
Platform,
} from 'react-native';

import SboxCart from '../SboxCart/SboxCart';
import SboxCartStore from '../../Stores/SboxCartStore';

const {height, width} = Dimensions.get('window');
const AnimatedImageBackground  = Animated.createAnimatedComponent(ImageBackground);
export default class MyComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      totalQuantity:"",
      currentBox:{boxWeights:0},
      boxLeft: new Animated.Value(width*0.8),
      boxPosition: new Animated.Value(0),
    }
    this._onChange = this._onChange.bind(this);
  }
  componentDidMount(){
    SboxCartStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    SboxCartStore.removeChangeListener(this._onChange);
  }
  _onChange() {
    this.setState({
      totalQuantity:SboxCartStore.getTotalQuantity(),
    })
  }

  _renderBox() {
      if (Platform.OS === 'ios') {
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
            <TouchableOpacity style={{top: -42, width: 50, left: width*0.8}}
                                onPressIn={this.props.handleOnPressIn}
                                onPress={this.props.goToSboxCart}>
              <AnimatedImageBackground
                    style={{
                      width:50,
                      height:50,
                      alignItems:'center',
                      justifyContent:'center',
                      transform:[
                        {translateX: 0},
                        {translateY: this.state.boxPosition},
                      ]
                    }}

                    source={require('./Image/box.png')}>
                <Text style={{backgroundColor:'rgba(0,0,0,0)',fontFamily:'FZZhunYuan-M02S',}}>
                   {this.state.totalQuantity}
                </Text>
              </AnimatedImageBackground>
          </TouchableOpacity>
        </View>
      );
      }
      else {
        return(
          <View>
            <View style={{
                      height:20,
                      backgroundColor:'#ff768b',
                      borderColor:'#000000',
                      borderTopWidth:3,
                      position:'absolute',
                      bottom:0,
                      width:width,
                    }}>

            </View>
            <TouchableOpacity style={{
              position:'absolute',
              bottom:10,
              right:10,
            }} onPress={this.props.goToSboxCart}>
              <AnimatedImageBackground
                    style={{
                      width:50,
                      height:50,

                      alignItems:'center',
                      justifyContent:'center',
                    }}
                    source={require('./Image/box.png')}>
                <Text style={{backgroundColor:'rgba(0,0,0,0)',fontFamily:'FZZhunYuan-M02S',}}>
                   {this.state.totalQuantity}
                </Text>
              </AnimatedImageBackground>
          </TouchableOpacity>

          </View>
        );
      }
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
