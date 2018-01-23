/* @flow */

import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  image: {
    marginLeft: width * (93 / 1242),
    marginRight: width * (65 / 1242),
    height: height * (84 / 2208),
    width: width * (76 / 1242),
    resizeMode: 'contain',
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
  suboption: {
    paddingTop: height * (35 / 2208),
    marginLeft: width * (234 / 1242),
    marginRight: width * (250 / 1242),
    width: width * (758 / 1242),
    // backgroundColor:'blue',
    // justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
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
export default class Option extends Component {
  constructor() {
    super();
  }
  _renderSuboptionList() {
    let suboptionList = [];
    for (var i = 0; i < this.props.option.suboptionList.length; i++) {
        const suboption = this.props.option.suboptionList[i];
        suboptionList.push(this._renderSuboption(i, suboption))
    }
    return suboptionList;
  }
  _renderSuboption(key, suboption) {
    const textAlign = key % 2 === 0 ? 'left' : 'right';
    return (
      <TouchableOpacity key={'suboption' + key}>
        <View style={{width: width * (379 / 1242),
                marginTop: height * (35 / 2208),}}>
            <Text style={[styles.optionsText,{
              textAlign: textAlign,
            }]}>
            {suboption.name}
            </Text>
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <View style={{paddingTop:20}}>

        <View style={styles.row}>
          <Image style={styles.image} source={this.props.option.image}/>
          <View style={styles.subTitle}>
            <Text style={styles.subTitleText}>{this.props.option.title}</Text>
          </View>
        </View>
        <View style={styles.suboption}
        >
          {this._renderSuboptionList()}
        </View>





      </View>
    );
  }
}

// <View style={styles.optionsOne}>
//   <TouchableOpacity>
//     <Text style={styles.optionsText}>配送时间</Text>
//   </TouchableOpacity>
//   <TouchableOpacity>
//     <Text style={styles.optionsText}>配送方式</Text>
//   </TouchableOpacity>
// </View>
// <View style={styles.optionsTwo}>
//   <TouchableOpacity>
//     <Text style={styles.optionsText}>配送范围</Text>
//   </TouchableOpacity>
//   <TouchableOpacity>
//     <Text style={styles.optionsText}>配送费用</Text>
//   </TouchableOpacity>
// </View>
