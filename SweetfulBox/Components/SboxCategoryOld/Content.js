/* @flow */

import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  category: {
    alignItems: 'center',
    width: width * (234 / 1242),
  },
  content: {
    flex: (1792 / 2208),
    paddingHorizontal: width * (60 / 1242),
  },
  erase: {
    color: '#808080',
    fontSize: (42 / 0.75) / 2208 * height,
    marginBottom: height * (20 / 2208),
  },
  flexRow: {
    flexDirection: 'row',
  },
  gray: {
    color: '#808080',
    fontSize: (40 / 0.75) / 2208 * height,
    fontWeight: 'bold',
  },
  horizontalSpace: {
    width: width * (62 / 1242),
  },
  image: {
    height: height * (120 / 2208),
    resizeMode: 'contain',
    width: width * (120 / 1242),
  },
  name: {
    flexDirection: 'row',
    height: height * (210 / 2208),
    justifyContent: 'space-between',
    marginTop: height * (40 / 2208),
  },
  record: {
    height: height * (120 / 2208),
  },
  record_item: {
    alignItems: 'center',
    borderColor: '#DCDCDC',
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: width * (40 / 1242),
    marginRight: width * (20 / 1242),
  },
  text: {
    fontWeight: 'bold',
    fontSize: (30 / 0.75) / 2208 * height,
  },
  title: {
    height: height * (142 / 2208),
    justifyContent: 'space-between',
    marginTop: height * (40 / 2208),
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default class Content extends Component {
  constructor(props) {
    super(props);
    
  }

  _renderCategoryList() {
    let categoryList = [];
    for (var i = 0; i < this.props.categoryList.length; i++) {
      const category = this.props.categoryList[i];
      const name = category.categoryParam.name;
      const image = category.categoryParam.image;
      categoryList.push(
        <TouchableOpacity
          onPress={this.props.handleOnPress.bind(null,category)}
          activeOpacity={0.6}
          key={['category', i]}
          style={styles.category}
        >
          <Image
            source={image}
            style={styles.image}
          />
          <View style={styles.name}>
            <Text style={styles.text}>{name}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return categoryList;
  }

  _renderSearchRecordList() {
    let searchRecordList = [];
    for (var i = 0; i < this.props.searchRecordList.length; i++) {
      const searchRecord = this.props.searchRecordList[i];
      const name = searchRecord.searchRecordParam.name;
      searchRecordList.push(
        <TouchableOpacity
          onPress={this.props.handleOnPress.bind(null,searchRecord)}
          key={['searchRecord', i]}
          style={styles.record_item}
          activeOpacity={0.6}
        >
          <Text style={styles.gray}>{name}</Text>
        </TouchableOpacity>
      );
    }
    return searchRecordList;
  }

  render() {
    return (
      <ScrollView style={styles.content}>
        <View style={styles.title}>
          <Text style={styles.text}>产品分类</Text>
        </View>

        <View style={styles.categoryList}>
          {this._renderCategoryList()}
        </View>

        <View style={[styles.title, styles.flexRow]}>
          <Text style={styles.text}>搜索记录</Text>
          <TouchableOpacity>
            <Text style={styles.erase}>清空</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.flexRow, styles.record]}>
          {this._renderSearchRecordList()}
        </View>
      </ScrollView>
    );
  }
}
