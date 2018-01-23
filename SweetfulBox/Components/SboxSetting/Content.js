/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: height * (434 / 2208),
    justifyContent: 'flex-end',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    width: width * (434 / 1242),
    // marginLeft: width * (110 / 1242),
    marginTop: height * (126 / 2208),
  },
  box_image: {
    height: height * (150 / 2208),
    resizeMode: 'contain',
    width: width * (150 / 1242),
  },
  box_text: {
    fontWeight: 'bold',
    paddingBottom: height * (100 / 2208),
    paddingTop: height * (54 / 2208),
  },
  content: {
    backgroundColor: '#f4f4f4',
    flex: (1806 / 2208),
    paddingHorizontal: height * (132 / 2208),
    // paddingVertical: height * (126 / 2208),
  },
  horizontalSpace: {
    width: width * (110 / 1242),
  },
  verticalSpace: {
    height: height * (126 / 2208),
  },
  row: {
    flexDirection: 'row',
  },
});

export default class Content extends Component {
  constructor(props) {
    super(props);
  }


  _renderButton() {
    let buttonList = [];
    for (var i = 0; i < this.props.settingButtonList.length; i++) {
      const data = this.props.settingButtonList[i];
      const name = data.name;
      const image = data.image;
      buttonList.push(
        <TouchableOpacity
          key={'buttonlist' + i}
          activeOpacity={0.6}
          style={styles.box}
          onPress={this.props.handleOnPress.bind(null, data)}
          >
            <Image style={styles.box_image} source={image}/>
            <Text style={styles.box_text}>{name}</Text>
        </TouchableOpacity>
      )
    }
    return buttonList
  }

  render() {
    return (
      <ScrollView style={styles.content}>
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
        >
          {this._renderButton()}
        </View>
      </ScrollView>
    );
  }
}
