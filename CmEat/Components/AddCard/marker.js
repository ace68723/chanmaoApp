'use strict'
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,


  TouchableHighlight,
  TouchableWithoutFeedback,
  Animated,


} from 'react-native';

export default class CMMarker extends Component{
  constructor(){
    super();
    this.state = {
        bounceValueMarker: new Animated.Value(0),
    }
  }
    componentDidMount(){
      {this._cycleAnimation()}
    }
    render(){

          return( <Animated.Text style={{
                    flex:1,
                    fontSize:25,
                    opacity:this.state.bounceValueMarker,
                  }}>
                    |
                  </Animated.Text>
          )

    }

    _cycleAnimation(){

          Animated.sequence([
            Animated.timing(
            this.state.bounceValueMarker,
            {
              toValue: 1,  //
              friction: 1 // 动画方式的参数
            }),
            Animated.timing(
            this.state.bounceValueMarker,
            {
              toValue: 0,  //
              friction: 1 // 动画方式的参数

            }),
          ]).start(() => {
            this._cycleAnimation();
          });

    }


}
