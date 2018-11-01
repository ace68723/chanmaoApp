/* @flow */

import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  InteractionManager,
  View,
  Text,
  StyleSheet,
} from 'react-native';
const { height, width } = Dimensions.get('window');
export default class loading extends Component {
  constructor() {
    super();
    this.state = {
      showLoading: false,
      viewOpacity: new Animated.Value(0),
      loadingOpacity: new Animated.Value(0),
    }
  }
  componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
        Animated.parallel([
          Animated.timing(
          this.state.viewOpacity,
              {
                  //delay: 500,
                  toValue: 1,
                  duration: 1000,
              }
          ),
          Animated.timing(
          this.state.loadingOpacity,
              {
                  delay: 1000, //1500
                  toValue: 1,
                  duration: 1000,
              }
          )
        ]).start();
      });
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
        this.props.navigator.dismissLightBox();
      })
    },7600)

  }
  _renderLoading() {
      return (
        <Animated.Image source={require('./Img/SboxLoading.gif')}
            style={{ flex: 1,width: width, height: height, opacity: this.state.loadingOpacity}}
        />
      )
  }
  render() {
    return (
      <Animated.View style={[styles.container, { opacity: this.state.viewOpacity }]}>
          {this._renderLoading()}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    top:0,left:0,right:0,bottom:0,
    backgroundColor:'white',
  },
});
