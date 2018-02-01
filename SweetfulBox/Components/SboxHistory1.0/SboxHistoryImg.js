import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

class imgPreview extends Component {

  shouldComponentUpdate(nextProps, nextState){
		if(nextProps.focus != this.props.focus){
			return true
		}
    else{
			return false
		}
	}

	render() {
		return (
      <TouchableOpacity
        onPress={() => this.props.onSelected()}>
        <Image ref={(imageView) => { imgRef = imageView; }}
          style={[{marginLeft: 6,
            marginRight: 6,
            width: imgWidth,
            height: imgHeight,
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 0
            },
            shadowRadius: 4,
            shadowOpacity: 0.32},
            this.props.focus && {width: imgWidth * 1.32}]}
            source={{ uri: this.props.image }}
        />
      </TouchableOpacity>
		)
	}
}

const viewHeight = Dimensions.get('window').height;
const viewWidth = Dimensions.get('window').width;
const imgWidth = viewWidth * 0.24;
const imgHeight = viewHeight * 0.2;



export default imgPreview;
