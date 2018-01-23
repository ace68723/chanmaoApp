/* @flow */

import React, { Component } from 'react';
import {
  Dimensions,
  ImageBackground,
  View,
  Text,
  StyleSheet,
} from 'react-native';
const {height, width} = Dimensions.get('window');
export default class SboxCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBoxes: props.allBoxes,
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      allBoxes:nextProps.allBoxes
    })
  }
  _renderBoxes(){
    let _boxes = [];
    for (var i = 0; i < this.state.allBoxes.length; i++) {
      const box = this.state.allBoxes[i];

      _boxes.push(
        <View style={{}}>
          <View style={{backgroundColor:'#aa623f',width:width,height:20}}>
          </View>
        </View>
      )
    }
    return _boxes;
  }
  _renderBoxItem(){

  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
            style={{width:width,height:height}}
            source={require('./Image/SboxCart.png')}
          >
          {this._renderBoxes()}
          </ImageBackground>
          <Text>I'm the SboxCart component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    width:100,
    right:100,
    top:-height,
    left:0,
  },
});
