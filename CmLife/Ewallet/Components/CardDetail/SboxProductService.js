/* @flow */

import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Image,
} from 'react-native';

const {height, width} = Dimensions.get('window');
export default class SboxProductService extends Component {
  constructor() {
    super();
    this.state = {
      imgWidth:0,
      imgHeight:0,
    }
  }
  componentDidMount() {
    Image.getSize(this.props.serviceImg, (width, height) => {
      const screenWidth = Dimensions.get('window').width
       const scaleFactor = width / screenWidth
       const imageHeight = height / scaleFactor
       this.setState(Object.assign({}, {imgWidth: screenWidth, imgHeight: imageHeight}));
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.serviceImg !== nextProps.serviceImg || this.state !== nextState) {
      return true;
    }
    return false;
  }
  render() {
    return (
        <Image
           style={{ width:this.state.imgWidth,height:this.state.imgHeight }}
           resizeMode={'cover'}
           source={{uri:this.props.serviceImg}}
         />
    );
  }
}
