/* @flow */

import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

const { height, width } = Dimensions.get('window');
import Label from '../../../App/Constants/AppLabel';
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
  horizontalSpace: {
    width: width * (62 / 1242),
  },
  image: {
    backgroundColor: '#cccccc',
    borderColor: '#9999ff',
    borderWidth: 1,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  record_item: {
    height: height * (140 / 2208),
    alignItems: 'center',
    borderColor: '#DCDCDC',
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: width * (40 / 1242),
    marginRight: width * (20 / 1242),
    marginBottom: height * (20 / 2208),
  },
  record_text: {
    color: '#808080',
    fontSize: (35 / 0.75) / 2208 * height,
    fontWeight: 'bold',
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

export default class SboxCategoryContent extends Component {
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
          activeOpacity={0.6}
          key={['category', i]}
          style={styles.category}
        >
          <Image
            source={image}
            style={styles.image}
          />
          <View style={styles.name}>
            <Text style={styles.text}
                  allowFontScaling={false}>{name}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return categoryList;
  }

  _renderSearchRecordList() {
    let searchRecordList = [];
    for (let  [index, searchRecord] of this.props.searchRecordList.entries()) {
        const keyword = searchRecord.keyword;
        searchRecordList.push(
          <TouchableOpacity
            key={'searchRecord',index}
            style={styles.record_item}
            activeOpacity={0.6}
            onPress={this.props.handleSearchHistoryOnpress.bind(null,keyword)}
          >
            <Text style={styles.record_text}
                  allowFontScaling={false}>{keyword}</Text>
          </TouchableOpacity>
        );
    }
    return searchRecordList;
  }

  render() {
    return (
      <ScrollView style={styles.content}>
        <View style={styles.title}>
          <Text style={styles.text}
                allowFontScaling={false}>{Label.getSboxLabel('PRODUCT_CATEGORY')}</Text>
        </View>

        <View style={styles.categoryList}>
          {this._renderCategoryList()}
        </View>

        <View style={[styles.title, styles.flexRow]}>
          <Text style={styles.text}
                allowFontScaling={false}>{Label.getSboxLabel('SEARCH_RECORD')}</Text>
          <TouchableOpacity onPress={this.props.clearSearchHistory}>
            <Text style={styles.erase}
                  allowFontScaling={false}>{Label.getSboxLabel('CLEAN')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.record}>
          {this._renderSearchRecordList()}
        </View>
      </ScrollView>
    );
  }
}
