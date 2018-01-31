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
  constructor(props){
    super(props);
    this.state = {
      totalQuantity:props.total,
      currentBox:{boxWeights:0},
      boxLeft: new Animated.Value(width*0.8),
      boxPosition: new Animated.Value(0),
    }
    this._onRealmChange = this._onRealmChange.bind(this);
  }
  componentDidMount() {
    realm.addListener('change', this._onRealmChange)
    this._onRealmChange();
  }
  componentWillReceiveProps(nextProps, nextState){
		if(nextProps.total !== this.state.totalQuantity){
			return true;
		}else{
			return false;
		}
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

  _renderBox() {
    console.log(this.props.total)
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
