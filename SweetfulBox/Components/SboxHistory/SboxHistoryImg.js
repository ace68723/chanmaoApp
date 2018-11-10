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
import { cme_getLanguage } from '../../../App/Modules/Database';
let language;
class imgPreview extends Component {
  constructor(props) {
    super(props);
    this._renderProductImage = this._renderProductImage.bind(this);

    language = cme_getLanguage();
  }
  shouldComponentUpdate(nextProps, nextState){
		if(nextProps.focus != this.props.focus){
			return true
		}
    else{
			return false
		}
  }
  _renderProductImage(){
    if (this.props.isAvailable === true) {
      return(
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
      )
    }else {
      let soldoutPic = language === 'chinese_simple' ? require('./Image/soldout.png') : require('./Image/soldout_eng.png')
      return(
        <View>
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
        <Image source={soldoutPic}
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
                   this.props.focus && {width: imgWidth * 1.32} ,{position: 'absolute'}]}
          />
        </View>
      )
    }
  }
	render() {
		return (
      <TouchableOpacity
        onPress={() => this.props.onSelected()}>
        {this._renderProductImage()}
      </TouchableOpacity>
		)
	}
}

const viewHeight = Dimensions.get('window').height;
const viewWidth = Dimensions.get('window').width;
const imgWidth = viewWidth * 0.24;
const imgHeight = viewHeight * 0.2;



export default imgPreview;
