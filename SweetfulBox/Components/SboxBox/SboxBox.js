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
const Realm = require('realm');
const realm = new Realm({path: "cm_2.4.0.realm"});
const AnimatedImageBackground  = Animated.createAnimatedComponent(ImageBackground);
export default class MyComponent extends Component {
  constructor(){
    super();
    this.state = {
      currentBox:{boxWeights:0},
      boxLeft: new Animated.Value(0),
      showClaw:'down',
      clawPosition: new Animated.Value((-height-200)*2),
      boxPosition: new Animated.Value(0),
    }
    this._onRealmChange = this._onRealmChange.bind(this);
  }
  componentDidMount() {
    realm.addListener('change', this._onRealmChange)
    this._onRealmChange();
    // setTimeout(() => {
    //   this._updateBoxPosition();
    // }, 600);
  }
  componentWillUnmount() {
    realm.removeListener('change',this._onRealmChange);
  }
  _allBoxes = []
  _onRealmChange() {
    this._allBoxes = realm.objects('sbox_box');
    const lastIndex = this._allBoxes.length;
    if(!this._allBoxes[lastIndex-1]) return;
    this.setState({
      currentBox:this._allBoxes[lastIndex-1]
    });
    setTimeout(() => {
      this._updateBoxPosition();
    }, 100);
  }
  _updateBoxPosition() {
    console.log('currentBox',(this.state.boxId!==1 && this._boxId !== this.state.currentBox.boxId))

    // if (this.state.currentBox.boxWeights === 99 || (this.state.boxId!==1 && this._boxId !== this.state.currentBox.boxId)){
      if (this.state.currentBox.boxWeights === 99){
      this._boxId = this.state.boxId;
      const boxPosition = 99 / 99 * width-80;
      Animated.timing(this.state.boxLeft, {
        toValue: boxPosition,
        duration: 200,
        useNativeDriver: true,
      }).start();
      Animated.timing(this.state.clawPosition, {
        toValue: -height-200,
        delay:1000,
        duration: 500,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        this.setState({
          showClaw:'up',
        })
        Animated.timing(this.state.clawPosition, {
          toValue: (-height-200)*2,
          duration: 500,
          useNativeDriver: true,
        }).start();
        Animated.timing(this.state.boxPosition, {
          toValue: -height+80,
          duration: 400,
          useNativeDriver: true,
        }).start();
      }, 2500);

    } else {
      const boxPosition = this.state.currentBox.boxWeights / 99 * (width - 80);
      // const boxPosition = 99 / 99 * width-80;
      Animated.timing(this.state.boxLeft, {
        toValue: boxPosition,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }
  _renderClaw() {
    if(this.state.showClaw == 'down'){
      return(
        <Animated.Image
              style={{
                width:100,
                height:100*8.4357,
                left:-24,
                position:'absolute',
                transform:[
                  {translateX: this.state.boxLeft},
                  {translateY: this.state.clawPosition}
                ]
              }}
              source={require('./Image/claw01.png')}>
        </Animated.Image>
      )
    }else{
      return(
        <Animated.Image
              style={{
                width:100,
                height:100*8.4357,
                left:-24,
                position:'absolute',
                transform:[
                  {translateX: this.state.boxLeft},
                  {translateY: this.state.clawPosition}
                ]
              }}
              source={require('./Image/claw02.png')}>
        </Animated.Image>
      )
    }
  }
  _renderBox() {
    if(this.state.showClaw == 'down'){
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
                        ]
                      }}
                      source={require('./Image/box.png')}>
                  <Text style={{backgroundColor:'rgba(0,0,0,0)',fontFamily:'FZZhunYuan-M02S',}}>
                     {this.state.currentBox.boxWeights}/99
                  </Text>
                </AnimatedImageBackground>
              </TouchableOpacity>
        </View>
      )
    }else{
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
                   {this.state.currentBox.boxWeights}/99
                </Text>
              </AnimatedImageBackground>
          </TouchableOpacity>
        </View>
      )
    }
  }
  render() {
    return (
      <View >

          {this._renderBox()}

        {this._renderClaw()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position:'absolute'
  },
});
