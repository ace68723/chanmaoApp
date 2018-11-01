/* @flow */

import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity,Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

export default class SboxProductTabSectionHeaderCell extends Component {
  render() {
    return (<View style={styles.container}>
      <TouchableOpacity
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          width: width/3,
        }}
        onPress={()=>{
          this.props.onPress(this.props.index)
        }}>
        <Image source={{
            uri: this.props.icon
          }} style={{
            height: 25,
            width: 25
          }}/>
        <Text style={[
                      styles.text, (this.props.currentIndex == this.props.index) && styles.activatedText
                    ]}
              allowFontScaling={false}>
          {this.props.name}
        </Text>
      </TouchableOpacity>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {},
  text: {
    color: '#a5a5a5',
    fontFamily: 'NotoSansCJKsc-Regular',
    marginLeft: 6,
    fontSize: 12
  },
  activatedText: {
    color: 'black',
  }
});
