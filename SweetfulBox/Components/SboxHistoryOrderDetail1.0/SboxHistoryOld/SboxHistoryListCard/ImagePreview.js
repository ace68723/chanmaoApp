/* @flow */

import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const viewHeight = Dimensions.get('window').height;
const viewWidth = Dimensions.get('window').width;
const imgWidth = viewWidth * 0.24;
const imgHeight = viewHeight * 0.2;

export default class ImagePreview extends Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //     let shouldUpdate;
  //     if (nextProps.focus !== this.props.focus) {
  //         shouldUpdate = true;
  //     } else {
  //         shouldUpdate = false;
  //     }
  //     return shouldUpdate;
  // }

  render() {
      return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => this.props.onSelected(this.props.pbid)}
        >
            <Image
                source={{ uri: this.props.image }}
                style={[{ marginLeft: 6,
                          marginRight: 6,
                          width: imgWidth,
                          height: imgHeight },
                this.props.lv_focus && { width: imgWidth * 1.32 }]}
            />
        </TouchableOpacity>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
