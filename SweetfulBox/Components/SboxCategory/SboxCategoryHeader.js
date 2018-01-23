
import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  cancle: {
    color: '#ff4d4d',
    fontSize: (42 / 0.75) / 2208 * height,
    marginBottom: height * (20 / 2208),
  },
  container: {
    alignItems: 'flex-end',
    borderColor: '#DCDCDC',
    borderBottomWidth: 1,
    flex: (260 / 2208),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * (40 / 2208),
    marginHorizontal: width * (60 / 1242),
    paddingBottom: height * (40 / 2208),
  },
  input: {
    //color: '#DCDCDC',
    fontSize: (40 / 0.75) / 2208 * height,
    flex: 0.9
  },
  searchBar: {
    borderColor: '#DCDCDC',
    borderRadius: 50,
    borderWidth: 1,
    flexDirection: 'row',
    height: height * (100 / 2208),
    alignItems: 'center',
    width: width * (950 / 1242),
  },
  searchIcon: {
    height: height * (60 / 2208),
    marginHorizontal: width * (40 / 1242),
    resizeMode: 'contain',
    width: width * (60 / 1242),
  },
});

export default class SboxCategoryHeader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <Image style={styles.searchIcon} source={require('./img/search-01.png')}/>
          <TextInput
            ref={this.props.handleSearchInputRef}
            style={styles.input}
            onSubmitEditing={this.props.submitSearch}
            placeholder='搜索'
            onChangeText={this.props.handleSeacrchChange}
            autoCorrect={false}
            returnKeyType={'search'}
            value={this.props.searchKeyword}
          />

        </View>
        <TouchableOpacity>
          <Text style={styles.cancle}>取消</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
