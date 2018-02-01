'use strict';
import React, {
	Component,
} from 'react';
import {
  Dimensions,
  Image,
  LayoutAnimation,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
class Advertisement extends Component {
  constructor() {
      super();
      this.state = {
        adWidth:0,
        ad:0,
      };
  }
componentDidMount() {
  var animations = {
    layout: {
        spring: {
          duration: 400,
          create: {
            duration: 300,
            type: LayoutAnimation.Types.easeInEaseOut,
            property: LayoutAnimation.Properties.opacity,
          },
          update: {
            type: LayoutAnimation.Types.spring,
            springDamping: 400,
          },
        },
        easeInEaseOut: {
          duration: 1000,
          create: {
            type: LayoutAnimation.Types.easeInEaseOut,
            property: LayoutAnimation.Properties.opacity,
          },
          update: {
            type: LayoutAnimation.Types.easeInEaseOut,
          },
        },
      },
    };
  LayoutAnimation.configureNext(animations.layout.easeInEaseOut);

}

  render(){
    return(

    )
  }
}

module.exports = Advertisement;
