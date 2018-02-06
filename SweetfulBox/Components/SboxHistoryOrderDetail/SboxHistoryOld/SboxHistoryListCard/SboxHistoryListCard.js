/* @flow */

import React, { Component } from 'react';
import {
  Dimensions,
  ListView,
  Platform,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { findIndex } from 'lodash';

import SboxHistoryListOrderInfo from './SboxHistoryListOrderInfo';
import BoxView from './BoxView';

const viewHeight = Dimensions.get('window').height;
const viewWidth = Dimensions.get('window').width;

const buttonHeight = viewHeight * 0.06;
const priceHeight = viewHeight * 0.07;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        margin: 10,
        marginBottom: 7,
        marginTop: 5,
    },
    shadowIOS: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 3,
        shadowOpacity: 0.25,
    },
    shadowAndroid: {
        elevation: 3,
    },
});

export default class SboxHistoryListCard extends Component {
  constructor(props) {
      super(props);
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.state = {
          items_ls: [],
          dataSource: ds.cloneWithRows([]),
          refMapping: {},
      };
      this._handleItemSelected = this._handleItemSelected.bind(this);
      // this.setSource = this.setSource.bind(this);
      // this.mapRef = this.mapRef.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
      let _shouldUpdate;
      if (nextState.items_ls !== this.state.items_ls) {
          _shouldUpdate = true;
      } else {
          _shouldUpdate = false;
      }
      return _shouldUpdate;
  }

  setSource({ items_ls, itemsDatasource, otherState }) {
    this.setState({
        items_ls,
        dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
        refMapping: otherState,
    });
  }

  _handleItemSelected(pbid, boxIndex, BoxViewRef) {
      const itemIndex = findIndex(this.props.boxes[boxIndex].prod, { pbid: pbid });
      const distance = itemIndex * (Dimensions.get('window').width * 0.24 + 12) -
      Dimensions.get('window').width * 0.28 - 6;
      BoxViewRef.scrollTo({ x: distance, y: 0, animated: true });
  }
  _renderShadow() {
      let shadow;
      if (Platform.OS === 'ios') {
          shadow = styles.shadowIOS;
      } else {
          shadow = styles.shadowAndroid;
      }
      return shadow;
  }
  _renderBoxes() {
      let boxes = [];
      for (var i = 0; i < this.props.boxes.length; i++) {
          boxes.push(
            <View key={i}>
              <BoxView  onSelected={this._handleItemSelected}
                {...{ prod: this.props.boxes[i].prod,
                      trace: this.props.boxes[i].trace,
                      bbid: this.props.boxes[i].bbid,
                      boxIndex: i,
                      created: this.props.created }}
              />
              {this._renderSeparator()}
            </View>
          );
      }
      return boxes;

  }
  _renderSeparator() {
      const separator = {
          height: 1,
          borderWidth: 1,
          borderColor: '#D5D5D5',
          marginLeft: 10,
          marginRight: 10,
      };
      return (
        <View style={separator}/>
      );
  }
  render() {
      return (
        <View style={[styles.container, this._renderShadow()]}>
          {this._renderBoxes()}

          <SboxHistoryListOrderInfo {...{ delifee: this.props.delifee,
                                          total: this.props.total }}
          />
        </View>
      );
  }
}
