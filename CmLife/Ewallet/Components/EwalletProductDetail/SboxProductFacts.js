/* @flow */

import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
} from 'react-native';

const {height, width} = Dimensions.get('window');

export default class SboxProductFacts extends Component {
  constructor() {
    super();
    this.state = {
      imgWidth:0,
      imgHeight:0,
    }
  }
  componentDidMount() {
    Image.getSize(this.props.productFactsImg, (width, height) => {
      const screenWidth = Dimensions.get('window').width
       const scaleFactor = width / screenWidth
       const imageHeight = height / scaleFactor
       this.setState(Object.assign({}, {imgWidth: screenWidth, imgHeight: imageHeight}));
    })
  }
  shouldComponentUpdate(nextProps, nextState){
		if(nextProps.productFactsImg !== this.props.productFactsImg || this.state !== nextState){
			return true;
		}else{
			return false;
		}
  }
  render() {
    return (
        <Image
           style={{ width:this.state.imgWidth,height:this.state.imgHeight }}
           resizeMode={'cover'}
           source={{uri:this.props.productFactsImg}}
         />
    );
  }
}
