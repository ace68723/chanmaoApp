/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import SectionTypeOne from './SectionTypeOne';
import SectionTypeTwo from './SectionTypeTwo';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  content: {
    flex: 1 - (212 / 2208),
  },
  serviceEmail: {
    height: height * (204 / 2208),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#DCDCDC',
  },
  servicePhone: {
    height: height * (204 / 2208),
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#DCDCDC',
  },
  image: {
    marginLeft: width * (93 / 1242),
    marginRight: width * (65 / 1242),
    height: height * (84 / 2208),
    width: width * (76 / 1242),
    resizeMode: 'contain',
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: width * (84 / 1242),
  },
  forwardIcon: {
    fontSize: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  light: {
    color: '#A9A9A9',
  },
  title: {
    marginLeft: width * (93 / 1242),
    paddingTop: height * (52 / 2208),
    paddingBottom: height * (68 / 2208),
    fontWeight: 'bold',
  },
  subTitle: {
    flex: 1,
    marginRight: width * (151 / 1242),
    borderBottomWidth: 1,
    borderColor: '#DCDCDC',
  },
  subTitleText: {
    paddingBottom: width * (20 / 1242),
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionsOne: {
    paddingTop: height * (35 / 2208),
    marginLeft: width * (234 / 1242),
    paddingRight: width * (250 / 1242),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  optionsTwo: {
    marginLeft: width * (234 / 1242),
    paddingRight: width * (250 / 1242),
    paddingTop: height * (45 / 2208),
    paddingBottom: height * (110 / 2208),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  optionsThree: {
    marginLeft: width * (234 / 1242),
    paddingRight: width * (250 / 1242),
    paddingTop: height * (45 / 2208),
    paddingBottom: height * (45 / 2208),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  optionsFour: {
    marginLeft: width * (234 / 1242),
    paddingRight: width * (250 / 1242),
    paddingBottom: height * (78 / 2208),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  optionsText: {
    color: '#708090',
  },
});

export default class Content extends Component {
  _renderSectionList() {
    let sectionList = [];
    for (var i = 0; i < this.props.sectionList.length; i++) {
      const section = this.props.sectionList[i];
      if (section.sectionType === 1) {
        sectionList.push(
          <SectionTypeOne
              key={'section' + i}
              sectionParam={section.sectionParam}
          />
        );
      } else if (section.sectionType === 2) {
        sectionList.push(
          <SectionTypeTwo
              key={'section' + i}
              sectionParam={section.sectionParam}
          />
        );
      }

    }
    return sectionList;
  }
  render() {
    return (
      <ScrollView style={styles.content}>
        {this._renderSectionList()}
      </ScrollView>
    );
  }
}
